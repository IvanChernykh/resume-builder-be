import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  linkToRepo: string;

  @Column()
  description: string;

  @Column()
  sortOrder: number;

  @Column()
  resumeId: string;

  @ManyToOne(() => ResumeEntity, (resume) => resume.education, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
