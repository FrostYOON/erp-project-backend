import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';
import { ProjectMilestone } from './project-milestone.entity';
import { TimeEntry } from './time-entry.entity';

/**
 * 작업 상태 열거형
 */
export enum TaskStatus {
  TODO = 'todo', // 할 일
  IN_PROGRESS = 'inProgress', // 진행 중
  REVIEW = 'review', // 검토 중
  DONE = 'done', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 작업 우선순위 열거형
 */
export enum TaskPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  URGENT = 'urgent', // 긴급
}

/**
 * 프로젝트 작업 엔티티
 * 프로젝트 내의 개별 작업을 관리합니다.
 */
@Entity('project_tasks')
export class ProjectTask extends BaseEntity {
  /**
   * 작업 번호
   */
  @Column()
  number: string;

  /**
   * 작업 제목
   */
  @Column()
  title: string;

  /**
   * 작업 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 작업 상태
   */
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  /**
   * 작업 우선순위
   */
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

  /**
   * 상위 작업과의 다대일 관계
   */
  @ManyToOne(() => ProjectTask, (task) => task.subtasks, { nullable: true })
  @JoinColumn({ name: 'parentTaskId' })
  parentTask: ProjectTask;

  /**
   * 상위 작업 ID (외래 키)
   */
  @Column({ nullable: true })
  parentTaskId: string;

  /**
   * 하위 작업과의 일대다 관계
   */
  @OneToMany(() => ProjectTask, (task) => task.parentTask)
  subtasks: ProjectTask[];

  /**
   * 마일스톤과의 다대일 관계
   */
  @ManyToOne(() => ProjectMilestone, { nullable: true })
  @JoinColumn({ name: 'milestoneId' })
  milestone: ProjectMilestone;

  /**
   * 마일스톤 ID (외래 키)
   */
  @Column({ nullable: true })
  milestoneId: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assigneeId: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date' })
  dueDate: Date;

  /**
   * 실제 시작일
   */
  @Column({ type: 'date', nullable: true })
  actualStartDate: Date;

  /**
   * 실제 종료일
   */
  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  /**
   * 예상 소요 시간 (시간)
   */
  @Column({ type: 'float', default: 0 })
  estimatedHours: number;

  /**
   * 실제 소요 시간 (시간)
   */
  @Column({ type: 'float', default: 0 })
  actualHours: number;

  /**
   * 진행률 (%)
   */
  @Column({ type: 'float', default: 0 })
  progress: number;

  /**
   * 시간 기록과의 일대다 관계
   */
  @OneToMany(() => TimeEntry, (entry) => entry.task)
  timeEntries: TimeEntry[];

  /**
   * 관련 작업과의 다대다 관계
   */
  @ManyToMany(() => ProjectTask)
  @JoinTable({
    name: 'project_task_relations',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'relatedTaskId', referencedColumnName: 'id' },
  })
  relatedTasks: ProjectTask[];

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

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
