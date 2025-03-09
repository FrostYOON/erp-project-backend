import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Goal } from './goal.entity';

/**
 * 평가 주기 열거형
 */
export enum EvaluationPeriod {
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semiAnnual',
  ANNUAL = 'annual',
}

/**
 * 평가 상태 열거형
 */
export enum EvaluationStatus {
  PENDING = 'pending',
  SELF_EVALUATION = 'selfEvaluation',
  MANAGER_REVIEW = 'managerReview',
  COMPLETED = 'completed',
}

/**
 * 성과 평가 엔티티
 * 사용자의 성과 평가 정보를 관리합니다.
 */
@Entity('performances')
export class Performance extends BaseEntity {
  /**
   * 평가 대상자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 평가 대상자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 평가자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'evaluatorUserId' })
  evaluator: User;

  /**
   * 평가자 ID (외래 키)
   */
  @Column()
  evaluatorUserId: string;

  /**
   * 평가 제목
   */
  @Column()
  title: string;

  /**
   * 평가 주기
   */
  @Column({
    type: 'enum',
    enum: EvaluationPeriod,
    default: EvaluationPeriod.ANNUAL,
  })
  period: EvaluationPeriod;

  /**
   * 평가 연도
   */
  @Column({ type: 'int' })
  year: number;

  /**
   * 평가 분기 또는 반기 (해당하는 경우)
   */
  @Column({ type: 'int', nullable: true })
  periodNumber: number;

  /**
   * 평가 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 평가 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 자기 평가 점수
   */
  @Column({ type: 'float', nullable: true })
  selfScore: number;

  /**
   * 관리자 평가 점수
   */
  @Column({ type: 'float', nullable: true })
  managerScore: number;

  /**
   * 최종 평가 점수
   */
  @Column({ type: 'float', nullable: true })
  finalScore: number;

  /**
   * 평가 등급
   */
  @Column({ nullable: true })
  grade: string;

  /**
   * 자기 평가 내용
   */
  @Column({ type: 'text', nullable: true })
  selfEvaluation: string;

  /**
   * 관리자 평가 내용
   */
  @Column({ type: 'text', nullable: true })
  managerEvaluation: string;

  /**
   * 평가 상태
   */
  @Column({
    type: 'enum',
    enum: EvaluationStatus,
    default: EvaluationStatus.PENDING,
  })
  status: EvaluationStatus;

  /**
   * 목표와의 일대다 관계
   */
  @OneToMany(() => Goal, (goal) => goal.performance)
  goals: Goal[];
}
