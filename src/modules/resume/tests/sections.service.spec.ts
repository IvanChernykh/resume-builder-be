import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In } from 'typeorm';

import {
  CreateSectionsDto,
  UpdateSectionsDto,
  DeleteSectionsDto,
} from '../dto/sections.dto';
import { UpdateWorkExperienceDto } from '../dto/work-experience.dto';
import { CourseEntity } from '../entities/course.entity';
import { EducationEnity } from '../entities/education.entity';
import { LanguageEntity } from '../entities/language.entity';
import { LinkEntity } from '../entities/link.entity';
import { ProjectEntity } from '../entities/project.entity';
import { ResumeEntity } from '../entities/resume.entity';
import { SkillEntity } from '../entities/skill.entity';
import { WorkExperienceEnity } from '../entities/work-experience.entity';
import { ResumeService } from '../services/resume.service';
import { ResumeSectionsService } from '../services/sections.service';

const resumeMock: ResumeEntity = {
  id: 'resume1',
  ownerId: 'user1',
} as ResumeEntity;

const createSectionsDto: CreateSectionsDto = {
  resumeId: 'resume1',
  workExperience: [{ employer: 'Company A' } as UpdateWorkExperienceDto],
  education: [],
  projects: [],
  links: [],
  skills: [],
  languages: [],
  courses: [],
};

const updateSectionsDto: UpdateSectionsDto = {
  resumeId: 'resume1',
  workExperience: [
    { id: '1', employer: 'Updated Company' } as UpdateWorkExperienceDto,
  ],
  education: [],
  projects: [],
  links: [],
  skills: [],
  languages: [],
  courses: [],
};

const deleteSectionsDto: DeleteSectionsDto = {
  resumeId: 'resume1',
  workExperience: ['1', '2'],
  education: [],
  projects: [],
  links: [],
  skills: [],
  languages: [],
  courses: [],
};

const createRepoMock = () => ({
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('ResumeSectionsService', () => {
  let service: ResumeSectionsService;
  let resumeServiceMock: { findResumeById: jest.Mock };

  let workExpRepo: ReturnType<typeof createRepoMock>;

  beforeEach(async () => {
    resumeServiceMock = {
      findResumeById: jest.fn().mockResolvedValue(resumeMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeSectionsService,
        { provide: ResumeService, useValue: resumeServiceMock },
        {
          provide: getRepositoryToken(WorkExperienceEnity),
          useFactory: createRepoMock,
        },
        {
          provide: getRepositoryToken(EducationEnity),
          useFactory: createRepoMock,
        },
        {
          provide: getRepositoryToken(ProjectEntity),
          useFactory: createRepoMock,
        },
        { provide: getRepositoryToken(LinkEntity), useFactory: createRepoMock },
        {
          provide: getRepositoryToken(SkillEntity),
          useFactory: createRepoMock,
        },
        {
          provide: getRepositoryToken(LanguageEntity),
          useFactory: createRepoMock,
        },
        {
          provide: getRepositoryToken(CourseEntity),
          useFactory: createRepoMock,
        },
      ],
    }).compile();

    service = module.get(ResumeSectionsService);
    workExpRepo = module.get(getRepositoryToken(WorkExperienceEnity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createSections: should create sections and return updated resume', async () => {
    const entityMock = { employer: 'Company A', resume: resumeMock };
    workExpRepo.create.mockReturnValue(entityMock as any);
    workExpRepo.save.mockResolvedValue(entityMock as any);

    const result = await service.createSections(createSectionsDto, 'user1');

    expect(resumeServiceMock.findResumeById).toHaveBeenCalledWith(
      'resume1',
      'user1',
    );
    expect(workExpRepo.create).toHaveBeenCalledWith({ employer: 'Company A' });
    expect(workExpRepo.save).toHaveBeenCalledWith(entityMock);
    expect(result).toEqual(resumeMock);
  });

  it('updateSections: should update existing sections', async () => {
    workExpRepo.update.mockResolvedValue({ affected: 1 } as any);

    const result = await service.updateSections(updateSectionsDto, 'user1');

    expect(resumeServiceMock.findResumeById).toHaveBeenCalledWith(
      'resume1',
      'user1',
    );
    expect(workExpRepo.update).toHaveBeenCalledWith(
      { id: '1', resumeId: 'resume1' },
      { employer: 'Updated Company' },
    );
    expect(result).toEqual(resumeMock);
  });

  it('deleteSections: should delete sections if they exist', async () => {
    const recordsMock = [{ id: '1' }, { id: '2' }];
    workExpRepo.find.mockResolvedValue(recordsMock as any);
    workExpRepo.remove.mockResolvedValue(recordsMock as any);

    await service.deleteSections(deleteSectionsDto, 'user1');

    expect(resumeServiceMock.findResumeById).toHaveBeenCalledWith(
      'resume1',
      'user1',
    );
    expect(workExpRepo.find).toHaveBeenCalledWith({
      where: { resumeId: 'resume1', id: In(['1', '2']) },
    });
    expect(workExpRepo.remove).toHaveBeenCalledWith(recordsMock);
  });

  it('deleteSections: should skip remove if no records found', async () => {
    workExpRepo.find.mockResolvedValue([]);

    await service.deleteSections(deleteSectionsDto, 'user1');

    expect(workExpRepo.remove).not.toHaveBeenCalled();
  });
});
