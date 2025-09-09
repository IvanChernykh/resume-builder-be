import { Test, TestingModule } from '@nestjs/testing';

import { ResumeTemplatesController } from '../controllers/templates.controller';
import { CreateResumeTemplateDto } from '../dto/resume-template.dto';
import { ResumeTemplatesService } from '../services/templates.service';

const templateIdMock = 'this is template id';

const createOrUpdateDtoMock: CreateResumeTemplateDto = {
  templateName: 'mock template 1',
};

const templatesServiceMock = {
  findAllTemplates: jest.fn(),
  createTemplate: jest.fn(),
  updateTemplate: jest.fn(),
  deleteTemplate: jest.fn(),
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
    await controller.findAllResumeTemplates();

    expect(templatesServiceMock.findAllTemplates).toHaveBeenCalled();
  });

  it('should create template', async () => {
    await controller.createResumeTemplate(createOrUpdateDtoMock);

    expect(templatesServiceMock.createTemplate).toHaveBeenCalled();
  });

  it('should update template', async () => {
    await controller.updateResumeTemplate(
      templateIdMock,
      createOrUpdateDtoMock,
    );

    expect(templatesServiceMock.updateTemplate).toHaveBeenCalled();
  });

  it('should delete template', async () => {
    await controller.deleteResumeTemplate(templateIdMock);

    expect(templatesServiceMock.deleteTemplate).toHaveBeenCalled();
  });
});
