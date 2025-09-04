import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';

export class ProjectDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  link: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  linkToRepo: string;

  @IsString()
  description: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
