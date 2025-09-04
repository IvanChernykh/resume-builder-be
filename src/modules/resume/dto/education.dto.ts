import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class EducationDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  school: string;

  @IsString()
  degree: string;

  @IsString()
  city: string;

  @IsString()
  startEndDate: string;

  @IsString()
  description: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
