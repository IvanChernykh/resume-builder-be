import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_links')
export class LinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  resumeId: string;

  @Column()
  sortOrder: number;

  @ManyToOne(() => ResumeEntity, (resume) => resume.links, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: ResumeEntity;
}
