import { Test, TestingModule } from '@nestjs/testing';

import { deleteResultMock } from './mocks';
import { ResumeTemplatesController } from '../controllers/templates.controller';
import { CreateResumeTemplateDto } from '../dto/resume-template.dto';
import { ResumeTemplatesService } from '../services/templates.service';

const resumeTemplateMock = {
  id: crypto.randomUUID(),
  templateName: 'mock template 1',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const createOrUpdateDtoMock: CreateResumeTemplateDto = {
  templateName: 'mock template 1',
};

const templatesServiceMock = {
  findAllTemplates: jest.fn().mockResolvedValue([resumeTemplateMock]),
  createTemplate: jest.fn().mockResolvedValue(resumeTemplateMock),
  updateTemplate: jest.fn().mockResolvedValue(resumeTemplateMock),
  deleteTemplate: jest.fn().mockResolvedValue(deleteResultMock),
};

describe('ResumeTemplatesController', () => {
  let controller: ResumeTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeTemplatesController],
      providers: [
        { provide: ResumeTemplatesService, useValue: templatesServiceMock },
      ],
    }).compile();

    controller = module.get(ResumeTemplatesController);
  });

  it('should find all templates', async () => {
    const result = await controller.findAllResumeTemplates();
    expect(result).toEqual([resumeTemplateMock]);
  });

  it('should create template', async () => {
    const result = await controller.createResumeTemplate(createOrUpdateDtoMock);
    expect(result).toEqual(resumeTemplateMock);
  });

  it('should update template', async () => {
    const result = await controller.updateResumeTemplate(
      resumeTemplateMock.id,
      createOrUpdateDtoMock,
    );

    expect(result).toEqual(resumeTemplateMock);
  });

  it('should delete template', async () => {
    const result = await controller.deleteResumeTemplate(resumeTemplateMock.id);
    expect(result).toEqual(deleteResultMock);
  });
});
