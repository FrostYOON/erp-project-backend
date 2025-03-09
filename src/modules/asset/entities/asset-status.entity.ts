import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';

/**
 * 자산 상태 엔티티
 * 자산의 상태 정보를 관리합니다.
 */
@Entity('asset_statuses')
export class AssetStatus extends BaseEntity {
  /**
   * 상태 이름
   */
  @Column()
  name: string;

  /**
   * 상태 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 상태 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 자산과의 일대다 관계
   */
  @OneToMany(() => Asset, (asset) => asset.status)
  assets: Asset[];

  /**
   * 색상 코드
   */
  @Column({ nullable: true })
  colorCode: string;

  /**
   * 아이콘
   */
  @Column({ nullable: true })
  icon: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 사용 가능 여부
   */
  @Column({ default: true })
  isUsable: boolean;

  /**
   * 유지보수 필요 여부
   */
  @Column({ default: false })
  needsMaintenance: boolean;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
