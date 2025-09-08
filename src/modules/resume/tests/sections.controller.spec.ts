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
  createSections: jest.fn().mockResolvedValue(resumeDtoMock),
  updateSections: jest.fn().mockResolvedValue(resumeDtoMock),
  deleteSections: jest.fn().mockResolvedValue(resumeDtoMock),
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
    const result = await controller.createResumeSections(
      userDtoMock,
      createSectionsDtoMock,
    );

    expect(result).toEqual(resumeDtoMock);
  });

  it('should update sections', async () => {
    const result = await controller.updateResumeSections(
      userDtoMock,
      updateSectionsDtoMock,
    );

    expect(result).toEqual(resumeDtoMock);
  });

  it('should delete sections', async () => {
    const result = await controller.deleteResumeSection(
      userDtoMock,
      deleteSectionsDtoMock,
    );

    expect(result).toEqual(resumeDtoMock);
  });
});
