import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

import { CourseDto } from './course.dto';
import { EducationDto } from './education.dto';
import { LanguageDto } from './language.dto';
import { LinkDto } from './link.dto';
import { ProjectDto } from './project.dto';
import { SkillDto } from './skill.dto';
import { WorkExperienceDto } from './work-experience.dto';

export class ResumeDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  resumeName: string;

  @Expose()
  @ApiProperty()
  jobTitle: string;

  @Expose()
  @ApiProperty()
  firstName: string;

  @Expose()
  @ApiProperty()
  lastName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  country: string;

  @Expose()
  @ApiProperty()
  city: string;

  @Expose()
  @ApiProperty()
  summary: string;

  @Expose()
  @ApiProperty()
  photoUrl: string;

  @Expose()
  @ApiProperty()
  ownerId: string;

  @Expose()
  @ApiProperty()
  templateId: string;

  @Expose()
  @ApiProperty({ type: [WorkExperienceDto] })
  workExperience: WorkExperienceDto[];

  @Expose()
  @ApiProperty({ type: [EducationDto] })
  education: EducationDto[];

  @Expose()
  @ApiProperty({ type: [ProjectDto] })
  projects: ProjectDto[];

  @Expose()
  @ApiProperty({ type: [LinkDto] })
  links: LinkDto[];

  @Expose()
  @ApiProperty({ type: [SkillDto] })
  skills: SkillDto[];

  @Expose()
  @ApiProperty({ type: [LanguageDto] })
  languages: LanguageDto[];

  @Expose()
  @ApiProperty({ type: [CourseDto] })
  courses: CourseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

@ApiProperties()
export class CreateResumeDto {
  @IsString()
  @MaxLength(60)
  resumeName: string;

  @IsString()
  @IsUUID()
  templateId: string;
}

@ApiProperties()
export class UpdateResumeDto {
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

  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MaxLength(100)
  country: string;

  @IsString()
  @MaxLength(168)
  city: string;

  @IsString()
  @MaxLength(500)
  summary: string;

  @IsString()
  @IsUUID()
  templateId: string;
}
