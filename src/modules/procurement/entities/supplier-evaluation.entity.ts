import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Supplier } from './supplier.entity';
import { SupplierEvaluationCriteria } from './supplier-evaluation-criteria.entity';

/**
 * 공급업체 평가 상태 열거형
 */
export enum EvaluationStatus {
  DRAFT = 'draft', // 초안
  COMPLETED = 'completed', // 완료됨
  APPROVED = 'approved', // 승인됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 공급업체 평가 엔티티
 * 공급업체의 성과를 평가합니다.
 */
@Entity('supplier_evaluations')
export class SupplierEvaluation extends BaseEntity {
  /**
   * 평가 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 평가 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 평가 제목
   */
  @Column()
  title: string;

  /**
   * 평가 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 평가 상태
   */
  @Column({
    type: 'enum',
    enum: EvaluationStatus,
    default: EvaluationStatus.DRAFT,
  })
  status: EvaluationStatus;

  /**
   * 공급업체와의 다대일 관계
   */
  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  /**
   * 공급업체 ID (외래 키)
   */
  @Column()
  supplierId: string;

  /**
   * 평가자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluatedByUserId' })
  evaluatedByUser: User;

  /**
   * 평가자 ID (외래 키)
   */
  @Column()
  evaluatedByUserId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

  /**
   * 평가 기간 시작일
   */
  @Column({ type: 'date' })
  periodStartDate: Date;

  /**
   * 평가 기간 종료일
   */
  @Column({ type: 'date' })
  periodEndDate: Date;

  /**
   * 총점
   */
  @Column({ type: 'float', default: 0 })
  totalScore: number;

  /**
   * 최대 가능 점수
   */
  @Column({ type: 'float', default: 0 })
  maxPossibleScore: number;

  /**
   * 평가 비율 (%)
   */
  @Column({ type: 'float', default: 0 })
  scorePercentage: number;

  /**
   * 평가 등급
   */
  @Column({ nullable: true })
  grade: string;

  /**
   * 평가 기준과의 일대다 관계
   */
  @OneToMany(
    () => SupplierEvaluationCriteria,
    (criteria) => criteria.evaluation,
    { cascade: true },
  )
  criteria: SupplierEvaluationCriteria[];

  /**
   * 결론
   */
  @Column({ nullable: true, type: 'text' })
  conclusion: string;

  /**
   * 개선 사항
   */
  @Column({ nullable: true, type: 'text' })
  improvementAreas: string;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
