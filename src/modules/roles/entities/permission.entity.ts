import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from './role.entity';
/**
 * 권한 엔티티
 * 시스템 내 개별 권한을 정의하는 엔티티입니다.
 */
@Entity('permissions')
export class Permission extends BaseEntity {
  /**
   * 권한 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 권한 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 리소스 이름
   */
  @Column()
  resource: string;

  /**
   * 액션 유형
   */
  @Column()
  action: string;

  /**
   * 시스템 권한 여부
   */
  @Column({ default: false })
  isSystem: boolean;

  /**
   * Role 엔티티와의 다대다 관계
   */
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
