import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_education')
export class EducationEnity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school: string;

  @Column()
  degree: string;

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

  @ManyToOne(() => ResumeEntity, (resume) => resume.education, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
