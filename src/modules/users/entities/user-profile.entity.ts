import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';

/**
 * 사용자 프로필 엔티티
 * 사용자의 개인 정보를 저장하는 엔티티입니다.
 */
@Entity('user_profiles')
export class UserProfile extends BaseEntity {
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
   * 사용자 이름
   */
  @Column({ nullable: true })
  firstName: string;

  /**
   * 사용자 성
   */
  @Column({ nullable: true })
  lastName: string;

  /**
   * 전화번호
   */
  @Column({ nullable: true })
  phoneNumber: string;

  /**
   * 생년월일
   */
  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  /**
   * 프로필 이미지 URL
   */
  @Column({ nullable: true })
  profileImageUrl: string;

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

  /**
   * 직업
   */
  @Column({ nullable: true })
  occupation: string;

  /**
   * 자기소개
   */
  @Column({ nullable: true, type: 'text' })
  bio: string;

  /**
   * 소셜 미디어 링크 (JSON 형태로 저장)
   */
  @Column({ nullable: true, type: 'json', default: '{}' })
  socialLinks: Record<string, string>;

  /**
   * 프로필 완성도 (%)
   * 프로필 정보가 얼마나 완성되었는지 나타내는 값
   */
  @Column({ default: 0 })
  completionRate: number;
}
