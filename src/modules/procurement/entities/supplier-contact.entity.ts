import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Supplier } from './supplier.entity';

/**
 * 공급업체 연락처 엔티티
 * 공급업체의 담당자 정보를 관리합니다.
 */
@Entity('supplier_contacts')
export class SupplierContact extends BaseEntity {
  /**
   * 공급업체와의 다대일 관계
   */
  @ManyToOne(() => Supplier, (supplier) => supplier.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  /**
   * 공급업체 ID (외래 키)
   */
  @Column()
  supplierId: string;

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
