import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Department } from '../../organization/entities/department.entity';
import { Position } from './position.entity';
import { Employee } from './employee.entity';

/**
 * 복리후생 유형 열거형
 */
export enum BenefitType {
  HEALTH_INSURANCE = 'healthInsurance',
  RETIREMENT = 'retirement',
  PAID_TIME_OFF = 'paidTimeOff',
  WELLNESS = 'wellness',
  EDUCATION = 'education',
  TRANSPORTATION = 'transportation',
  MEAL = 'meal',
  HOUSING = 'housing',
  CHILDCARE = 'childcare',
  STOCK_OPTION = 'stockOption',
  BONUS = 'bonus',
  OTHER = 'other',
}

/**
 * 복리후생 상태 열거형
 */
export enum BenefitStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PLANNED = 'planned',
}

/**
 * 복리후생 엔티티
 * 직원 복리후생 정보를 관리합니다.
 */
@Entity('benefits')
export class Benefit extends BaseEntity {
  /**
   * 복리후생 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 복리후생 이름
   */
  @Column()
  name: string;

  /**
   * 복리후생 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 복리후생 유형
   */
  @Column({
    type: 'enum',
    enum: BenefitType,
    default: BenefitType.OTHER,
  })
  type: BenefitType;

  /**
   * 복리후생 상태
   */
  @Column({
    type: 'enum',
    enum: BenefitStatus,
    default: BenefitStatus.ACTIVE,
  })
  status: BenefitStatus;

  /**
   * 복리후생 시작일
   */
  @Column({ type: 'date' })
  startDate: Date;

  /**
   * 복리후생 종료일
   */
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  /**
   * 복리후생 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cost: number;

  /**
   * 복리후생 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 복리후생 제공 주기 (monthly, quarterly, yearly, one-time)
   */
  @Column({ nullable: true })
  frequency: string;

  /**
   * 복리후생 제공 업체
   */
  @Column({ nullable: true })
  provider: string;

  /**
   * 복리후생 제공 업체 연락처
   */
  @Column({ nullable: true })
  providerContact: string;

  /**
   * 복리후생 계약 번호
   */
  @Column({ nullable: true })
  contractNumber: string;

  /**
   * 복리후생 계약 URL
   */
  @Column({ nullable: true })
  contractUrl: string;

  /**
   * 복리후생 대상 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'targetDepartmentId' })
  targetDepartment: Department;

  /**
   * 복리후생 대상 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  targetDepartmentId: string;

  /**
   * 복리후생 대상 직위/직급과의 다대일 관계
   */
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'targetPositionId' })
  targetPosition: Position;

  /**
   * 복리후생 대상 직위/직급 ID (외래 키)
   */
  @Column({ nullable: true })
  targetPositionId: string;

  /**
   * 최소 근속 기간 (개월)
   */
  @Column({ type: 'int', nullable: true })
  minTenureMonths: number;

  /**
   * 복리후생 수혜자와의 다대다 관계
   */
  @ManyToMany(() => Employee)
  @JoinTable({
    name: 'employee_benefits',
    joinColumn: { name: 'benefitId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' },
  })
  employees: Employee[];

  /**
   * 복리후생 신청 방법
   */
  @Column({ type: 'text', nullable: true })
  applicationProcess: string;

  /**
   * 복리후생 신청 URL
   */
  @Column({ nullable: true })
  applicationUrl: string;

  /**
   * 복리후생 신청 마감일
   */
  @Column({ type: 'date', nullable: true })
  applicationDeadline: Date;

  /**
   * 복리후생 태그 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

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
