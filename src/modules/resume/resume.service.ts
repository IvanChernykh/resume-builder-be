import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateResumeTemplateDto,
  UpdateResumeTemplateDto,
} from './dto/resume-template.dto';
import { ResumeTemplateEntity } from './entities/resume-template.entity';
import { ResumeEntity } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
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
      throw new NotFoundException();
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

  async findResumeById(id: string) {
    return await this.resumeRepo.findOneBy({ id });
  }

  async createResume() {}

  async updateResume(resumeId: string) {}

  async deleteResume(resumeId: string) {}
}
