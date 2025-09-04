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

import {
  CreateResumeTemplateDto,
  UpdateResumeTemplateDto,
} from './dto/resume-template.dto';
import { CreateResumeDto } from './dto/resume.dto';
import { ResumeService } from './resume.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/Jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';

@Controller('resume')
@UseGuards(JwtAuthGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // -----------------------------------------------------------------------
  // resumes
  // -----------------------------------------------------------------------

  @Get()
  async findAllUserResumes(@CurrentUser() user: UserDto) {
    return this.resumeService.findAllResumes(user.id);
  }

  @Get(':id')
  async findUserResumeById(
    @CurrentUser() user: UserDto,
    @Param('id') resumerId: string,
  ) {
    return this.resumeService.findResumeById(resumerId, user.id);
  }

  @Post()
  async createResume(
    @Body() dto: CreateResumeDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.resumeService.createResume(dto, user.id);
  }

  // -----------------------------------------------------------------------
  // templates
  // -----------------------------------------------------------------------

  @Get('templates')
  async findAllResumeTemplates() {
    return this.resumeService.findAllTemplates();
  }

  @Post('templates')
  async createResumeTemplate(@Body() dto: CreateResumeTemplateDto) {
    return this.resumeService.createTemplate(dto);
  }

  @Patch('templates/:id')
  async updateResumeTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateResumeTemplateDto,
  ) {
    return this.resumeService.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteResumeTemplate(@Param('id') id: string) {
    return this.resumeService.deleteTemplate(id);
  }
}
