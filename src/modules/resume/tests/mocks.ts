import { DeleteResultDto } from 'src/common/dto/delete-response.dto';
import { UserDto } from 'src/modules/users/dto/user.dto';

import { ResumeDto } from '../dto/resume.dto';

export const deleteResultMock: DeleteResultDto = {
  affected: 1,
};

export const userDtoMock = { id: crypto.randomUUID() } as UserDto;

export const resumeDtoMock: ResumeDto = {
  id: crypto.randomUUID(),
  resumeName: 'string',
  jobTitle: 'string',
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  phone: 'string',
  country: 'string',
  city: 'string',
  summary: 'string',
  photoUrl: 'string',
  ownerId: 'string',
  templateId: 'string',
  workExperience: [],
  education: [],
  projects: [],
  links: [],
  skills: [],
  languages: [],
  courses: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
