import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';

/**
 * 할당 유형 열거형
 */
export enum AssignmentType {
  USER = 'user', // 사용자
  DEPARTMENT = 'department', // 부서
  PROJECT = 'project', // 프로젝트
  LOCATION = 'location', // 위치
  OTHER = 'other', // 기타
}

/**
 * 할당 상태 열거형
 */
export enum AssignmentStatus {
  PENDING = 'pending', // 대기 중
  ACTIVE = 'active', // 활성
  RETURNED = 'returned', // 반환됨
  OVERDUE = 'overdue', // 기한 초과
  LOST = 'lost', // 분실
  DAMAGED = 'damaged', // 손상
}

/**
 * 자산 할당 엔티티
 * 자산의 할당 기록을 관리합니다.
 */
@Entity('asset_assignments')
export class AssetAssignment extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.assignmentRecords, {
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
   * 할당 유형
   */
  @Column({
    type: 'enum',
    enum: AssignmentType,
    default: AssignmentType.USER,
  })
  type: AssignmentType;

  /**
   * 할당 상태
   */
  @Column({
    type: 'enum',
    enum: AssignmentStatus,
    default: AssignmentStatus.PENDING,
  })
  status: AssignmentStatus;

  /**
   * 할당 대상 사용자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 할당 대상 사용자 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToUserId: string;

  /**
   * 할당 대상 부서와의 다대일 관계
   */
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'assignedToDepartmentId' })
  assignedToDepartment: Department;

  /**
   * 할당 대상 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  assignedToDepartmentId: string;

  /**
   * 할당 대상 프로젝트 ID
   */
  @Column({ nullable: true })
  assignedToProjectId: string;

  /**
   * 할당 대상 위치
   */
  @Column({ nullable: true })
  assignedToLocation: string;

  /**
   * 할당 대상 기타
   */
  @Column({ nullable: true })
  assignedToOther: string;

  /**
   * 할당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedByUserId' })
  assignedByUser: User;

  /**
   * 할당자 ID (외래 키)
   */
  @Column()
  assignedByUserId: string;

  /**
   * 할당일
   */
  @Column({ type: 'date' })
  assignedDate: Date;

  /**
   * 예상 반환일
   */
  @Column({ type: 'date', nullable: true })
  expectedReturnDate: Date;

  /**
   * 실제 반환일
   */
  @Column({ type: 'date', nullable: true })
  actualReturnDate: Date;

  /**
   * 반환 확인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'returnedToUserId' })
  returnedToUser: User;

  /**
   * 반환 확인자 ID (외래 키)
   */
  @Column({ nullable: true })
  returnedToUserId: string;

  /**
   * 반환 상태
   */
  @Column({ nullable: true })
  returnCondition: string;

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
