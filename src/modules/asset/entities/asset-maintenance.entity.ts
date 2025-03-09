import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 유지보수 유형 열거형
 */
export enum MaintenanceType {
  PREVENTIVE = 'preventive', // 예방 정비
  CORRECTIVE = 'corrective', // 수리 정비
  PREDICTIVE = 'predictive', // 예측 정비
  INSPECTION = 'inspection', // 점검
  CALIBRATION = 'calibration', // 교정
  UPGRADE = 'upgrade', // 업그레이드
  OTHER = 'other', // 기타
}

/**
 * 유지보수 상태 열거형
 */
export enum MaintenanceStatus {
  SCHEDULED = 'scheduled', // 예정됨
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
  DEFERRED = 'deferred', // 연기됨
}

/**
 * 자산 유지보수 엔티티
 * 자산의 유지보수 기록을 관리합니다.
 */
@Entity('asset_maintenances')
export class AssetMaintenance extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.maintenanceRecords, {
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
   * 유지보수 제목
   */
  @Column()
  title: string;

  /**
   * 유지보수 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 유지보수 유형
   */
  @Column({
    type: 'enum',
    enum: MaintenanceType,
    default: MaintenanceType.PREVENTIVE,
  })
  type: MaintenanceType;

  /**
   * 유지보수 상태
   */
  @Column({
    type: 'enum',
    enum: MaintenanceStatus,
    default: MaintenanceStatus.SCHEDULED,
  })
  status: MaintenanceStatus;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToUserId: string;

  /**
   * 수행자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'performedByUserId' })
  performedByUser: User;

  /**
   * 수행자 ID (외래 키)
   */
  @Column({ nullable: true })
  performedByUserId: string;

  /**
   * 예정일
   */
  @Column({ type: 'date' })
  scheduledDate: Date;

  /**
   * 시작일
   */
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  /**
   * 완료일
   */
  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  /**
   * 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 공급업체
   */
  @Column({ nullable: true })
  supplier: string;

  /**
   * 주문 번호
   */
  @Column({ nullable: true })
  orderNumber: string;

  /**
   * 결과
   */
  @Column({ nullable: true, type: 'text' })
  result: string;

  /**
   * 다음 유지보수 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextMaintenanceDate: Date;

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
