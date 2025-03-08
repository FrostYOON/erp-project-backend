import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 문서 버전 엔티티
 * 문서의 버전 정보를 관리합니다.
 */
@Entity('document_versions')
export class DocumentVersion extends BaseEntity {
  /**
   * 문서와의 다대일 관계
   */
  @ManyToOne(() => Document, (document) => document.versions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'documentId' })
  document: Document;

  /**
   * 문서 ID (외래 키)
   */
  @Column()
  documentId: string;

  /**
   * 버전 번호
   */
  @Column({ type: 'int' })
  versionNumber: number;

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
   * 파일 해시 (무결성 검증용)
   */
  @Column({ nullable: true })
  fileHash: string;

  /**
   * 변경 내용
   */
  @Column({ nullable: true, type: 'text' })
  changeLog: string;

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
   * 메타데이터 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

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
   * 다운로드 수
   */
  @Column({ type: 'int', default: 0 })
  downloadCount: number;
}
