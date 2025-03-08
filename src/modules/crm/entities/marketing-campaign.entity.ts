import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { CustomerSegment } from './customer-segment.entity';
import { MarketingCampaignTarget } from './marketing-campaign-target.entity';

/**
 * 캠페인 유형 열거형
 */
export enum CampaignType {
  EMAIL = 'email', // 이메일
  SMS = 'sms', // SMS
  SOCIAL = 'social', // 소셜 미디어
  EVENT = 'event', // 이벤트
  WEBINAR = 'webinar', // 웨비나
  ADVERTISEMENT = 'advertisement', // 광고
  DIRECT_MAIL = 'directMail', // 우편 발송
  OTHER = 'other', // 기타
}

/**
 * 캠페인 상태 열거형
 */
export enum CampaignStatus {
  DRAFT = 'draft', // 초안
  PLANNED = 'planned', // 계획됨
  ACTIVE = 'active', // 활성
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 마케팅 캠페인 엔티티
 * 마케팅 캠페인 정보를 관리합니다.
 */
@Entity('marketing_campaigns')
export class MarketingCampaign extends BaseEntity {
  /**
   * 캠페인 이름
   */
  @Column()
  name: string;

  /**
   * 캠페인 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 캠페인 유형
   */
  @Column({
    type: 'enum',
    enum: CampaignType,
  })
  type: CampaignType;

  /**
   * 캠페인 상태
   */
  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.DRAFT,
  })
  status: CampaignStatus;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column()
  ownerId: string;

  /**
   * 고객 세그먼트와의 다대일 관계
   */
  @ManyToOne(() => CustomerSegment, { nullable: true })
  @JoinColumn({ name: 'segmentId' })
  segment: CustomerSegment;

  /**
   * 고객 세그먼트 ID (외래 키)
   */
  @Column({ nullable: true })
  segmentId: string;

  /**
   * 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 예산
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  budget: number;

  /**
   * 실제 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  actualCost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 예상 응답률 (%)
   */
  @Column({ type: 'float', default: 0 })
  expectedResponseRate: number;

  /**
   * 실제 응답률 (%)
   */
  @Column({ type: 'float', default: 0 })
  actualResponseRate: number;

  /**
   * 예상 ROI (%)
   */
  @Column({ type: 'float', default: 0 })
  expectedROI: number;

  /**
   * 실제 ROI (%)
   */
  @Column({ type: 'float', default: 0 })
  actualROI: number;

  /**
   * 목표 대상 수
   */
  @Column({ type: 'int', default: 0 })
  targetCount: number;

  /**
   * 실제 도달 수
   */
  @Column({ type: 'int', default: 0 })
  reachedCount: number;

  /**
   * 응답 수
   */
  @Column({ type: 'int', default: 0 })
  responseCount: number;

  /**
   * 성공 수
   */
  @Column({ type: 'int', default: 0 })
  successCount: number;

  /**
   * 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 목표
   */
  @Column({ nullable: true })
  objectives: string;

  /**
   * 메시지
   */
  @Column({ type: 'text', nullable: true })
  message: string;

  /**
   * 채널
   */
  @Column({ nullable: true })
  channel: string;

  /**
   * 마케팅 캠페인 대상과의 일대다 관계
   */
  @OneToMany(() => MarketingCampaignTarget, (target) => target.campaign, {
    cascade: true,
  })
  targets: MarketingCampaignTarget[];

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
