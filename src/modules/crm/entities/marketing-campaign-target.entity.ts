import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { MarketingCampaign } from './marketing-campaign.entity';
import { Customer } from './customer.entity';
import { CustomerContact } from './customer-contact.entity';

/**
 * 대상 상태 열거형
 */
export enum TargetStatus {
  PENDING = 'pending', // 대기 중
  SENT = 'sent', // 발송됨
  DELIVERED = 'delivered', // 전달됨
  OPENED = 'opened', // 열람됨
  CLICKED = 'clicked', // 클릭됨
  RESPONDED = 'responded', // 응답함
  CONVERTED = 'converted', // 전환됨
  BOUNCED = 'bounced', // 반송됨
  UNSUBSCRIBED = 'unsubscribed', // 구독 취소
  FAILED = 'failed', // 실패
}

/**
 * 마케팅 캠페인 대상 엔티티
 * 마케팅 캠페인의 대상 고객을 관리합니다.
 */
@Entity('marketing_campaign_targets')
export class MarketingCampaignTarget extends BaseEntity {
  /**
   * 캠페인과의 다대일 관계
   */
  @ManyToOne(() => MarketingCampaign, (campaign) => campaign.targets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campaignId' })
  campaign: MarketingCampaign;

  /**
   * 캠페인 ID (외래 키)
   */
  @Column()
  campaignId: string;

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
   * 고객 연락처와의 다대일 관계
   */
  @ManyToOne(() => CustomerContact, { nullable: true })
  @JoinColumn({ name: 'contactId' })
  contact: CustomerContact;

  /**
   * 고객 연락처 ID (외래 키)
   */
  @Column({ nullable: true })
  contactId: string;

  /**
   * 대상 상태
   */
  @Column({
    type: 'enum',
    enum: TargetStatus,
    default: TargetStatus.PENDING,
  })
  status: TargetStatus;

  /**
   * 발송일시
   */
  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  /**
   * 전달일시
   */
  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  /**
   * 열람일시
   */
  @Column({ type: 'timestamp', nullable: true })
  openedAt: Date;

  /**
   * 클릭일시
   */
  @Column({ type: 'timestamp', nullable: true })
  clickedAt: Date;

  /**
   * 응답일시
   */
  @Column({ type: 'timestamp', nullable: true })
  respondedAt: Date;

  /**
   * 전환일시
   */
  @Column({ type: 'timestamp', nullable: true })
  convertedAt: Date;

  /**
   * 반송일시
   */
  @Column({ type: 'timestamp', nullable: true })
  bouncedAt: Date;

  /**
   * 구독 취소일시
   */
  @Column({ type: 'timestamp', nullable: true })
  unsubscribedAt: Date;

  /**
   * 실패일시
   */
  @Column({ type: 'timestamp', nullable: true })
  failedAt: Date;

  /**
   * 실패 이유
   */
  @Column({ nullable: true })
  failureReason: string;

  /**
   * 응답 데이터 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  responseData: Record<string, any>;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;
}
