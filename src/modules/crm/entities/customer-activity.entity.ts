import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { CustomerContact } from './customer-contact.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 활동 유형 열거형
 */
export enum ActivityType {
  CALL = 'call', // 전화
  EMAIL = 'email', // 이메일
  MEETING = 'meeting', // 미팅
  TASK = 'task', // 작업
  NOTE = 'note', // 메모
  VISIT = 'visit', // 방문
  SOCIAL = 'social', // 소셜 미디어
  OTHER = 'other', // 기타
}

/**
 * 활동 상태 열거형
 */
export enum ActivityStatus {
  PLANNED = 'planned', // 계획됨
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 활동 우선순위 열거형
 */
export enum ActivityPriority {
  LOW = 'low', // 낮음
  MEDIUM = 'medium', // 중간
  HIGH = 'high', // 높음
  URGENT = 'urgent', // 긴급
}

/**
 * 고객 활동 엔티티
 * 고객과의 상호작용 활동을 관리합니다.
 */
@Entity('customer_activities')
export class CustomerActivity extends BaseEntity {
  /**
   * 활동 유형
   */
  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  /**
   * 활동 상태
   */
  @Column({
    type: 'enum',
    enum: ActivityStatus,
    default: ActivityStatus.PLANNED,
  })
  status: ActivityStatus;

  /**
   * 활동 우선순위
   */
  @Column({
    type: 'enum',
    enum: ActivityPriority,
    default: ActivityPriority.MEDIUM,
  })
  priority: ActivityPriority;

  /**
   * 제목
   */
  @Column()
  title: string;

  /**
   * 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  /**
   * 고객 ID (외래 키)
   */
  @Column()
  customerId: string;

  /**
   * 고객 연락처와의 다대일 관계
   */
  @ManyToOne(() => CustomerContact, (contact) => contact.activities, {
    nullable: true,
  })
  @JoinColumn({ name: 'contactId' })
  contact: CustomerContact;

  /**
   * 고객 연락처 ID (외래 키)
   */
  @Column({ nullable: true })
  contactId: string;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column()
  assignedToUserId: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 예정 시작일시
   */
  @Column({ type: 'timestamp' })
  scheduledStartAt: Date;

  /**
   * 예정 종료일시
   */
  @Column({ type: 'timestamp', nullable: true })
  scheduledEndAt: Date;

  /**
   * 실제 시작일시
   */
  @Column({ type: 'timestamp', nullable: true })
  actualStartAt: Date;

  /**
   * 실제 종료일시
   */
  @Column({ type: 'timestamp', nullable: true })
  actualEndAt: Date;

  /**
   * 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 결과
   */
  @Column({ nullable: true, type: 'text' })
  result: string;

  /**
   * 다음 활동 계획
   */
  @Column({ nullable: true, type: 'text' })
  nextAction: string;

  /**
   * 다음 활동 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextActionDate: Date;

  /**
   * 알림 시간 (분 단위, 활동 시작 전)
   */
  @Column({ type: 'int', nullable: true })
  reminderMinutes: number;

  /**
   * 반복 여부
   */
  @Column({ default: false })
  isRecurring: boolean;

  /**
   * 반복 규칙 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  recurrenceRule: Record<string, any>;

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
