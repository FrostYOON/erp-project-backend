import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { DocumentWorkflowInstance } from './document-workflow-instance.entity';
import { DocumentWorkflowStep } from './document-workflow-step.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 단계 인스턴스 상태 열거형
 */
export enum StepInstanceStatus {
  PENDING = 'pending', // 대기 중
  IN_PROGRESS = 'inProgress', // 진행 중
  APPROVED = 'approved', // 승인됨
  REJECTED = 'rejected', // 거부됨
  SKIPPED = 'skipped', // 건너뜀
  EXPIRED = 'expired', // 만료됨
}

/**
 * 문서 워크플로우 단계 인스턴스 엔티티
 * 문서 워크플로우의 단계 인스턴스를 관리합니다.
 */
@Entity('document_workflow_step_instances')
export class DocumentWorkflowStepInstance extends BaseEntity {
  /**
   * 워크플로우 인스턴스와의 다대일 관계
   */
  @ManyToOne(
    () => DocumentWorkflowInstance,
    (workflowInstance) => workflowInstance.stepInstances,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'workflowInstanceId' })
  workflowInstance: DocumentWorkflowInstance;

  /**
   * 워크플로우 인스턴스 ID (외래 키)
   */
  @Column()
  workflowInstanceId: string;

  /**
   * 워크플로우 단계와의 다대일 관계
   */
  @ManyToOne(() => DocumentWorkflowStep)
  @JoinColumn({ name: 'workflowStepId' })
  workflowStep: DocumentWorkflowStep;

  /**
   * 워크플로우 단계 ID (외래 키)
   */
  @Column()
  workflowStepId: string;

  /**
   * 단계 순서
   */
  @Column({ type: 'int' })
  sequence: number;

  /**
   * 단계 인스턴스 상태
   */
  @Column({
    type: 'enum',
    enum: StepInstanceStatus,
    default: StepInstanceStatus.PENDING,
  })
  status: StepInstanceStatus;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column()
  assignedToUserId: string;

  /**
   * 시작일
   */
  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  /**
   * 완료일
   */
  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  /**
   * 만료일
   */
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  /**
   * 결정 내용
   */
  @Column({ nullable: true, type: 'text' })
  decision: string;

  /**
   * 코멘트
   */
  @Column({ nullable: true, type: 'text' })
  comments: string;

  /**
   * 알림 전송 여부
   */
  @Column({ default: false })
  notificationSent: boolean;

  /**
   * 알림 전송일
   */
  @Column({ type: 'timestamp', nullable: true })
  notificationSentAt: Date;

  /**
   * 리마인더 전송 여부
   */
  @Column({ default: false })
  reminderSent: boolean;

  /**
   * 리마인더 전송일
   */
  @Column({ type: 'timestamp', nullable: true })
  reminderSentAt: Date;
}
