import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CourseDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  course: string;

  @IsString()
  institution: string;

  @IsString()
  startEndDate: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
