import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 계정 유형 열거형
 */
export enum AccountType {
  ASSET = 'asset', // 자산
  LIABILITY = 'liability', // 부채
  EQUITY = 'equity', // 자본
  REVENUE = 'revenue', // 수익
  EXPENSE = 'expense', // 비용
}

/**
 * 계정 과목 엔티티
 * 회계 시스템의 계정 과목을 관리합니다.
 */
@Entity('accounts')
export class Account extends BaseEntity {
  /**
   * 계정 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 계정 이름
   */
  @Column()
  name: string;

  /**
   * 계정 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 계정 유형
   */
  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  /**
   * 상위 계정과의 다대일 관계
   */
  @ManyToOne(() => Account, (account) => account.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Account;

  /**
   * 상위 계정 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 계정 목록
   */
  @OneToMany(() => Account, (account) => account.parent)
  children: Account[];

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 잔액 방향 (차변/대변)
   * debit: 차변, credit: 대변
   */
  @Column({ enum: ['debit', 'credit'] })
  balanceDirection: string;

  /**
   * 현재 잔액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  currentBalance: number;

  /**
   * 예산 금액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  budgetAmount: number;

  /**
   * 계정 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 계정 레벨 (계층 구조에서의 깊이)
   */
  @Column({ type: 'int', default: 1 })
  level: number;

  /**
   * 계정 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;
}
