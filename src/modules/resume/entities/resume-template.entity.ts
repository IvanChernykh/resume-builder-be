import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ResumeEntity } from './resume.entity';

@Entity('resume_templates')
export class ResumeTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  templateName: string;

  @OneToMany(() => ResumeEntity, (resume) => resume.template)
  resume: ResumeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
