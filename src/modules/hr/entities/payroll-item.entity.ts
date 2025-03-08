import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Payroll } from './payroll.entity';

/**
 * 급여 항목 유형 열거형
 */
export enum PayrollItemType {
  EARNING = 'earning',
  DEDUCTION = 'deduction',
  BENEFIT = 'benefit',
  TAX = 'tax',
}

/**
 * 급여 항목 엔티티
 * 급여의 개별 항목(수당, 공제 등)을 관리합니다.
 */
@Entity('payroll_items')
export class PayrollItem extends BaseEntity {
  /**
   * 급여 정보와의 다대일 관계
   */
  @ManyToOne(() => Payroll, (payroll) => payroll.items)
  @JoinColumn({ name: 'payrollId' })
  payroll: Payroll;

  /**
   * 급여 정보 ID (외래 키)
   */
  @Column()
  payrollId: string;

  /**
   * 항목 이름
   */
  @Column()
  name: string;

  /**
   * 항목 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 항목 유형
   */
  @Column({
    type: 'enum',
    enum: PayrollItemType,
  })
  type: PayrollItemType;

  /**
   * 항목 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  /**
   * 항목 계산 방식 (고정 금액 또는 비율)
   */
  @Column({ enum: ['fixed', 'percentage'], default: 'fixed' })
  calculationType: string;

  /**
   * 비율 값 (calculationType이 'percentage'인 경우)
   */
  @Column({ type: 'float', nullable: true })
  percentageValue: number;

  /**
   * 과세 여부
   */
  @Column({ default: true })
  isTaxable: boolean;

  /**
   * 항목 순서
   */
  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}
