import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';

/**
 * 품질 표준 유형 열거형
 */
export enum QualityStandardType {
  ISO = 'iso',
  INDUSTRY = 'industry',
  INTERNAL = 'internal',
  REGULATORY = 'regulatory',
  CUSTOMER = 'customer',
  OTHER = 'other',
}

/**
 * 품질 표준 상태 열거형
 */
export enum QualityStandardStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPRECATED = 'deprecated',
}

/**
 * 품질 표준 엔티티
 * 품질 기준 및 표준 정보를 관리합니다.
 */
@Entity('quality_standards')
export class QualityStandard extends BaseEntity {
  /**
   * 표준 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 표준 이름
   */
  @Column()
  name: string;

  /**
   * 표준 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 표준 유형
   */
  @Column({
    type: 'enum',
    enum: QualityStandardType,
    default: QualityStandardType.INTERNAL,
  })
  type: QualityStandardType;

  /**
   * 표준 상태
   */
  @Column({
    type: 'enum',
    enum: QualityStandardStatus,
    default: QualityStandardStatus.DRAFT,
  })
  status: QualityStandardStatus;

  /**
   * 표준 버전
   */
  @Column()
  version: string;

  /**
   * 표준 발행일
   */
  @Column({ type: 'date' })
  issueDate: Date;

  /**
   * 표준 효력 시작일
   */
  @Column({ type: 'date' })
  effectiveDate: Date;

  /**
   * 표준 효력 종료일
   */
  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  /**
   * 표준 검토 주기 (개월)
   */
  @Column({ type: 'int', nullable: true })
  reviewCycleMonths: number;

  /**
   * 다음 검토 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextReviewDate: Date;

  /**
   * 표준 소유자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  /**
   * 표준 소유자 ID (외래 키)
   */
  @Column({ nullable: true })
  ownerId: string;

  /**
   * 표준 담당 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 표준 담당 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 표준 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 표준 참조 문서
   */
  @Column({ type: 'text', nullable: true })
  references: string;

  /**
   * 표준 적용 범위
   */
  @Column({ type: 'text', nullable: true })
  scope: string;

  /**
   * 표준 요구사항
   */
  @Column({ type: 'text', nullable: true })
  requirements: string;

  /**
   * 표준 측정 방법
   */
  @Column({ type: 'text', nullable: true })
  measurementMethod: string;

  /**
   * 표준 허용 기준
   */
  @Column({ type: 'text', nullable: true })
  acceptanceCriteria: string;

  /**
   * 표준 적합성 평가 방법
   */
  @Column({ type: 'text', nullable: true })
  conformityAssessment: string;

  /**
   * 표준 관련 법규
   */
  @Column({ type: 'text', nullable: true })
  regulations: string;

  /**
   * 표준 관련 인증
   */
  @Column({ type: 'text', nullable: true })
  certifications: string;

  /**
   * 표준 태그 (JSON 형태)
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
