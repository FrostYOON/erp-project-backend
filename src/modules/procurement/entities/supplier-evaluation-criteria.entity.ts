import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SupplierEvaluation } from './supplier-evaluation.entity';

/**
 * 공급업체 평가 기준 엔티티
 * 공급업체 평가의 개별 기준을 관리합니다.
 */
@Entity('supplier_evaluation_criteria')
export class SupplierEvaluationCriteria extends BaseEntity {
  /**
   * 평가와의 다대일 관계
   */
  @ManyToOne(() => SupplierEvaluation, (evaluation) => evaluation.criteria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'evaluationId' })
  evaluation: SupplierEvaluation;

  /**
   * 평가 ID (외래 키)
   */
  @Column()
  evaluationId: string;

  /**
   * 기준 이름
   */
  @Column()
  name: string;

  /**
   * 기준 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 기준 카테고리
   */
  @Column({ nullable: true })
  category: string;

  /**
   * 가중치 (%)
   */
  @Column({ type: 'float', default: 0 })
  weight: number;

  /**
   * 최대 점수
   */
  @Column({ type: 'float' })
  maxScore: number;

  /**
   * 실제 점수
   */
  @Column({ type: 'float' })
  actualScore: number;

  /**
   * 가중 점수 (실제 점수 * 가중치)
   */
  @Column({ type: 'float' })
  weightedScore: number;

  /**
   * 코멘트
   */
  @Column({ nullable: true })
  comments: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
