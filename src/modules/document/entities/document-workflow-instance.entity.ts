import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';
import { DocumentWorkflow } from './document-workflow.entity';
import { User } from '../../users/entities/user.entity';
import { DocumentWorkflowStepInstance } from './document-workflow-step-instance.entity';

/**
 * 워크플로우 인스턴스 상태 열거형
 */
export enum WorkflowInstanceStatus {
  PENDING = 'pending', // 대기 중
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  REJECTED = 'rejected', // 거부됨
  CANCELLED = 'cancelled', // 취소됨
  EXPIRED = 'expired', // 만료됨
}

/**
 * 문서 워크플로우 인스턴스 엔티티
 * 문서에 적용된 워크플로우 인스턴스를 관리합니다.
 */
@Entity('document_workflow_instances')
export class DocumentWorkflowInstance extends BaseEntity {
  /**
   * 문서와의 다대일 관계
   */
  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'documentId' })
  document: Document;

  /**
   * 문서 ID (외래 키)
   */
  @Column()
  documentId: string;

  /**
   * 워크플로우와의 다대일 관계
   */
  @ManyToOne(() => DocumentWorkflow)
  @JoinColumn({ name: 'workflowId' })
  workflow: DocumentWorkflow;

  /**
   * 워크플로우 ID (외래 키)
   */
  @Column()
  workflowId: string;

  /**
   * 워크플로우 인스턴스 상태
   */
  @Column({
    type: 'enum',
    enum: WorkflowInstanceStatus,
    default: WorkflowInstanceStatus.PENDING,
  })
  status: WorkflowInstanceStatus;

  /**
   * 시작자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'initiatedByUserId' })
  initiatedByUser: User;

  /**
   * 시작자 ID (외래 키)
   */
  @Column()
  initiatedByUserId: string;

  /**
   * 시작일
   */
  @Column({ type: 'timestamp' })
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
   * 현재 단계 순서
   */
  @Column({ type: 'int', default: 1 })
  currentStepSequence: number;

  /**
   * 워크플로우 단계 인스턴스와의 일대다 관계
   */
  @OneToMany(
    () => DocumentWorkflowStepInstance,
    (stepInstance) => stepInstance.workflowInstance,
    { cascade: true },
  )
  stepInstances: DocumentWorkflowStepInstance[];

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;
}
