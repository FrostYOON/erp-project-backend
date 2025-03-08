import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';

/**
 * 리스크 상태 열거형
 */
export enum RiskStatus {
  IDENTIFIED = 'identified', // 식별됨
  ANALYZED = 'analyzed', // 분석됨
  PLANNED = 'planned', // 대응 계획 수립
  MONITORED = 'monitored', // 모니터링 중
  OCCURRED = 'occurred', // 발생함
  MITIGATED = 'mitigated', // 완화됨
  CLOSED = 'closed', // 종료됨
}

/**
 * 리스크 영향도 열거형
 */
export enum RiskImpact {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  SEVERE = 'severe', // 심각
}

/**
 * 리스크 발생 가능성 열거형
 */
export enum RiskProbability {
  UNLIKELY = 'unlikely', // 가능성 낮음
  POSSIBLE = 'possible', // 가능성 있음
  LIKELY = 'likely', // 가능성 높음
  VERY_LIKELY = 'veryLikely', // 매우 가능성 높음
}

/**
 * 프로젝트 리스크 엔티티
 * 프로젝트의 잠재적 리스크를 관리합니다.
 */
@Entity('project_risks')
export class ProjectRisk extends BaseEntity {
  /**
   * 리스크 번호
   */
  @Column()
  number: string;

  /**
   * 리스크 제목
   */
  @Column()
  title: string;

  /**
   * 리스크 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 리스크 상태
   */
  @Column({
    type: 'enum',
    enum: RiskStatus,
    default: RiskStatus.IDENTIFIED,
  })
  status: RiskStatus;

  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

  /**
   * 식별자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'identifiedByUserId' })
  identifiedByUser: User;

  /**
   * 식별자 ID (외래 키)
   */
  @Column()
  identifiedByUserId: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  assigneeId: string;

  /**
   * 식별일
   */
  @Column({ type: 'date' })
  identifiedDate: Date;

  /**
   * 영향도
   */
  @Column({
    type: 'enum',
    enum: RiskImpact,
    default: RiskImpact.MEDIUM,
  })
  impact: RiskImpact;

  /**
   * 발생 가능성
   */
  @Column({
    type: 'enum',
    enum: RiskProbability,
    default: RiskProbability.POSSIBLE,
  })
  probability: RiskProbability;

  /**
   * 리스크 점수 (영향도 * 발생 가능성)
   */
  @Column({ type: 'float', default: 0 })
  score: number;

  /**
   * 카테고리
   */
  @Column({ nullable: true })
  category: string;

  /**
   * 트리거 이벤트
   */
  @Column({ nullable: true, type: 'text' })
  triggerEvents: string;

  /**
   * 대응 전략
   */
  @Column({ nullable: true, type: 'text' })
  responseStrategy: string;

  /**
   * 대응 계획
   */
  @Column({ nullable: true, type: 'text' })
  responsePlan: string;

  /**
   * 비상 계획
   */
  @Column({ nullable: true, type: 'text' })
  contingencyPlan: string;

  /**
   * 예상 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  estimatedCost: number;

  /**
   * 실제 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  actualCost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
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
