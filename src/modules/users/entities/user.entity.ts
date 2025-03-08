import {
  Entity,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserProfile } from './user-profile.entity';
import { Role } from '../../roles/entities/role.entity';
import { UserEmployment } from './user-employment.entity';
import { UserSecurity } from './user-security.entity';
import { UserSession } from './user-session.entity';
/**
 * 사용자 엔티티
 * 시스템의 사용자 계정 정보를 저장하는 기본 엔티티입니다.
 */
@Entity('users')
export class User extends BaseEntity {
  /**
   * 사용자 이메일 주소
   */
  @Column({ unique: true })
  email: string;

  /**
   * 사용자 비밀번호
   */
  @Column()
  password: string;

  /**
   * 사용자 계정 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 이메일 인증 상태
   */
  @Column({ default: false })
  isEmailVerified: boolean;

  /**
   * 사용자 프로필 정보와의 일대일 관계
   */
  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

  /**
   * 사용자 역할과의 다대다 관계
   */
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  /**
   * 사용자 고용 정보와의 일대일 관계
   */
  @OneToOne(() => UserEmployment, (employment) => employment.user, {
    cascade: true,
  })
  employment: UserEmployment;

  /**
   * 사용자 보안 정보와의 일대일 관계
   */
  @OneToOne(() => UserSecurity, (security) => security.user, { cascade: true })
  security: UserSecurity;

  /**
   * 사용자 세션 정보와의 일대다 관계
   */
  @OneToMany(() => UserSession, (session) => session.user)
  sessions: UserSession[];
}
