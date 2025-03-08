import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 근태 유형 열거형
 */
export enum AttendanceType {
  NORMAL = 'normal',
  LATE = 'late',
  EARLY_LEAVE = 'earlyLeave',
  ABSENT = 'absent',
  BUSINESS_TRIP = 'businessTrip',
  REMOTE_WORK = 'remoteWork',
  OVERTIME = 'overtime',
}

/**
 * 근태 기록 엔티티
 * 사용자의 출퇴근 및 근무 기록을 관리합니다.
 */
@Entity('attendances')
export class Attendance extends BaseEntity {
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
   * 근무일
   */
  @Column({ type: 'date' })
  workDate: Date;

  /**
   * 출근 시간
   */
  @Column({ type: 'timestamp', nullable: true })
  clockInTime: Date;

  /**
   * 퇴근 시간
   */
  @Column({ type: 'timestamp', nullable: true })
  clockOutTime: Date;

  /**
   * 근무 시간 (분 단위)
   */
  @Column({ type: 'int', nullable: true })
  workMinutes: number;

  /**
   * 초과 근무 시간 (분 단위)
   */
  @Column({ type: 'int', default: 0 })
  overtimeMinutes: number;

  /**
   * 근태 유형
   */
  @Column({
    type: 'enum',
    enum: AttendanceType,
    default: AttendanceType.NORMAL,
  })
  type: AttendanceType;

  /**
   * 근태 메모
   */
  @Column({ nullable: true })
  note: string;

  /**
   * IP 주소
   */
  @Column({ nullable: true })
  ipAddress: string;

  /**
   * 위치 정보 (위도)
   */
  @Column({ type: 'float', nullable: true })
  latitude: number;

  /**
   * 위치 정보 (경도)
   */
  @Column({ type: 'float', nullable: true })
  longitude: number;

  /**
   * 승인 여부
   */
  @Column({ default: true })
  isApproved: boolean;

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
}
