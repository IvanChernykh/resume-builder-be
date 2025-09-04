import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseEntity } from './entities/course.entity';
import { EducationEnity } from './entities/education.entity';
import { LanguageEntity } from './entities/language.entity';
import { LinkEntity } from './entities/link.entity';
import { ProjectEntity } from './entities/project.entity';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';
import { SkillEntity } from './entities/skill.entity';
import { WorkExperienceEnity } from './entities/work-experience.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResumeEntity,
      ResumeTemplateEntity,
      WorkExperienceEnity,
      EducationEnity,
      ProjectEntity,
      LinkEntity,
      CourseEntity,
      LanguageEntity,
      SkillEntity,
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
