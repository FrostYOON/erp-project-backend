import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { WarehouseLocation } from './warehouse-location.entity';
import { StockLevel } from './stock-level.entity';

/**
 * 창고 엔티티
 * 재고를 보관하는 물리적 위치를 관리합니다.
 */
@Entity('warehouses')
export class Warehouse extends BaseEntity {
  /**
   * 창고 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 창고 이름
   */
  @Column()
  name: string;

  /**
   * 창고 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

  /**
   * 도시
   */
  @Column({ nullable: true })
  city: string;

  /**
   * 주/도
   */
  @Column({ nullable: true })
  state: string;

  /**
   * 국가
   */
  @Column({ nullable: true })
  country: string;

  /**
   * 우편번호
   */
  @Column({ nullable: true })
  postalCode: string;

  /**
   * 연락처
   */
  @Column({ nullable: true })
  contactNumber: string;

  /**
   * 이메일
   */
  @Column({ nullable: true })
  email: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 기본 창고 여부
   */
  @Column({ default: false })
  isDefault: boolean;

  /**
   * 창고 위치와의 일대다 관계
   */
  @OneToMany(() => WarehouseLocation, (location) => location.warehouse)
  locations: WarehouseLocation[];

  /**
   * 재고 수준과의 일대다 관계
   */
  @OneToMany(() => StockLevel, (stockLevel) => stockLevel.warehouse)
  stockLevels: StockLevel[];

  /**
   * 위도
   */
  @Column({ type: 'float', nullable: true })
  latitude: number;

  /**
   * 경도
   */
  @Column({ type: 'float', nullable: true })
  longitude: number;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
