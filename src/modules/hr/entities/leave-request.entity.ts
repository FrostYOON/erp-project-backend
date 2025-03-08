import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { LeaveType } from './leave-type.entity';

/**
 * 휴가 신청 상태 열거형
 */
export enum LeaveRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

/**
 * 휴가 신청 엔티티
 * 사용자의 휴가 신청 정보를 관리합니다.
 */
@Entity('leave_requests')
export class LeaveRequest extends BaseEntity {
  /**
   * 신청자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 신청자 ID (외래 키)
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
   * 휴가 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 휴가 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 휴가 일수
   */
  @Column({ type: 'float' })
  days: number;

  /**
   * 휴가 사유
   */
  @Column({ nullable: true })
  reason: string;

  /**
   * 휴가 신청 상태
   */
  @Column({
    type: 'enum',
    enum: LeaveRequestStatus,
    default: LeaveRequestStatus.PENDING,
  })
  status: LeaveRequestStatus;

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
   * 승인/거절 일시
   */
  @Column({ type: 'timestamp', nullable: true })
  actionDate: Date;

  /**
   * 승인/거절 코멘트
   */
  @Column({ nullable: true })
  comment: string;

  /**
   * 첨부 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 반차 여부 (오전/오후)
   */
  @Column({ nullable: true, enum: ['morning', 'afternoon'] })
  halfDayType: string;
}
