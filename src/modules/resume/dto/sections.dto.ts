import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';
import { CreateLanguageDto, UpdateLanguageDto } from './language.dto';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { CreateSkillDto, UpdateSkillDto } from './skill.dto';
import {
  CreateWorkExperienceDto,
  UpdateWorkExperienceDto,
} from './work-experience.dto';

export class DeleteSectionsDto {
  @IsUUID()
  resumeId: string;

  @IsOptional()
  @IsString({ each: true })
  workExperience?: string[];

  @IsOptional()
  @IsString({ each: true })
  education?: string[];

  @IsOptional()
  @IsString({ each: true })
  projects?: string[];

  @IsOptional()
  @IsString({ each: true })
  links?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => String)
  skills?: string[];

  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsString({ each: true })
  courses?: string[];
}

export class CreateSectionsDto {
  @IsUUID()
  resumeId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkExperienceDto)
  workExperience?: CreateWorkExperienceDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  education?: CreateEducationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  links?: CreateLinkDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  skills?: CreateSkillDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languages?: CreateLanguageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseDto)
  courses?: CreateCourseDto[];
}

export class UpdateSectionsDto {
  @IsUUID()
  resumeId: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateWorkExperienceDto)
  workExperience?: UpdateWorkExperienceDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateEducationDto)
  education?: UpdateEducationDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateProjectDto)
  projects?: UpdateProjectDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateLinkDto)
  links?: UpdateLinkDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateSkillDto)
  skills?: UpdateSkillDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateLanguageDto)
  languages?: UpdateLanguageDto[];

  @ValidateNested({ each: true })
  @Type(() => UpdateCourseDto)
  courses?: UpdateCourseDto[];
}
