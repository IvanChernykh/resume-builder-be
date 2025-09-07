import { DocumentBuilder } from '@nestjs/swagger';
import { API_BEARER_AUTH_KEY } from 'src/common/constants/swagger.constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Resume Builder API')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    API_BEARER_AUTH_KEY,
  )
  .build();
