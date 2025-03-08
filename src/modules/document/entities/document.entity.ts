import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { DocumentCategory } from './document-category.entity';
import { DocumentType } from './document-type.entity';
import { DocumentTag } from './document-tag.entity';
import { DocumentVersion } from './document-version.entity';
import { DocumentComment } from './document-comment.entity';
import { DocumentShare } from './document-share.entity';

/**
 * 문서 상태 열거형
 */
export enum DocumentStatus {
  DRAFT = 'draft', // 초안
  PENDING = 'pending', // 검토 중
  APPROVED = 'approved', // 승인됨
  REJECTED = 'rejected', // 거부됨
  ARCHIVED = 'archived', // 보관됨
  DELETED = 'deleted', // 삭제됨
}

/**
 * 문서 엔티티
 * 문서 정보를 관리합니다.
 */
@Entity('documents')
export class Document extends BaseEntity {
  /**
   * 문서 제목
   */
  @Column()
  title: string;

  /**
   * 문서 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 문서 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 문서 상태
   */
  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.DRAFT,
  })
  status: DocumentStatus;

  /**
   * 카테고리와의 다대일 관계
   */
  @ManyToOne(() => DocumentCategory, (category) => category.documents, {
    nullable: true,
  })
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
  @ManyToOne(() => DocumentType, (type) => type.documents)
  @JoinColumn({ name: 'typeId' })
  type: DocumentType;

  /**
   * 문서 유형 ID (외래 키)
   */
  @Column()
  typeId: string;

  /**
   * 소유자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  /**
   * 소유자 ID (외래 키)
   */
  @Column()
  ownerId: string;

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
   * 최종 수정자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'lastModifiedByUserId' })
  lastModifiedByUser: User;

  /**
   * 최종 수정자 ID (외래 키)
   */
  @Column({ nullable: true })
  lastModifiedByUserId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  /**
   * 만료일
   */
  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  /**
   * 중요도
   */
  @Column({ type: 'int', default: 0 })
  importance: number;

  /**
   * 기밀성
   */
  @Column({ type: 'int', default: 0 })
  confidentiality: number;

  /**
   * 키워드 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  keywords: string[];

  /**
   * 메타데이터 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  /**
   * 태그와의 다대다 관계
   */
  @ManyToMany(() => DocumentTag, (tag) => tag.documents)
  @JoinTable({
    name: 'document_tag_mappings',
    joinColumn: { name: 'documentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: DocumentTag[];

  /**
   * 문서 버전과의 일대다 관계
   */
  @OneToMany(() => DocumentVersion, (version) => version.document, {
    cascade: true,
  })
  versions: DocumentVersion[];

  /**
   * 현재 버전 번호
   */
  @Column({ type: 'int', default: 1 })
  currentVersionNumber: number;

  /**
   * 문서 댓글과의 일대다 관계
   */
  @OneToMany(() => DocumentComment, (comment) => comment.document)
  comments: DocumentComment[];

  /**
   * 문서 공유와의 일대다 관계
   */
  @OneToMany(() => DocumentShare, (share) => share.document)
  shares: DocumentShare[];

  /**
   * 조회수
   */
  @Column({ type: 'int', default: 0 })
  viewCount: number;

  /**
   * 다운로드 수
   */
  @Column({ type: 'int', default: 0 })
  downloadCount: number;

  /**
   * 좋아요 수
   */
  @Column({ type: 'int', default: 0 })
  likeCount: number;

  /**
   * 참조 문서 ID (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  relatedDocumentIds: string[];
}
