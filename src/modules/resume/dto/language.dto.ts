import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class LanguageDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(50)
  level: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
