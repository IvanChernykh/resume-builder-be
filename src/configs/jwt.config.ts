import { type JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  signOptions: {
    algorithm: 'HS512',
  },
};
