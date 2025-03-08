import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { PurchaseRequisitionItem } from './purchase-requisition-item.entity';

/**
 * 구매 요청 상태 열거형
 */
export enum RequisitionStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 승인 대기
  APPROVED = 'approved', // 승인됨
  REJECTED = 'rejected', // 거절됨
  ORDERED = 'ordered', // 주문됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 구매 요청 우선순위 열거형
 */
export enum RequisitionPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  URGENT = 'urgent', // 긴급
}

/**
 * 구매 요청 엔티티
 * 내부 부서에서 요청하는 구매 요청을 관리합니다.
 */
@Entity('purchase_requisitions')
export class PurchaseRequisition extends BaseEntity {
  /**
   * 요청 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 요청 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 요청 제목
   */
  @Column()
  title: string;

  /**
   * 요청 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 요청 상태
   */
  @Column({
    type: 'enum',
    enum: RequisitionStatus,
    default: RequisitionStatus.DRAFT,
  })
  status: RequisitionStatus;

  /**
   * 요청 우선순위
   */
  @Column({
    type: 'enum',
    enum: RequisitionPriority,
    default: RequisitionPriority.MEDIUM,
  })
  priority: RequisitionPriority;

  /**
   * 요청자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'requestedByUserId' })
  requestedByUser: User;

  /**
   * 요청자 ID (외래 키)
   */
  @Column()
  requestedByUserId: string;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column()
  departmentId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

  /**
   * 필요 날짜
   */
  @Column({ type: 'date' })
  requiredDate: Date;

  /**
   * 예상 총액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  estimatedTotal: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 구매 요청 항목과의 일대다 관계
   */
  @OneToMany(() => PurchaseRequisitionItem, (item) => item.requisition, {
    cascade: true,
  })
  items: PurchaseRequisitionItem[];

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

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
