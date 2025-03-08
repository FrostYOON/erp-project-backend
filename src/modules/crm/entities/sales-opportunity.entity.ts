import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { User } from '../../users/entities/user.entity';
import { SalesOpportunityStage } from './sales-opportunity-stage.entity';
import { SalesOpportunityProduct } from './sales-opportunity-product.entity';

/**
 * 영업 기회 상태 열거형
 */
export enum OpportunityStatus {
  OPEN = 'open', // 진행 중
  WON = 'won', // 성공
  LOST = 'lost', // 실패
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 영업 기회 우선순위 열거형
 */
export enum OpportunityPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  CRITICAL = 'critical', // 매우 높음
}

/**
 * 영업 기회 엔티티
 * 잠재적인 영업 기회를 관리합니다.
 */
@Entity('sales_opportunities')
export class SalesOpportunity extends BaseEntity {
  /**
   * 영업 기회 이름
   */
  @Column()
  name: string;

  /**
   * 영업 기회 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 영업 기회 상태
   */
  @Column({
    type: 'enum',
    enum: OpportunityStatus,
    default: OpportunityStatus.OPEN,
  })
  status: OpportunityStatus;

  /**
   * 영업 기회 우선순위
   */
  @Column({
    type: 'enum',
    enum: OpportunityPriority,
    default: OpportunityPriority.MEDIUM,
  })
  priority: OpportunityPriority;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.opportunities)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column()
  customerId: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column()
  assignedToUserId: string;

  /**
   * 영업 기회 단계와의 다대일 관계
   */
  @ManyToOne(() => SalesOpportunityStage)
  @JoinColumn({ name: 'stageId' })
  stage: SalesOpportunityStage;

  /**
   * 영업 기회 단계 ID (외래 키)
   */
  @Column()
  stageId: string;

  /**
   * 예상 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  expectedAmount: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 성공 확률 (%)
   */
  @Column({ type: 'float', default: 0 })
  probability: number;

  /**
   * 예상 마감일
   */
  @Column({ type: 'date' })
  expectedCloseDate: Date;

  /**
   * 실제 마감일
   */
  @Column({ type: 'date', nullable: true })
  actualCloseDate: Date;

  /**
   * 획득 경로
   */
  @Column({ nullable: true })
  source: string;

  /**
   * 캠페인 ID
   */
  @Column({ nullable: true })
  campaignId: string;

  /**
   * 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 실패 이유
   */
  @Column({ nullable: true })
  lostReason: string;

  /**
   * 경쟁사
   */
  @Column({ nullable: true })
  competitors: string;

  /**
   * 다음 단계
   */
  @Column({ nullable: true })
  nextStep: string;

  /**
   * 다음 연락 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextContactDate: Date;

  /**
   * 영업 기회 제품과의 일대다 관계
   */
  @OneToMany(() => SalesOpportunityProduct, (product) => product.opportunity, {
    cascade: true,
  })
  products: SalesOpportunityProduct[];

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
