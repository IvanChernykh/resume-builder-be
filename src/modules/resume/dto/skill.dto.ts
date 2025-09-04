import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class SkillDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  level: number | null;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
