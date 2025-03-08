import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Permission } from './permission.entity';
import { User } from '../../users/entities/user.entity';
/**
 * 역할 엔티티
 * 시스템 내 사용자 역할(권한 그룹)을 정의하는 엔티티입니다.
 */
@Entity('roles')
export class Role extends BaseEntity {
  /**
   * 역할 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 역할 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 기본 역할 여부
   */
  @Column({ default: false })
  isDefault: boolean;

  /**
   * 시스템 역할 여부
   */
  @Column({ default: false })
  isSystem: boolean;

  /**
   * Permission 엔티티와의 다대다 관계
   */
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  /**
   * User 엔티티와의 다대다 관계
   */
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
