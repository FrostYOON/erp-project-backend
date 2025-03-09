import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SalesOpportunity } from './sales-opportunity.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';

/**
 * 영업 기회 제품 엔티티
 * 영업 기회에 포함된 제품 정보를 관리합니다.
 */
@Entity('sales_opportunity_products')
export class SalesOpportunityProduct extends BaseEntity {
  /**
   * 영업 기회와의 다대일 관계
   */
  @ManyToOne(() => SalesOpportunity, (opportunity) => opportunity.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'opportunityId' })
  opportunity: SalesOpportunity;

  /**
   * 영업 기회 ID (외래 키)
   */
  @Column()
  opportunityId: string;

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
   * 할인율 (%)
   */
  @Column({ type: 'float', default: 0 })
  discountPercentage: number;

  /**
   * 할인 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  discountAmount: number;

  /**
   * 세금율 (%)
   */
  @Column({ type: 'float', default: 0 })
  taxPercentage: number;

  /**
   * 세금 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  taxAmount: number;

  /**
   * 소계 (할인 전)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  subtotal: number;

  /**
   * 총액 (할인 후, 세금 포함)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
