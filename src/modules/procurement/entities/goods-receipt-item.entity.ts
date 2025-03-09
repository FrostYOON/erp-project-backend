import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { GoodsReceipt } from './goods-receipt.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { WarehouseLocation } from '../../inventory/entities/warehouse-location.entity';

/**
 * 입고 항목 상태 열거형
 */
export enum GoodsReceiptItemStatus {
  PENDING = 'pending', // 대기 중
  INSPECTED = 'inspected', // 검수 완료
  ACCEPTED = 'accepted', // 승인됨
  REJECTED = 'rejected', // 거절됨
}

/**
 * 입고 항목 엔티티
 * 입고의 개별 항목을 관리합니다.
 */
@Entity('goods_receipt_items')
export class GoodsReceiptItem extends BaseEntity {
  /**
   * 입고와의 다대일 관계
   */
  @ManyToOne(() => GoodsReceipt, (receipt) => receipt.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'goodsReceiptId' })
  goodsReceipt: GoodsReceipt;

  /**
   * 입고 ID (외래 키)
   */
  @Column()
  goodsReceiptId: string;

  /**
   * 구매 주문 항목과의 다대일 관계
   */
  @ManyToOne(() => PurchaseOrderItem)
  @JoinColumn({ name: 'purchaseOrderItemId' })
  purchaseOrderItem: PurchaseOrderItem;

  /**
   * 구매 주문 항목 ID (외래 키)
   */
  @Column()
  purchaseOrderItemId: string;

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
   * 창고 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, { nullable: true })
  @JoinColumn({ name: 'locationId' })
  location: WarehouseLocation;

  /**
   * 창고 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  locationId: string;

  /**
   * 주문 수량
   */
  @Column({ type: 'float' })
  orderedQuantity: number;

  /**
   * 입고 수량
   */
  @Column({ type: 'float' })
  receivedQuantity: number;

  /**
   * 승인 수량
   */
  @Column({ type: 'float', default: 0 })
  acceptedQuantity: number;

  /**
   * 거절 수량
   */
  @Column({ type: 'float', default: 0 })
  rejectedQuantity: number;

  /**
   * 항목 상태
   */
  @Column({
    type: 'enum',
    enum: GoodsReceiptItemStatus,
    default: GoodsReceiptItemStatus.PENDING,
  })
  status: GoodsReceiptItemStatus;

  /**
   * 로트 번호
   */
  @Column({ nullable: true })
  lotNumber: string;

  /**
   * 일련 번호
   */
  @Column({ nullable: true })
  serialNumber: string;

  /**
   * 제조일
   */
  @Column({ type: 'date', nullable: true })
  manufactureDate: Date;

  /**
   * 유효기간
   */
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  /**
   * 단가
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unitPrice: number;

  /**
   * 총액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;

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
