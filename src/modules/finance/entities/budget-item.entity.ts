import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Budget } from './budget.entity';
import { Account } from './account.entity';

/**
 * 예산 항목 엔티티
 * 특정 계정에 대한 예산 항목을 관리합니다.
 */
@Entity('budget_items')
export class BudgetItem extends BaseEntity {
  /**
   * 예산과의 다대일 관계
   */
  @ManyToOne(() => Budget, (budget) => budget.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budgetId' })
  budget: Budget;

  /**
   * 예산 ID (외래 키)
   */
  @Column()
  budgetId: string;

  /**
   * 계정과의 다대일 관계
   */
  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  /**
   * 계정 ID (외래 키)
   */
  @Column()
  accountId: string;

  /**
   * 예산 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  /**
   * 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 월별 분배 (JSON 형식으로 저장)
   * 예: { "1": 1000, "2": 1200, ... }
   */
  @Column({ type: 'json', nullable: true })
  monthlyDistribution: Record<string, number>;

  /**
   * 실제 사용 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  actualAmount: number;

  /**
   * 차이 금액 (예산 - 실제)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  variance: number;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
