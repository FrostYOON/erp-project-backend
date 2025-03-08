import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';

/**
 * 사용자 세션 엔티티
 * 사용자의 로그인 세션 정보를 저장하는 엔티티입니다.
 */
@Entity('user_sessions')
export class UserSession extends BaseEntity {
  /**
   * User 엔티티와의 다대일 관계
   */
  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 사용자 ID (외래 키)
   */
  @Column()
  userId: string;

  /**
   * 세션 토큰
   */
  @Column()
  token: string;

  /**
   * 토큰 만료 시간
   */
  @Column({ type: 'timestamp' })
  expiresAt: Date;

  /**
   * IP 주소
   */
  @Column()
  ipAddress: string;

  /**
   * 사용자 에이전트
   */
  @Column({ nullable: true })
  userAgent: string;

  /**
   * 세션 유효 여부
   */
  @Column({ default: true })
  isValid: boolean;
}
