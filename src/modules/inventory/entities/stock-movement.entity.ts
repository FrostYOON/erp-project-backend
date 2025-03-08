import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';
import { WarehouseLocation } from './warehouse-location.entity';
import { UnitOfMeasure } from './unit-of-measure.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 재고 이동 유형 열거형
 */
export enum MovementType {
  RECEIPT = 'receipt', // 입고
  ISSUE = 'issue', // 출고
  TRANSFER = 'transfer', // 이동
  ADJUSTMENT = 'adjustment', // 조정
  RETURN = 'return', // 반품
  SCRAP = 'scrap', // 폐기
}

/**
 * 재고 이동 엔티티
 * 재고의 입출고 및 이동을 추적합니다.
 */
@Entity('stock_movements')
export class StockMovement extends BaseEntity {
  /**
   * 이동 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 이동 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 이동 유형
   */
  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

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
   * 출발 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse, { nullable: true })
  @JoinColumn({ name: 'sourceWarehouseId' })
  sourceWarehouse: Warehouse;

  /**
   * 출발 창고 ID (외래 키)
   */
  @Column({ nullable: true })
  sourceWarehouseId: string;

  /**
   * 출발 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, { nullable: true })
  @JoinColumn({ name: 'sourceLocationId' })
  sourceLocation: WarehouseLocation;

  /**
   * 출발 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  sourceLocationId: string;

  /**
   * 도착 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse, { nullable: true })
  @JoinColumn({ name: 'destinationWarehouseId' })
  destinationWarehouse: Warehouse;

  /**
   * 도착 창고 ID (외래 키)
   */
  @Column({ nullable: true })
  destinationWarehouseId: string;

  /**
   * 도착 위치와의 다대일 관계
   */
  @ManyToOne(() => WarehouseLocation, { nullable: true })
  @JoinColumn({ name: 'destinationLocationId' })
  destinationLocation: WarehouseLocation;

  /**
   * 도착 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  destinationLocationId: string;

  /**
   * 참조 문서 유형 (구매 주문, 판매 주문, 생산 주문 등)
   */
  @Column({ nullable: true })
  referenceType: string;

  /**
   * 참조 문서 ID
   */
  @Column({ nullable: true })
  referenceId: string;

  /**
   * 참조 문서 번호
   */
  @Column({ nullable: true })
  referenceNumber: string;

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
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

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
