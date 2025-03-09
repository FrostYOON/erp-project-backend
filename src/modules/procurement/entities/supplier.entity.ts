import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SupplierContact } from './supplier-contact.entity';
import { PurchaseOrder } from './purchase-order.entity';

/**
 * 공급업체 유형 열거형
 */
export enum SupplierType {
  PRODUCT = 'product', // 제품 공급업체
  SERVICE = 'service', // 서비스 공급업체
  BOTH = 'both', // 제품 및 서비스 공급업체
}

/**
 * 공급업체 엔티티
 * 제품이나 서비스를 제공하는 공급업체 정보를 관리합니다.
 */
@Entity('suppliers')
export class Supplier extends BaseEntity {
  /**
   * 공급업체 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 공급업체 이름
   */
  @Column()
  name: string;

  /**
   * 공급업체 유형
   */
  @Column({
    type: 'enum',
    enum: SupplierType,
    default: SupplierType.PRODUCT,
  })
  type: SupplierType;

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
   * 평가 점수 (1-5)
   */
  @Column({ type: 'float', nullable: true })
  rating: number;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 연락처와의 일대다 관계
   */
  @OneToMany(() => SupplierContact, (contact) => contact.supplier)
  contacts: SupplierContact[];

  /**
   * 구매 주문과의 일대다 관계
   */
  @OneToMany(() => PurchaseOrder, (order) => order.supplier)
  purchaseOrders: PurchaseOrder[];
}
