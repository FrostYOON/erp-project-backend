import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { QualityStandard } from './quality-standard.entity';
import { QualityCheckpoint } from './quality-checkpoint.entity';

/**
 * 품질 관리 계획 유형 열거형
 */
export enum QualityControlPlanType {
  PROCESS = 'process',
  PRODUCT = 'product',
  PROJECT = 'project',
  SYSTEM = 'system',
  SERVICE = 'service',
  OTHER = 'other',
}

/**
 * 품질 관리 계획 상태 열거형
 */
export enum QualityControlPlanStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OBSOLETE = 'obsolete',
}

/**
 * 품질 관리 계획 엔티티
 * 품질 관리 계획 정보를 관리합니다.
 */
@Entity('quality_control_plans')
export class QualityControlPlan extends BaseEntity {
  /**
   * 계획 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 계획 제목
   */
  @Column()
  title: string;

  /**
   * 계획 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 계획 유형
   */
  @Column({
    type: 'enum',
    enum: QualityControlPlanType,
    default: QualityControlPlanType.PROCESS,
  })
  type: QualityControlPlanType;

  /**
   * 계획 상태
   */
  @Column({
    type: 'enum',
    enum: QualityControlPlanStatus,
    default: QualityControlPlanStatus.DRAFT,
  })
  status: QualityControlPlanStatus;

  /**
   * 계획 버전
   */
  @Column()
  version: string;

  /**
   * 계획 작성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  /**
   * 계획 작성자 ID (외래 키)
   */
  @Column({ nullable: true })
  authorId: string;

  /**
   * 계획 검토자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  /**
   * 계획 검토자 ID (외래 키)
   */
  @Column({ nullable: true })
  reviewerId: string;

  /**
   * 계획 승인자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'approverId' })
  approver: User;

  /**
   * 계획 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approverId: string;

  /**
   * 계획 담당 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 계획 담당 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 계획 관련 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 계획 관련 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

  /**
   * 계획 작성일
   */
  @Column({ type: 'date' })
  creationDate: Date;

  /**
   * 계획 검토일
   */
  @Column({ type: 'date', nullable: true })
  reviewDate: Date;

  /**
   * 계획 승인일
   */
  @Column({ type: 'date', nullable: true })
  approvalDate: Date;

  /**
   * 계획 효력 시작일
   */
  @Column({ type: 'date', nullable: true })
  effectiveDate: Date;

  /**
   * 계획 효력 종료일
   */
  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  /**
   * 계획 검토 주기 (개월)
   */
  @Column({ type: 'int', nullable: true })
  reviewCycleMonths: number;

  /**
   * 다음 검토 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextReviewDate: Date;

  /**
   * 계획 대상 항목
   */
  @Column({ nullable: true })
  targetItem: string;

  /**
   * 계획 대상 항목 ID
   */
  @Column({ nullable: true })
  targetItemId: string;

  /**
   * 계획 대상 항목 유형
   */
  @Column({ nullable: true })
  targetItemType: string;

  /**
   * 계획 범위
   */
  @Column({ type: 'text', nullable: true })
  scope: string;

  /**
   * 계획 목적
   */
  @Column({ type: 'text', nullable: true })
  purpose: string;

  /**
   * 계획 요구사항
   */
  @Column({ type: 'text', nullable: true })
  requirements: string;

  /**
   * 계획 리스크 평가
   */
  @Column({ type: 'text', nullable: true })
  riskAssessment: string;

  /**
   * 계획 품질 목표
   */
  @Column({ type: 'text', nullable: true })
  qualityObjectives: string;

  /**
   * 계획 품질 지표
   */
  @Column({ type: 'json', nullable: true })
  qualityMetrics: any;

  /**
   * 계획 샘플링 방법
   */
  @Column({ type: 'text', nullable: true })
  samplingMethod: string;

  /**
   * 계획 검사 빈도
   */
  @Column({ nullable: true })
  inspectionFrequency: string;

  /**
   * 계획 측정 방법
   */
  @Column({ type: 'text', nullable: true })
  measurementMethod: string;

  /**
   * 계획 허용 기준
   */
  @Column({ type: 'text', nullable: true })
  acceptanceCriteria: string;

  /**
   * 계획 불합격 처리 방법
   */
  @Column({ type: 'text', nullable: true })
  nonconformanceHandling: string;

  /**
   * 계획 시정 조치 절차
   */
  @Column({ type: 'text', nullable: true })
  correctiveActionProcedure: string;

  /**
   * 계획 예방 조치 절차
   */
  @Column({ type: 'text', nullable: true })
  preventiveActionProcedure: string;

  /**
   * 계획 문서 관리 방법
   */
  @Column({ type: 'text', nullable: true })
  documentationControl: string;

  /**
   * 계획 기록 관리 방법
   */
  @Column({ type: 'text', nullable: true })
  recordsManagement: string;

  /**
   * 계획 교육 요구사항
   */
  @Column({ type: 'text', nullable: true })
  trainingRequirements: string;

  /**
   * 계획 책임 및 권한
   */
  @Column({ type: 'text', nullable: true })
  responsibilitiesAndAuthorities: string;

  /**
   * 계획 자원 요구사항
   */
  @Column({ type: 'text', nullable: true })
  resourceRequirements: string;

  /**
   * 계획 체크포인트와의 일대다 관계
   */
  @OneToMany(() => QualityCheckpoint, (checkpoint) => checkpoint.controlPlan)
  checkpoints: QualityCheckpoint[];

  /**
   * 계획 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 계획 태그 (JSON 형태)
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
