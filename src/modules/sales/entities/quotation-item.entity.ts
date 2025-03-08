import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Quotation } from './quotation.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';

/**
 * 견적 항목 엔티티
 * 견적의 개별 항목을 관리합니다.
 */
@Entity('quotation_items')
export class QuotationItem extends BaseEntity {
  /**
   * 견적과의 다대일 관계
   */
  @ManyToOne(() => Quotation, (quotation) => quotation.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quotationId' })
  quotation: Quotation;

  /**
   * 견적 ID (외래 키)
   */
  @Column()
  quotationId: string;

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
