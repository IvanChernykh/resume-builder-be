import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { S3Service } from 'src/modules/s3/s3.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

import { userDtoMock } from './mocks';
import { UsersService } from '../../users/users.service';
import { CreateResumeDto, ResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeTemplateEntity } from '../entities/resume-template.entity';
import { ResumeEntity } from '../entities/resume.entity';
import { ResumeService } from '../services/resume.service';
import { ResumeTemplatesService } from '../services/templates.service';

const resumeMocks = [
  {
    id: '1',
    ownerId: 'user1',
    templateId: 'template1',
    resumeName: 'My Resume',
    jobTitle: 'Developer',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123456789',
    country: 'USA',
    city: 'New York',
    summary: 'Some summary',
    photoUrl: '',
    workExperience: [],
    education: [],
    projects: [],
    courses: [],
    links: [],
    skills: [],
    languages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    template: {} as ResumeTemplateEntity,
    owner: {} as UserEntity,
  },
  {
    id: '2',
    ownerId: 'user1',
    templateId: 'template2',
    resumeName: 'Another Resume',
    jobTitle: 'Designer',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '987654321',
    country: 'USA',
    city: 'Boston',
    summary: 'Another summary',
    photoUrl: '',
    workExperience: [],
    education: [],
    projects: [],
    courses: [],
    links: [],
    skills: [],
    languages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    template: {} as ResumeTemplateEntity,
    owner: {} as UserEntity,
  },
] as ResumeEntity[];

const createDtoMock: CreateResumeDto = {
  resumeName: 'New Resume',
  templateId: 'template1',
};

const updateDtoMock: UpdateResumeDto = {
  resumeName: 'Updated Resume',
  jobTitle: 'asd',
  firstName: 'asd',
  lastName: 'asd',
  email: 'john@example.com',
  phone: 'asd',
  country: 'asd',
  city: 'asd',
  summary: 'Updated summary',
  templateId: createDtoMock.templateId,
};

const templateMock = { id: 'template1', templateName: 'Template 1' };

const resumeRepoMock = {
  findBy: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
};

const usersServiceMock = {
  findById: jest.fn(),
};

const templatesServiceMock = {
  findTemplateById: jest.fn(),
};

const s3ServiceMock = {
  upload: jest.fn(),
  delete: jest.fn(),
};

describe('ResumeService', () => {
  let service: ResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: getRepositoryToken(ResumeEntity),
          useValue: resumeRepoMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: ResumeTemplatesService,
          useValue: templatesServiceMock,
        },
        { provide: S3Service, useValue: s3ServiceMock },
      ],
    }).compile();

    service = module.get(ResumeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAllUserResumes: should return all resumes for a user', async () => {
    resumeRepoMock.findBy.mockResolvedValue(resumeMocks);

    const result = await service.findAllUserResumes('user1');

    expect(result).toEqual(resumeMocks);
    expect(resumeRepoMock.findBy).toHaveBeenCalledWith({ ownerId: 'user1' });
  });

  it('findResumeById: should return a resume', async () => {
    const resume = resumeMocks[0];
    resumeRepoMock.findOne.mockResolvedValue(resume);

    const result = await service.findResumeById(resume.id, resume.ownerId);

    expect(result).toEqual(resume);
    expect(resumeRepoMock.findOne).toHaveBeenCalledWith({
      where: { id: resume.id, ownerId: resume.ownerId },
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
  });

  it('findResumeById: should throw NotFoundException', async () => {
    resumeRepoMock.findOne.mockResolvedValue(undefined);

    await expect(service.findResumeById('invalid', 'user1')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('createResume: should create and return a resume DTO', async () => {
    usersServiceMock.findById.mockResolvedValue(userDtoMock);
    templatesServiceMock.findTemplateById.mockResolvedValue(templateMock);

    const createdResume = {
      ...createDtoMock,
      templateId: createDtoMock.templateId,
      owner: userDtoMock,
      template: templateMock,
      workExperience: [],
      education: [],
      projects: [],
      courses: [],
      links: [],
      skills: [],
      languages: [],
    } as unknown as ResumeEntity;

    const savedResume = { ...createdResume, id: '3' } as ResumeEntity;

    resumeRepoMock.create.mockReturnValue(createdResume);
    resumeRepoMock.save.mockResolvedValue(savedResume);

    const result = await service.createResume(createDtoMock, userDtoMock.id);

    expect(usersServiceMock.findById).toHaveBeenCalledWith(userDtoMock.id);
    expect(templatesServiceMock.findTemplateById).toHaveBeenCalledWith(
      createDtoMock.templateId,
    );
    expect(resumeRepoMock.create).toHaveBeenCalledWith(
      expect.objectContaining(createDtoMock),
    );
    expect(resumeRepoMock.save).toHaveBeenCalledWith(createdResume);
    expect(result).toBeInstanceOf(ResumeDto);
    expect(result).toEqual(
      expect.objectContaining({ resumeName: createDtoMock.resumeName }),
    );
  });

  it('updateResume: should update a resume', async () => {
    const existingResume = resumeMocks[0];
    const updatedResume = { ...existingResume, ...updateDtoMock };

    jest.spyOn(service, 'findResumeById').mockResolvedValue(existingResume);

    resumeRepoMock.merge.mockImplementation((target: object, source: object) =>
      Object.assign(target, source),
    );
    resumeRepoMock.save.mockResolvedValue(updatedResume);

    const result = await service.updateResume(
      existingResume.id,
      existingResume.ownerId,
      updateDtoMock,
    );

    expect(resumeRepoMock.merge).toHaveBeenCalledWith(
      existingResume,
      updateDtoMock,
    );
    expect(resumeRepoMock.save).toHaveBeenCalledWith(updatedResume);
    expect(result).toEqual(updatedResume);
  });

  it('deleteResume: should delete a resume', async () => {
    resumeRepoMock.delete.mockResolvedValue({ affected: 1 });

    const result = await service.deleteResume('1', 'user1');

    expect(resumeRepoMock.delete).toHaveBeenCalledWith({
      id: '1',
      ownerId: 'user1',
    });
    expect(result).toEqual({ affected: 1 });
  });
});
