import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

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
}
