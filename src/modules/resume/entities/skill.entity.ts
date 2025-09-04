import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_skills')
export class SkillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  level: number;

  @Column()
  resumeId: string;

  @Column()
  sortOrder: number;

  @ManyToOne(() => ResumeEntity, (resume) => resume.skills, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
