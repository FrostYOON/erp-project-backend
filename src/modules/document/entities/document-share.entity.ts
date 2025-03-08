import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Document } from './document.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 공유 유형 열거형
 */
export enum ShareType {
  USER = 'user', // 사용자
  DEPARTMENT = 'department', // 부서
  ROLE = 'role', // 역할
  PUBLIC = 'public', // 공개
  LINK = 'link', // 링크
}

/**
 * 권한 수준 열거형
 */
export enum PermissionLevel {
  VIEW = 'view', // 조회
  COMMENT = 'comment', // 댓글
  EDIT = 'edit', // 편집
  MANAGE = 'manage', // 관리
}

/**
 * 문서 공유 엔티티
 * 문서 공유 정보를 관리합니다.
 */
@Entity('document_shares')
export class DocumentShare extends BaseEntity {
  /**
   * 문서와의 다대일 관계
   */
  @ManyToOne(() => Document, (document) => document.shares, {
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
   * 공유 유형
   */
  @Column({
    type: 'enum',
    enum: ShareType,
  })
  shareType: ShareType;

  /**
   * 대상 ID
   */
  @Column({ nullable: true })
  targetId: string;

  /**
   * 권한 수준
   */
  @Column({
    type: 'enum',
    enum: PermissionLevel,
    default: PermissionLevel.VIEW,
  })
  permissionLevel: PermissionLevel;

  /**
   * 공유 링크
   */
  @Column({ nullable: true })
  shareLink: string;

  /**
   * 만료일
   */
  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  /**
   * 비밀번호 (암호화됨)
   */
  @Column({ nullable: true })
  password: string;

  /**
   * 공유자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'sharedByUserId' })
  sharedByUser: User;

  /**
   * 공유자 ID (외래 키)
   */
  @Column()
  sharedByUserId: string;

  /**
   * 공유 대상 사용자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'sharedWithUserId' })
  sharedWithUser: User;

  /**
   * 공유 대상 사용자 ID (외래 키)
   */
  @Column({ nullable: true })
  sharedWithUserId: string;

  /**
   * 알림 전송 여부
   */
  @Column({ default: false })
  notificationSent: boolean;

  /**
   * 접근 횟수
   */
  @Column({ type: 'int', default: 0 })
  accessCount: number;

  /**
   * 마지막 접근 날짜
   */
  @Column({ type: 'timestamp', nullable: true })
  lastAccessedAt: Date;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;
}
