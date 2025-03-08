import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Customer } from '../../sales/entities/customer.entity';
import { Department } from '../../organization/entities/department.entity';
import { ProjectTask } from './project-task.entity';
import { ProjectMilestone } from './project-milestone.entity';
import { ProjectResource } from './project-resource.entity';

/**
 * 프로젝트 상태 열거형
 */
export enum ProjectStatus {
  PLANNING = 'planning', // 계획 중
  ACTIVE = 'active', // 활성
  ON_HOLD = 'onHold', // 보류 중
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 프로젝트 우선순위 열거형
 */
export enum ProjectPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  URGENT = 'urgent', // 긴급
}

/**
 * 프로젝트 엔티티
 * 프로젝트의 기본 정보를 관리합니다.
 */
@Entity('projects')
export class Project extends BaseEntity {
  /**
   * 프로젝트 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 프로젝트 이름
   */
  @Column()
  name: string;

  /**
   * 프로젝트 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 프로젝트 상태
   */
  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  /**
   * 프로젝트 우선순위
   */
  @Column({
    type: 'enum',
    enum: ProjectPriority,
    default: ProjectPriority.MEDIUM,
  })
  priority: ProjectPriority;

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
   * 실제 시작일
   */
  @Column({ type: 'date', nullable: true })
  actualStartDate: Date;

  /**
   * 실제 종료일
   */
  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  /**
   * 예산
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  budget: number;

  /**
   * 실제 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  actualCost: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 진행률 (%)
   */
  @Column({ type: 'float', default: 0 })
  progress: number;

  /**
   * 프로젝트 관리자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  manager: User;

  /**
   * 프로젝트 관리자 ID (외래 키)
   */
  @Column()
  managerId: string;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column({ nullable: true })
  customerId: string;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 프로젝트 작업과의 일대다 관계
   */
  @OneToMany(() => ProjectTask, (task) => task.project)
  tasks: ProjectTask[];

  /**
   * 프로젝트 마일스톤과의 일대다 관계
   */
  @OneToMany(() => ProjectMilestone, (milestone) => milestone.project)
  milestones: ProjectMilestone[];

  /**
   * 프로젝트 자원과의 일대다 관계
   */
  @OneToMany(() => ProjectResource, (resource) => resource.project)
  resources: ProjectResource[];

  /**
   * 프로젝트 팀원과의 다대다 관계
   */
  @ManyToMany(() => User)
  @JoinTable({
    name: 'project_team_members',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  teamMembers: User[];

  /**
   * 카테고리
   */
  @Column({ nullable: true })
  category: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
