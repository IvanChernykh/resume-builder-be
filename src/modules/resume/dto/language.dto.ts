import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class LanguageDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  level: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
