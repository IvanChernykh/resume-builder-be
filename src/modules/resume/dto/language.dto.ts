import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class LanguageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateLanguageDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(50)
  level: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateLanguageDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(50)
  level: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
