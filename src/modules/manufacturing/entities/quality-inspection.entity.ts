import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../inventory/entities/product.entity';
import { ProductionOrder } from './production-order.entity';
import { WorkOrder } from './work-order.entity';
import { QualityInspectionItem } from './quality-inspection-item.entity';

/**
 * 품질 검사 유형 열거형
 */
export enum QualityInspectionType {
  INCOMING = 'incoming', // 입고 검사
  IN_PROCESS = 'inProcess', // 공정 중 검사
  FINAL = 'final', // 최종 검사
  OUTGOING = 'outgoing', // 출하 검사
}

/**
 * 품질 검사 상태 열거형
 */
export enum QualityInspectionStatus {
  PLANNED = 'planned', // 계획됨
  IN_PROGRESS = 'inProgress', // 진행 중
  COMPLETED = 'completed', // 완료됨
  CANCELLED = 'cancelled', // 취소됨
}

/**
 * 품질 검사 결과 열거형
 */
export enum QualityInspectionResult {
  PENDING = 'pending', // 대기 중
  PASSED = 'passed', // 합격
  FAILED = 'failed', // 불합격
  CONDITIONALLY_PASSED = 'conditionallyPassed', // 조건부 합격
}

/**
 * 품질 검사 엔티티
 * 생산된 제품의 품질 검사를 관리합니다.
 */
@Entity('quality_inspections')
export class QualityInspection extends BaseEntity {
  /**
   * 품질 검사 번호
   */
  @Column({ unique: true })
  number: string;

  /**
   * 품질 검사 유형
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionType,
  })
  type: QualityInspectionType;

  /**
   * 품질 검사 상태
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionStatus,
    default: QualityInspectionStatus.PLANNED,
  })
  status: QualityInspectionStatus;

  /**
   * 품질 검사 결과
   */
  @Column({
    type: 'enum',
    enum: QualityInspectionResult,
    default: QualityInspectionResult.PENDING,
  })
  result: QualityInspectionResult;

  /**
   * 제품과의 다대일 관계
   */
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  /**
   * 제품 ID (외래 키)
   */
  @Column()
  productId: string;

  /**
   * 생산 주문과의 다대일 관계
   */
  @ManyToOne(() => ProductionOrder, { nullable: true })
  @JoinColumn({ name: 'productionOrderId' })
  productionOrder: ProductionOrder;

  /**
   * 생산 주문 ID (외래 키)
   */
  @Column({ nullable: true })
  productionOrderId: string;

  /**
   * 작업 지시와의 다대일 관계
   */
  @ManyToOne(() => WorkOrder, { nullable: true })
  @JoinColumn({ name: 'workOrderId' })
  workOrder: WorkOrder;

  /**
   * 작업 지시 ID (외래 키)
   */
  @Column({ nullable: true })
  workOrderId: string;

  /**
   * 검사 수량
   */
  @Column({ type: 'float' })
  inspectionQuantity: number;

  /**
   * 합격 수량
   */
  @Column({ type: 'float', default: 0 })
  passedQuantity: number;

  /**
   * 불합격 수량
   */
  @Column({ type: 'float', default: 0 })
  failedQuantity: number;

  /**
   * 검사자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'inspectedByUserId' })
  inspectedByUser: User;

  /**
   * 검사자 ID (외래 키)
   */
  @Column()
  inspectedByUserId: string;

  /**
   * 계획 검사일
   */
  @Column({ type: 'date' })
  plannedInspectionDate: Date;

  /**
   * 실제 검사일
   */
  @Column({ type: 'date', nullable: true })
  actualInspectionDate: Date;

  /**
   * 품질 검사 항목과의 일대다 관계
   */
  @OneToMany(() => QualityInspectionItem, (item) => item.qualityInspection, {
    cascade: true,
  })
  inspectionItems: QualityInspectionItem[];

  /**
   * 검사 결과 요약
   */
  @Column({ nullable: true, type: 'text' })
  resultSummary: string;

  /**
   * 시정 조치
   */
  @Column({ nullable: true, type: 'text' })
  correctiveActions: string;

  /**
   * 메모
   */
  @Column({ nullable: true, type: 'text' })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
