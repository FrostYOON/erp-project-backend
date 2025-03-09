import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from './customer.entity';
import { Quotation } from './quotation.entity';
import { SalesOrderItem } from './sales-order-item.entity';
import { Shipment } from './shipment.entity';

/**
 * 판매 주문 상태 열거형
 */
export enum SalesOrderStatus {
  DRAFT = 'draft', // 초안
  CONFIRMED = 'confirmed', // 확인됨
  PROCESSING = 'processing', // 처리 중
  PARTIAL = 'partial', // 부분 출하
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 판매 주문 엔티티
 * 고객으로부터 받은 판매 주문을 관리합니다.
 */
@Entity('sales_orders')
export class SalesOrder extends BaseEntity {
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
    enum: SalesOrderStatus,
    default: SalesOrderStatus.DRAFT,
  })
  status: SalesOrderStatus;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.salesOrders)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column()
  customerId: string;

  /**
   * 견적과의 다대일 관계
   */
  @ManyToOne(() => Quotation, (quotation) => quotation.salesOrders, {
    nullable: true,
  })
  @JoinColumn({ name: 'quotationId' })
  quotation: Quotation;

  /**
   * 견적 ID (외래 키)
   */
  @Column({ nullable: true })
  quotationId: string;

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
   * 요청 배송 날짜
   */
  @Column({ type: 'date', nullable: true })
  requestedDeliveryDate: Date;

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
   * 배송 도시
   */
  @Column({ nullable: true })
  deliveryCity: string;

  /**
   * 배송 주/도
   */
  @Column({ nullable: true })
  deliveryState: string;

  /**
   * 배송 국가
   */
  @Column({ nullable: true })
  deliveryCountry: string;

  /**
   * 배송 우편번호
   */
  @Column({ nullable: true })
  deliveryPostalCode: string;

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
   * 할인 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discountAmount: number;

  /**
   * 배송비
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  shippingCost: number;

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
   * 판매 주문 항목과의 일대다 관계
   */
  @OneToMany(() => SalesOrderItem, (item) => item.salesOrder, { cascade: true })
  items: SalesOrderItem[];

  /**
   * 출하와의 일대다 관계
   */
  @OneToMany(() => Shipment, (shipment) => shipment.salesOrder)
  shipments: Shipment[];

  /**
   * 고객 참조 번호
   */
  @Column({ nullable: true })
  customerReference: string;

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
