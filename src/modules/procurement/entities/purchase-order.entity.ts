import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Supplier } from './supplier.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';

/**
 * 구매 주문 상태 열거형
 */
export enum PurchaseOrderStatus {
  DRAFT = 'draft', // 초안
  SENT = 'sent', // 발송됨
  CONFIRMED = 'confirmed', // 확인됨
  PARTIAL = 'partial', // 부분 입고
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 구매 주문 엔티티
 * 공급업체에 발주하는 구매 주문을 관리합니다.
 */
@Entity('purchase_orders')
export class PurchaseOrder extends BaseEntity {
  /**
   * 주문 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 주문 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 주문 상태
   */
  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.DRAFT,
  })
  status: PurchaseOrderStatus;

  /**
   * 공급업체와의 다대일 관계
   */
  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseOrders)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  /**
   * 공급업체 ID (외래 키)
   */
  @Column()
  supplierId: string;

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
   * 예상 배송 날짜
   */
  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  /**
   * 배송 주소
   */
  @Column({ nullable: true })
  deliveryAddress: string;

  /**
   * 결제 조건
   */
  @Column({ nullable: true })
  paymentTerms: string;

  /**
   * 배송 조건
   */
  @Column({ nullable: true })
  deliveryTerms: string;

  /**
   * 소계 (세금 제외)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  subtotal: number;

  /**
   * 세금 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  taxAmount: number;

  /**
   * 배송비
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  shippingCost: number;

  /**
   * 기타 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  otherCosts: number;

  /**
   * 총액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  total: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 구매 주문 항목과의 일대다 관계
   */
  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, {
    cascade: true,
  })
  items: PurchaseOrderItem[];

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 공급업체 참조 번호
   */
  @Column({ nullable: true })
  supplierReference: string;

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
