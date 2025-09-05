import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class LinkDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

export class CreateLinkDto extends OmitType(LinkDto, ['id', 'resumeId']) {}

export class UpdateLinkDto extends OmitType(LinkDto, ['resumeId']) {}
