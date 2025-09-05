import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import {
  CreateResumeTemplateDto,
  UpdateResumeTemplateDto,
} from '../dto/resume-template.dto';
import { ResumeTemplatesService } from '../services/templates.service';

@Controller('resume/templates')
@UseGuards(JwtAuthGuard)
export class ResumeTemplatesController {
  constructor(private readonly templatesService: ResumeTemplatesService) {}

  @Get()
  async findAllResumeTemplates() {
    return this.templatesService.findAllTemplates();
  }

  @Post()
  async createResumeTemplate(@Body() dto: CreateResumeTemplateDto) {
    return this.templatesService.createTemplate(dto);
  }

  @Patch(':id')
  async updateResumeTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateResumeTemplateDto,
  ) {
    return this.templatesService.updateTemplate(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteResumeTemplate(@Param('id') id: string) {
    return this.templatesService.deleteTemplate(id);
  }
}
