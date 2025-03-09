import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { BudgetItem } from './budget-item.entity';

/**
 * 예산 상태 열거형
 */
export enum BudgetStatus {
  DRAFT = 'draft', // 초안
  APPROVED = 'approved', // 승인됨
  ACTIVE = 'active', // 활성
  CLOSED = 'closed', // 마감
}

/**
 * 예산 엔티티
 * 회계 기간별 예산을 관리합니다.
 */
@Entity('budgets')
export class Budget extends BaseEntity {
  /**
   * 예산 이름
   */
  @Column()
  name: string;

  /**
   * 예산 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 예산 연도
   */
  @Column({ type: 'int' })
  year: number;

  /**
   * 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 예산 상태
   */
  @Column({
    type: 'enum',
    enum: BudgetStatus,
    default: BudgetStatus.DRAFT,
  })
  status: BudgetStatus;

  /**
   * 총 예산 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAmount: number;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

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
   * 예산 항목과의 일대다 관계
   */
  @OneToMany(() => BudgetItem, (item) => item.budget, { cascade: true })
  items: BudgetItem[];

  /**
   * 메모
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 부서 ID (특정 부서의 예산인 경우)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 프로젝트 ID (특정 프로젝트의 예산인 경우)
   */
  @Column({ nullable: true })
  projectId: string;
}
