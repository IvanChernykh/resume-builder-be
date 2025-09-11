import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { validateRequest } from 'src/configs/csrf.config';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!validateRequest(req)) {
      throw new ForbiddenException('Invalid csrf token');
    }

    return true;
  }
}
