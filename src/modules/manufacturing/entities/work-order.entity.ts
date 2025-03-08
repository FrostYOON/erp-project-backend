import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ProductionOrder } from './production-order.entity';
import { WorkCenter } from './work-center.entity';
import { WorkStation } from './work-station.entity';
import { RoutingOperation } from './routing-operation.entity';
import { WorkOrderOperation } from './work-order-operation.entity';

/**
 * 작업 지시 상태 열거형
 */
export enum WorkOrderStatus {
  PLANNED = 'planned', // 계획됨
  RELEASED = 'released', // 출시됨
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  CLOSED = 'closed', // 마감됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 작업 지시 엔티티
 * 생산 주문의 개별 작업 단계를 관리합니다.
 */
@Entity('work_orders')
export class WorkOrder extends BaseEntity {
  /**
   * 작업 지시 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 작업 지시 상태
   */
  @Column({
    type: 'enum',
    enum: WorkOrderStatus,
    default: WorkOrderStatus.PLANNED,
  })
  status: WorkOrderStatus;

  /**
   * 생산 주문과의 다대일 관계
   */
  @ManyToOne(() => ProductionOrder, (order) => order.workOrders)
  @JoinColumn({ name: 'productionOrderId' })
  productionOrder: ProductionOrder;

  /**
   * 생산 주문 ID (외래 키)
   */
  @Column()
  productionOrderId: string;

  /**
   * 라우팅 작업과의 다대일 관계
   */
  @ManyToOne(() => RoutingOperation)
  @JoinColumn({ name: 'routingOperationId' })
  routingOperation: RoutingOperation;

  /**
   * 라우팅 작업 ID (외래 키)
   */
  @Column()
  routingOperationId: string;

  /**
   * 작업 센터와의 다대일 관계
   */
  @ManyToOne(() => WorkCenter)
  @JoinColumn({ name: 'workCenterId' })
  workCenter: WorkCenter;

  /**
   * 작업 센터 ID (외래 키)
   */
  @Column()
  workCenterId: string;

  /**
   * 작업 스테이션과의 다대일 관계
   */
  @ManyToOne(() => WorkStation, { nullable: true })
  @JoinColumn({ name: 'workStationId' })
  workStation: WorkStation;

  /**
   * 작업 스테이션 ID (외래 키)
   */
  @Column({ nullable: true })
  workStationId: string;

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
  @Column({ type: 'date' })
  plannedStartDate: Date;

  /**
   * 계획 종료일
   */
  @Column({ type: 'date' })
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
   * 계획 수량
   */
  @Column({ type: 'float' })
  plannedQuantity: number;

  /**
   * 완료 수량
   */
  @Column({ type: 'float', default: 0 })
  completedQuantity: number;

  /**
   * 불량 수량
   */
  @Column({ type: 'float', default: 0 })
  rejectedQuantity: number;

  /**
   * 작업 지시 작업과의 일대다 관계
   */
  @OneToMany(() => WorkOrderOperation, (operation) => operation.workOrder, {
    cascade: true,
  })
  operations: WorkOrderOperation[];

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
