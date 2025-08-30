import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cacheConfig } from 'src/configs/cache.config';
import { typeormConfig } from 'src/configs/typeorm.config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ResumeModule } from './resume/resume.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeormConfig),
    CacheModule.registerAsync(cacheConfig),
    AuthModule,
    UsersModule,
    ResumeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
