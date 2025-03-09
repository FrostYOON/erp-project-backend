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
import { Department } from '../../organization/entities/department.entity';
import { Employee } from './employee.entity';

/**
 * 교육 유형 열거형
 */
export enum TrainingType {
  ONBOARDING = 'onboarding',
  TECHNICAL = 'technical',
  SOFT_SKILLS = 'softSkills',
  COMPLIANCE = 'compliance',
  LEADERSHIP = 'leadership',
  SAFETY = 'safety',
  CERTIFICATION = 'certification',
  OTHER = 'other',
}

/**
 * 교육 상태 열거형
 */
export enum TrainingStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * 교육 방식 열거형
 */
export enum TrainingMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
  HYBRID = 'hybrid',
  SELF_STUDY = 'selfStudy',
  ON_THE_JOB = 'onTheJob',
}

/**
 * 교육/훈련 엔티티
 * 직원 교육/훈련 정보를 관리합니다.
 */
@Entity('trainings')
export class Training extends BaseEntity {
  /**
   * 교육 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 교육 제목
   */
  @Column()
  title: string;

  /**
   * 교육 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 교육 유형
   */
  @Column({
    type: 'enum',
    enum: TrainingType,
    default: TrainingType.OTHER,
  })
  type: TrainingType;

  /**
   * 교육 상태
   */
  @Column({
    type: 'enum',
    enum: TrainingStatus,
    default: TrainingStatus.PLANNED,
  })
  status: TrainingStatus;

  /**
   * 교육 방식
   */
  @Column({
    type: 'enum',
    enum: TrainingMethod,
    default: TrainingMethod.OFFLINE,
  })
  method: TrainingMethod;

  /**
   * 교육 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'instructorId' })
  instructor: User;

  /**
   * 교육 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  instructorId: string;

  /**
   * 교육 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 교육 종료일
   */
  @Column({ type: 'date' })
  endDate: Date;

  /**
   * 교육 시간 (시간 단위)
   */
  @Column({ type: 'int', default: 0 })
  durationHours: number;

  /**
   * 교육 장소
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 교육 URL (온라인 교육인 경우)
   */
  @Column({ nullable: true })
  url: string;

  /**
   * 교육 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 교육 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 최대 참가자 수
   */
  @Column({ type: 'int', nullable: true })
  maxParticipants: number;

  /**
   * 현재 참가자 수
   */
  @Column({ type: 'int', default: 0 })
  currentParticipants: number;

  /**
   * 교육 대상 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'targetDepartmentId' })
  targetDepartment: Department;

  /**
   * 교육 대상 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  targetDepartmentId: string;

  /**
   * 교육 참가자와의 다대다 관계
   */
  @ManyToMany(() => Employee)
  @JoinTable({
    name: 'training_participants',
    joinColumn: { name: 'trainingId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' },
  })
  participants: Employee[];

  /**
   * 교육 자료 URL
   */
  @Column({ nullable: true })
  materialsUrl: string;

  /**
   * 교육 평가 방법
   */
  @Column({ nullable: true })
  evaluationMethod: string;

  /**
   * 교육 수료 기준
   */
  @Column({ nullable: true })
  completionCriteria: string;

  /**
   * 교육 수료증 발급 여부
   */
  @Column({ default: false })
  certificateProvided: boolean;

  /**
   * 필수 교육 여부
   */
  @Column({ default: false })
  isMandatory: boolean;

  /**
   * 교육 태그 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

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
