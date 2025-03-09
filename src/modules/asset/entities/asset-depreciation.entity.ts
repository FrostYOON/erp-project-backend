import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 감가상각 방법 열거형
 */
export enum DepreciationMethod {
  STRAIGHT_LINE = 'straightLine', // 정액법
  DECLINING_BALANCE = 'decliningBalance', // 정률법
  SUM_OF_YEARS_DIGITS = 'sumOfYearsDigits', // 연수합계법
  UNITS_OF_PRODUCTION = 'unitsOfProduction', // 생산량비례법
  CUSTOM = 'custom', // 사용자 정의
}

/**
 * 자산 감가상각 엔티티
 * 자산의 감가상각 기록을 관리합니다.
 */
@Entity('asset_depreciations')
export class AssetDepreciation extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.depreciationRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  /**
   * 자산 ID (외래 키)
   */
  @Column()
  assetId: string;

  /**
   * 감가상각 기간 (년/월)
   */
  @Column()
  period: string;

  /**
   * 감가상각 방법
   */
  @Column({
    type: 'enum',
    enum: DepreciationMethod,
    default: DepreciationMethod.STRAIGHT_LINE,
  })
  method: DepreciationMethod;

  /**
   * 감가상각 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 감가상각 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 초기 가치
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  initialValue: number;

  /**
   * 잔존 가치
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  residualValue: number;

  /**
   * 감가상각 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  depreciationAmount: number;

  /**
   * 누적 감가상각 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  accumulatedDepreciation: number;

  /**
   * 장부 가치
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  bookValue: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 계산자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'calculatedByUserId' })
  calculatedByUser: User;

  /**
   * 계산자 ID (외래 키)
   */
  @Column()
  calculatedByUserId: string;

  /**
   * 계산일
   */
  @Column({ type: 'date' })
  calculationDate: Date;

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
