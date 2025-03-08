import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SalesTerritory } from './sales-territory.entity';
import { Customer } from './customer.entity';

/**
 * 판매 영역 고객 엔티티
 * 판매 영역과 고객 간의 관계를 관리합니다.
 */
@Entity('sales_territory_customers')
export class SalesTerritoryCustomer extends BaseEntity {
  /**
   * 판매 영역과의 다대일 관계
   */
  @ManyToOne(() => SalesTerritory, (territory) => territory.customers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'territoryId' })
  territory: SalesTerritory;

  /**
   * 판매 영역 ID (외래 키)
   */
  @Column()
  territoryId: string;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column()
  customerId: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;
}
