import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';
import { Bom } from './bom.entity';
import { Routing } from './routing.entity';
import { SalesOrder } from '../../sales/entities/sales-order.entity';
import { Warehouse } from '../../inventory/entities/warehouse.entity';
import { WorkOrder } from './work-order.entity';

/**
 * 생산 주문 상태 열거형
 */
export enum ProductionOrderStatus {
  DRAFT = 'draft', // 초안
  PLANNED = 'planned', // 계획됨
  RELEASED = 'released', // 출시됨
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  CLOSED = 'closed', // 마감됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 생산 주문 우선순위 열거형
 */
export enum ProductionOrderPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  URGENT = 'urgent', // 긴급
}

/**
 * 생산 주문 엔티티
 * 제품 생산을 위한 주문을 관리합니다.
 */
@Entity('production_orders')
export class ProductionOrder extends BaseEntity {
  /**
   * 생산 주문 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 생산 주문 상태
   */
  @Column({
    type: 'enum',
    enum: ProductionOrderStatus,
    default: ProductionOrderStatus.DRAFT,
  })
  status: ProductionOrderStatus;

  /**
   * 생산 주문 우선순위
   */
  @Column({
    type: 'enum',
    enum: ProductionOrderPriority,
    default: ProductionOrderPriority.MEDIUM,
  })
  priority: ProductionOrderPriority;

  /**
   * 제품과의 다대일 관계
   */
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  /**
   * 제품 ID (외래 키)
   */
  @Column()
  productId: string;

  /**
   * 측정 단위와의 다대일 관계
   */
  @ManyToOne(() => UnitOfMeasure)
  @JoinColumn({ name: 'unitId' })
  unit: UnitOfMeasure;

  /**
   * 측정 단위 ID (외래 키)
   */
  @Column()
  unitId: string;

  /**
   * 계획 수량
   */
  @Column({ type: 'float' })
  plannedQuantity: number;

  /**
   * 생산된 수량
   */
  @Column({ type: 'float', default: 0 })
  producedQuantity: number;

  /**
   * 불량 수량
   */
  @Column({ type: 'float', default: 0 })
  rejectedQuantity: number;

  /**
   * 자재 명세서와의 다대일 관계
   */
  @ManyToOne(() => Bom)
  @JoinColumn({ name: 'bomId' })
  bom: Bom;

  /**
   * 자재 명세서 ID (외래 키)
   */
  @Column()
  bomId: string;

  /**
   * 라우팅과의 다대일 관계
   */
  @ManyToOne(() => Routing)
  @JoinColumn({ name: 'routingId' })
  routing: Routing;

  /**
   * 라우팅 ID (외래 키)
   */
  @Column()
  routingId: string;

  /**
   * 판매 주문과의 다대일 관계
   */
  @ManyToOne(() => SalesOrder, { nullable: true })
  @JoinColumn({ name: 'salesOrderId' })
  salesOrder: SalesOrder;

  /**
   * 판매 주문 ID (외래 키)
   */
  @Column({ nullable: true })
  salesOrderId: string;

  /**
   * 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  /**
   * 창고 ID (외래 키)
   */
  @Column()
  warehouseId: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

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
   * 예상 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  estimatedCost: number;

  /**
   * 실제 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  actualCost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 작업 지시와의 일대다 관계
   */
  @OneToMany(() => WorkOrder, (workOrder) => workOrder.productionOrder)
  workOrders: WorkOrder[];

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
