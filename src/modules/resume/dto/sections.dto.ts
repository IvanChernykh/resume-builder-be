import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

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

@ApiProperties()
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
  @IsString({ each: true })
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
  @ApiProperty()
  resumeId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkExperienceDto)
  @ApiPropertyOptional({ type: [CreateWorkExperienceDto] })
  workExperience?: CreateWorkExperienceDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  @ApiPropertyOptional({ type: [CreateEducationDto] })
  education?: CreateEducationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  @ApiPropertyOptional({ type: [CreateProjectDto] })
  projects?: CreateProjectDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLinkDto)
  @ApiPropertyOptional({ type: [CreateLinkDto] })
  links?: CreateLinkDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  @ApiPropertyOptional({ type: [CreateSkillDto] })
  skills?: CreateSkillDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  @ApiPropertyOptional({ type: [CreateLanguageDto] })
  languages?: CreateLanguageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseDto)
  @ApiPropertyOptional({ type: [CreateCourseDto] })
  courses?: CreateCourseDto[];
}

export class UpdateSectionsDto {
  @IsUUID()
  @ApiProperty()
  resumeId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkExperienceDto)
  @ApiPropertyOptional({ type: [UpdateWorkExperienceDto] })
  workExperience?: UpdateWorkExperienceDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateEducationDto)
  @ApiPropertyOptional({ type: [UpdateEducationDto] })
  education?: UpdateEducationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateProjectDto)
  @ApiPropertyOptional({ type: [UpdateProjectDto] })
  projects?: UpdateProjectDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateLinkDto)
  @ApiPropertyOptional({ type: [UpdateLinkDto] })
  links?: UpdateLinkDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateSkillDto)
  @ApiPropertyOptional({ type: [UpdateSkillDto] })
  skills?: UpdateSkillDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateLanguageDto)
  @ApiPropertyOptional({ type: [UpdateLanguageDto] })
  languages?: UpdateLanguageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateCourseDto)
  @ApiPropertyOptional({ type: [UpdateCourseDto] })
  courses?: UpdateCourseDto[];
}
