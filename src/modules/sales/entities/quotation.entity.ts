import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from './customer.entity';
import { QuotationItem } from './quotation-item.entity';
import { SalesOrder } from './sales-order.entity';

/**
 * 견적 상태 열거형
 */
export enum QuotationStatus {
  DRAFT = 'draft', // 초안
  SENT = 'sent', // 발송됨
  ACCEPTED = 'accepted', // 승인됨
  REJECTED = 'rejected', // 거절됨
  EXPIRED = 'expired', // 만료됨
  CONVERTED = 'converted', // 주문으로 전환됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 견적 엔티티
 * 고객에게 제공하는 제품/서비스 견적을 관리합니다.
 */
@Entity('quotations')
export class Quotation extends BaseEntity {
  /**
   * 견적 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 견적 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 견적 제목
   */
  @Column()
  title: string;

  /**
   * 견적 상태
   */
  @Column({
    type: 'enum',
    enum: QuotationStatus,
    default: QuotationStatus.DRAFT,
  })
  status: QuotationStatus;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.quotations)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column()
  customerId: string;

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
   * 유효 기간 (일)
   */
  @Column({ type: 'int', default: 30 })
  validityPeriod: number;

  /**
   * 만료일
   */
  @Column({ type: 'date' })
  expiryDate: Date;

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
   * 견적 항목과의 일대다 관계
   */
  @OneToMany(() => QuotationItem, (item) => item.quotation, { cascade: true })
  items: QuotationItem[];

  /**
   * 판매 주문과의 일대다 관계
   */
  @OneToMany(() => SalesOrder, (order) => order.quotation)
  salesOrders: SalesOrder[];

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
