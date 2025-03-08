import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { CustomerContact } from './customer-contact.entity';
import { SalesOrder } from './sales-order.entity';
import { Quotation } from './quotation.entity';

/**
 * 고객 유형 열거형
 */
export enum CustomerType {
  INDIVIDUAL = 'individual', // 개인
  COMPANY = 'company', // 기업
  GOVERNMENT = 'government', // 정부/공공기관
  NONPROFIT = 'nonprofit', // 비영리단체
}

/**
 * 고객 엔티티
 * 제품이나 서비스를 구매하는 고객 정보를 관리합니다.
 */
@Entity('customers')
export class Customer extends BaseEntity {
  /**
   * 고객 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 고객 이름
   */
  @Column()
  name: string;

  /**
   * 고객 유형
   */
  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.COMPANY,
  })
  type: CustomerType;

  /**
   * 사업자등록번호
   */
  @Column({ nullable: true })
  taxId: string;

  /**
   * 웹사이트
   */
  @Column({ nullable: true })
  website: string;

  /**
   * 이메일
   */
  @Column({ nullable: true })
  email: string;

  /**
   * 전화번호
   */
  @Column({ nullable: true })
  phone: string;

  /**
   * 팩스번호
   */
  @Column({ nullable: true })
  fax: string;

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

  /**
   * 도시
   */
  @Column({ nullable: true })
  city: string;

  /**
   * 주/도
   */
  @Column({ nullable: true })
  state: string;

  /**
   * 국가
   */
  @Column({ nullable: true })
  country: string;

  /**
   * 우편번호
   */
  @Column({ nullable: true })
  postalCode: string;

  /**
   * 결제 조건 (일)
   */
  @Column({ type: 'int', default: 30 })
  paymentTerms: number;

  /**
   * 배송 조건
   */
  @Column({ nullable: true })
  deliveryTerms: string;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 신용 한도
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  creditLimit: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

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
   * 연락처와의 일대다 관계
   */
  @OneToMany(() => CustomerContact, (contact) => contact.customer)
  contacts: CustomerContact[];

  /**
   * 판매 주문과의 일대다 관계
   */
  @OneToMany(() => SalesOrder, (order) => order.customer)
  salesOrders: SalesOrder[];

  /**
   * 견적과의 일대다 관계
   */
  @OneToMany(() => Quotation, (quotation) => quotation.customer)
  quotations: Quotation[];
}
