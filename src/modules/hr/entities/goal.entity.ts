import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Performance } from './performance.entity';

/**
 * 목표 상태 열거형
 */
export enum GoalStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * 목표 엔티티
 * 사용자의 성과 목표를 관리합니다.
 */
@Entity('goals')
export class Goal extends BaseEntity {
  /**
   * 목표 제목
   */
  @Column()
  title: string;

  /**
   * 목표 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 목표 소유자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 목표 소유자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 성과 평가와의 다대일 관계
   */
  @ManyToOne(() => Performance, (performance) => performance.goals)
  @JoinColumn({ name: 'performanceId' })
  performance: Performance;

  /**
   * 성과 평가 ID (외래 키)
   */
  @Column({ nullable: true })
  performanceId: string;

  /**
   * 목표 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 목표 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 목표 가중치 (%)
   */
  @Column({ type: 'float', default: 0 })
  weight: number;

  /**
   * 목표 진행률 (%)
   */
  @Column({ type: 'float', default: 0 })
  progress: number;

  /**
   * 목표 상태
   */
  @Column({
    type: 'enum',
    enum: GoalStatus,
    default: GoalStatus.DRAFT,
  })
  status: GoalStatus;

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
   * 최종 점수
   */
  @Column({ type: 'float', nullable: true })
  finalScore: number;

  /**
   * 자기 평가 코멘트
   */
  @Column({ type: 'text', nullable: true })
  selfComment: string;

  /**
   * 관리자 평가 코멘트
   */
  @Column({ type: 'text', nullable: true })
  managerComment: string;
}
