import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 보험 유형 열거형
 */
export enum InsuranceType {
  PROPERTY = 'property', // 재산 보험
  LIABILITY = 'liability', // 책임 보험
  CASUALTY = 'casualty', // 상해 보험
  COMPREHENSIVE = 'comprehensive', // 종합 보험
  SPECIALIZED = 'specialized', // 특수 보험
  OTHER = 'other', // 기타
}

/**
 * 자산 보험 엔티티
 * 자산의 보험 정보를 관리합니다.
 */
@Entity('asset_insurances')
export class AssetInsurance extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  /**
   * 자산 ID (외래 키)
   */
  @Column()
  assetId: string;

  /**
   * 보험 정책 번호
   */
  @Column()
  policyNumber: string;

  /**
   * 보험 제공자
   */
  @Column()
  provider: string;

  /**
   * 보험 유형
   */
  @Column({
    type: 'enum',
    enum: InsuranceType,
    default: InsuranceType.PROPERTY,
  })
  type: InsuranceType;

  /**
   * 보험 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 보험 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 보험 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 보험 갱신일
   */
  @Column({ type: 'date', nullable: true })
  renewalDate: Date;

  /**
   * 보험 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  coverageAmount: number;

  /**
   * 보험료
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  premium: number;

  /**
   * 공제액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  deductible: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 보험 계약자
   */
  @Column({ nullable: true })
  policyholder: string;

  /**
   * 보험 담당자
   */
  @Column({ nullable: true })
  contactPerson: string;

  /**
   * 보험 담당자 연락처
   */
  @Column({ nullable: true })
  contactPhone: string;

  /**
   * 보험 담당자 이메일
   */
  @Column({ nullable: true })
  contactEmail: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'managedByUserId' })
  managedByUser: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  managedByUserId: string;

  /**
   * 알림 활성화 여부
   */
  @Column({ default: true })
  notificationsEnabled: boolean;

  /**
   * 알림 기간 (일)
   */
  @Column({ type: 'int', default: 30 })
  notificationDays: number;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
