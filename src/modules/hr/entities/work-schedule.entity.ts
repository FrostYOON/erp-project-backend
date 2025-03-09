import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';

/**
 * 근무 일정 유형 열거형
 */
export enum WorkScheduleType {
  REGULAR = 'regular',
  SHIFT = 'shift',
  FLEXIBLE = 'flexible',
}

/**
 * 근무 일정 엔티티
 * 사용자 또는 부서의 근무 일정을 관리합니다.
 */
@Entity('work_schedules')
export class WorkSchedule extends BaseEntity {
  /**
   * 일정 이름
   */
  @Column()
  name: string;

  /**
   * 일정 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 사용자와의 다대일 관계 (개인 일정인 경우)
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column({ nullable: true })
  userId: string;

  /**
   * 부서와의 다대일 관계 (부서 일정인 경우)
   */
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 일정 유형
   */
  @Column({
    type: 'enum',
    enum: WorkScheduleType,
    default: WorkScheduleType.REGULAR,
  })
  type: WorkScheduleType;

  /**
   * 시작 날짜
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료 날짜 (null인 경우 무기한)
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 근무 요일 (JSON 형식으로 저장)
   * 예: ["monday", "tuesday", "wednesday", "thursday", "friday"]
   */
  @Column({ type: 'json' })
  workDays: string[];

  /**
   * 근무 시작 시간 (HH:MM 형식)
   */
  @Column()
  startTime: string;

  /**
   * 근무 종료 시간 (HH:MM 형식)
   */
  @Column()
  endTime: string;

  /**
   * 휴식 시간 (분 단위)
   */
  @Column({ type: 'int', default: 60 })
  breakMinutes: number;

  /**
   * 총 근무 시간 (분 단위)
   */
  @Column({ type: 'int' })
  totalWorkMinutes: number;

  /**
   * 일정 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;
}
