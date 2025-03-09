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
import { QualityStandard } from './quality-standard.entity';

/**
 * 품질 교육 유형 열거형
 */
export enum QualityTrainingType {
  ONBOARDING = 'onboarding',
  REFRESHER = 'refresher',
  CERTIFICATION = 'certification',
  COMPLIANCE = 'compliance',
  PROCESS = 'process',
  PRODUCT = 'product',
  SYSTEM = 'system',
  TOOL = 'tool',
  STANDARD = 'standard',
  OTHER = 'other',
}

/**
 * 품질 교육 상태 열거형
 */
export enum QualityTrainingStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DELAYED = 'delayed',
}

/**
 * 품질 교육 방식 열거형
 */
export enum QualityTrainingMethod {
  CLASSROOM = 'classroom',
  ONLINE = 'online',
  HYBRID = 'hybrid',
  SELF_STUDY = 'selfStudy',
  ON_THE_JOB = 'onTheJob',
  WORKSHOP = 'workshop',
  SEMINAR = 'seminar',
}

/**
 * 품질 교육 엔티티
 * 품질 관련 교육 정보를 관리합니다.
 */
@Entity('quality_trainings')
export class QualityTraining extends BaseEntity {
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
    enum: QualityTrainingType,
    default: QualityTrainingType.PROCESS,
  })
  type: QualityTrainingType;

  /**
   * 교육 상태
   */
  @Column({
    type: 'enum',
    enum: QualityTrainingStatus,
    default: QualityTrainingStatus.PLANNED,
  })
  status: QualityTrainingStatus;

  /**
   * 교육 방식
   */
  @Column({
    type: 'enum',
    enum: QualityTrainingMethod,
    default: QualityTrainingMethod.CLASSROOM,
  })
  method: QualityTrainingMethod;

  /**
   * 교육 강사와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'instructorId' })
  instructor: User;

  /**
   * 교육 강사 ID (외래 키)
   */
  @Column({ nullable: true })
  instructorId: string;

  /**
   * 교육 담당 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 교육 담당 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 교육 관련 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 교육 관련 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

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
   * 교육 목표
   */
  @Column({ type: 'text', nullable: true })
  objectives: string;

  /**
   * 교육 내용
   */
  @Column({ type: 'text', nullable: true })
  content: string;

  /**
   * 교육 대상자
   */
  @Column({ type: 'text', nullable: true })
  targetAudience: string;

  /**
   * 교육 전제 조건
   */
  @Column({ type: 'text', nullable: true })
  prerequisites: string;

  /**
   * 교육 참가자와의 다대다 관계
   */
  @ManyToMany(() => User)
  @JoinTable({
    name: 'quality_training_participants',
    joinColumn: { name: 'trainingId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  /**
   * 교육 참가자 수
   */
  @Column({ type: 'int', default: 0 })
  participantCount: number;

  /**
   * 최대 참가자 수
   */
  @Column({ type: 'int', nullable: true })
  maxParticipants: number;

  /**
   * 교육 자료 URL
   */
  @Column({ nullable: true })
  materialsUrl: string;

  /**
   * 교육 평가 방법
   */
  @Column({ type: 'text', nullable: true })
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
   * 교육 효과성 평가
   */
  @Column({ type: 'text', nullable: true })
  effectivenessEvaluation: string;

  /**
   * 교육 피드백
   */
  @Column({ type: 'text', nullable: true })
  feedback: string;

  /**
   * 교육 평균 평점 (1-5)
   */
  @Column({ type: 'float', nullable: true })
  averageRating: number;

  /**
   * 교육 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 교육 비용 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

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
