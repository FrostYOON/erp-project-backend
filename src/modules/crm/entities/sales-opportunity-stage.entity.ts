import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SalesOpportunity } from './sales-opportunity.entity';

/**
 * 영업 기회 단계 엔티티
 * 영업 기회의 진행 단계를 관리합니다.
 */
@Entity('sales_opportunity_stages')
export class SalesOpportunityStage extends BaseEntity {
  /**
   * 단계 이름
   */
  @Column()
  name: string;

  /**
   * 단계 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 단계 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 순서
   */
  @Column({ type: 'int' })
  sequence: number;

  /**
   * 기본 확률 (%)
   */
  @Column({ type: 'float', default: 0 })
  defaultProbability: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 색상 코드
   */
  @Column({ nullable: true })
  colorCode: string;

  /**
   * 아이콘
   */
  @Column({ nullable: true })
  icon: string;

  /**
   * 영업 기회와의 일대다 관계
   */
  @OneToMany(() => SalesOpportunity, (opportunity) => opportunity.stage)
  opportunities: SalesOpportunity[];
}
