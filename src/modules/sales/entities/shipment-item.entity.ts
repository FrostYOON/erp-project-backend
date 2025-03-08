import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Shipment } from './shipment.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';
import { SalesOrderItem } from './sales-order-item.entity';
import { WarehouseLocation } from '../../inventory/entities/warehouse-location.entity';

/**
 * 출하 항목 상태 열거형
 */
export enum ShipmentItemStatus {
  PENDING = 'pending', // 대기 중
  PICKED = 'picked', // 피킹 완료
  PACKED = 'packed', // 포장 완료
  SHIPPED = 'shipped', // 출하 완료
}

/**
 * 출하 항목 엔티티
 * 출하의 개별 항목을 관리합니다.
 */
@Entity('shipment_items')
export class ShipmentItem extends BaseEntity {
  /**
   * 출하와의 다대일 관계
   */
  @ManyToOne(() => Shipment, (shipment) => shipment.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  /**
   * 출하 ID (외래 키)
   */
  @Column()
  shipmentId: string;

  /**
   * 판매 주문 항목과의 다대일 관계
   */
  @ManyToOne(() => SalesOrderItem)
  @JoinColumn({ name: 'salesOrderItemId' })
  salesOrderItem: SalesOrderItem;

  /**
   * 판매 주문 항목 ID (외래 키)
   */
  @Column()
  salesOrderItemId: string;

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
   * 주문 수량
   */
  @Column({ type: 'float' })
  orderedQuantity: number;

  /**
   * 출하 수량
   */
  @Column({ type: 'float' })
  shippedQuantity: number;

  /**
   * 항목 상태
   */
  @Column({
    type: 'enum',
    enum: ShipmentItemStatus,
    default: ShipmentItemStatus.PENDING,
  })
  status: ShipmentItemStatus;

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
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unitPrice: number;

  /**
   * 총액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  total: number;

  /**
   * 중량
   */
  @Column({ type: 'float', nullable: true })
  weight: number;

  /**
   * 부피
   */
  @Column({ type: 'float', nullable: true })
  volume: number;

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
