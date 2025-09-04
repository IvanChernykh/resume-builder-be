import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CourseEntity } from './course.entity';
import { EducationEnity } from './education.entity';
import { LanguageEntity } from './language.entity';
import { LinkEntity } from './link.entity';
import { ProjectEntity } from './project.entity';
import { ResumeTemplateEntity } from './resume-template.entity';
import { SkillEntity } from './skill.entity';
import { WorkExperienceEnity } from './work-experience.entity';
import { WorkExperienceDto } from '../dto/work-experience.dto';

@Entity('resumes')
export class ResumeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  resumeName: string;

  @Column()
  jobTitle: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  summary: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => ResumeTemplateEntity, (template) => template.resume)
  @JoinColumn({ name: 'templateId' })
  template: ResumeTemplateEntity;

  @ManyToOne(() => UserEntity, (user) => user.resumes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @OneToMany(() => WorkExperienceEnity, (workExp) => workExp.resume)
  workExpeprience: WorkExperienceDto[];

  @OneToMany(() => EducationEnity, (education) => education.resume)
  education: EducationEnity[];

  @OneToMany(() => ProjectEntity, (project) => project.resume)
  projects: ProjectEntity[];

  @OneToMany(() => CourseEntity, (course) => course.resume)
  courses: CourseEntity[];

  @OneToMany(() => LinkEntity, (link) => link.resume)
  links: LinkEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.resume)
  skills: SkillEntity[];

  @OneToMany(() => LanguageEntity, (lang) => lang.resume)
  languages: LanguageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
