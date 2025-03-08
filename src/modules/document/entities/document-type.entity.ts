import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';

/**
 * 문서 유형 엔티티
 * 문서의 유형을 관리합니다.
 */
@Entity('document_types')
export class DocumentType extends BaseEntity {
  /**
   * 유형 이름
   */
  @Column()
  name: string;

  /**
   * 유형 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 유형 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 파일 확장자 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  allowedExtensions: string[];

  /**
   * 최대 파일 크기 (바이트)
   */
  @Column({ type: 'bigint', nullable: true })
  maxFileSize: number;

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
   * 문서와의 일대다 관계
   */
  @OneToMany(() => Document, (document) => document.type)
  documents: Document[];

  /**
   * 메타데이터 스키마 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  metadataSchema: Record<string, any>;
}
