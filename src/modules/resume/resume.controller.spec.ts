import { Test, TestingModule } from '@nestjs/testing';

import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

describe('ResumesController', () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [ResumeService],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
