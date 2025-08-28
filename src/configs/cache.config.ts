import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';

export const cacheConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      stores: [
        new Keyv({
          store: new CacheableMemory({ ttl: '7d', lruSize: 5000 }),
        }),
        createKeyv(
          `redis://:${configService.get<string>('REDIS_PASSWORD')}@redis:${configService.get<number>('REDIS_PORT')}`,
        ),
      ],
    };
  },
};
