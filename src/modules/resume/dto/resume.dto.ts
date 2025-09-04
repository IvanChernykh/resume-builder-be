import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
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
  id: string;

  @IsString()
  @MaxLength(60)
  resumeName: string;

  @IsString()
  @MaxLength(100)
  jobTitle: string;

  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @Length(4, 20)
  phone: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  summary: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  photoUrl: string | null;

  @IsString()
  @IsUUID()
  ownerId: string;

  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  workExperience: WorkExperienceDto[];

  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects: ProjectDto[];

  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  links: LinkDto[];

  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages: LanguageDto[];

  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses: CourseDto[];

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}
