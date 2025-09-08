import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginUserDto, RegisterUserDto } from '../dto/auth.dto';
import { SetRefreshTokenInterceptor } from '../interceptors/setRefreshToken.interceptor';

const authResponseMock = { accessToken: 'access', refreshToken: 'refresh' };

const resgiterUserDtoMock: RegisterUserDto = {
  username: 'john johnson',
  email: 'test@test.com',
  password: '1234',
};

const loginUserDtoMock: LoginUserDto = {
  email: 'test@test.com',
  password: '1234',
};

const requestMock: Request = {} as Request;
const responseMock: Response = {} as Response;

const authServiceMock = {
  register: jest.fn().mockResolvedValue(authResponseMock),
  login: jest.fn().mockResolvedValue(authResponseMock),
  logout: jest.fn().mockResolvedValue(true),
  refreshToken: jest.fn().mockResolvedValue(authResponseMock),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    })
      .overrideInterceptor(SetRefreshTokenInterceptor)
      .useValue({})
      .compile();

    controller = module.get(AuthController);
  });

  it('should register a user', async () => {
    const result = await controller.register(resgiterUserDtoMock);
    expect(result).toEqual(authResponseMock);
  });

  it('should login user', async () => {
    const result = await controller.login(loginUserDtoMock);
    expect(result).toEqual(authResponseMock);
  });

  it('should logout user', async () => {
    const result = await controller.logout(requestMock, responseMock);
    expect(result).toEqual(true);
  });

  it('should refresh token', async () => {
    const result = await controller.refresh(requestMock);
    expect(result).toEqual(authResponseMock);
  });
});
