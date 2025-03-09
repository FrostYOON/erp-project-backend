import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Warehouse } from './warehouse.entity';
import { InventoryAdjustmentItem } from './inventory-adjustment-item.entity';

/**
 * 재고 조정 상태 열거형
 */
export enum AdjustmentStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 대기 중
  APPROVED = 'approved', // 승인됨
  POSTED = 'posted', // 전기됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 재고 조정 유형 열거형
 */
export enum AdjustmentType {
  PHYSICAL_COUNT = 'physicalCount', // 실사
  DAMAGE = 'damage', // 손상
  EXPIRY = 'expiry', // 만료
  THEFT = 'theft', // 도난
  OTHER = 'other', // 기타
}

/**
 * 재고 조정 엔티티
 * 재고 수량 조정을 관리합니다.
 */
@Entity('inventory_adjustments')
export class InventoryAdjustment extends BaseEntity {
  /**
   * 조정 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 조정 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 조정 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 조정 상태
   */
  @Column({
    type: 'enum',
    enum: AdjustmentStatus,
    default: AdjustmentStatus.DRAFT,
  })
  status: AdjustmentStatus;

  /**
   * 조정 유형
   */
  @Column({
    type: 'enum',
    enum: AdjustmentType,
  })
  type: AdjustmentType;

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
   * 참조 문서 번호
   */
  @Column({ nullable: true })
  referenceNumber: string;

  /**
   * 조정 항목과의 일대다 관계
   */
  @OneToMany(() => InventoryAdjustmentItem, (item) => item.adjustment, {
    cascade: true,
  })
  items: InventoryAdjustmentItem[];

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
