import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';
import { Department } from '../../organization/entities/department.entity';
import { Position } from '../../organization/entities/position.entity';

/**
 * 사용자 고용 정보 엔티티
 * 사용자의 고용 관련 정보를 저장하는 엔티티입니다.
 */
@Entity('user_employments')
export class UserEmployment extends BaseEntity {
  /**
   * User 엔티티와의 일대일 관계
   */
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 사원 번호
   */
  @Column({ nullable: true })
  employeeId: string;

  /**
   * 입사일
   */
  @Column({ type: 'date', nullable: true })
  hireDate: Date;

  /**
   * 퇴사일
   */
  @Column({ type: 'date', nullable: true })
  terminationDate: Date;

  /**
   * 고용 상태
   */
  @Column({
    type: 'enum',
    enum: ['active', 'onLeave', 'terminated', 'suspended'],
    default: 'active',
  })
  employmentStatus: string;

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
   * 관리자/상사와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'managerId' })
  manager: User;

  /**
   * 관리자/상사 ID (외래 키)
   */
  @Column({ nullable: true })
  managerId: string;
}
