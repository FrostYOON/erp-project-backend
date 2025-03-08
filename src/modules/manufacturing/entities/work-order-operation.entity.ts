import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { WorkOrder } from './work-order.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 작업 지시 작업 상태 열거형
 */
export enum WorkOrderOperationStatus {
  PENDING = 'pending', // 대기 중
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  PAUSED = 'paused', // 일시 중지됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 작업 지시 작업 엔티티
 * 작업 지시의 세부 작업을 관리합니다.
 */
@Entity('work_order_operations')
export class WorkOrderOperation extends BaseEntity {
  /**
   * 작업 지시와의 다대일 관계
   */
  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.operations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workOrderId' })
  workOrder: WorkOrder;

  /**
   * 작업 지시 ID (외래 키)
   */
  @Column()
  workOrderId: string;

  /**
   * 작업 번호
   */
  @Column()
  operationNumber: string;

  /**
   * 작업 이름
   */
  @Column()
  name: string;

  /**
   * 작업 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 작업 상태
   */
  @Column({
    type: 'enum',
    enum: WorkOrderOperationStatus,
    default: WorkOrderOperationStatus.PENDING,
  })
  status: WorkOrderOperationStatus;

  /**
   * 순서
   */
  @Column({ type: 'int' })
  sequence: number;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToUserId: string;

  /**
   * 계획 시작일
   */
  @Column({ type: 'date', nullable: true })
  plannedStartDate: Date;

  /**
   * 계획 종료일
   */
  @Column({ type: 'date', nullable: true })
  plannedEndDate: Date;

  /**
   * 실제 시작일
   */
  @Column({ type: 'date', nullable: true })
  actualStartDate: Date;

  /**
   * 실제 종료일
   */
  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  /**
   * 계획 설정 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  plannedSetupTime: number;

  /**
   * 실제 설정 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  actualSetupTime: number;

  /**
   * 계획 작업 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  plannedOperationTime: number;

  /**
   * 실제 작업 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  actualOperationTime: number;

  /**
   * 작업 지침
   */
  @Column({ nullable: true, type: 'text' })
  instructions: string;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
