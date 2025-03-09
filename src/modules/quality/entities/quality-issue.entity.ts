import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { QualityInspection } from './quality-inspection.entity';

/**
 * 품질 문제 유형 열거형
 */
export enum QualityIssueType {
  DEFECT = 'defect',
  NONCONFORMITY = 'nonconformity',
  DEVIATION = 'deviation',
  CUSTOMER_COMPLAINT = 'customerComplaint',
  AUDIT_FINDING = 'auditFinding',
  IMPROVEMENT_OPPORTUNITY = 'improvementOpportunity',
  OTHER = 'other',
}

/**
 * 품질 문제 심각도 열거형
 */
export enum QualityIssueSeverity {
  CRITICAL = 'critical',
  MAJOR = 'major',
  MINOR = 'minor',
  NEGLIGIBLE = 'negligible',
}

/**
 * 품질 문제 상태 열거형
 */
export enum QualityIssueStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  ACTION_REQUIRED = 'actionRequired',
  IN_PROGRESS = 'inProgress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  REOPENED = 'reopened',
}

/**
 * 품질 문제 엔티티
 * 발견된 품질 문제 정보를 관리합니다.
 */
@Entity('quality_issues')
export class QualityIssue extends BaseEntity {
  /**
   * 문제 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 문제 제목
   */
  @Column()
  title: string;

  /**
   * 문제 설명
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 문제 유형
   */
  @Column({
    type: 'enum',
    enum: QualityIssueType,
    default: QualityIssueType.DEFECT,
  })
  type: QualityIssueType;

  /**
   * 문제 심각도
   */
  @Column({
    type: 'enum',
    enum: QualityIssueSeverity,
    default: QualityIssueSeverity.MINOR,
  })
  severity: QualityIssueSeverity;

  /**
   * 문제 상태
   */
  @Column({
    type: 'enum',
    enum: QualityIssueStatus,
    default: QualityIssueStatus.OPEN,
  })
  status: QualityIssueStatus;

  /**
   * 문제 발견일
   */
  @Column({ type: 'date' })
  discoveredDate: Date;

  /**
   * 문제 발견자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'discoveredById' })
  discoveredBy: User;

  /**
   * 문제 발견자 ID (외래 키)
   */
  @Column({ nullable: true })
  discoveredById: string;

  /**
   * 문제 발견 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 문제 발견 검사와의 다대일 관계
   */
  @ManyToOne(() => QualityInspection)
  @JoinColumn({ name: 'inspectionId' })
  inspection: QualityInspection;

  /**
   * 문제 발견 검사 ID (외래 키)
   */
  @Column({ nullable: true })
  inspectionId: string;

  /**
   * 문제 대상 항목
   */
  @Column()
  affectedItem: string;

  /**
   * 문제 대상 항목 ID
   */
  @Column({ nullable: true })
  affectedItemId: string;

  /**
   * 문제 대상 항목 유형
   */
  @Column({ nullable: true })
  affectedItemType: string;

  /**
   * 문제 로트 번호
   */
  @Column({ nullable: true })
  lotNumber: string;

  /**
   * 문제 배치 번호
   */
  @Column({ nullable: true })
  batchNumber: string;

  /**
   * 문제 수량
   */
  @Column({ type: 'int', nullable: true })
  quantity: number;

  /**
   * 문제 원인
   */
  @Column({ type: 'text', nullable: true })
  rootCause: string;

  /**
   * 문제 원인 분석 방법
   */
  @Column({ nullable: true })
  rootCauseAnalysisMethod: string;

  /**
   * 문제 영향 분석
   */
  @Column({ type: 'text', nullable: true })
  impactAnalysis: string;

  /**
   * 문제 즉각 조치
   */
  @Column({ type: 'text', nullable: true })
  immediateActions: string;

  /**
   * 문제 시정 조치
   */
  @Column({ type: 'text', nullable: true })
  correctiveActions: string;

  /**
   * 문제 예방 조치
   */
  @Column({ type: 'text', nullable: true })
  preventiveActions: string;

  /**
   * 문제 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToId' })
  assignedTo: User;

  /**
   * 문제 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToId: string;

  /**
   * 문제 해결 기한
   */
  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  /**
   * 문제 해결일
   */
  @Column({ type: 'date', nullable: true })
  resolvedDate: Date;

  /**
   * 문제 해결자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'resolvedById' })
  resolvedBy: User;

  /**
   * 문제 해결자 ID (외래 키)
   */
  @Column({ nullable: true })
  resolvedById: string;

  /**
   * 문제 해결 방법
   */
  @Column({ type: 'text', nullable: true })
  resolution: string;

  /**
   * 문제 해결 검증 방법
   */
  @Column({ type: 'text', nullable: true })
  verificationMethod: string;

  /**
   * 문제 해결 검증 결과
   */
  @Column({ type: 'text', nullable: true })
  verificationResults: string;

  /**
   * 문제 해결 검증자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'verifiedById' })
  verifiedBy: User;

  /**
   * 문제 해결 검증자 ID (외래 키)
   */
  @Column({ nullable: true })
  verifiedById: string;

  /**
   * 문제 해결 검증일
   */
  @Column({ type: 'date', nullable: true })
  verificationDate: Date;

  /**
   * 문제 종결일
   */
  @Column({ type: 'date', nullable: true })
  closedDate: Date;

  /**
   * 문제 종결자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'closedById' })
  closedBy: User;

  /**
   * 문제 종결자 ID (외래 키)
   */
  @Column({ nullable: true })
  closedById: string;

  /**
   * 문제 이미지 URL
   */
  @Column({ nullable: true })
  imageUrl: string;

  /**
   * 문제 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 문제 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 문제 비용 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 문제 태그 (JSON 형태)
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
