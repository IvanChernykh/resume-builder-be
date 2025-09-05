import { OmitType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CourseDto } from './course.dto';
import { EducationDto } from './education.dto';
import { LanguageDto } from './language.dto';
import { LinkDto } from './link.dto';
import { ProjectDto } from './project.dto';
import { SkillDto } from './skill.dto';
import { WorkExperienceDto } from './work-experience.dto';

export class ResumeDto {
  @IsString()
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @MaxLength(60)
  @Expose()
  resumeName: string;

  @IsString()
  @MaxLength(100)
  @Expose()
  jobTitle: string;

  @IsString()
  @MaxLength(50)
  @Expose()
  firstName: string;

  @IsString()
  @MaxLength(50)
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  email: string;

  @IsString()
  @MaxLength(20)
  @Expose()
  phone: string;

  @IsString()
  @MaxLength(100)
  @Expose()
  country: string;

  @IsString()
  @MaxLength(168)
  @Expose()
  city: string;

  @IsString()
  @MaxLength(500)
  @Expose()
  summary: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Expose()
  photoUrl: string;

  @IsString()
  @IsUUID()
  @Expose()
  ownerId: string;

  @IsString()
  @IsUUID()
  @Expose()
  templateId: string;

  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  @Expose()
  workExperience: WorkExperienceDto[];

  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  @Expose()
  education: EducationDto[];

  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  @Expose()
  projects: ProjectDto[];

  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  @Expose()
  links: LinkDto[];

  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  @Expose()
  skills: SkillDto[];

  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  @Expose()
  languages: LanguageDto[];

  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  @Expose()
  courses: CourseDto[];

  @IsString()
  @Expose()
  createdAt: Date;

  @IsString()
  @Expose()
  updatedAt: Date;
}

export class CreateResumeDto {
  @IsString()
  @MaxLength(60)
  resumeName: string;

  @IsString()
  @IsUUID()
  templateId: string;
}

export class UpdateResumeDto extends OmitType(ResumeDto, [
  'id',
  'ownerId',
  'photoUrl',
  'createdAt',
  'updatedAt',
  'workExperience',
  'education',
  'projects',
  'links',
  'skills',
  'languages',
  'courses',
]) {}
