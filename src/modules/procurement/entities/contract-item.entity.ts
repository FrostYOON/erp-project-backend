import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Contract } from './contract.entity';
import { Product } from '../../inventory/entities/product.entity';
import { UnitOfMeasure } from '../../inventory/entities/unit-of-measure.entity';

/**
 * 계약 항목 엔티티
 * 계약의 개별 항목을 관리합니다.
 */
@Entity('contract_items')
export class ContractItem extends BaseEntity {
  /**
   * 계약과의 다대일 관계
   */
  @ManyToOne(() => Contract, (contract) => contract.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contractId' })
  contract: Contract;

  /**
   * 계약 ID (외래 키)
   */
  @Column()
  contractId: string;

  /**
   * 제품과의 다대일 관계
   */
  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  /**
   * 제품 ID (외래 키)
   */
  @Column({ nullable: true })
  productId: string;

  /**
   * 항목 설명 (제품이 없는 경우)
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 측정 단위와의 다대일 관계
   */
  @ManyToOne(() => UnitOfMeasure, { nullable: true })
  @JoinColumn({ name: 'unitId' })
  unit: UnitOfMeasure;

  /**
   * 측정 단위 ID (외래 키)
   */
  @Column({ nullable: true })
  unitId: string;

  /**
   * 수량
   */
  @Column({ type: 'float', nullable: true })
  quantity: number;

  /**
   * 단가
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  unitPrice: number;

  /**
   * 총액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  total: number;

  /**
   * 최소 주문 수량
   */
  @Column({ type: 'float', nullable: true })
  minimumOrderQuantity: number;

  /**
   * 리드 타임 (일)
   */
  @Column({ type: 'int', nullable: true })
  leadTimeDays: number;

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
