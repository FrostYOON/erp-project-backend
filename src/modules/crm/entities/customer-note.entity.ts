import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Customer } from './customer.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 고객 노트 엔티티
 * 고객에 대한 메모를 관리합니다.
 */
@Entity('customer_notes')
export class CustomerNote extends BaseEntity {
  /**
   * 고객과의 다대일 관계
   */
  @ManyToOne(() => Customer, (customer) => customer.customerNotes, {
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
   * 작성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 작성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 제목
   */
  @Column()
  title: string;

  /**
   * 내용
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 중요도
   */
  @Column({ type: 'int', default: 0 })
  importance: number;

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
