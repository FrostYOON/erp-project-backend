import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { CustomerActivity } from './customer-activity.entity';

/**
 * 고객 연락처 엔티티
 * 고객의 연락처 정보를 관리합니다.
 */
@Entity('customer_contacts')
export class CustomerContact extends BaseEntity {
  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.contacts, {
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
   * 이름
   */
  @Column()
  firstName: string;

  /**
   * 성
   */
  @Column()
  lastName: string;

  /**
   * 직책
   */
  @Column({ nullable: true })
  jobTitle: string;

  /**
   * 부서
   */
  @Column({ nullable: true })
  department: string;

  /**
   * 이메일
   */
  @Column({ nullable: true })
  email: string;

  /**
   * 전화번호
   */
  @Column({ nullable: true })
  phone: string;

  /**
   * 휴대폰 번호
   */
  @Column({ nullable: true })
  mobile: string;

  /**
   * 팩스 번호
   */
  @Column({ nullable: true })
  fax: string;

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

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
   * 우편번호
   */
  @Column({ nullable: true })
  postalCode: string;

  /**
   * 기본 연락처 여부
   */
  @Column({ default: false })
  isPrimary: boolean;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 생일
   */
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 선호 연락 방법
   */
  @Column({ nullable: true })
  preferredContactMethod: string;

  /**
   * 마지막 접촉일
   */
  @Column({ type: 'date', nullable: true })
  lastContactDate: Date;

  /**
   * 소셜 미디어 프로필 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  socialProfiles: Record<string, string>;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 고객 활동과의 일대다 관계
   */
  @OneToMany(() => CustomerActivity, (activity) => activity.contact)
  activities: CustomerActivity[];
}
