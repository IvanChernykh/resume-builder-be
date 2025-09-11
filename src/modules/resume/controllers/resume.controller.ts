import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { API_BEARER_AUTH_KEY } from 'src/common/constants/swagger.constants';
import { DeleteResultDto } from 'src/common/dto/delete-response.dto';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import { UserDto } from '../../users/dto/user.dto';
import { CreateResumeDto, ResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeService } from '../services/resume.service';

@Controller('resume')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(API_BEARER_AUTH_KEY)
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

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 10 },
      fileFilter: (_, file, callback) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/webp'
        ) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Only .jpg, .png, .webp files are allowed!',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserDto,
    @Param('id') resumeId: string,
  ) {
    return this.resumeService.uploadPhoto(resumeId, user.id, file);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResumeDto })
  async updateResume(
    @Param('id') resumeId: string,
    @CurrentUser() user: UserDto,
    @Body() dto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(resumeId, user.id, dto);
  }

  @Delete(':id/photo')
  @ApiOkResponse({ type: Boolean })
  async deletePhoto(
    @Param('id') resumeId: string,
    @CurrentUser() user: UserDto,
  ) {
    return this.resumeService.deletePhoto(resumeId, user.id);
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
