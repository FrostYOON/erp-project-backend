import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { InventoryAdjustment } from './inventory-adjustment.entity';
import { Product } from './product.entity';
import { UnitOfMeasure } from './unit-of-measure.entity';
import { WarehouseLocation } from './warehouse-location.entity';

/**
 * 재고 조정 항목 엔티티
 * 재고 조정의 개별 항목을 관리합니다.
 */
@Entity('inventory_adjustment_items')
export class InventoryAdjustmentItem extends BaseEntity {
  /**
   * 재고 조정과의 다대일 관계
   */
  @ManyToOne(() => InventoryAdjustment, (adjustment) => adjustment.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'adjustmentId' })
  adjustment: InventoryAdjustment;

  /**
   * 재고 조정 ID (외래 키)
   */
  @Column()
  adjustmentId: string;

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
   * 창고 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, { nullable: true })
  @JoinColumn({ name: 'locationId' })
  location: WarehouseLocation;

  /**
   * 창고 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  locationId: string;

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
   * 현재 시스템 수량
   */
  @Column({ type: 'float' })
  systemQuantity: number;

  /**
   * 실제 수량
   */
  @Column({ type: 'float' })
  actualQuantity: number;

  /**
   * 차이 수량 (실제 수량 - 시스템 수량)
   */
  @Column({ type: 'float' })
  differenceQuantity: number;

  /**
   * 로트 번호
   */
  @Column({ nullable: true })
  lotNumber: string;

  /**
   * 일련 번호
   */
  @Column({ nullable: true })
  serialNumber: string;

  /**
   * 제조일
   */
  @Column({ type: 'date', nullable: true })
  manufactureDate: Date;

  /**
   * 유효기간
   */
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  /**
   * 단가
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  unitCost: number;

  /**
   * 총 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalCost: number;

  /**
   * 비고
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
