import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Journal } from './journal.entity';
import { Account } from './account.entity';

/**
 * 분개 항목 유형 열거형
 */
export enum JournalItemType {
  DEBIT = 'debit', // 차변
  CREDIT = 'credit', // 대변
}

/**
 * 분개 항목 엔티티
 * 분개의 차변 또는 대변 항목을 관리합니다.
 */
@Entity('journal_items')
export class JournalItem extends BaseEntity {
  /**
   * 분개와의 다대일 관계
   */
  @ManyToOne(() => Journal, (journal) => journal.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journalId' })
  journal: Journal;

  /**
   * 분개 ID (외래 키)
   */
  @Column()
  journalId: string;

  /**
   * 계정과의 다대일 관계
   */
  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  /**
   * 계정 ID (외래 키)
   */
  @Column()
  accountId: string;

  /**
   * 항목 유형 (차변/대변)
   */
  @Column({
    type: 'enum',
    enum: JournalItemType,
  })
  type: JournalItemType;

  /**
   * 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  /**
   * 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 참조 정보 (JSON 형식으로 저장)
   * 예: { "invoiceId": "123", "type": "invoice" }
   */
  @Column({ type: 'json', nullable: true })
  reference: Record<string, any>;
}
