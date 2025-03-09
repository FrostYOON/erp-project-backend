import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';

/**
 * 자산 카테고리 엔티티
 * 자산을 분류하는 카테고리를 관리합니다.
 */
@Entity('asset_categories')
export class AssetCategory extends BaseEntity {
  /**
   * 카테고리 이름
   */
  @Column()
  name: string;

  /**
   * 카테고리 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 카테고리 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 상위 카테고리와의 다대일 관계
   */
  @ManyToOne(() => AssetCategory, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: AssetCategory;

  /**
   * 상위 카테고리 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 카테고리와의 일대다 관계
   */
  @OneToMany(() => AssetCategory, (category) => category.parent)
  children: AssetCategory[];

  /**
   * 자산과의 일대다 관계
   */
  @OneToMany(() => Asset, (asset) => asset.category)
  assets: Asset[];

  /**
   * 감가상각 방법
   */
  @Column({ nullable: true })
  depreciationMethod: string;

  /**
   * 기본 내용연수 (월)
   */
  @Column({ type: 'int', nullable: true })
  defaultLifespan: number;

  /**
   * 기본 잔존가치율 (%)
   */
  @Column({ type: 'float', nullable: true })
  defaultResidualRate: number;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 아이콘
   */
  @Column({ nullable: true })
  icon: string;

  /**
   * 색상 코드
   */
  @Column({ nullable: true })
  colorCode: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
