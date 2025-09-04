import { IsString, Length } from 'class-validator';

export class CreateResumeTemplateDto {
  @IsString()
  @Length(5, 100)
  templateName: string;
}

export class UpdateResumeTemplateDto extends CreateResumeTemplateDto {}
