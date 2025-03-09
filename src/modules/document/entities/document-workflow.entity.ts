import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { DocumentCategory } from './document-category.entity';
import { DocumentType } from './document-type.entity';
import { DocumentWorkflowStep } from './document-workflow-step.entity';

/**
 * 워크플로우 상태 열거형
 */
export enum WorkflowStatus {
  ACTIVE = 'active', // 활성
  INACTIVE = 'inactive', // 비활성
  DRAFT = 'draft', // 초안
}

/**
 * 문서 워크플로우 엔티티
 * 문서 승인 워크플로우를 관리합니다.
 */
@Entity('document_workflows')
export class DocumentWorkflow extends BaseEntity {
  /**
   * 워크플로우 이름
   */
  @Column()
  name: string;

  /**
   * 워크플로우 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 워크플로우 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 워크플로우 상태
   */
  @Column({
    type: 'enum',
    enum: WorkflowStatus,
    default: WorkflowStatus.DRAFT,
  })
  status: WorkflowStatus;

  /**
   * 카테고리와의 다대일 관계
   */
  @ManyToOne(() => DocumentCategory, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: DocumentCategory;

  /**
   * 카테고리 ID (외래 키)
   */
  @Column({ nullable: true })
  categoryId: string;

  /**
   * 문서 유형과의 다대일 관계
   */
  @ManyToOne(() => DocumentType, { nullable: true })
  @JoinColumn({ name: 'typeId' })
  type: DocumentType;

  /**
   * 문서 유형 ID (외래 키)
   */
  @Column({ nullable: true })
  typeId: string;

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
   * 워크플로우 단계와의 일대다 관계
   */
  @OneToMany(() => DocumentWorkflowStep, (step) => step.workflow, {
    cascade: true,
  })
  steps: DocumentWorkflowStep[];

  /**
   * 모든 단계 필수 여부
   */
  @Column({ default: true })
  allStepsRequired: boolean;

  /**
   * 순차적 승인 여부
   */
  @Column({ default: true })
  isSequential: boolean;

  /**
   * 자동 시작 여부
   */
  @Column({ default: false })
  autoStart: boolean;

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
}
