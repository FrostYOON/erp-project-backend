import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { QualityStandard } from './quality-standard.entity';

/**
 * 품질 지표 유형 열거형
 */
export enum QualityMetricType {
  DEFECT_RATE = 'defectRate',
  CUSTOMER_SATISFACTION = 'customerSatisfaction',
  FIRST_PASS_YIELD = 'firstPassYield',
  PROCESS_CAPABILITY = 'processCapability',
  CYCLE_TIME = 'cycleTime',
  COST_OF_QUALITY = 'costOfQuality',
  COMPLIANCE_RATE = 'complianceRate',
  REWORK_RATE = 'reworkRate',
  SCRAP_RATE = 'scrapRate',
  MEAN_TIME_BETWEEN_FAILURES = 'meanTimeBetweenFailures',
  MEAN_TIME_TO_REPAIR = 'meanTimeToRepair',
  ON_TIME_DELIVERY = 'onTimeDelivery',
  SUPPLIER_QUALITY = 'supplierQuality',
  OTHER = 'other',
}

/**
 * 품질 지표 상태 열거형
 */
export enum QualityMetricStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNDER_REVIEW = 'underReview',
  DEPRECATED = 'deprecated',
}

/**
 * 품질 지표 엔티티
 * 품질 측정 지표 정보를 관리합니다.
 */
@Entity('quality_metrics')
export class QualityMetric extends BaseEntity {
  /**
   * 지표 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 지표 이름
   */
  @Column()
  name: string;

  /**
   * 지표 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 지표 유형
   */
  @Column({
    type: 'enum',
    enum: QualityMetricType,
    default: QualityMetricType.OTHER,
  })
  type: QualityMetricType;

  /**
   * 지표 상태
   */
  @Column({
    type: 'enum',
    enum: QualityMetricStatus,
    default: QualityMetricStatus.ACTIVE,
  })
  status: QualityMetricStatus;

  /**
   * 지표 계산식
   */
  @Column({ type: 'text', nullable: true })
  formula: string;

  /**
   * 지표 단위
   */
  @Column({ nullable: true })
  unit: string;

  /**
   * 지표 목표값
   */
  @Column({ type: 'float', nullable: true })
  target: number;

  /**
   * 지표 상한값
   */
  @Column({ type: 'float', nullable: true })
  upperLimit: number;

  /**
   * 지표 하한값
   */
  @Column({ type: 'float', nullable: true })
  lowerLimit: number;

  /**
   * 지표 측정 주기
   */
  @Column({ nullable: true })
  frequency: string;

  /**
   * 지표 데이터 소스
   */
  @Column({ nullable: true })
  dataSource: string;

  /**
   * 지표 측정 방법
   */
  @Column({ type: 'text', nullable: true })
  measurementMethod: string;

  /**
   * 지표 담당 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 지표 담당 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 지표 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  /**
   * 지표 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  ownerId: string;

  /**
   * 지표 관련 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 지표 관련 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

  /**
   * 지표 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 지표 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 지표 검토 주기 (개월)
   */
  @Column({ type: 'int', nullable: true })
  reviewCycleMonths: number;

  /**
   * 다음 검토 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextReviewDate: Date;

  /**
   * 지표 중요도 (1-5)
   */
  @Column({ type: 'int', default: 3 })
  importance: number;

  /**
   * 지표 가중치 (0-1)
   */
  @Column({ type: 'float', default: 1 })
  weight: number;

  /**
   * 지표 시각화 유형
   */
  @Column({ nullable: true })
  visualizationType: string;

  /**
   * 지표 대시보드 URL
   */
  @Column({ nullable: true })
  dashboardUrl: string;

  /**
   * 지표 태그 (JSON 형태)
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
