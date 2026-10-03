import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { GithubAuthGuard } from './guards/github-auth.guard.js';
import { OAuthUserPayload } from './strategies/google.strategy.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and issue tokens' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using HttpOnly cookie' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid or missing refresh token' })
  async refresh(
    @Req() req: Request,
    @Body('refreshToken') bodyToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies?.refreshToken || bodyToken;
    if (!token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const result = await this.authService.refresh(token);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return {
      user: result.user,
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and invalidate session' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(
    @Req() req: Request & { user: { id: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.user?.id) {
      await this.authService.logout(req.user.id);
    }
    res.clearCookie('refreshToken', { path: '/api/auth' });
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req: Request & { user: { id: string } }) {
    return this.authService.getCurrentUser(req.user.id);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth authentication' })
  async googleAuth() {
    // Guard initiates Google OAuth redirect
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback endpoint' })
  async googleAuthCallback(
    @Req() req: Request & { user?: OAuthUserPayload },
    @Res() res: Response,
  ) {
    if (!req.user) return;
    return this.handleOAuthCallback(req.user, res);
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'Initiate GitHub OAuth authentication' })
  async githubAuth() {
    // Guard initiates GitHub OAuth redirect
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'GitHub OAuth callback endpoint' })
  async githubAuthCallback(
    @Req() req: Request & { user?: OAuthUserPayload },
    @Res() res: Response,
  ) {
    if (!req.user) return;
    return this.handleOAuthCallback(req.user, res);
  }

  private async handleOAuthCallback(oauthPayload: OAuthUserPayload, res: Response) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');
    try {
      const result = await this.authService.validateOAuthUser(oauthPayload);
      this.setRefreshTokenCookie(res, result.refreshToken);
      return res.redirect(`${frontendUrl}/auth/callback?token=${encodeURIComponent(result.accessToken)}`);
    } catch (err: any) {
      let errorCode = 'oauth_failed';
      if (err?.message === 'ACCOUNT_EXISTS_LINK_REQUIRED') {
        errorCode = 'account_exists_link_required';
      } else if (err?.status === 400 || err?.response?.message?.includes('Email')) {
        errorCode = 'missing_email';
      }
      return res.redirect(`${frontendUrl}/auth/login?error=${errorCode}`);
    }
  }
}
