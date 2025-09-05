import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/modules/users/dto/user.dto';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/Jwt-auth.guard';
import {
  CreateSectionsDto,
  DeleteSectionsDto,
  UpdateSectionsDto,
} from '../dto/sections.dto';
import { ResumeSectionsService } from '../services/sections.service';

@Controller('resume/sections')
@UseGuards(JwtAuthGuard)
export class ResumeSectionsController {
  constructor(private readonly sectionsService: ResumeSectionsService) {}

  @Post()
  async createResumeSections(
    @CurrentUser() user: UserDto,
    @Body() dto: CreateSectionsDto,
  ) {
    return this.sectionsService.createSections(dto, user.id);
  }

  @Patch()
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
