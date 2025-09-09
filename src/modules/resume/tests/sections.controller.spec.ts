import { Test, TestingModule } from '@nestjs/testing';

import { resumeDtoMock, userDtoMock } from './mocks';
import { ResumeSectionsController } from '../controllers/sections.controller';
import {
  CreateSectionsDto,
  DeleteSectionsDto,
  UpdateSectionsDto,
} from '../dto/sections.dto';
import { ResumeSectionsService } from '../services/sections.service';

const createSectionsDtoMock: CreateSectionsDto = {
  resumeId: resumeDtoMock.id,
};

const updateSectionsDtoMock: UpdateSectionsDto = {
  resumeId: resumeDtoMock.id,
};

const deleteSectionsDtoMock: DeleteSectionsDto = {
  resumeId: resumeDtoMock.id,
};

const sectionsServiceMock = {
  createSections: jest.fn(),
  updateSections: jest.fn(),
  deleteSections: jest.fn(),
};

describe('ResumeSectionsController', () => {
  let controller: ResumeSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeSectionsController],
      providers: [
        { provide: ResumeSectionsService, useValue: sectionsServiceMock },
      ],
    }).compile();

    controller = module.get(ResumeSectionsController);
  });

  it('should create sections', async () => {
    await controller.createResumeSections(userDtoMock, createSectionsDtoMock);

    expect(sectionsServiceMock.createSections).toHaveBeenCalled();
  });

  it('should update sections', async () => {
    await controller.updateResumeSections(userDtoMock, updateSectionsDtoMock);

    expect(sectionsServiceMock.updateSections).toHaveBeenCalled();
  });

  it('should delete sections', async () => {
    await controller.deleteResumeSection(userDtoMock, deleteSectionsDtoMock);

    expect(sectionsServiceMock.deleteSections).toHaveBeenCalled();
  });
});
