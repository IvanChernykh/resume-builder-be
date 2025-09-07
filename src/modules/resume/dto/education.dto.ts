import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

@ApiProperties()
export class EducationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  degree: string;

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
export class CreateEducationDto {
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

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateEducationDto {
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

  @IsInt()
  @Min(0)
  sortOrder: number;
}
