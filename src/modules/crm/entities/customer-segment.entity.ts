import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';

/**
 * 고객 세그먼트 엔티티
 * 고객을 분류하는 세그먼트를 관리합니다.
 */
@Entity('customer_segments')
export class CustomerSegment extends BaseEntity {
  /**
   * 세그먼트 이름
   */
  @Column()
  name: string;

  /**
   * 세그먼트 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 세그먼트 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 우선순위
   */
  @Column({ type: 'int', default: 0 })
  priority: number;

  /**
   * 색상 코드
   */
  @Column({ nullable: true })
  colorCode: string;

  /**
   * 고객과의 일대다 관계
   */
  @OneToMany(() => Customer, (customer) => customer.segment)
  customers: Customer[];

  /**
   * 기준 조건 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  criteria: Record<string, any>;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
