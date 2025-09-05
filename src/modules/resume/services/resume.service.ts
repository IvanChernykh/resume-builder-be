import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { ResumeTemplatesService } from './templates.service';
import { UsersService } from '../../users/users.service';
import { CreateResumeDto, ResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeEntity } from '../entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    private readonly usersService: UsersService,
    private readonly templatesService: ResumeTemplatesService,

    @InjectRepository(ResumeEntity)
    private readonly resumeRepo: Repository<ResumeEntity>,
  ) {}

  async findAllUserResumes(userId: string) {
    return await this.resumeRepo.findBy({ ownerId: userId });
  }

  async findResumeById(id: string, ownerId: string): Promise<ResumeEntity> {
    const resume = await this.resumeRepo.findOne({
      where: { id, ownerId },
      relations: {
        workExperience: true,
        education: true,
        projects: true,
        courses: true,
        links: true,
        skills: true,
        languages: true,
      },
    });

    if (!resume) {
      throw new NotFoundException();
    }

    return resume;
  }

  async createResume(dto: CreateResumeDto, userId: string): Promise<ResumeDto> {
    const user = await this.usersService.findById(userId);
    const template = await this.templatesService.findTemplateById(
      dto.templateId,
    );

    const resume = this.resumeRepo.create({
      ...dto,
      owner: user!,
      template: template,
      workExperience: [],
      education: [],
      projects: [],
      courses: [],
      links: [],
      skills: [],
      languages: [],
    });

    await this.resumeRepo.save(resume);

    const response = plainToInstance(ResumeDto, resume, {
      excludeExtraneousValues: true,
    });

    return response;
  }

  async updateResume(resumeId: string, userId: string, dto: UpdateResumeDto) {
    const resume = await this.findResumeById(resumeId, userId);

    this.resumeRepo.merge(resume, dto);

    return await this.resumeRepo.save(resume);
  }

  async deleteResume(resumeId: string, userId: string) {
    return await this.resumeRepo.delete({ id: resumeId, ownerId: userId });
  }
}
