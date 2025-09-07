import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { type Request, type Response } from 'express';
import { API_BEARER_AUTH_KEY } from 'src/common/constants/swagger.constants';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/Jwt-auth.guard';
import { SetRefreshTokenInterceptor } from './interceptors/setRefreshToken.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(SetRefreshTokenInterceptor)
  @ApiOkResponse({ type: AuthResponseDto })
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @UseInterceptors(SetRefreshTokenInterceptor)
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth(API_BEARER_AUTH_KEY)
  @ApiOkResponse({ type: Boolean })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Post('refresh')
  @UseInterceptors(SetRefreshTokenInterceptor)
  @ApiOkResponse({ type: AuthResponseDto })
  refresh(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }
}
