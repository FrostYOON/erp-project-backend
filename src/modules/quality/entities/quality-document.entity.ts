import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../organization/entities/department.entity';
import { QualityStandard } from './quality-standard.entity';

/**
 * 품질 문서 유형 열거형
 */
export enum QualityDocumentType {
  POLICY = 'policy',
  PROCEDURE = 'procedure',
  WORK_INSTRUCTION = 'workInstruction',
  FORM = 'form',
  RECORD = 'record',
  MANUAL = 'manual',
  SPECIFICATION = 'specification',
  PLAN = 'plan',
  REPORT = 'report',
  CERTIFICATE = 'certificate',
  TEMPLATE = 'template',
  OTHER = 'other',
}

/**
 * 품질 문서 상태 열거형
 */
export enum QualityDocumentStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  OBSOLETE = 'obsolete',
  ARCHIVED = 'archived',
}

/**
 * 품질 문서 엔티티
 * 품질 관련 문서 정보를 관리합니다.
 */
@Entity('quality_documents')
export class QualityDocument extends BaseEntity {
  /**
   * 문서 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 문서 제목
   */
  @Column()
  title: string;

  /**
   * 문서 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 문서 유형
   */
  @Column({
    type: 'enum',
    enum: QualityDocumentType,
    default: QualityDocumentType.PROCEDURE,
  })
  type: QualityDocumentType;

  /**
   * 문서 상태
   */
  @Column({
    type: 'enum',
    enum: QualityDocumentStatus,
    default: QualityDocumentStatus.DRAFT,
  })
  status: QualityDocumentStatus;

  /**
   * 문서 버전
   */
  @Column()
  version: string;

  /**
   * 문서 작성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  /**
   * 문서 작성자 ID (외래 키)
   */
  @Column({ nullable: true })
  authorId: string;

  /**
   * 문서 검토자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  /**
   * 문서 검토자 ID (외래 키)
   */
  @Column({ nullable: true })
  reviewerId: string;

  /**
   * 문서 승인자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'approverId' })
  approver: User;

  /**
   * 문서 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approverId: string;

  /**
   * 문서 담당 부서와의 다대일 관계
   */
  @ManyToOne(() => Department)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  /**
   * 문서 담당 부서 ID (외래 키)
   */
  @Column({ nullable: true })
  departmentId: string;

  /**
   * 문서 관련 표준과의 다대일 관계
   */
  @ManyToOne(() => QualityStandard)
  @JoinColumn({ name: 'standardId' })
  standard: QualityStandard;

  /**
   * 문서 관련 표준 ID (외래 키)
   */
  @Column({ nullable: true })
  standardId: string;

  /**
   * 문서 작성일
   */
  @Column({ type: 'date' })
  creationDate: Date;

  /**
   * 문서 검토일
   */
  @Column({ type: 'date', nullable: true })
  reviewDate: Date;

  /**
   * 문서 승인일
   */
  @Column({ type: 'date', nullable: true })
  approvalDate: Date;

  /**
   * 문서 발행일
   */
  @Column({ type: 'date', nullable: true })
  publishDate: Date;

  /**
   * 문서 효력 시작일
   */
  @Column({ type: 'date', nullable: true })
  effectiveDate: Date;

  /**
   * 문서 효력 종료일
   */
  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  /**
   * 문서 검토 주기 (개월)
   */
  @Column({ type: 'int', nullable: true })
  reviewCycleMonths: number;

  /**
   * 다음 검토 예정일
   */
  @Column({ type: 'date', nullable: true })
  nextReviewDate: Date;

  /**
   * 문서 파일 URL
   */
  @Column({ nullable: true })
  fileUrl: string;

  /**
   * 문서 파일 이름
   */
  @Column({ nullable: true })
  fileName: string;

  /**
   * 문서 파일 크기 (바이트)
   */
  @Column({ type: 'bigint', nullable: true })
  fileSize: number;

  /**
   * 문서 파일 유형
   */
  @Column({ nullable: true })
  fileType: string;

  /**
   * 문서 파일 확장자
   */
  @Column({ nullable: true })
  fileExtension: string;

  /**
   * 문서 내용
   */
  @Column({ type: 'text', nullable: true })
  content: string;

  /**
   * 문서 참조 문서
   */
  @Column({ type: 'text', nullable: true })
  references: string;

  /**
   * 문서 관련 프로세스
   */
  @Column({ nullable: true })
  relatedProcess: string;

  /**
   * 문서 관련 제품
   */
  @Column({ nullable: true })
  relatedProduct: string;

  /**
   * 문서 관련 시스템
   */
  @Column({ nullable: true })
  relatedSystem: string;

  /**
   * 문서 접근 권한 수준
   */
  @Column({ nullable: true })
  accessLevel: string;

  /**
   * 문서 태그 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 메모
   */
  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * 추가 정보 (JSON 형태)
   */
  @Column({ type: 'json', nullable: true })
  additionalInfo: any;
}
