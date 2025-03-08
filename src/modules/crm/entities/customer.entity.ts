import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { CustomerSegment } from './customer-segment.entity';
import { CustomerContact } from './customer-contact.entity';
import { CustomerNote } from './customer-note.entity';
import { CustomerActivity } from './customer-activity.entity';
import { SalesOpportunity } from './sales-opportunity.entity';

/**
 * 고객 유형 열거형
 */
export enum CustomerType {
  INDIVIDUAL = 'individual', // 개인
  COMPANY = 'company', // 기업
  GOVERNMENT = 'government', // 정부/공공기관
  NON_PROFIT = 'nonProfit', // 비영리단체
  OTHER = 'other', // 기타
}

/**
 * 고객 상태 열거형
 */
export enum CustomerStatus {
  ACTIVE = 'active', // 활성
  INACTIVE = 'inactive', // 비활성
  LEAD = 'lead', // 잠재 고객
  PROSPECT = 'prospect', // 가망 고객
  CUSTOMER = 'customer', // 고객
  FORMER = 'former', // 이전 고객
}

/**
 * 고객 엔티티
 * 고객 정보를 관리합니다.
 */
@Entity('customers')
export class Customer extends BaseEntity {
  /**
   * 고객 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 고객 유형
   */
  @Column({
    type: 'enum',
    enum: CustomerType,
    default: CustomerType.COMPANY,
  })
  type: CustomerType;

  /**
   * 고객 상태
   */
  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.LEAD,
  })
  status: CustomerStatus;

  /**
   * 회사명/이름
   */
  @Column()
  name: string;

  /**
   * 사업자등록번호
   */
  @Column({ nullable: true })
  businessNumber: string;

  /**
   * 대표 전화번호
   */
  @Column({ nullable: true })
  phone: string;

  /**
   * 대표 이메일
   */
  @Column({ nullable: true })
  email: string;

  /**
   * 웹사이트
   */
  @Column({ nullable: true })
  website: string;

  /**
   * 업종
   */
  @Column({ nullable: true })
  industry: string;

  /**
   * 직원 수
   */
  @Column({ type: 'int', nullable: true })
  employeeCount: number;

  /**
   * 연간 매출액
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  annualRevenue: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 우편번호
   */
  @Column({ nullable: true })
  postalCode: string;

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

  /**
   * 상세 주소
   */
  @Column({ nullable: true })
  addressDetail: string;

  /**
   * 도시
   */
  @Column({ nullable: true })
  city: string;

  /**
   * 주/도
   */
  @Column({ nullable: true })
  state: string;

  /**
   * 국가
   */
  @Column({ nullable: true })
  country: string;

  /**
   * 위도
   */
  @Column({ type: 'float', nullable: true })
  latitude: number;

  /**
   * 경도
   */
  @Column({ type: 'float', nullable: true })
  longitude: number;

  /**
   * 담당자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'accountManagerId' })
  accountManager: User;

  /**
   * 담당자 ID (외래 키)
   */
  @Column({ nullable: true })
  accountManagerId: string;

  /**
   * 세그먼트와의 다대일 관계
   */
  @ManyToOne(() => CustomerSegment, { nullable: true })
  @JoinColumn({ name: 'segmentId' })
  segment: CustomerSegment;

  /**
   * 세그먼트 ID (외래 키)
   */
  @Column({ nullable: true })
  segmentId: string;

  /**
   * 획득 경로
   */
  @Column({ nullable: true })
  acquisitionChannel: string;

  /**
   * 획득 날짜
   */
  @Column({ type: 'date', nullable: true })
  acquisitionDate: Date;

  /**
   * 고객 가치 점수
   */
  @Column({ type: 'float', nullable: true })
  customerLifetimeValue: number;

  /**
   * 고객 만족도 점수
   */
  @Column({ type: 'float', nullable: true })
  satisfactionScore: number;

  /**
   * 마지막 접촉일
   */
  @Column({ type: 'date', nullable: true })
  lastContactDate: Date;

  /**
   * 다음 접촉 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextContactDate: Date;

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
   * 고객 연락처와의 일대다 관계
   */
  @OneToMany(() => CustomerContact, (contact) => contact.customer)
  contacts: CustomerContact[];

  /**
   * 고객 노트와의 일대다 관계
   */
  @OneToMany(() => CustomerNote, (note) => note.customer)
  customerNotes: CustomerNote[];

  /**
   * 고객 활동과의 일대다 관계
   */
  @OneToMany(() => CustomerActivity, (activity) => activity.customer)
  activities: CustomerActivity[];

  /**
   * 영업 기회와의 일대다 관계
   */
  @OneToMany(() => SalesOpportunity, (opportunity) => opportunity.customer)
  opportunities: SalesOpportunity[];
}
