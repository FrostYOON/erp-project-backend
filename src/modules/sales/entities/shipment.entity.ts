import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { SalesOrder } from './sales-order.entity';
import { Warehouse } from '../../inventory/entities/warehouse.entity';
import { ShipmentItem } from './shipment-item.entity';

/**
 * 출하 상태 열거형
 */
export enum ShipmentStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 승인 대기
  APPROVED = 'approved', // 승인됨
  PICKED = 'picked', // 피킹 완료
  PACKED = 'packed', // 포장 완료
  SHIPPED = 'shipped', // 출하 완료
  DELIVERED = 'delivered', // 배송 완료
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 출하 엔티티
 * 판매 주문에 대한 제품 출하를 관리합니다.
 */
@Entity('shipments')
export class Shipment extends BaseEntity {
  /**
   * 출하 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 출하 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 출하 상태
   */
  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.DRAFT,
  })
  status: ShipmentStatus;

  /**
   * 판매 주문과의 다대일 관계
   */
  @ManyToOne(() => SalesOrder, (order) => order.shipments)
  @JoinColumn({ name: 'salesOrderId' })
  salesOrder: SalesOrder;

  /**
   * 판매 주문 ID (외래 키)
   */
  @Column()
  salesOrderId: string;

  /**
   * 창고와의 다대일 관계
   */
  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  /**
   * 창고 ID (외래 키)
   */
  @Column()
  warehouseId: string;

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
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

  /**
   * 배송 주소
   */
  @Column()
  deliveryAddress: string;

  /**
   * 배송 도시
   */
  @Column()
  deliveryCity: string;

  /**
   * 배송 주/도
   */
  @Column({ nullable: true })
  deliveryState: string;

  /**
   * 배송 국가
   */
  @Column()
  deliveryCountry: string;

  /**
   * 배송 우편번호
   */
  @Column()
  deliveryPostalCode: string;

  /**
   * 배송 연락처 이름
   */
  @Column()
  contactName: string;

  /**
   * 배송 연락처 전화번호
   */
  @Column()
  contactPhone: string;

  /**
   * 배송 연락처 이메일
   */
  @Column({ nullable: true })
  contactEmail: string;

  /**
   * 배송 방법
   */
  @Column({ nullable: true })
  shippingMethod: string;

  /**
   * 배송 업체
   */
  @Column({ nullable: true })
  carrier: string;

  /**
   * 추적 번호
   */
  @Column({ nullable: true })
  trackingNumber: string;

  /**
   * 예상 배송 날짜
   */
  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  /**
   * 실제 배송 날짜
   */
  @Column({ type: 'date', nullable: true })
  actualDeliveryDate: Date;

  /**
   * 출하 항목과의 일대다 관계
   */
  @OneToMany(() => ShipmentItem, (item) => item.shipment, { cascade: true })
  items: ShipmentItem[];

  /**
   * 총 중량
   */
  @Column({ type: 'float', nullable: true })
  totalWeight: number;

  /**
   * 총 부피
   */
  @Column({ type: 'float', nullable: true })
  totalVolume: number;

  /**
   * 패키지 수
   */
  @Column({ type: 'int', default: 1 })
  packageCount: number;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
