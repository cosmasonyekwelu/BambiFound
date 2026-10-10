import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service.js';
import { EmailService } from '../email/email.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { User } from '@prisma/client';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    emailVerified: boolean;
    onboardingCompleted: boolean;
    onboardingSkipped: boolean;
    onboardingStep: number;
    onboardingData: any;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private sanitizeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      emailVerified: user.emailVerified,
      onboardingCompleted: user.onboardingCompleted,
      onboardingSkipped: user.onboardingSkipped,
      onboardingStep: user.onboardingStep,
      onboardingData: user.onboardingData,
      membershipTier: user.membershipTier,
      membershipExpiresAt: user.membershipExpiresAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const accessSecret = this.configService.get<string>('JWT_SECRET', 'super_secret_jwt_access_key_bambifound_2025');
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET', 'super_secret_jwt_refresh_key_bambifound_2025');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: accessSecret, expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        { secret: refreshSecret, expiresIn: '7d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string): Promise<void> {
    const hash = await argon2.hash(refreshToken, { type: argon2.argon2id });
    await this.usersService.updateHashedRefreshToken(userId, hash);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await argon2.hash(registerDto.password, { type: argon2.argon2id });
    const user = await this.usersService.createUser({
      email: registerDto.email,
      passwordHash,
      fullName: registerDto.fullName,
    });

    // Send welcome email asynchronously
    this.emailService.sendWelcomeEmail(user.email, user.fullName || undefined).catch(() => {});

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await argon2.verify(user.passwordHash, loginDto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour validity
      await this.usersService.setResetToken(user.id, resetToken, expiresAt);
      await this.emailService.sendPasswordResetEmail(user.email, resetToken);
    }
    return {
      message: 'If an account exists with this email address, password reset instructions have been sent.',
    };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired password reset token');
    }

    const passwordHash = await argon2.hash(newPassword, { type: argon2.argon2id });
    await this.usersService.updatePassword(user.id, passwordHash);

    return {
      message: 'Password has been reset successfully. Please log in with your new password.',
    };
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET', 'super_secret_jwt_refresh_key_bambifound_2025');
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(refreshToken, {
        secret: refreshSecret,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Invalid session');
      }

      const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);
      if (!refreshTokenMatches) {
        throw new UnauthorizedException('Invalid session');
      }

      const tokens = await this.generateTokens(user.id, user.email);
      await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await this.usersService.updateHashedRefreshToken(userId, null);
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.sanitizeUser(user);
  }
}
