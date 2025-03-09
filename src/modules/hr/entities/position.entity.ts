import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Employee } from './employee.entity';

/**
 * 직위/직급 엔티티
 * 회사 내 직위/직급 정보를 관리합니다.
 */
@Entity('positions')
export class Position extends BaseEntity {
  /**
   * 직위/직급 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 직위/직급 이름
   */
  @Column()
  name: string;

  /**
   * 직위/직급 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 직위/직급 레벨 (숫자가 클수록 상위 직급)
   */
  @Column({ type: 'int' })
  level: number;

  /**
   * 상위 직위/직급 ID
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 최소 급여 범위
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  minSalary: number;

  /**
   * 최대 급여 범위
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  maxSalary: number;

  /**
   * 급여 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 직위/직급에 필요한 최소 경력 (년)
   */
  @Column({ type: 'int', nullable: true })
  minExperienceYears: number;

  /**
   * 직위/직급에 필요한 최소 교육 수준
   */
  @Column({ nullable: true })
  minEducationLevel: string;

  /**
   * 직위/직급에 필요한 자격증/기술
   */
  @Column({ type: 'json', nullable: true })
  requiredSkills: string[];

  /**
   * 직위/직급 활성화 여부
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 직위/직급에 속한 직원들과의 일대다 관계
   */
  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];
}
