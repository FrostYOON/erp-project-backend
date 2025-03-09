import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';

/**
 * 사용자 보안 정보 엔티티
 * 사용자의 보안 관련 정보를 저장하는 엔티티입니다.
 */
@Entity('user_securities')
export class UserSecurity extends BaseEntity {
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
   * 다중 인증(MFA) 활성화 여부
   */
  @Column({ default: false })
  isMfaEnabled: boolean;

  /**
   * 다중 인증(MFA) 비밀 키
   */
  @Column({ nullable: true })
  mfaSecret: string;

  /**
   * 마지막 로그인 시간
   */
  @Column({ nullable: true, type: 'timestamp' })
  lastLoginAt: Date;

  /**
   * 마지막 로그인 IP 주소
   */
  @Column({ nullable: true })
  lastLoginIp: string;

  /**
   * 로그인 실패 횟수
   */
  @Column({ type: 'int', default: 0 })
  failedLoginAttempts: number;
}
