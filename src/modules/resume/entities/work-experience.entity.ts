import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_work_experience')
export class WorkExperienceEnity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jobTitle: string;

  @Column()
  employer: string;

  @Column()
  city: string;

  @Column()
  startEndDate: string;

  @Column()
  description: string;

  @Column()
  sortOrder: number;

  @Column()
  resumeId: string;

  @ManyToOne(() => ResumeEntity, (resume) => resume.workExpeprience, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
