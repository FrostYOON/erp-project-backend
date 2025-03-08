import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PriceListItem } from './price-list-item.entity';

/**
 * 가격표 유형 열거형
 */
export enum PriceListType {
  SALE = 'sale', // 판매 가격
  PURCHASE = 'purchase', // 구매 가격
  SPECIAL = 'special', // 특별 가격
}

/**
 * 가격표 엔티티
 * 제품 가격 정책을 관리합니다.
 */
@Entity('price_lists')
export class PriceList extends BaseEntity {
  /**
   * 가격표 이름
   */
  @Column()
  name: string;

  /**
   * 가격표 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 가격표 유형
   */
  @Column({
    type: 'enum',
    enum: PriceListType,
    default: PriceListType.SALE,
  })
  type: PriceListType;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 기본 가격표 여부
   */
  @Column({ default: false })
  isDefault: boolean;

  /**
   * 고객 그룹
   */
  @Column({ nullable: true })
  customerGroup: string;

  /**
   * 최소 주문 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  minimumOrderAmount: number;

  /**
   * 가격표 항목과의 일대다 관계
   */
  @OneToMany(() => PriceListItem, (item) => item.priceList, { cascade: true })
  items: PriceListItem[];

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
