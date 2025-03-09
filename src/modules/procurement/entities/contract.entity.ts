import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Supplier } from './supplier.entity';
import { ContractItem } from './contract-item.entity';

/**
 * 계약 상태 열거형
 */
export enum ContractStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 승인 대기
  ACTIVE = 'active', // 활성
  EXPIRED = 'expired', // 만료됨
  TERMINATED = 'terminated', // 종료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 계약 유형 열거형
 */
export enum ContractType {
  PURCHASE = 'purchase', // 구매 계약
  SERVICE = 'service', // 서비스 계약
  FRAMEWORK = 'framework', // 기본 계약
  BLANKET = 'blanket', // 포괄 계약
}

/**
 * 계약 엔티티
 * 공급업체와의 계약을 관리합니다.
 */
@Entity('contracts')
export class Contract extends BaseEntity {
  /**
   * 계약 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 계약 제목
   */
  @Column()
  title: string;

  /**
   * 계약 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 계약 상태
   */
  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.DRAFT,
  })
  status: ContractStatus;

  /**
   * 계약 유형
   */
  @Column({
    type: 'enum',
    enum: ContractType,
  })
  type: ContractType;

  /**
   * 공급업체와의 다대일 관계
   */
  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  /**
   * 공급업체 ID (외래 키)
   */
  @Column()
  supplierId: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

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
   * 계약 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 계약 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 계약 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 결제 조건
   */
  @Column({ nullable: true })
  paymentTerms: string;

  /**
   * 배송 조건
   */
  @Column({ nullable: true })
  deliveryTerms: string;

  /**
   * 계약 항목과의 일대다 관계
   */
  @OneToMany(() => ContractItem, (item) => item.contract, { cascade: true })
  items: ContractItem[];

  /**
   * 갱신 알림 일수
   */
  @Column({ type: 'int', default: 30 })
  renewalNoticeDays: number;

  /**
   * 자동 갱신 여부
   */
  @Column({ default: false })
  autoRenew: boolean;

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
