import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class CourseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  course: string;

  @ApiProperty()
  institution: string;

  @ApiProperty()
  startEndDate: string;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateCourseDto {
  @IsString()
  @MaxLength(100)
  course: string;

  @IsString()
  @MaxLength(100)
  institution: string;

  @IsString()
  @MaxLength(100)
  startEndDate: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateCourseDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  course: string;

  @IsString()
  @MaxLength(100)
  institution: string;

  @IsString()
  @MaxLength(100)
  startEndDate: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
