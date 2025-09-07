import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class SkillDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateSkillDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  level: number;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateSkillDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  level: number;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
