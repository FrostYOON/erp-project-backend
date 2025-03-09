import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';

/**
 * 고객 연락처 엔티티
 * 고객의 담당자 정보를 관리합니다.
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
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 부서
   */
  @Column({ nullable: true })
  department: string;
}
