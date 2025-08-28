import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { type Request, type Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { SetRefreshTokenInterceptor } from './interceptors/setRefreshToken.interceptor';
import { AuthResponse } from './interfaces/auth.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }

  @Post('login')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async login(@Body() dto: LoginUserDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Post('refresh')
  @UseInterceptors(SetRefreshTokenInterceptor)
  refresh(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }
}
