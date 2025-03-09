import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from './project.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 자원 유형 열거형
 */
export enum ResourceType {
  HUMAN = 'human', // 인적 자원
  EQUIPMENT = 'equipment', // 장비
  MATERIAL = 'material', // 자재
  SERVICE = 'service', // 서비스
}

/**
 * 프로젝트 자원 엔티티
 * 프로젝트에 할당된 자원을 관리합니다.
 */
@Entity('project_resources')
export class ProjectResource extends BaseEntity {
  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project, (project) => project.resources)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

  /**
   * 자원 유형
   */
  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.HUMAN,
  })
  type: ResourceType;

  /**
   * 자원 이름
   */
  @Column()
  name: string;

  /**
   * 자원 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 사용자와의 다대일 관계 (인적 자원인 경우)
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column({ nullable: true })
  userId: string;

  /**
   * 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 할당 비율 (%)
   */
  @Column({ type: 'float', default: 100 })
  allocationPercentage: number;

  /**
   * 시간당 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  hourlyRate: number;

  /**
   * 총 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalCost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

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
}
