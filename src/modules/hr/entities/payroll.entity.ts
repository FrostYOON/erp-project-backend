import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { PayrollItem } from './payroll-item.entity';

/**
 * 급여 상태 열거형
 */
export enum PayrollStatus {
  DRAFT = 'draft',
  CALCULATED = 'calculated',
  APPROVED = 'approved',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

/**
 * 급여 정보 엔티티
 * 사용자의 급여 정보를 관리합니다.
 */
@Entity('payrolls')
export class Payroll extends BaseEntity {
  /**
   * 사용자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 급여 기간 (연도)
   */
  @Column({ type: 'int' })
  year: number;

  /**
   * 급여 기간 (월)
   */
  @Column({ type: 'int' })
  month: number;

  /**
   * 급여 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 급여 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 기본급
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  baseSalary: number;

  /**
   * 총 지급액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  grossAmount: number;

  /**
   * 총 공제액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalDeductions: number;

  /**
   * 순 지급액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  netAmount: number;

  /**
   * 급여 지급일
   */
  @Column({ type: 'date', nullable: true })
  paymentDate: Date;

  /**
   * 급여 상태
   */
  @Column({
    type: 'enum',
    enum: PayrollStatus,
    default: PayrollStatus.DRAFT,
  })
  status: PayrollStatus;

  /**
   * 비고
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'approverUserId' })
  approver: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approverUserId: string;

  /**
   * 급여 항목과의 일대다 관계
   */
  @OneToMany(() => PayrollItem, (item) => item.payroll)
  items: PayrollItem[];
}
