/* eslint-disable @typescript-eslint/no-unsafe-return */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              const config = {
                JWT_ACCESS_SECRET: 'access-secret',
                JWT_ACCESS_TTL: '1h',
                JWT_REFRESH_SECRET: 'refresh-secret',
                JWT_REFRESH_TTL: '7d',
              };
              return config[key];
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('generateTokens: should return access and refresh tokens', async () => {
    const userId = 'user1';
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    jest
      .spyOn(service['jwtService'], 'signAsync')
      .mockResolvedValueOnce(accessToken)
      .mockResolvedValueOnce(refreshToken);
    jest.spyOn(service['cacheManager'], 'set');

    const result = await service['generateTokens'](userId);

    expect(result).toEqual({ accessToken, refreshToken });
    expect(service['cacheManager'].set).toHaveBeenCalledWith(
      userId,
      expect.any(String),
    );
  });
});
