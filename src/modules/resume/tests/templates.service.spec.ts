import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  CreateResumeTemplateDto,
  UpdateResumeTemplateDto,
} from '../dto/resume-template.dto';
import { ResumeTemplateEntity } from '../entities/resume-template.entity';
import { ResumeTemplatesService } from '../services/templates.service';

const allTemplatesMock = [
  {
    id: '1',
    templateName: 'Template 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    templateName: 'Template 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as ResumeTemplateEntity[];

const createDtoMock: CreateResumeTemplateDto = {
  templateName: 'new template',
};

const updateDtoMock: UpdateResumeTemplateDto = {
  templateName: 'Updated Template',
};

const createdTemplateMock = {
  id: '3',
  templateName: createDtoMock.templateName,
  createdAt: new Date(),
  updatedAt: new Date(),
} as ResumeTemplateEntity;

const repoMock = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
};

describe('ResumeTemplatesService', () => {
  let service: ResumeTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeTemplatesService,
        {
          provide: getRepositoryToken(ResumeTemplateEntity),
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get(ResumeTemplatesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAllTemplates: should return all templates', async () => {
    repoMock.find.mockResolvedValue(allTemplatesMock);
    const result = await service.findAllTemplates();
    expect(result).toEqual(allTemplatesMock);
  });

  it('findTemplateById: should return a template', async () => {
    const template = allTemplatesMock[0];
    repoMock.findOneBy.mockResolvedValue(template);

    const result = await service.findTemplateById(template.id);

    expect(result).toEqual(template);
    expect(repoMock.findOneBy).toHaveBeenCalledWith({ id: template.id });
  });

  it('findTemplateById: should throw NotFoundException', async () => {
    repoMock.findOneBy.mockResolvedValue(undefined);

    await expect(service.findTemplateById('42')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('createTemplate: should create a new template', async () => {
    repoMock.findOneBy.mockResolvedValue(undefined);
    repoMock.create.mockResolvedValue(createdTemplateMock);
    repoMock.save.mockResolvedValue(createdTemplateMock);

    const result = await service.createTemplate(createDtoMock);

    expect(result).toEqual(createdTemplateMock);
  });

  it('createTemplate: should throw ConflictException', async () => {
    repoMock.findOneBy.mockResolvedValue(createDtoMock);

    await expect(service.createTemplate(createDtoMock)).rejects.toThrow(
      ConflictException,
    );
  });

  it('updateTemplate: should update a template', async () => {
    const existingTemplate = allTemplatesMock[0];
    const updatedTemplate = { ...existingTemplate, ...updateDtoMock };

    repoMock.findOneBy.mockResolvedValue(existingTemplate);
    repoMock.merge.mockImplementation((target: object, source: object) =>
      Object.assign(target, source),
    );
    repoMock.save.mockResolvedValue(updatedTemplate);

    const result = await service.updateTemplate(
      existingTemplate.id,
      updateDtoMock,
    );

    expect(result).toEqual(updatedTemplate);
  });

  it('updateTemplate: should throw NotFoundException', async () => {
    repoMock.findOneBy.mockResolvedValue(undefined);

    await expect(service.updateTemplate('42', updateDtoMock)).rejects.toThrow(
      NotFoundException,
    );
  });
});
