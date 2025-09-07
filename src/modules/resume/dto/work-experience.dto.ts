import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class WorkExperienceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  employer: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  startEndDate: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateWorkExperienceDto {
  @IsString()
  @MaxLength(100)
  jobTitle: string;

  @IsString()
  @MaxLength(100)
  employer: string;

  @IsString()
  @MaxLength(168)
  city: string;

  @IsString()
  @MaxLength(100)
  startEndDate: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateWorkExperienceDto {
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  jobTitle: string;

  @IsString()
  @MaxLength(100)
  employer: string;

  @IsString()
  @MaxLength(168)
  city: string;

  @IsString()
  @MaxLength(100)
  startEndDate: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
