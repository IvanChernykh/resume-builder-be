import { Test, TestingModule } from '@nestjs/testing';

import { userDtoMock } from './mocks';
import { ResumeController } from '../controllers/resume.controller';
import { CreateResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeService } from '../services/resume.service';

const resumeIdMock = 'this is resume id';

const createResumeDtoMock: CreateResumeDto = {
  resumeName: 'string',
  templateId: 'string',
};

const updateResumeDtoMock: UpdateResumeDto = {
  resumeName: 'string',
  jobTitle: 'string',
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  phone: 'string',
  country: 'string',
  city: 'string',
  summary: 'string',
  templateId: 'string',
};

const resumeServiceMock = {
  findAllUserResumes: jest.fn(),
  findResumeById: jest.fn(),
  createResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

describe('ResumeController', () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [{ provide: ResumeService, useValue: resumeServiceMock }],
    }).compile();

    controller = module.get(ResumeController);
  });

  it('should find all user resumes', async () => {
    await controller.findAllUserResumes(userDtoMock);

    expect(resumeServiceMock.findAllUserResumes).toHaveBeenCalled();
  });

  it('should find user resume', async () => {
    await controller.findUserResumeById(userDtoMock, resumeIdMock);

    expect(resumeServiceMock.findResumeById).toHaveBeenCalled();
  });

  it('should create user resume', async () => {
    await controller.createResume(createResumeDtoMock, userDtoMock);

    expect(resumeServiceMock.createResume).toHaveBeenCalled();
  });

  it('should update user resume', async () => {
    await controller.updateResume(
      resumeIdMock,
      userDtoMock,
      updateResumeDtoMock,
    );

    expect(resumeServiceMock.updateResume).toHaveBeenCalled();
  });

  it('should delete user resume', async () => {
    await controller.deleteResume(resumeIdMock, userDtoMock);

    expect(resumeServiceMock.deleteResume).toHaveBeenCalled();
  });
});
