import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$dummyhash',
    fullName: 'Test User',
    emailVerified: false,
    hashedRefreshToken: null,
    onboardingCompleted: false,
    onboardingSkipped: false,
    onboardingStep: 1,
    onboardingData: {},
    membershipTier: 'FREE',
    membershipExpiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockUser.passwordHash = await argon2.hash('password123', { type: argon2.argon2id });

    usersService = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      createUser: vi.fn(),
      findOAuthAccount: vi.fn(),
      createOAuthUser: vi.fn(),
      linkOAuthAccount: vi.fn(),
      updateHashedRefreshToken: vi.fn(),
    };

    jwtService = {
      signAsync: vi.fn().mockResolvedValue('mock-token'),
      verifyAsync: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: string, defaultVal: string) => defaultVal),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new user successfully', async () => {
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(usersService, 'createUser').mockResolvedValue(mockUser);
    vi.spyOn(usersService, 'updateHashedRefreshToken').mockResolvedValue(mockUser);

    const result = await service.register({
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });

    expect(result.user.email).toBe('test@example.com');
    expect(result.accessToken).toBe('mock-token');
    expect(usersService.createUser).toHaveBeenCalled();
  });

  it('should throw ConflictException if user already exists during registration', async () => {
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);

    await expect(
      service.register({
        email: 'test@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should login user with correct credentials', async () => {
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
    vi.spyOn(usersService, 'updateHashedRefreshToken').mockResolvedValue(mockUser);

    const result = await service.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.user.id).toBe('user-123');
    expect(result.accessToken).toBe('mock-token');
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);

    await expect(
      service.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should logout user by clearing refresh token', async () => {
    vi.spyOn(usersService, 'updateHashedRefreshToken').mockResolvedValue(mockUser);

    await service.logout('user-123');
    expect(usersService.updateHashedRefreshToken).toHaveBeenCalledWith('user-123', null);
  });

  it('should reject email/password login for social-only user with null passwordHash', async () => {
    const oauthOnlyUser = { ...mockUser, passwordHash: null };
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(oauthOnlyUser as any);

    await expect(
      service.login({
        email: 'test@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should authenticate existing OAuth identity in validateOAuthUser', async () => {
    const oauthAccount = {
      id: 'oauth-1',
      userId: 'user-123',
      provider: 'GOOGLE',
      providerAccountId: 'google-sub-123',
      user: mockUser,
    };
    vi.spyOn(usersService, 'findOAuthAccount').mockResolvedValue(oauthAccount as any);
    vi.spyOn(usersService, 'updateHashedRefreshToken').mockResolvedValue(mockUser as any);

    const result = await service.validateOAuthUser({
      provider: 'GOOGLE',
      providerAccountId: 'google-sub-123',
      email: 'test@example.com',
      fullName: 'Test User',
    });

    expect(result.user.id).toBe('user-123');
    expect(result.accessToken).toBe('mock-token');
  });

  it('should throw ConflictException if email exists during validateOAuthUser without linked identity', async () => {
    vi.spyOn(usersService, 'findOAuthAccount').mockResolvedValue(null);
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as any);

    await expect(
      service.validateOAuthUser({
        provider: 'GOOGLE',
        providerAccountId: 'google-sub-999',
        email: 'test@example.com',
        fullName: 'Test User',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should create a new user and OAuth account in validateOAuthUser when identity and email do not exist', async () => {
    vi.spyOn(usersService, 'findOAuthAccount').mockResolvedValue(null);
    vi.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(usersService, 'createOAuthUser').mockResolvedValue(mockUser as any);
    vi.spyOn(usersService, 'updateHashedRefreshToken').mockResolvedValue(mockUser as any);

    const result = await service.validateOAuthUser({
      provider: 'GITHUB',
      providerAccountId: 'github-id-456',
      email: 'newuser@example.com',
      fullName: 'New User',
    });

    expect(result.user.email).toBe('test@example.com');
    expect(usersService.createOAuthUser).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      fullName: 'New User',
      provider: 'GITHUB',
      providerAccountId: 'github-id-456',
    });
  });

  it('should throw BadRequestException in validateOAuthUser if email is missing', async () => {
    await expect(
      service.validateOAuthUser({
        provider: 'GITHUB',
        providerAccountId: 'github-id-456',
        email: null,
        fullName: 'No Email User',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
