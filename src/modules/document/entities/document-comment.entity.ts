import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 문서 댓글 엔티티
 * 문서에 대한 댓글을 관리합니다.
 */
@Entity('document_comments')
export class DocumentComment extends BaseEntity {
  /**
   * 문서와의 다대일 관계
   */
  @ManyToOne(() => Document, (document) => document.comments, {
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
   * 작성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 작성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 상위 댓글과의 다대일 관계
   */
  @ManyToOne(() => DocumentComment, (comment) => comment.replies, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: DocumentComment;

  /**
   * 상위 댓글 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 댓글과의 일대다 관계
   */
  @OneToMany(() => DocumentComment, (comment) => comment.parent)
  replies: DocumentComment[];

  /**
   * 내용
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 페이지 번호 (PDF 등의 경우)
   */
  @Column({ type: 'int', nullable: true })
  pageNumber: number;

  /**
   * 위치 정보 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  position: Record<string, any>;

  /**
   * 해결 여부
   */
  @Column({ default: false })
  isResolved: boolean;

  /**
   * 해결자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'resolvedByUserId' })
  resolvedByUser: User;

  /**
   * 해결자 ID (외래 키)
   */
  @Column({ nullable: true })
  resolvedByUserId: string;

  /**
   * 해결 날짜
   */
  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
