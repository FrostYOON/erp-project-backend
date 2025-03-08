import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';

/**
 * 시간 기록 상태 열거형
 */
export enum TimeEntryStatus {
  DRAFT = 'draft', // 초안
  SUBMITTED = 'submitted', // 제출됨
  APPROVED = 'approved', // 승인됨
  REJECTED = 'rejected', // 거절됨
}

/**
 * 시간 기록 엔티티
 * 프로젝트 작업에 소요된 시간을 기록합니다.
 */
@Entity('time_entries')
export class TimeEntry extends BaseEntity {
  /**
   * 사용자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

  /**
   * 작업과의 다대일 관계
   */
  @ManyToOne(() => ProjectTask, (task) => task.timeEntries)
  @JoinColumn({ name: 'taskId' })
  task: ProjectTask;

  /**
   * 작업 ID (외래 키)
   */
  @Column()
  taskId: string;

  /**
   * 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 시작 시간
   */
  @Column({ type: 'time', nullable: true })
  startTime: string;

  /**
   * 종료 시간
   */
  @Column({ type: 'time', nullable: true })
  endTime: string;

  /**
   * 소요 시간 (시간)
   */
  @Column({ type: 'float' })
  hours: number;

  /**
   * 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 청구 가능 여부
   */
  @Column({ default: true })
  isBillable: boolean;

  /**
   * 상태
   */
  @Column({
    type: 'enum',
    enum: TimeEntryStatus,
    default: TimeEntryStatus.DRAFT,
  })
  status: TimeEntryStatus;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
