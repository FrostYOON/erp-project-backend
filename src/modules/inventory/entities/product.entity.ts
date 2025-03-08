import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ProductCategory } from './product-category.entity';
import { UnitOfMeasure } from './unit-of-measure.entity';
import { StockLevel } from './stock-level.entity';

/**
 * 제품 유형 열거형
 */
export enum ProductType {
  PRODUCT = 'product', // 완제품
  RAW_MATERIAL = 'rawMaterial', // 원자재
  SEMI_FINISHED = 'semiFinished', // 반제품
  SERVICE = 'service', // 서비스
}

/**
 * 제품 엔티티
 * 재고 관리의 기본 단위인 제품 정보를 관리합니다.
 */
@Entity('products')
export class Product extends BaseEntity {
  /**
   * 제품 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 제품 이름
   */
  @Column()
  name: string;

  /**
   * 제품 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 제품 유형
   */
  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.PRODUCT,
  })
  type: ProductType;

  /**
   * 바코드
   */
  @Column({ nullable: true })
  barcode: string;

  /**
   * SKU (Stock Keeping Unit)
   */
  @Column({ nullable: true })
  sku: string;

  /**
   * 제품 카테고리와의 다대일 관계
   */
  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  /**
   * 제품 카테고리 ID (외래 키)
   */
  @Column()
  categoryId: string;

  /**
   * 기본 측정 단위와의 다대일 관계
   */
  @ManyToOne(() => UnitOfMeasure)
  @JoinColumn({ name: 'baseUnitId' })
  baseUnit: UnitOfMeasure;

  /**
   * 기본 측정 단위 ID (외래 키)
   */
  @Column()
  baseUnitId: string;

  /**
   * 판매 측정 단위와의 다대일 관계
   */
  @ManyToOne(() => UnitOfMeasure)
  @JoinColumn({ name: 'salesUnitId' })
  salesUnit: UnitOfMeasure;

  /**
   * 판매 측정 단위 ID (외래 키)
   */
  @Column({ nullable: true })
  salesUnitId: string;

  /**
   * 구매 측정 단위와의 다대일 관계
   */
  @ManyToOne(() => UnitOfMeasure)
  @JoinColumn({ name: 'purchaseUnitId' })
  purchaseUnit: UnitOfMeasure;

  /**
   * 구매 측정 단위 ID (외래 키)
   */
  @Column({ nullable: true })
  purchaseUnitId: string;

  /**
   * 판매 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  salesPrice: number;

  /**
   * 구매 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  purchasePrice: number;

  /**
   * 최소 재고 수량
   */
  @Column({ type: 'float', default: 0 })
  minStockLevel: number;

  /**
   * 최대 재고 수량
   */
  @Column({ type: 'float', default: 0 })
  maxStockLevel: number;

  /**
   * 재주문 수량
   */
  @Column({ type: 'float', default: 0 })
  reorderPoint: number;

  /**
   * 재주문 수량
   */
  @Column({ type: 'float', default: 0 })
  reorderQuantity: number;

  /**
   * 리드 타임 (일)
   */
  @Column({ type: 'int', default: 0 })
  leadTimeDays: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 판매 가능 여부
   */
  @Column({ default: true })
  isSellable: boolean;

  /**
   * 구매 가능 여부
   */
  @Column({ default: true })
  isPurchasable: boolean;

  /**
   * 재고 추적 여부
   */
  @Column({ default: true })
  isStockTracked: boolean;

  /**
   * 이미지 URL
   */
  @Column({ nullable: true })
  imageUrl: string;

  /**
   * 무게
   */
  @Column({ type: 'float', nullable: true })
  weight: number;

  /**
   * 부피
   */
  @Column({ type: 'float', nullable: true })
  volume: number;

  /**
   * 치수 (JSON 형식으로 저장)
   * 예: { "length": 10, "width": 5, "height": 2 }
   */
  @Column({ type: 'json', nullable: true })
  dimensions: Record<string, number>;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 제품 속성 (JSON 형식으로 저장)
   * 예: { "color": "red", "size": "XL", "material": "cotton" }
   */
  @Column({ type: 'json', nullable: true })
  attributes: Record<string, any>;

  /**
   * 재고 수준과의 일대다 관계
   */
  @OneToMany(() => StockLevel, (stockLevel) => stockLevel.product)
  stockLevels: StockLevel[];
}
