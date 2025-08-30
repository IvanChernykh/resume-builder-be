import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ResumeTemplateEntity } from './resume-template.entity';

@Entity('resumes')
export class ResumeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resumeName: string;

  @ManyToOne(() => ResumeTemplateEntity, (template) => template.resume)
  @JoinColumn({ name: 'templateId' })
  template: ResumeTemplateEntity;

  @ManyToOne(() => UserEntity, (user) => user.resumes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
