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
import { ApiOkResponse } from '@nestjs/swagger';
import { DeleteResultDto } from 'src/common/dto/delete-response.dto';

import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import {
  CreateResumeTemplateDto,
  ResumeTemplateDto,
  UpdateResumeTemplateDto,
} from '../dto/resume-template.dto';
import { ResumeTemplatesService } from '../services/templates.service';

@Controller('resume/templates')
@UseGuards(JwtAuthGuard)
export class ResumeTemplatesController {
  constructor(private readonly templatesService: ResumeTemplatesService) {}

  @Get()
  @ApiOkResponse({ type: ResumeTemplateDto, isArray: true })
  async findAllResumeTemplates() {
    return this.templatesService.findAllTemplates();
  }

  @Post()
  @ApiOkResponse({ type: ResumeTemplateDto })
  async createResumeTemplate(@Body() dto: CreateResumeTemplateDto) {
    return this.templatesService.createTemplate(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResumeTemplateDto })
  async updateResumeTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateResumeTemplateDto,
  ) {
    return this.templatesService.updateTemplate(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ type: DeleteResultDto })
  async deleteResumeTemplate(@Param('id') id: string) {
    return this.templatesService.deleteTemplate(id);
  }
}
