import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResumeController } from './controllers/resume.controller';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';
import { ResumeService } from './services/resume.service';
import { UsersModule } from '../users/users.module';
import { ResumeTemplatesController } from './controllers/templates.controller';
import { ResumeTemplatesService } from './services/templates.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResumeEntity, ResumeTemplateEntity]),
    UsersModule,
  ],
  controllers: [ResumeTemplatesController, ResumeController],
  providers: [ResumeService, ResumeTemplatesService],
})
export class ResumeModule {}
