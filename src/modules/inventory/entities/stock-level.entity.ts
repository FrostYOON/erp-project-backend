import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';
import { WarehouseLocation } from './warehouse-location.entity';
import { UnitOfMeasure } from './unit-of-measure.entity';

/**
 * 재고 상태 열거형
 */
export enum StockStatus {
  AVAILABLE = 'available', // 사용 가능
  RESERVED = 'reserved', // 예약됨
  DAMAGED = 'damaged', // 손상됨
  EXPIRED = 'expired', // 만료됨
  QUARANTINE = 'quarantine', // 격리됨
}

/**
 * 재고 수준 엔티티
 * 특정 제품의 특정 창고/위치에서의 재고 수량을 관리합니다.
 */
@Entity('stock_levels')
export class StockLevel extends BaseEntity {
  /**
   * 제품과의 다대일 관계
   */
  @ManyToOne(() => Product, (product) => product.stockLevels)
  @JoinColumn({ name: 'productId' })
  product: Product;

  /**
   * 제품 ID (외래 키)
   */
  @Column()
  productId: string;

  /**
   * 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stockLevels)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  /**
   * 창고 ID (외래 키)
   */
  @Column()
  warehouseId: string;

  /**
   * 창고 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, (location) => location.stockLevels, {
    nullable: true,
  })
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
   * 현재 수량
   */
  @Column({ type: 'float', default: 0 })
  quantity: number;

  /**
   * 예약 수량
   */
  @Column({ type: 'float', default: 0 })
  reservedQuantity: number;

  /**
   * 가용 수량 (현재 수량 - 예약 수량)
   */
  @Column({ type: 'float', default: 0 })
  availableQuantity: number;

  /**
   * 재고 상태
   */
  @Column({
    type: 'enum',
    enum: StockStatus,
    default: StockStatus.AVAILABLE,
  })
  status: StockStatus;

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
   * 마지막 재고 조사일
   */
  @Column({ type: 'date', nullable: true })
  lastInventoryDate: Date;

  /**
   * 비고
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
