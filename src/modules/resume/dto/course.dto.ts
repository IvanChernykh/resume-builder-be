import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CourseDto {
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

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
