import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { QualityInspection } from './quality-inspection.entity';

/**
 * 품질 검사 항목 결과 열거형
 */
export enum QualityInspectionItemResult {
  PENDING = 'pending', // 대기 중
  PASSED = 'passed', // 합격
  FAILED = 'failed', // 불합격
}

/**
 * 품질 검사 항목 엔티티
 * 품질 검사의 개별 검사 항목을 관리합니다.
 */
@Entity('quality_inspection_items')
export class QualityInspectionItem extends BaseEntity {
  /**
   * 품질 검사와의 다대일 관계
   */
  @ManyToOne(
    () => QualityInspection,
    (inspection) => inspection.inspectionItems,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'qualityInspectionId' })
  qualityInspection: QualityInspection;

  /**
   * 품질 검사 ID (외래 키)
   */
  @Column()
  qualityInspectionId: string;

  /**
   * 검사 항목 이름
   */
  @Column()
  name: string;

  /**
   * 검사 항목 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 검사 방법
   */
  @Column({ nullable: true })
  inspectionMethod: string;

  /**
   * 최소 허용값
   */
  @Column({ type: 'float', nullable: true })
  minValue: number;

  /**
   * 최대 허용값
   */
  @Column({ type: 'float', nullable: true })
  maxValue: number;

  /**
   * 목표값
   */
  @Column({ type: 'float', nullable: true })
  targetValue: number;

  /**
   * 측정값
   */
  @Column({ type: 'float', nullable: true })
  measuredValue: number;

  /**
   * 단위
   */
  @Column({ nullable: true })
  unit: string;

  /**
   * 검사 항목 결과
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionItemResult,
    default: QualityInspectionItemResult.PENDING,
  })
  result: QualityInspectionItemResult;

  /**
   * 결과 설명
   */
  @Column({ nullable: true, type: 'text' })
  resultNotes: string;

  /**
   * 시정 조치
   */
  @Column({ nullable: true, type: 'text' })
  correctiveActions: string;

  /**
   * 순서
   */
  @Column({ type: 'int', default: 0 })
  sequence: number;

  /**
   * 필수 항목 여부
   */
  @Column({ default: true })
  isMandatory: boolean;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
