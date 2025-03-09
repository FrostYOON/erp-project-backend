import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { QualityIssue } from './quality-issue.entity';

/**
 * 품질 조치 유형 열거형
 */
export enum QualityActionType {
  IMMEDIATE = 'immediate',
  CORRECTIVE = 'corrective',
  PREVENTIVE = 'preventive',
  IMPROVEMENT = 'improvement',
  OTHER = 'other',
}

/**
 * 품질 조치 우선순위 열거형
 */
export enum QualityActionPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

/**
 * 품질 조치 상태 열거형
 */
export enum QualityActionStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  VERIFIED = 'verified',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

/**
 * 품질 조치 엔티티
 * 품질 문제에 대한 조치 정보를 관리합니다.
 */
@Entity('quality_actions')
export class QualityAction extends BaseEntity {
  /**
   * 조치 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 조치 제목
   */
  @Column()
  title: string;

  /**
   * 조치 설명
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 조치 유형
   */
  @Column({
    type: 'enum',
    enum: QualityActionType,
    default: QualityActionType.CORRECTIVE,
  })
  type: QualityActionType;

  /**
   * 조치 우선순위
   */
  @Column({
    type: 'enum',
    enum: QualityActionPriority,
    default: QualityActionPriority.MEDIUM,
  })
  priority: QualityActionPriority;

  /**
   * 조치 상태
   */
  @Column({
    type: 'enum',
    enum: QualityActionStatus,
    default: QualityActionStatus.PLANNED,
  })
  status: QualityActionStatus;

  /**
   * 관련 품질 문제와의 다대일 관계
   */
  @ManyToOne(() => QualityIssue)
  @JoinColumn({ name: 'issueId' })
  issue: QualityIssue;

  /**
   * 관련 품질 문제 ID (외래 키)
   */
  @Column({ nullable: true })
  issueId: string;

  /**
   * 조치 계획일
   */
  @Column({ type: 'date' })
  plannedDate: Date;

  /**
   * 조치 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 조치 완료 기한
   */
  @Column({ type: 'date' })
  dueDate: Date;

  /**
   * 조치 완료일
   */
  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  /**
   * 조치 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: User;

  /**
   * 조치 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToId: string;

  /**
   * 조치 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  /**
   * 조치 생성자 ID (외래 키)
   */
  @Column({ nullable: true })
  createdById: string;

  /**
   * 조치 완료자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'completedById' })
  completedBy: User;

  /**
   * 조치 완료자 ID (외래 키)
   */
  @Column({ nullable: true })
  completedById: string;

  /**
   * 조치 검증자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'verifiedById' })
  verifiedBy: User;

  /**
   * 조치 검증자 ID (외래 키)
   */
  @Column({ nullable: true })
  verifiedById: string;

  /**
   * 조치 검증일
   */
  @Column({ type: 'date', nullable: true })
  verificationDate: Date;

  /**
   * 조치 검증 방법
   */
  @Column({ type: 'text', nullable: true })
  verificationMethod: string;

  /**
   * 조치 검증 결과
   */
  @Column({ type: 'text', nullable: true })
  verificationResults: string;

  /**
   * 조치 효과성
   */
  @Column({ type: 'text', nullable: true })
  effectiveness: string;

  /**
   * 조치 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 조치 비용 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 조치 진행 상황 (%)
   */
  @Column({ type: 'float', default: 0 })
  progress: number;

  /**
   * 조치 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 조치 이미지 URL
   */
  @Column({ nullable: true })
  imageUrl: string;

  /**
   * 조치 태그 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 메모
   */
  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * 추가 정보 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  additionalInfo: any;
}
