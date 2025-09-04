import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_languages')
export class LanguageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  level: string;

  @Column()
  resumeId: string;

  @Column()
  sortOrder: number;

  @ManyToOne(() => ResumeEntity, (resume) => resume.languages, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
