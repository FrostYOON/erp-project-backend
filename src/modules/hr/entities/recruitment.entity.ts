import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Department } from '../../organization/entities/department.entity';
import { Position } from './position.entity';
import { JobTitle } from './job-title.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 채용 상태 열거형
 */
export enum RecruitmentStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  IN_PROGRESS = 'inProgress',
  ON_HOLD = 'onHold',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

/**
 * 채용 유형 열거형
 */
export enum RecruitmentType {
  FULL_TIME = 'fullTime',
  PART_TIME = 'partTime',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERN = 'intern',
  CONSULTANT = 'consultant',
}

/**
 * 채용 엔티티
 * 채용 정보를 관리합니다.
 */
@Entity('recruitments')
export class Recruitment extends BaseEntity {
  /**
   * 채용 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 채용 제목
   */
  @Column()
  title: string;

  /**
   * 채용 설명
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 채용 상태
   */
  @Column({
    type: 'enum',
    enum: RecruitmentStatus,
    default: RecruitmentStatus.DRAFT,
  })
  status: RecruitmentStatus;

  /**
   * 채용 유형
   */
  @Column({
    type: 'enum',
    enum: RecruitmentType,
    default: RecruitmentType.FULL_TIME,
  })
  type: RecruitmentType;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 직위/직급과의 다대일 관계
   */
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'positionId' })
  position: Position;

  /**
   * 직위/직급 ID (외래 키)
   */
  @Column({ nullable: true })
  positionId: string;

  /**
   * 직책과의 다대일 관계
   */
  @ManyToOne(() => JobTitle)
  @JoinColumn({ name: 'jobTitleId' })
  jobTitle: JobTitle;

  /**
   * 직책 ID (외래 키)
   */
  @Column({ nullable: true })
  jobTitleId: string;

  /**
   * 채용 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'recruiterId' })
  recruiter: User;

  /**
   * 채용 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  recruiterId: string;

  /**
   * 채용 인원 수
   */
  @Column({ type: 'int', default: 1 })
  headcount: number;

  /**
   * 채용 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 채용 마감일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 최소 급여
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  minSalary: number;

  /**
   * 최대 급여
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  maxSalary: number;

  /**
   * 급여 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 급여 협상 가능 여부
   */
  @Column({ default: false })
  isNegotiable: boolean;

  /**
   * 근무 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 원격 근무 가능 여부
   */
  @Column({ default: false })
  isRemote: boolean;

  /**
   * 필수 자격 요건
   */
  @Column({ type: 'text', nullable: true })
  requirements: string;

  /**
   * 우대 사항
   */
  @Column({ type: 'text', nullable: true })
  preferences: string;

  /**
   * 채용 절차
   */
  @Column({ type: 'text', nullable: true })
  process: string;

  /**
   * 채용 공고 URL
   */
  @Column({ nullable: true })
  jobPostingUrl: string;

  /**
   * 지원자 수
   */
  @Column({ type: 'int', default: 0 })
  applicantCount: number;

  /**
   * 면접 진행 수
   */
  @Column({ type: 'int', default: 0 })
  interviewCount: number;

  /**
   * 합격자 수
   */
  @Column({ type: 'int', default: 0 })
  offerCount: number;

  /**
   * 입사자 수
   */
  @Column({ type: 'int', default: 0 })
  hiredCount: number;

  /**
   * 메모
   */
  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * 추가 정보 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  additionalInfo: any;
}
