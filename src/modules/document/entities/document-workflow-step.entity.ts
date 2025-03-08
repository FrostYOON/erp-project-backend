import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { DocumentWorkflow } from './document-workflow.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 승인자 유형 열거형
 */
export enum ApproverType {
  USER = 'user', // 사용자
  ROLE = 'role', // 역할
  DEPARTMENT = 'department', // 부서
  MANAGER = 'manager', // 관리자
  DYNAMIC = 'dynamic', // 동적 할당
}

/**
 * 문서 워크플로우 단계 엔티티
 * 문서 워크플로우의 단계를 관리합니다.
 */
@Entity('document_workflow_steps')
export class DocumentWorkflowStep extends BaseEntity {
  /**
   * 워크플로우와의 다대일 관계
   */
  @ManyToOne(() => DocumentWorkflow, (workflow) => workflow.steps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflowId' })
  workflow: DocumentWorkflow;

  /**
   * 워크플로우 ID (외래 키)
   */
  @Column()
  workflowId: string;

  /**
   * 단계 이름
   */
  @Column()
  name: string;

  /**
   * 단계 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 순서
   */
  @Column({ type: 'int' })
  sequence: number;

  /**
   * 승인자 유형
   */
  @Column({
    type: 'enum',
    enum: ApproverType,
  })
  approverType: ApproverType;

  /**
   * 승인자 ID
   */
  @Column({ nullable: true })
  approverId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approverUserId' })
  approverUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approverUserId: string;

  /**
   * 동적 승인자 규칙 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  dynamicApproverRule: Record<string, any>;

  /**
   * 필수 여부
   */
  @Column({ default: true })
  isRequired: boolean;

  /**
   * 만료 기간 (일)
   */
  @Column({ type: 'int', nullable: true })
  expiryDays: number;

  /**
   * 알림 설정 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  notificationSettings: Record<string, any>;

  /**
   * 승인 시 작업 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  onApproveActions: Record<string, any>;

  /**
   * 거부 시 작업 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  onRejectActions: Record<string, any>;
}
