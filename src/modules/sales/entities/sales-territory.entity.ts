import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { SalesTerritoryCustomer } from './sales-territory-customer.entity';

/**
 * 판매 영역 엔티티
 * 판매 지역 및 담당자를 관리합니다.
 */
@Entity('sales_territories')
export class SalesTerritory extends BaseEntity {
  /**
   * 영역 이름
   */
  @Column()
  name: string;

  /**
   * 영역 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 영역 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 지역
   */
  @Column({ nullable: true })
  region: string;

  /**
   * 국가
   */
  @Column({ nullable: true })
  country: string;

  /**
   * 주/도
   */
  @Column({ nullable: true })
  state: string;

  /**
   * 도시
   */
  @Column({ nullable: true })
  city: string;

  /**
   * 우편번호 범위 (JSON 형식으로 저장)
   * 예: { "from": "10000", "to": "19999" }
   */
  @Column({ type: 'json', nullable: true })
  postalCodeRange: Record<string, string>;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'salesRepresentativeId' })
  salesRepresentative: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column()
  salesRepresentativeId: string;

  /**
   * 관리자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  /**
   * 관리자 ID (외래 키)
   */
  @Column({ nullable: true })
  managerId: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 판매 목표 (연간)
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  annualTarget: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 고객 관계와의 일대다 관계
   */
  @OneToMany(() => SalesTerritoryCustomer, (customer) => customer.territory)
  customers: SalesTerritoryCustomer[];

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
