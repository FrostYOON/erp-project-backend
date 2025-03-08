import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PurchaseOrder } from './purchase-order.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';
import { PurchaseRequisitionItem } from './purchase-requisition-item.entity';

/**
 * 구매 주문 항목 상태 열거형
 */
export enum PurchaseOrderItemStatus {
  PENDING = 'pending', // 대기 중
  PARTIAL = 'partial', // 부분 입고
  RECEIVED = 'received', // 입고 완료
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 구매 주문 항목 엔티티
 * 구매 주문의 개별 항목을 관리합니다.
 */
@Entity('purchase_order_items')
export class PurchaseOrderItem extends BaseEntity {
  /**
   * 구매 주문과의 다대일 관계
   */
  @ManyToOne(() => PurchaseOrder, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchaseOrderId' })
  purchaseOrder: PurchaseOrder;

  /**
   * 구매 주문 ID (외래 키)
   */
  @Column()
  purchaseOrderId: string;

  /**
   * 제품과의 다대일 관계
   */
  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  /**
   * 제품 ID (외래 키)
   */
  @Column({ nullable: true })
  productId: string;

  /**
   * 항목 설명 (제품이 없는 경우)
   */
  @Column({ nullable: true })
  description: string;

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
   * 수량
   */
  @Column({ type: 'float' })
  quantity: number;

  /**
   * 단가
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unitPrice: number;

  /**
   * 세금율 (%)
   */
  @Column({ type: 'float', default: 0 })
  taxRate: number;

  /**
   * 세금 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  taxAmount: number;

  /**
   * 할인율 (%)
   */
  @Column({ type: 'float', default: 0 })
  discountRate: number;

  /**
   * 할인 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discountAmount: number;

  /**
   * 소계 (세금 제외)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number;

  /**
   * 총액 (세금 포함)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;

  /**
   * 항목 상태
   */
  @Column({
    type: 'enum',
    enum: PurchaseOrderItemStatus,
    default: PurchaseOrderItemStatus.PENDING,
  })
  status: PurchaseOrderItemStatus;

  /**
   * 예상 배송 날짜
   */
  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  /**
   * 입고된 수량
   */
  @Column({ type: 'float', default: 0 })
  receivedQuantity: number;

  /**
   * 구매 요청 항목과의 다대일 관계
   */
  @ManyToOne(() => PurchaseRequisitionItem, { nullable: true })
  @JoinColumn({ name: 'requisitionItemId' })
  requisitionItem: PurchaseRequisitionItem;

  /**
   * 구매 요청 항목 ID (외래 키)
   */
  @Column({ nullable: true })
  requisitionItemId: string;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
