import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import {
  CreateResumeTemplateDto,
  UpdateResumeTemplateDto,
} from './dto/resume-template.dto';
import { CreateResumeDto, ResumeDto } from './dto/resume.dto';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ResumeService {
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(ResumeEntity)
    private readonly resumeRepo: Repository<ResumeEntity>,

    @InjectRepository(ResumeTemplateEntity)
    private readonly resumeTemplateRepo: Repository<ResumeTemplateEntity>,
  ) {}

  // -----------------------------------------------------------------------
  // templates
  // -----------------------------------------------------------------------

  async findAllTemplates() {
    return await this.resumeTemplateRepo.find();
  }

  async findTemplateById(id: string) {
    const template = await this.resumeTemplateRepo.findOneBy({ id });

    if (!template) {
      throw new NotFoundException('Template was not found');
    }

    return template;
  }

  async createTemplate({ templateName }: CreateResumeTemplateDto) {
    const isExisting = await this.resumeTemplateRepo.findOneBy({
      templateName,
    });

    if (isExisting) {
      throw new ConflictException(
        `Template with name ${templateName} already exists`,
      );
    }

    const template = this.resumeTemplateRepo.create({ templateName });

    return this.resumeTemplateRepo.save(template);
  }

  async updateTemplate(id: string, dto: UpdateResumeTemplateDto) {
    const template = await this.findTemplateById(id);

    this.resumeTemplateRepo.merge(template, dto);

    return await this.resumeTemplateRepo.save(template);
  }

  async deleteTemplate(id: string) {
    await this.resumeTemplateRepo.delete({ id });
  }

  // -----------------------------------------------------------------------
  // resumes
  // -----------------------------------------------------------------------

  async findAllResumes(userId: string) {
    return await this.resumeRepo.findBy({ ownerId: userId });
  }

  async findResumeById(id: string, ownerId: string) {
    const resume = await this.resumeRepo.findOneBy({ id, ownerId });

    if (!resume) {
      throw new NotFoundException();
    }

    return resume;
  }

  async createResume(dto: CreateResumeDto, userId: string): Promise<ResumeDto> {
    const user = await this.usersService.findById(userId);
    const template = await this.findTemplateById(dto.templateId);

    const resume = this.resumeRepo.create({
      ...dto,
      owner: user!,
      template: template,
      // workExperience: [],
      // education: [],
      // projects: [],
      // courses: [],
      // links: [],
      // skills: [],
      // languages: [],
    });

    await this.resumeRepo.save(resume);

    const response = plainToInstance(ResumeDto, resume, {
      excludeExtraneousValues: true,
    });
    return response;
  }

  // async updateResume(resumeId: string, userId: string) {}

  async deleteResume(resumeId: string, userId: string) {
    return await this.resumeRepo.delete({ id: resumeId, ownerId: userId });
  }
}
