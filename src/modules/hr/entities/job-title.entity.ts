import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Employee } from './employee.entity';

/**
 * 직책 엔티티
 * 회사 내 직책 정보를 관리합니다.
 */
@Entity('job_titles')
export class JobTitle extends BaseEntity {
  /**
   * 직책 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 직책 이름
   */
  @Column()
  name: string;

  /**
   * 직책 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 부서 ID (특정 부서에만 해당하는 직책인 경우)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 직책 책임 및 권한
   */
  @Column({ type: 'text', nullable: true })
  responsibilities: string;

  /**
   * 직책에 필요한 자격 요건
   */
  @Column({ type: 'text', nullable: true })
  qualifications: string;

  /**
   * 직책에 필요한 기술 및 역량
   */
  @Column({ type: 'json', nullable: true })
  requiredSkills: string[];

  /**
   * 직책 활성화 여부
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 직책에 속한 직원들과의 일대다 관계
   */
  @OneToMany(() => Employee, (employee) => employee.jobTitle)
  employees: Employee[];
}
