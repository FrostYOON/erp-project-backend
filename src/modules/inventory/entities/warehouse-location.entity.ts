import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Warehouse } from './warehouse.entity';
import { StockLevel } from './stock-level.entity';

/**
 * 창고 위치 엔티티
 * 창고 내의 세부 위치를 관리합니다.
 */
@Entity('warehouse_locations')
export class WarehouseLocation extends BaseEntity {
  /**
   * 위치 코드
   */
  @Column()
  code: string;

  /**
   * 위치 이름
   */
  @Column()
  name: string;

  /**
   * 위치 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.locations)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  /**
   * 창고 ID (외래 키)
   */
  @Column()
  warehouseId: string;

  /**
   * 상위 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, (location) => location.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: WarehouseLocation;

  /**
   * 상위 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 위치 목록
   */
  @OneToMany(() => WarehouseLocation, (location) => location.parent)
  children: WarehouseLocation[];

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 위치 유형 (선반, 구역, 빈 등)
   */
  @Column({ nullable: true })
  locationType: string;

  /**
   * 바코드
   */
  @Column({ nullable: true })
  barcode: string;

  /**
   * 최대 용량
   */
  @Column({ type: 'float', nullable: true })
  maxCapacity: number;

  /**
   * 현재 사용량
   */
  @Column({ type: 'float', default: 0 })
  currentUsage: number;

  /**
   * 재고 수준과의 일대다 관계
   */
  @OneToMany(() => StockLevel, (stockLevel) => stockLevel.location)
  stockLevels: StockLevel[];

  /**
   * 위치 좌표 (JSON 형식으로 저장)
   * 예: { "aisle": "A", "rack": "1", "shelf": "2", "bin": "3" }
   */
  @Column({ type: 'json', nullable: true })
  coordinates: Record<string, any>;
}
