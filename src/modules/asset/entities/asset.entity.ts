import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { AssetCategory } from './asset-category.entity';
import { AssetLocation } from './asset-location.entity';
import { AssetStatus } from './asset-status.entity';
import { AssetMaintenance } from './asset-maintenance.entity';
import { AssetDepreciation } from './asset-depreciation.entity';
import { AssetAssignment } from './asset-assignment.entity';
import { AssetComponent } from './asset-component.entity';
import { AssetAttachment } from './asset-attachment.entity';

/**
 * 자산 유형 열거형
 */
export enum AssetType {
  TANGIBLE = 'tangible', // 유형 자산
  INTANGIBLE = 'intangible', // 무형 자산
  DIGITAL = 'digital', // 디지털 자산
  SOFTWARE = 'software', // 소프트웨어
  LICENSE = 'license', // 라이선스
  COMPONENT = 'component', // 구성 요소
}

/**
 * 자산 엔티티
 * 자산 정보를 관리합니다.
 */
@Entity('assets')
export class Asset extends BaseEntity {
  /**
   * 자산 이름
   */
  @Column()
  name: string;

  /**
   * 자산 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 자산 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 자산 유형
   */
  @Column({
    type: 'enum',
    enum: AssetType,
    default: AssetType.TANGIBLE,
  })
  type: AssetType;

  /**
   * 자산 카테고리와의 다대일 관계
   */
  @ManyToOne(() => AssetCategory, (category) => category.assets)
  @JoinColumn({ name: 'categoryId' })
  category: AssetCategory;

  /**
   * 자산 카테고리 ID (외래 키)
   */
  @Column()
  categoryId: string;

  /**
   * 자산 위치와의 다대일 관계
   */
  @ManyToOne(() => AssetLocation, (location) => location.assets)
  @JoinColumn({ name: 'locationId' })
  location: AssetLocation;

  /**
   * 자산 위치 ID (외래 키)
   */
  @Column()
  locationId: string;

  /**
   * 자산 상태와의 다대일 관계
   */
  @ManyToOne(() => AssetStatus, (status) => status.assets)
  @JoinColumn({ name: 'statusId' })
  status: AssetStatus;

  /**
   * 자산 상태 ID (외래 키)
   */
  @Column()
  statusId: string;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  managerId: string;

  /**
   * 제조사
   */
  @Column({ nullable: true })
  manufacturer: string;

  /**
   * 모델
   */
  @Column({ nullable: true })
  model: string;

  /**
   * 시리얼 번호
   */
  @Column({ nullable: true })
  serialNumber: string;

  /**
   * 바코드
   */
  @Column({ nullable: true })
  barcode: string;

  /**
   * RFID 태그
   */
  @Column({ nullable: true })
  rfidTag: string;

  /**
   * 구매일
   */
  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  /**
   * 구매 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  purchasePrice: number;

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
   * 보증 시작일
   */
  @Column({ type: 'date', nullable: true })
  warrantyStartDate: Date;

  /**
   * 보증 종료일
   */
  @Column({ type: 'date', nullable: true })
  warrantyEndDate: Date;

  /**
   * 내용연수 (월)
   */
  @Column({ type: 'int', nullable: true })
  lifespan: number;

  /**
   * 잔존가치
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  residualValue: number;

  /**
   * 감가상각 방법
   */
  @Column({ nullable: true })
  depreciationMethod: string;

  /**
   * 현재 가치
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  currentValue: number;

  /**
   * 폐기 예정일
   */
  @Column({ type: 'date', nullable: true })
  disposalDate: Date;

  /**
   * 폐기 방법
   */
  @Column({ nullable: true })
  disposalMethod: string;

  /**
   * 폐기 가격
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  disposalPrice: number;

  /**
   * 마지막 점검일
   */
  @Column({ type: 'date', nullable: true })
  lastInspectionDate: Date;

  /**
   * 다음 점검 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextInspectionDate: Date;

  /**
   * 마지막 유지보수일
   */
  @Column({ type: 'date', nullable: true })
  lastMaintenanceDate: Date;

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
   * 사용자 정의 필드 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  customFields: Record<string, any>;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 상위 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.components, { nullable: true })
  @JoinColumn({ name: 'parentAssetId' })
  parentAsset: Asset;

  /**
   * 상위 자산 ID (외래 키)
   */
  @Column({ nullable: true })
  parentAssetId: string;

  /**
   * 구성 요소와의 일대다 관계
   */
  @OneToMany(() => AssetComponent, (component) => component.asset)
  components: AssetComponent[];

  /**
   * 유지보수 기록과의 일대다 관계
   */
  @OneToMany(() => AssetMaintenance, (maintenance) => maintenance.asset)
  maintenanceRecords: AssetMaintenance[];

  /**
   * 감가상각 기록과의 일대다 관계
   */
  @OneToMany(() => AssetDepreciation, (depreciation) => depreciation.asset)
  depreciationRecords: AssetDepreciation[];

  /**
   * 할당 기록과의 일대다 관계
   */
  @OneToMany(() => AssetAssignment, (assignment) => assignment.asset)
  assignmentRecords: AssetAssignment[];

  /**
   * 첨부 파일과의 일대다 관계
   */
  @OneToMany(() => AssetAttachment, (attachment) => attachment.asset)
  attachments: AssetAttachment[];
}
