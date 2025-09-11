import { ForbiddenException } from '@nestjs/common';
import { doubleCsrf } from 'csrf-csrf';
import { Request } from 'express';

export const { generateCsrfToken, validateRequest } = doubleCsrf({
  cookieName: '__Host-x-csrf-token',
  cookieOptions: {
    sameSite: 'none',
  },
  getSecret: () => process.env.CSRF_SECRET!,
  getCsrfTokenFromRequest: (req: Request) => req.headers['x-csrf-token'],
  getSessionIdentifier: (req: Request) => {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new ForbiddenException();
    }

    return refreshToken;
  },
});
