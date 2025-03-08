import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';

/**
 * 문서 유형 열거형
 */
export enum DocumentType {
  PLAN = 'plan', // 계획서
  SPECIFICATION = 'specification', // 명세서
  REPORT = 'report', // 보고서
  MEETING = 'meeting', // 회의록
  CONTRACT = 'contract', // 계약서
  OTHER = 'other', // 기타
}

/**
 * 프로젝트 문서 엔티티
 * 프로젝트 관련 문서를 관리합니다.
 */
@Entity('project_documents')
export class ProjectDocument extends BaseEntity {
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
   * 문서 유형
   */
  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.OTHER,
  })
  type: DocumentType;

  /**
   * 프로젝트와의 다대일 관계
   */
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  /**
   * 프로젝트 ID (외래 키)
   */
  @Column()
  projectId: string;

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
   * 파일 URL
   */
  @Column()
  fileUrl: string;

  /**
   * 파일 이름
   */
  @Column()
  fileName: string;

  /**
   * 파일 크기 (바이트)
   */
  @Column({ type: 'int', nullable: true })
  fileSize: number;

  /**
   * 파일 유형
   */
  @Column({ nullable: true })
  fileType: string;

  /**
   * 버전
   */
  @Column({ default: '1.0' })
  version: string;

  /**
   * 카테고리
   */
  @Column({ nullable: true })
  category: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;
}
