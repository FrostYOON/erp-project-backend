import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Journal } from './journal.entity';

/**
 * 거래 유형 열거형
 */
export enum TransactionType {
  INCOME = 'income', // 수입
  EXPENSE = 'expense', // 지출
  TRANSFER = 'transfer', // 이체
  ADJUSTMENT = 'adjustment', // 조정
}

/**
 * 거래 상태 열거형
 */
export enum TransactionStatus {
  PENDING = 'pending', // 대기 중
  COMPLETED = 'completed', // 완료
  FAILED = 'failed', // 실패
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 거래 엔티티
 * 실제 금융 거래를 관리합니다.
 */
@Entity('transactions')
export class Transaction extends BaseEntity {
  /**
   * 거래 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 거래 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 거래 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 거래 유형
   */
  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  /**
   * 거래 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  /**
   * 거래 상태
   */
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  /**
   * 참조 번호
   */
  @Column({ nullable: true })
  reference: string;

  /**
   * 분개와의 일대일 관계
   */
  @OneToOne(() => Journal)
  @JoinColumn({ name: 'journalId' })
  journal: Journal;

  /**
   * 분개 ID (외래 키)
   */
  @Column({ nullable: true })
  journalId: string;

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
   * 메모
   */
  @Column({ nullable: true })
  note: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 원본 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;
}
