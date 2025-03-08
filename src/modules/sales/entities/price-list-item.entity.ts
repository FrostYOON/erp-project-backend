import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PriceList } from './price-list.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';

/**
 * 가격표 항목 엔티티
 * 가격표의 개별 제품 가격을 관리합니다.
 */
@Entity('price_list_items')
export class PriceListItem extends BaseEntity {
  /**
   * 가격표와의 다대일 관계
   */
  @ManyToOne(() => PriceList, (priceList) => priceList.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'priceListId' })
  priceList: PriceList;

  /**
   * 가격표 ID (외래 키)
   */
  @Column()
  priceListId: string;

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
   * 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  /**
   * 최소 수량
   */
  @Column({ type: 'float', default: 1 })
  minimumQuantity: number;

  /**
   * 최대 수량
   */
  @Column({ type: 'float', nullable: true })
  maximumQuantity: number;

  /**
   * 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;
}
