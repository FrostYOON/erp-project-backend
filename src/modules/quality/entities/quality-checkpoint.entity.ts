import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { QualityControlPlan } from './quality-control-plan.entity';

/**
 * 품질 체크포인트 유형 열거형
 */
export enum QualityCheckpointType {
  VISUAL = 'visual',
  MEASUREMENT = 'measurement',
  FUNCTIONAL = 'functional',
  DOCUMENTATION = 'documentation',
  PROCESS = 'process',
  SAFETY = 'safety',
  ENVIRONMENTAL = 'environmental',
  REGULATORY = 'regulatory',
  OTHER = 'other',
}

/**
 * 품질 체크포인트 중요도 열거형
 */
export enum QualityCheckpointSeverity {
  CRITICAL = 'critical',
  MAJOR = 'major',
  MINOR = 'minor',
  NEGLIGIBLE = 'negligible',
}

/**
 * 품질 체크포인트 엔티티
 * 품질 검사 체크포인트 정보를 관리합니다.
 */
@Entity('quality_checkpoints')
export class QualityCheckpoint extends BaseEntity {
  /**
   * 체크포인트 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 체크포인트 이름
   */
  @Column()
  name: string;

  /**
   * 체크포인트 설명
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * 체크포인트 유형
   */
  @Column({
    type: 'enum',
    enum: QualityCheckpointType,
    default: QualityCheckpointType.VISUAL,
  })
  type: QualityCheckpointType;

  /**
   * 체크포인트 중요도
   */
  @Column({
    type: 'enum',
    enum: QualityCheckpointSeverity,
    default: QualityCheckpointSeverity.MINOR,
  })
  severity: QualityCheckpointSeverity;

  /**
   * 품질 관리 계획과의 다대일 관계
   */
  @ManyToOne(() => QualityControlPlan, (controlPlan) => controlPlan.checkpoints)
  @JoinColumn({ name: 'controlPlanId' })
  controlPlan: QualityControlPlan;

  /**
   * 품질 관리 계획 ID (외래 키)
   */
  @Column({ nullable: true })
  controlPlanId: string;

  /**
   * 체크포인트 순서
   */
  @Column({ type: 'int', default: 0 })
  sequence: number;

  /**
   * 체크포인트 단계
   */
  @Column({ nullable: true })
  stage: string;

  /**
   * 체크포인트 프로세스
   */
  @Column({ nullable: true })
  process: string;

  /**
   * 체크포인트 특성
   */
  @Column({ nullable: true })
  characteristic: string;

  /**
   * 체크포인트 사양
   */
  @Column({ nullable: true })
  specification: string;

  /**
   * 체크포인트 허용 오차
   */
  @Column({ nullable: true })
  tolerance: string;

  /**
   * 체크포인트 측정 단위
   */
  @Column({ nullable: true })
  unit: string;

  /**
   * 체크포인트 측정 방법
   */
  @Column({ type: 'text', nullable: true })
  measurementMethod: string;

  /**
   * 체크포인트 측정 장비
   */
  @Column({ nullable: true })
  measurementEquipment: string;

  /**
   * 체크포인트 샘플 크기
   */
  @Column({ type: 'int', nullable: true })
  sampleSize: number;

  /**
   * 체크포인트 샘플링 빈도
   */
  @Column({ nullable: true })
  samplingFrequency: string;

  /**
   * 체크포인트 관리 방법
   */
  @Column({ type: 'text', nullable: true })
  controlMethod: string;

  /**
   * 체크포인트 반응 계획
   */
  @Column({ type: 'text', nullable: true })
  reactionPlan: string;

  /**
   * 체크포인트 담당자
   */
  @Column({ nullable: true })
  responsiblePerson: string;

  /**
   * 체크포인트 기록 방법
   */
  @Column({ nullable: true })
  recordingMethod: string;

  /**
   * 체크포인트 이미지 URL
   */
  @Column({ nullable: true })
  imageUrl: string;

  /**
   * 체크포인트 활성화 여부
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 체크포인트 태그 (JSON 형태)
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
