import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class LinkDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  resumeId: string;

  @ApiProperty()
  sortOrder: number;
}

@ApiProperties()
export class CreateLinkDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}

@ApiProperties()
export class UpdateLinkDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
