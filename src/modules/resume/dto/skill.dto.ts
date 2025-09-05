import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class SkillDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  level: number;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class CreateSkillDto extends OmitType(SkillDto, ['id', 'resumeId']) {}

export class UpdateSkillDto extends OmitType(SkillDto, ['resumeId']) {}
