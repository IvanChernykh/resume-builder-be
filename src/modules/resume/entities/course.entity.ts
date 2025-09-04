import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  course: string;

  @Column()
  institution: string;

  @Column()
  startEndDate: string;

  @Column()
  resumeId: string;

  @Column()
  sortOrder: number;

  @ManyToOne(() => ResumeEntity, (resume) => resume.courses, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
