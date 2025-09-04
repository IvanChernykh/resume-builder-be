import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class WorkExperienceDto {
  @IsString()
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

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
