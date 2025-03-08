import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { PurchaseOrder } from './purchase-order.entity';
import { Warehouse } from '../../inventory/entities/warehouse.entity';
import { GoodsReceiptItem } from './goods-receipt-item.entity';

/**
 * 입고 상태 열거형
 */
export enum GoodsReceiptStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 승인 대기
  APPROVED = 'approved', // 승인됨
  POSTED = 'posted', // 전기됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 입고 엔티티
 * 구매 주문에 대한 물품 입고를 관리합니다.
 */
@Entity('goods_receipts')
export class GoodsReceipt extends BaseEntity {
  /**
   * 입고 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 입고 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 입고 상태
   */
  @Column({
    type: 'enum',
    enum: GoodsReceiptStatus,
    default: GoodsReceiptStatus.DRAFT,
  })
  status: GoodsReceiptStatus;

  /**
   * 구매 주문과의 다대일 관계
   */
  @ManyToOne(() => PurchaseOrder)
  @JoinColumn({ name: 'purchaseOrderId' })
  purchaseOrder: PurchaseOrder;

  /**
   * 구매 주문 ID (외래 키)
   */
  @Column()
  purchaseOrderId: string;

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
   * 공급업체 송장 번호
   */
  @Column({ nullable: true })
  supplierInvoiceNumber: string;

  /**
   * 공급업체 배송 번호
   */
  @Column({ nullable: true })
  supplierDeliveryNumber: string;

  /**
   * 입고 항목과의 일대다 관계
   */
  @OneToMany(() => GoodsReceiptItem, (item) => item.goodsReceipt, {
    cascade: true,
  })
  items: GoodsReceiptItem[];

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
