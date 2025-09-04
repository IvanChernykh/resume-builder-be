import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class SkillDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
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
