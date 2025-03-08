import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 제품 카테고리 엔티티
 * 제품을 분류하는 카테고리를 관리합니다.
 */
@Entity('product_categories')
export class ProductCategory extends BaseEntity {
  /**
   * 카테고리 이름
   */
  @Column()
  name: string;

  /**
   * 카테고리 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 카테고리 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 상위 카테고리와의 다대일 관계
   */
  @ManyToOne(() => ProductCategory, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: ProductCategory;

  /**
   * 상위 카테고리 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 카테고리 목록
   */
  @OneToMany(() => ProductCategory, (category) => category.parent)
  children: ProductCategory[];

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 이미지 URL
   */
  @Column({ nullable: true })
  imageUrl: string;

  /**
   * 카테고리 레벨 (계층 구조에서의 깊이)
   */
  @Column({ type: 'int', default: 1 })
  level: number;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
