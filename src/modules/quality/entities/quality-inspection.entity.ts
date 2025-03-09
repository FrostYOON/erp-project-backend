import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { QualityStandard } from './quality-standard.entity';

/**
 * 품질 검사 유형 열거형
 */
export enum QualityInspectionType {
  INCOMING = 'incoming',
  IN_PROCESS = 'inProcess',
  FINAL = 'final',
  PERIODIC = 'periodic',
  RANDOM = 'random',
  CUSTOMER_COMPLAINT = 'customerComplaint',
  OTHER = 'other',
}

/**
 * 품질 검사 상태 열거형
 */
export enum QualityInspectionStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * 품질 검사 결과 열거형
 */
export enum QualityInspectionResult {
  PASS = 'pass',
  FAIL = 'fail',
  CONDITIONAL_PASS = 'conditionalPass',
  PENDING = 'pending',
  NOT_APPLICABLE = 'notApplicable',
}

/**
 * 품질 검사 엔티티
 * 제품/서비스 품질 검사 정보를 관리합니다.
 */
@Entity('quality_inspections')
export class QualityInspection extends BaseEntity {
  /**
   * 검사 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 검사 제목
   */
  @Column()
  title: string;

  /**
   * 검사 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 검사 유형
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionType,
    default: QualityInspectionType.FINAL,
  })
  type: QualityInspectionType;

  /**
   * 검사 상태
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionStatus,
    default: QualityInspectionStatus.PLANNED,
  })
  status: QualityInspectionStatus;

  /**
   * 검사 결과
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionResult,
    default: QualityInspectionResult.PENDING,
  })
  result: QualityInspectionResult;

  /**
   * 검사 계획일
   */
  @Column({ type: 'date' })
  plannedDate: Date;

  /**
   * 검사 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 검사 완료일
   */
  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  /**
   * 검사 대상 항목
   */
  @Column()
  inspectionItem: string;

  /**
   * 검사 대상 항목 ID
   */
  @Column({ nullable: true })
  inspectionItemId: string;

  /**
   * 검사 대상 항목 유형
   */
  @Column({ nullable: true })
  inspectionItemType: string;

  /**
   * 검사 로트 번호
   */
  @Column({ nullable: true })
  lotNumber: string;

  /**
   * 검사 배치 번호
   */
  @Column({ nullable: true })
  batchNumber: string;

  /**
   * 검사 수량
   */
  @Column({ type: 'int', default: 1 })
  quantity: number;

  /**
   * 샘플링 수량
   */
  @Column({ type: 'int', nullable: true })
  sampleSize: number;

  /**
   * 합격 수량
   */
  @Column({ type: 'int', nullable: true })
  passedQuantity: number;

  /**
   * 불합격 수량
   */
  @Column({ type: 'int', nullable: true })
  failedQuantity: number;

  /**
   * 검사 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'inspectorId' })
  inspector: User;

  /**
   * 검사 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  inspectorId: string;

  /**
   * 검사 승인자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'approverId' })
  approver: User;

  /**
   * 검사 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approverId: string;

  /**
   * 검사 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 검사 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

  /**
   * 검사 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 검사 장비
   */
  @Column({ nullable: true })
  equipment: string;

  /**
   * 검사 방법
   */
  @Column({ type: 'text', nullable: true })
  method: string;

  /**
   * 검사 기준
   */
  @Column({ type: 'text', nullable: true })
  criteria: string;

  /**
   * 검사 결과 상세
   */
  @Column({ type: 'text', nullable: true })
  resultDetails: string;

  /**
   * 검사 결과 측정값 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  measurements: any;

  /**
   * 검사 결과 이미지 URL
   */
  @Column({ nullable: true })
  resultImageUrl: string;

  /**
   * 검사 결과 문서 URL
   */
  @Column({ nullable: true })
  resultDocumentUrl: string;

  /**
   * 검사 결과 조치 사항
   */
  @Column({ type: 'text', nullable: true })
  actions: string;

  /**
   * 검사 결과 비고
   */
  @Column({ type: 'text', nullable: true })
  remarks: string;

  /**
   * 검사 태그 (JSON 형태)
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
