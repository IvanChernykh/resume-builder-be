import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { ResumeService } from './resume.service';
import {
  CreateSectionsDto,
  DeleteSectionsDto,
  UpdateSectionsDto,
} from '../dto/sections.dto';
import { CourseEntity } from '../entities/course.entity';
import { EducationEnity } from '../entities/education.entity';
import { LanguageEntity } from '../entities/language.entity';
import { LinkEntity } from '../entities/link.entity';
import { ProjectEntity } from '../entities/project.entity';
import { ResumeEntity } from '../entities/resume.entity';
import { SkillEntity } from '../entities/skill.entity';
import { WorkExperienceEnity } from '../entities/work-experience.entity';

@Injectable()
export class ResumeSectionsService {
  constructor(
    private readonly resumeService: ResumeService,

    @InjectRepository(WorkExperienceEnity)
    private readonly workExpRepo: Repository<WorkExperienceEnity>,

    @InjectRepository(EducationEnity)
    private readonly educationRepo: Repository<EducationEnity>,

    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,

    @InjectRepository(LinkEntity)
    private readonly linkRepo: Repository<LinkEntity>,

    @InjectRepository(SkillEntity)
    private readonly skillRepo: Repository<SkillEntity>,

    @InjectRepository(LanguageEntity)
    private readonly languageRepo: Repository<LanguageEntity>,

    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
  ) {}

  async createSections(dto: CreateSectionsDto, userId: string) {
    const resume = await this.resumeService.findResumeById(
      dto.resumeId,
      userId,
    );

    await this.createEntities(this.workExpRepo, resume, dto.workExperience);
    await this.createEntities(this.educationRepo, resume, dto.education);
    await this.createEntities(this.projectRepo, resume, dto.projects);
    await this.createEntities(this.linkRepo, resume, dto.links);
    await this.createEntities(this.skillRepo, resume, dto.skills);
    await this.createEntities(this.languageRepo, resume, dto.languages);
    await this.createEntities(this.courseRepo, resume, dto.courses);

    return await this.resumeService.findResumeById(resume.id, userId);
  }

  private async createEntities<
    T extends { resume?: ResumeEntity; id?: string },
  >(repo: Repository<T>, resume: ResumeEntity, items?: Partial<T>[]) {
    if (!items?.length) return;

    for (const item of items) {
      const { id, ...data } = item;
      const entity = repo.create(data as T);
      entity.resume = resume;
      await repo.save(entity);
    }
  }

  async updateSections(dto: UpdateSectionsDto, userId: string) {
    const resume = await this.resumeService.findResumeById(
      dto.resumeId,
      userId,
    );

    await this.updateEntities(this.workExpRepo, resume.id, dto.workExperience);
    await this.updateEntities(this.educationRepo, resume.id, dto.education);
    await this.updateEntities(this.projectRepo, resume.id, dto.projects);
    await this.updateEntities(this.linkRepo, resume.id, dto.links);
    await this.updateEntities(this.skillRepo, resume.id, dto.skills);
    await this.updateEntities(this.languageRepo, resume.id, dto.languages);
    await this.updateEntities(this.courseRepo, resume.id, dto.courses);

    return await this.resumeService.findResumeById(resume.id, userId);
  }

  private async updateEntities(
    repo: Repository<{ id: string; resumeId: string }>,
    resumeId: string,
    items?: { id: string }[],
  ) {
    if (!items) {
      return;
    }

    for (const item of items) {
      const { id, ...updateData } = item;
      await repo.update({ id, resumeId }, updateData);
    }
  }

  async deleteSections(dto: DeleteSectionsDto, userId: string) {
    const resume = await this.resumeService.findResumeById(
      dto.resumeId,
      userId,
    );

    await Promise.all([
      this.deleteSection(this.workExpRepo, resume.id, dto.workExperience),
      this.deleteSection(this.educationRepo, resume.id, dto.education),
      this.deleteSection(this.projectRepo, resume.id, dto.projects),
      this.deleteSection(this.linkRepo, resume.id, dto.links),
      this.deleteSection(this.skillRepo, resume.id, dto.skills),
      this.deleteSection(this.languageRepo, resume.id, dto.languages),
      this.deleteSection(this.courseRepo, resume.id, dto.courses),
    ]);
  }

  private async deleteSection(
    repo: Repository<{ id: string; resumeId: string }>,
    resumeId: string,
    ids?: string[],
  ) {
    if (!ids?.length) {
      return;
    }

    const records = await repo.find({ where: { resumeId, id: In(ids) } });

    if (records.length > 0) {
      await repo.remove(records);
    }
  }
}
