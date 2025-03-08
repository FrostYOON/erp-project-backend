import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';
import { ProjectTask } from './project-task.entity';

/**
 * 이슈 유형 열거형
 */
export enum IssueType {
  BUG = 'bug', // 버그
  FEATURE = 'feature', // 기능
  TASK = 'task', // 작업
  IMPROVEMENT = 'improvement', // 개선
  QUESTION = 'question', // 질문
}

/**
 * 이슈 상태 열거형
 */
export enum IssueStatus {
  OPEN = 'open', // 열림
  IN_PROGRESS = 'inProgress', // 진행 중
  RESOLVED = 'resolved', // 해결됨
  CLOSED = 'closed', // 닫힘
  REOPENED = 'reopened', // 재개됨
}

/**
 * 이슈 우선순위 열거형
 */
export enum IssuePriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  CRITICAL = 'critical', // 심각
}

/**
 * 프로젝트 이슈 엔티티
 * 프로젝트 진행 중 발생하는 이슈를 관리합니다.
 */
@Entity('project_issues')
export class ProjectIssue extends BaseEntity {
  /**
   * 이슈 번호
   */
  @Column()
  number: string;

  /**
   * 이슈 제목
   */
  @Column()
  title: string;

  /**
   * 이슈 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 이슈 유형
   */
  @Column({
    type: 'enum',
    enum: IssueType,
    default: IssueType.TASK,
  })
  type: IssueType;

  /**
   * 이슈 상태
   */
  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.OPEN,
  })
  status: IssueStatus;

  /**
   * 이슈 우선순위
   */
  @Column({
    type: 'enum',
    enum: IssuePriority,
    default: IssuePriority.MEDIUM,
  })
  priority: IssuePriority;

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
   * 작업과의 다대일 관계
   */
  @ManyToOne(() => ProjectTask, { nullable: true })
  @JoinColumn({ name: 'taskId' })
  task: ProjectTask;

  /**
   * 작업 ID (외래 키)
   */
  @Column({ nullable: true })
  taskId: string;

  /**
   * 보고자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reportedByUserId' })
  reportedByUser: User;

  /**
   * 보고자 ID (외래 키)
   */
  @Column()
  reportedByUserId: string;

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
   * 보고일
   */
  @Column({ type: 'date' })
  reportedDate: Date;

  /**
   * 마감일
   */
  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  /**
   * 해결일
   */
  @Column({ type: 'date', nullable: true })
  resolvedDate: Date;

  /**
   * 해결 방법
   */
  @Column({ nullable: true, type: 'text' })
  resolution: string;

  /**
   * 관련 이슈와의 다대다 관계
   */
  @ManyToMany(() => ProjectIssue)
  @JoinTable({
    name: 'project_issue_relations',
    joinColumn: { name: 'issueId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'relatedIssueId', referencedColumnName: 'id' },
  })
  relatedIssues: ProjectIssue[];

  /**
   * 환경
   */
  @Column({ nullable: true })
  environment: string;

  /**
   * 버전
   */
  @Column({ nullable: true })
  version: string;

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
