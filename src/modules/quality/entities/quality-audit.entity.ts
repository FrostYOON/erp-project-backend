import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { QualityStandard } from './quality-standard.entity';

/**
 * 품질 감사 유형 열거형
 */
export enum QualityAuditType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  SUPPLIER = 'supplier',
  CERTIFICATION = 'certification',
  COMPLIANCE = 'compliance',
  PROCESS = 'process',
  PRODUCT = 'product',
  SYSTEM = 'system',
  OTHER = 'other',
}

/**
 * 품질 감사 상태 열거형
 */
export enum QualityAuditStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

/**
 * 품질 감사 결과 열거형
 */
export enum QualityAuditResult {
  PASS = 'pass',
  PASS_WITH_FINDINGS = 'passWithFindings',
  FAIL = 'fail',
  PENDING = 'pending',
  NOT_APPLICABLE = 'notApplicable',
}

/**
 * 품질 감사 엔티티
 * 품질 감사 정보를 관리합니다.
 */
@Entity('quality_audits')
export class QualityAudit extends BaseEntity {
  /**
   * 감사 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 감사 제목
   */
  @Column()
  title: string;

  /**
   * 감사 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 감사 유형
   */
  @Column({
    type: 'enum',
    enum: QualityAuditType,
    default: QualityAuditType.INTERNAL,
  })
  type: QualityAuditType;

  /**
   * 감사 상태
   */
  @Column({
    type: 'enum',
    enum: QualityAuditStatus,
    default: QualityAuditStatus.PLANNED,
  })
  status: QualityAuditStatus;

  /**
   * 감사 결과
   */
  @Column({
    type: 'enum',
    enum: QualityAuditResult,
    default: QualityAuditResult.PENDING,
  })
  result: QualityAuditResult;

  /**
   * 감사 계획일
   */
  @Column({ type: 'date' })
  plannedDate: Date;

  /**
   * 감사 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 감사 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 감사 대상 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 감사 대상 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 감사 대상 프로세스
   */
  @Column({ nullable: true })
  process: string;

  /**
   * 감사 대상 제품
   */
  @Column({ nullable: true })
  product: string;

  /**
   * 감사 대상 시스템
   */
  @Column({ nullable: true })
  system: string;

  /**
   * 감사 대상 공급업체
   */
  @Column({ nullable: true })
  supplier: string;

  /**
   * 감사 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 감사 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

  /**
   * 감사 범위
   */
  @Column({ type: 'text', nullable: true })
  scope: string;

  /**
   * 감사 목적
   */
  @Column({ type: 'text', nullable: true })
  purpose: string;

  /**
   * 감사 방법론
   */
  @Column({ type: 'text', nullable: true })
  methodology: string;

  /**
   * 감사 체크리스트
   */
  @Column({ type: 'json', nullable: true })
  checklist: any;

  /**
   * 감사 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'auditorId' })
  auditor: User;

  /**
   * 감사 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  auditorId: string;

  /**
   * 감사 팀
   */
  @Column({ type: 'json', nullable: true })
  auditTeam: string[];

  /**
   * 감사 발견사항
   */
  @Column({ type: 'text', nullable: true })
  findings: string;

  /**
   * 감사 발견사항 수
   */
  @Column({ type: 'int', default: 0 })
  findingsCount: number;

  /**
   * 주요 발견사항 수
   */
  @Column({ type: 'int', default: 0 })
  majorFindingsCount: number;

  /**
   * 경미한 발견사항 수
   */
  @Column({ type: 'int', default: 0 })
  minorFindingsCount: number;

  /**
   * 관찰사항 수
   */
  @Column({ type: 'int', default: 0 })
  observationsCount: number;

  /**
   * 감사 결론
   */
  @Column({ type: 'text', nullable: true })
  conclusion: string;

  /**
   * 감사 권고사항
   */
  @Column({ type: 'text', nullable: true })
  recommendations: string;

  /**
   * 감사 후속조치 계획
   */
  @Column({ type: 'text', nullable: true })
  followUpPlan: string;

  /**
   * 감사 후속조치 기한
   */
  @Column({ type: 'date', nullable: true })
  followUpDueDate: Date;

  /**
   * 감사 후속조치 완료일
   */
  @Column({ type: 'date', nullable: true })
  followUpCompletionDate: Date;

  /**
   * 감사 후속조치 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'followUpAssigneeId' })
  followUpAssignee: User;

  /**
   * 감사 후속조치 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  followUpAssigneeId: string;

  /**
   * 감사 보고서 URL
   */
  @Column({ nullable: true })
  reportUrl: string;

  /**
   * 감사 증거 URL
   */
  @Column({ nullable: true })
  evidenceUrl: string;

  /**
   * 감사 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 감사 비용 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 감사 태그 (JSON 형태)
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
