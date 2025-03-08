import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { DocumentCategory } from './document-category.entity';
import { DocumentType } from './document-type.entity';
import { DocumentTag } from './document-tag.entity';

/**
 * 문서 템플릿 엔티티
 * 문서 템플릿 정보를 관리합니다.
 */
@Entity('document_templates')
export class DocumentTemplate extends BaseEntity {
  /**
   * 템플릿 이름
   */
  @Column()
  name: string;

  /**
   * 템플릿 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 템플릿 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 카테고리와의 다대일 관계
   */
  @ManyToOne(() => DocumentCategory, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: DocumentCategory;

  /**
   * 카테고리 ID (외래 키)
   */
  @Column({ nullable: true })
  categoryId: string;

  /**
   * 문서 유형과의 다대일 관계
   */
  @ManyToOne(() => DocumentType)
  @JoinColumn({ name: 'typeId' })
  type: DocumentType;

  /**
   * 문서 유형 ID (외래 키)
   */
  @Column()
  typeId: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 파일 이름
   */
  @Column()
  fileName: string;

  /**
   * 파일 크기 (바이트)
   */
  @Column({ type: 'bigint' })
  fileSize: number;

  /**
   * 파일 유형
   */
  @Column()
  fileType: string;

  /**
   * 파일 확장자
   */
  @Column()
  fileExtension: string;

  /**
   * 파일 URL
   */
  @Column()
  fileUrl: string;

  /**
   * 썸네일 URL
   */
  @Column({ nullable: true })
  thumbnailUrl: string;

  /**
   * 미리보기 URL
   */
  @Column({ nullable: true })
  previewUrl: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 태그와의 다대다 관계
   */
  @ManyToMany(() => DocumentTag)
  @JoinTable({
    name: 'document_template_tag_mappings',
    joinColumn: { name: 'templateId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: DocumentTag[];

  /**
   * 메타데이터 스키마 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  metadataSchema: Record<string, any>;

  /**
   * 기본 메타데이터 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  defaultMetadata: Record<string, any>;

  /**
   * 사용 횟수
   */
  @Column({ type: 'int', default: 0 })
  usageCount: number;
}
