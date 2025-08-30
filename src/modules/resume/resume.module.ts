import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeEntity, ResumeTemplateEntity])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
