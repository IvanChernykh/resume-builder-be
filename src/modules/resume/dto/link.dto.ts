import {
  IsInt,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class LinkDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsString()
  @IsUUID()
  resumeId: string;

  @IsInt()
  @Min(0)
  sortOrder: number;
}
