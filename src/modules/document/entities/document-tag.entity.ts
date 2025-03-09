import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';

/**
 * 문서 태그 엔티티
 * 문서에 적용할 수 있는 태그를 관리합니다.
 */
@Entity('document_tags')
export class DocumentTag extends BaseEntity {
  /**
   * 태그 이름
   */
  @Column({ unique: true })
  name: string;

  /**
   * 태그 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

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
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 문서와의 다대다 관계
   */
  @ManyToMany(() => Document, (document) => document.tags)
  documents: Document[];
}
