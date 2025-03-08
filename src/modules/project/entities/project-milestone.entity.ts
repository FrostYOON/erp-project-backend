import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';

/**
 * 마일스톤 상태 열거형
 */
export enum MilestoneStatus {
  PENDING = 'pending', // 대기 중
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  DELAYED = 'delayed', // 지연됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 프로젝트 마일스톤 엔티티
 * 프로젝트의 주요 단계를 관리합니다.
 */
@Entity('project_milestones')
export class ProjectMilestone extends BaseEntity {
  /**
   * 마일스톤 이름
   */
  @Column()
  name: string;

  /**
   * 마일스톤 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 마일스톤 상태
   */
  @Column({
    type: 'enum',
    enum: MilestoneStatus,
    default: MilestoneStatus.PENDING,
  })
  status: MilestoneStatus;

  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project, (project) => project.milestones)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

  /**
   * 예정일
   */
  @Column({ type: 'date' })
  dueDate: Date;

  /**
   * 실제 완료일
   */
  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  /**
   * 진행률 (%)
   */
  @Column({ type: 'float', default: 0 })
  progress: number;

  /**
   * 작업과의 일대다 관계
   */
  @OneToMany(() => ProjectTask, (task) => task.milestone)
  tasks: ProjectTask[];

  /**
   * 순서
   */
  @Column({ type: 'int', default: 0 })
  sequence: number;

  /**
   * 색상
   */
  @Column({ nullable: true })
  color: string;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
