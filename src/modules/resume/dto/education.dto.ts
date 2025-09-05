import { OmitType } from '@nestjs/mapped-types';
import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class EducationDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  school: string;

  @IsString()
  @MaxLength(100)
  degree: string;

  @IsString()
  @MaxLength(168)
  city: string;

  @IsString()
  @MaxLength(100)
  startEndDate: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class CreateEducationDto extends OmitType(EducationDto, [
  'id',
  'resumeId',
]) {}

export class UpdateEducationDto extends OmitType(EducationDto, ['resumeId']) {}
