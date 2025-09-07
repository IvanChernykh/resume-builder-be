import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DeleteResultDto } from 'src/common/dto/delete-response.dto';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import { UserDto } from '../../users/dto/user.dto';
import { CreateResumeDto, ResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeService } from '../services/resume.service';

@Controller('resume')
@UseGuards(JwtAuthGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  @ApiOkResponse({ type: ResumeDto, isArray: true })
  async findAllUserResumes(@CurrentUser() user: UserDto) {
    return this.resumeService.findAllUserResumes(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResumeDto })
  async findUserResumeById(
    @CurrentUser() user: UserDto,
    @Param('id') resumerId: string,
  ) {
    return this.resumeService.findResumeById(resumerId, user.id);
  }

  @Post()
  @ApiOkResponse({ type: ResumeDto })
  async createResume(
    @Body() dto: CreateResumeDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.resumeService.createResume(dto, user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResumeDto })
  async updateResume(
    @Param('id') id: string,
    @CurrentUser() user: UserDto,
    @Body() dto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteResultDto })
  async deleteResume(
    @Param('id') resumeId: string,
    @CurrentUser() user: UserDto,
  ) {
    return this.resumeService.deleteResume(resumeId, user.id);
  }
}
