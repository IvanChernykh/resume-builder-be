import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class WorkExperienceDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  jobTitle: string;

  @IsString()
  employer: string;

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
