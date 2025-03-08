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
}
