import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { API_BEARER_AUTH_KEY } from 'src/common/constants/swagger.constants';
import { UserDto } from 'src/modules/users/dto/user.dto';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import { ResumeDto } from '../dto/resume.dto';
import {
  CreateSectionsDto,
  DeleteSectionsDto,
  UpdateSectionsDto,
} from '../dto/sections.dto';
import { ResumeSectionsService } from '../services/sections.service';

@Controller('resume/sections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(API_BEARER_AUTH_KEY)
export class ResumeSectionsController {
  constructor(private readonly sectionsService: ResumeSectionsService) {}

  @Post()
  @ApiOkResponse({ type: ResumeDto })
  async createResumeSections(
    @CurrentUser() user: UserDto,
    @Body() dto: CreateSectionsDto,
  ) {
    return this.sectionsService.createSections(dto, user.id);
  }

  @Patch()
  @ApiOkResponse({ type: ResumeDto })
  async updateResumeSections(
    @CurrentUser() user: UserDto,
    @Body() dto: UpdateSectionsDto,
  ) {
    return this.sectionsService.updateSections(dto, user.id);
  }

  @Delete()
  async deleteResumeSection(
    @CurrentUser() user: UserDto,
    @Body() dto: DeleteSectionsDto,
  ) {
    return this.sectionsService.deleteSections(dto, user.id);
  }
}
