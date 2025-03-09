import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';
import { User } from '../../users/entities/user.entity';

/**
 * 첨부 파일 유형 열거형
 */
export enum AttachmentType {
  IMAGE = 'image', // 이미지
  DOCUMENT = 'document', // 문서
  INVOICE = 'invoice', // 송장
  WARRANTY = 'warranty', // 보증서
  MANUAL = 'manual', // 매뉴얼
  CONTRACT = 'contract', // 계약서
  CERTIFICATE = 'certificate', // 인증서
  OTHER = 'other', // 기타
}

/**
 * 자산 첨부 파일 엔티티
 * 자산의 첨부 파일을 관리합니다.
 */
@Entity('asset_attachments')
export class AssetAttachment extends BaseEntity {
  /**
   * 자산과의 다대일 관계
   */
  @ManyToOne(() => Asset, (asset) => asset.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetId' })
  asset: Asset;

  /**
   * 자산 ID (외래 키)
   */
  @Column()
  assetId: string;

  /**
   * 첨부 파일 이름
   */
  @Column()
  name: string;

  /**
   * 첨부 파일 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 첨부 파일 유형
   */
  @Column({
    type: 'enum',
    enum: AttachmentType,
    default: AttachmentType.OTHER,
  })
  type: AttachmentType;

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
   * 업로더와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploadedByUserId' })
  uploadedByUser: User;

  /**
   * 업로더 ID (외래 키)
   */
  @Column()
  uploadedByUserId: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
