import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Department } from '../../organization/entities/department.entity';
import { WorkStation } from './work-station.entity';

/**
 * 작업 센터 엔티티
 * 생산 작업이 수행되는 작업 센터를 관리합니다.
 */
@Entity('work_centers')
export class WorkCenter extends BaseEntity {
  /**
   * 작업 센터 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 작업 센터 이름
   */
  @Column()
  name: string;

  /**
   * 작업 센터 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 부서와의 다대일 관계
   */
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 작업 스테이션과의 일대다 관계
   */
  @OneToMany(() => WorkStation, (station) => station.workCenter)
  workStations: WorkStation[];

  /**
   * 작업 시간 (시간/일)
   */
  @Column({ type: 'float', default: 8 })
  workHoursPerDay: number;

  /**
   * 작업 일수 (일/주)
   */
  @Column({ type: 'int', default: 5 })
  workDaysPerWeek: number;

  /**
   * 생산 능력 (시간당)
   */
  @Column({ type: 'float', nullable: true })
  capacityPerHour: number;

  /**
   * 생산 능력 단위
   */
  @Column({ nullable: true })
  capacityUnit: string;

  /**
   * 시간당 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  costPerHour: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
