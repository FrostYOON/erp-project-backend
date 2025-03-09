import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 회계 기간 상태 열거형
 */
export enum FiscalPeriodStatus {
  OPEN = 'open', // 개방
  CLOSED = 'closed', // 마감
  ADJUSTING = 'adjusting', // 조정 중
}

/**
 * 회계 기간 엔티티
 * 회계 연도 및 기간을 관리합니다.
 */
@Entity('fiscal_periods')
export class FiscalPeriod extends BaseEntity {
  /**
   * 회계 연도
   */
  @Column({ type: 'int' })
  year: number;

  /**
   * 회계 기간 (월)
   */
  @Column({ type: 'int' })
  period: number;

  /**
   * 회계 기간 이름
   */
  @Column()
  name: string;

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
   * 회계 기간 상태
   */
  @Column({
    type: 'enum',
    enum: FiscalPeriodStatus,
    default: FiscalPeriodStatus.OPEN,
  })
  status: FiscalPeriodStatus;

  /**
   * 마감일
   */
  @Column({ type: 'date', nullable: true })
  closedDate: Date;

  /**
   * 비고
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 분기 번호 (1-4)
   */
  @Column({ type: 'int' })
  quarter: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;
}
