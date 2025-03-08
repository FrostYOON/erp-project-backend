import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 부서 엔티티
 * 조직의 부서 구조를 정의하는 엔티티입니다.
 */
@Entity('departments')
export class Department extends BaseEntity {
  /**
   * 부서 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 부서 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 부서 코드
   */
  @Column({ nullable: true })
  code: string;

  /**
   * 상위 부서와의 다대일 관계
   */
  @ManyToOne(() => Department, (department) => department.children)
  @JoinColumn({ name: 'parentId' })
  parent: Department;

  /**
   * 상위 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 부서 목록
   */
  @OneToMany(() => Department, (department) => department.parent)
  children: Department[];

  /**
   * 부서장 ID
   */
  @Column({ nullable: true })
  managerUserId: string;

  /**
   * 부서 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;
}
