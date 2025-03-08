import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 휴가 유형 엔티티
 * 연차, 병가, 특별 휴가 등 다양한 휴가 유형을 정의합니다.
 */
@Entity('leave_types')
export class LeaveType extends BaseEntity {
  /**
   * 휴가 유형 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 휴가 유형 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 휴가 유형 코드
   */
  @Column({ nullable: true })
  code: string;

  /**
   * 연간 기본 할당 일수
   */
  @Column({ type: 'float', default: 0 })
  defaultDays: number;

  /**
   * 급여 지급 여부
   */
  @Column({ default: true })
  isPaid: boolean;

  /**
   * 문서 필요 여부 (예: 병가의 경우 진단서)
   */
  @Column({ default: false })
  requiresDocumentation: boolean;

  /**
   * 휴가 유형 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 최소 신청 단위 (일 단위)
   * 0.5: 반차 허용, 1: 하루 단위만 허용
   */
  @Column({ type: 'float', default: 0.5 })
  minimumUnit: number;

  /**
   * 사전 신청 필요 일수
   * 휴가 시작일로부터 최소 몇 일 전에 신청해야 하는지
   */
  @Column({ type: 'int', default: 0 })
  advanceNoticeDays: number;
}
