import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
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
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockUser.passwordHash = await argon2.hash('password123', { type: argon2.argon2id });

    usersService = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      createUser: vi.fn(),
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
});
