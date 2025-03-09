import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';

/**
 * 자산 구성 요소 엔티티
 * 자산의 구성 요소를 관리합니다.
 */
@Entity('asset_components')
export class AssetComponent extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.components, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  /**
   * 자산 ID (외래 키)
   */
  @Column()
  assetId: string;

  /**
   * 구성 요소 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, { nullable: true })
  @JoinColumn({ name: 'componentAssetId' })
  componentAsset: Asset;

  /**
   * 구성 요소 자산 ID (외래 키)
   */
  @Column({ nullable: true })
  componentAssetId: string;

  /**
   * 구성 요소 이름
   */
  @Column()
  name: string;

  /**
   * 구성 요소 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 수량
   */
  @Column({ type: 'int', default: 1 })
  quantity: number;

  /**
   * 시리얼 번호
   */
  @Column({ nullable: true })
  serialNumber: string;

  /**
   * 모델
   */
  @Column({ nullable: true })
  model: string;

  /**
   * 제조사
   */
  @Column({ nullable: true })
  manufacturer: string;

  /**
   * 설치일
   */
  @Column({ type: 'date', nullable: true })
  installationDate: Date;

  /**
   * 보증 종료일
   */
  @Column({ type: 'date', nullable: true })
  warrantyEndDate: Date;

  /**
   * 교체 주기 (월)
   */
  @Column({ type: 'int', nullable: true })
  replacementCycle: number;

  /**
   * 다음 교체 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextReplacementDate: Date;

  /**
   * 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 중요도
   */
  @Column({ type: 'int', default: 0 })
  importance: number;

  /**
   * 상태
   */
  @Column({ nullable: true })
  status: string;

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
