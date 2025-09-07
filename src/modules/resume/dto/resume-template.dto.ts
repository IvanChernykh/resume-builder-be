import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { ApiProperties } from 'src/common/decorators/api-properties.decorator';

export class ResumeTemplateDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  templateName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

@ApiProperties()
export class CreateResumeTemplateDto {
  @IsString()
  @Length(5, 100)
  templateName: string;
}

@ApiProperties()
export class UpdateResumeTemplateDto extends CreateResumeTemplateDto {}
