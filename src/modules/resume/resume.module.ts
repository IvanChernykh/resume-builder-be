import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResumeController } from './controllers/resume.controller';
import { ResumeSectionsController } from './controllers/sections.controller';
import { CourseEntity } from './entities/course.entity';
import { EducationEnity } from './entities/education.entity';
import { LanguageEntity } from './entities/language.entity';
import { LinkEntity } from './entities/link.entity';
import { ProjectEntity } from './entities/project.entity';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';
import { WorkExperienceEnity } from './entities/work-experience.entity';
import { ResumeService } from './services/resume.service';
import { UsersModule } from '../users/users.module';
import { ResumeTemplatesController } from './controllers/templates.controller';
import { SkillEntity } from './entities/skill.entity';
import { ResumeSectionsService } from './services/sections.service';
import { ResumeTemplatesService } from './services/templates.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResumeEntity,
      ResumeTemplateEntity,
      WorkExperienceEnity,
      EducationEnity,
      ProjectEntity,
      CourseEntity,
      LinkEntity,
      SkillEntity,
      LanguageEntity,
    ]),
    UsersModule,
  ],
  controllers: [
    ResumeTemplatesController,
    ResumeSectionsController,
    ResumeController,
  ],
  providers: [ResumeService, ResumeTemplatesService, ResumeSectionsService],
})
export class ResumeModule {}
