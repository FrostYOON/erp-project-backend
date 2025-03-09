import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Bom } from './bom.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';

/**
 * 자재 명세서 항목 엔티티
 * 자재 명세서의 개별 항목을 관리합니다.
 */
@Entity('bom_items')
export class BomItem extends BaseEntity {
  /**
   * 자재 명세서와의 다대일 관계
   */
  @ManyToOne(() => Bom, (bom) => bom.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bomId' })
  bom: Bom;

  /**
   * 자재 명세서 ID (외래 키)
   */
  @Column()
  bomId: string;

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
   * 스크랩 비율 (%)
   */
  @Column({ type: 'float', default: 0 })
  scrapPercentage: number;

  /**
   * 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 위치
   */
  @Column({ nullable: true })
  position: string;

  /**
   * 대체 가능 여부
   */
  @Column({ default: false })
  isSubstitutable: boolean;

  /**
   * 대체 제품 ID (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  substituteProductIds: string[];

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
