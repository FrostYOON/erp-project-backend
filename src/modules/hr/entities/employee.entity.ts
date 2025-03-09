import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { Position } from './position.entity';
import { JobTitle } from './job-title.entity';

/**
 * 고용 유형 열거형
 */
export enum EmploymentType {
  FULL_TIME = 'fullTime',
  PART_TIME = 'partTime',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERN = 'intern',
  CONSULTANT = 'consultant',
}

/**
 * 직원 상태 열거형
 */
export enum EmployeeStatus {
  ACTIVE = 'active',
  PROBATION = 'probation',
  LEAVE_OF_ABSENCE = 'leaveOfAbsence',
  SUSPENDED = 'suspended',
  TERMINATED = 'terminated',
}

/**
 * 직원 엔티티
 * 사용자의 직원 정보를 관리합니다.
 */
@Entity('employees')
export class Employee extends BaseEntity {
  /**
   * 사용자와의 일대일 관계
   */
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 직원 번호
   */
  @Column({ unique: true })
  employeeNumber: string;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 직위/직급과의 다대일 관계
   */
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'positionId' })
  position: Position;

  /**
   * 직위/직급 ID (외래 키)
   */
  @Column({ nullable: true })
  positionId: string;

  /**
   * 직책과의 다대일 관계
   */
  @ManyToOne(() => JobTitle)
  @JoinColumn({ name: 'jobTitleId' })
  jobTitle: JobTitle;

  /**
   * 직책 ID (외래 키)
   */
  @Column({ nullable: true })
  jobTitleId: string;

  /**
   * 고용 유형
   */
  @Column({
    type: 'enum',
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME,
  })
  employmentType: EmploymentType;

  /**
   * 직원 상태
   */
  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  /**
   * 입사일
   */
  @Column({ type: 'date' })
  hireDate: Date;

  /**
   * 퇴사일
   */
  @Column({ type: 'date', nullable: true })
  terminationDate: Date;

  /**
   * 수습 기간 종료일
   */
  @Column({ type: 'date', nullable: true })
  probationEndDate: Date;

  /**
   * 직속 상사와의 다대일 관계
   */
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'managerId' })
  manager: Employee;

  /**
   * 직속 상사 ID (외래 키)
   */
  @Column({ nullable: true })
  managerId: string;

  /**
   * 기본 급여
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  baseSalary: number;

  /**
   * 급여 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 급여 지급 주기 (monthly, biweekly, weekly)
   */
  @Column({ default: 'monthly' })
  payPeriod: string;

  /**
   * 은행 이름
   */
  @Column({ nullable: true })
  bankName: string;

  /**
   * 계좌 번호
   */
  @Column({ nullable: true })
  accountNumber: string;

  /**
   * 계좌 소유자 이름
   */
  @Column({ nullable: true })
  accountHolderName: string;

  /**
   * 비상 연락처 이름
   */
  @Column({ nullable: true })
  emergencyContactName: string;

  /**
   * 비상 연락처 전화번호
   */
  @Column({ nullable: true })
  emergencyContactPhone: string;

  /**
   * 비상 연락처 관계
   */
  @Column({ nullable: true })
  emergencyContactRelationship: string;

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
