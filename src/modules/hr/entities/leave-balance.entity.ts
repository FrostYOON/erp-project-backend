import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { LeaveType } from './leave-type.entity';

/**
 * 휴가 잔여일수 엔티티
 * 각 사용자별, 휴가 유형별 잔여 휴가 일수를 관리합니다.
 */
@Entity('leave_balances')
export class LeaveBalance extends BaseEntity {
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
   * 휴가 유형과의 다대일 관계
   */
  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;

  /**
   * 휴가 유형 ID (외래 키)
   */
  @Column()
  leaveTypeId: string;

  /**
   * 연도
   */
  @Column({ type: 'int' })
  year: number;

  /**
   * 총 할당 일수
   */
  @Column({ type: 'float' })
  totalDays: number;

  /**
   * 사용한 일수
   */
  @Column({ type: 'float', default: 0 })
  usedDays: number;

  /**
   * 잔여 일수
   */
  @Column({ type: 'float' })
  remainingDays: number;

  /**
   * 만료일
   * 해당 연도의 휴가가 만료되는 날짜
   */
  @Column({ type: 'date' })
  expiryDate: Date;

  /**
   * 이월 가능 여부
   */
  @Column({ default: false })
  isCarryOver: boolean;

  /**
   * 이월 가능 일수
   */
  @Column({ type: 'float', default: 0 })
  maxCarryOverDays: number;
}
