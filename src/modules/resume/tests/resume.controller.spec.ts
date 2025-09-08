import { Test, TestingModule } from '@nestjs/testing';

import { deleteResultMock, resumeDtoMock, userDtoMock } from './mocks';
import { ResumeController } from '../controllers/resume.controller';
import { CreateResumeDto, UpdateResumeDto } from '../dto/resume.dto';
import { ResumeService } from '../services/resume.service';

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
  findAllUserResumes: jest.fn().mockResolvedValue([resumeDtoMock]),
  findResumeById: jest.fn().mockResolvedValue(resumeDtoMock),
  createResume: jest.fn().mockResolvedValue(resumeDtoMock),
  updateResume: jest.fn().mockResolvedValue(resumeDtoMock),
  deleteResume: jest.fn().mockResolvedValue(deleteResultMock),
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
    const result = await controller.findAllUserResumes(userDtoMock);
    expect(result).toEqual([resumeDtoMock]);
  });

  it('should find user resume', async () => {
    const result = await controller.findUserResumeById(
      userDtoMock,
      resumeDtoMock.id,
    );

    expect(result).toEqual(resumeDtoMock);
  });

  it('should create user resume', async () => {
    const result = await controller.createResume(
      createResumeDtoMock,
      userDtoMock,
    );

    expect(result).toEqual(resumeDtoMock);
  });

  it('should update user resume', async () => {
    const result = await controller.updateResume(
      resumeDtoMock.id,
      userDtoMock,
      updateResumeDtoMock,
    );

    expect(result).toEqual(resumeDtoMock);
  });

  it('should delete user resume', async () => {
    const result = await controller.deleteResume(resumeDtoMock.id, userDtoMock);
    expect(result).toEqual(deleteResultMock);
  });
});
