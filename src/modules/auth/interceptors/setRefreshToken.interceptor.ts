import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { map } from 'rxjs';
import { isProd } from 'src/utils/nodeEnvironment';
import { parseTTL } from 'src/utils/parseTTL';

import { AuthResponseDto } from '../dto/auth.dto';

@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler<AuthResponseDto>) {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const { accessToken, refreshToken } = data;

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: isProd(),
          sameSite: 'none',
          maxAge: parseTTL(
            this.configService.getOrThrow<string>('JWT_REFRESH_TTL'),
          ),
        });

        return { accessToken };
      }),
    );
  }
}
