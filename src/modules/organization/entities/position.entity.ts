import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 직위/직급 엔티티
 * 조직의 직위 및 직급 체계를 정의하는 엔티티입니다.
 */
@Entity('positions')
export class Position extends BaseEntity {
  /**
   * 직위/직급 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 직위/직급 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 직위/직급 코드
   */
  @Column({ nullable: true })
  code: string;

  /**
   * 직급 레벨
   */
  @Column({ type: 'int', default: 0 })
  level: number;

  /**
   * 직위/직급 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;
}
