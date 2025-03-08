import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { FiscalPeriod } from './fiscal-period.entity';
import { JournalItem } from './journal-item.entity';

/**
 * 분개 상태 열거형
 */
export enum JournalStatus {
  DRAFT = 'draft', // 초안
  POSTED = 'posted', // 전기됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 분개 유형 열거형
 */
export enum JournalType {
  NORMAL = 'normal', // 일반
  ADJUSTMENT = 'adjustment', // 조정
  CLOSING = 'closing', // 마감
  OPENING = 'opening', // 개시
}

/**
 * 분개 엔티티
 * 회계 거래의 분개를 관리합니다.
 */
@Entity('journals')
export class Journal extends BaseEntity {
  /**
   * 분개 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 분개 날짜
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * 분개 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 참조 번호
   */
  @Column({ nullable: true })
  reference: string;

  /**
   * 분개 상태
   */
  @Column({
    type: 'enum',
    enum: JournalStatus,
    default: JournalStatus.DRAFT,
  })
  status: JournalStatus;

  /**
   * 분개 유형
   */
  @Column({
    type: 'enum',
    enum: JournalType,
    default: JournalType.NORMAL,
  })
  type: JournalType;

  /**
   * 총 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;

  /**
   * 회계 기간과의 다대일 관계
   */
  @ManyToOne(() => FiscalPeriod)
  @JoinColumn({ name: 'fiscalPeriodId' })
  fiscalPeriod: FiscalPeriod;

  /**
   * 회계 기간 ID (외래 키)
   */
  @Column()
  fiscalPeriodId: string;

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
   * 분개 항목과의 일대다 관계
   */
  @OneToMany(() => JournalItem, (item) => item.journal, { cascade: true })
  items: JournalItem[];

  /**
   * 원본 문서 URL
   */
  @Column({ nullable: true })
  documentUrl: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
