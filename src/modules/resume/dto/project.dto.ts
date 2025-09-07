import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

@ApiProperties()
export class ProjectDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  linkToRepo: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateProjectDto {
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

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateProjectDto {
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

  @IsInt()
  @Min(0)
  sortOrder: number;
}
