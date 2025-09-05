import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  linkToRepo: string;

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
