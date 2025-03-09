import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Routing } from './routing.entity';
import { WorkCenter } from './work-center.entity';
import { WorkStation } from './work-station.entity';

/**
 * 라우팅 작업 엔티티
 * 라우팅의 개별 작업 단계를 관리합니다.
 */
@Entity('routing_operations')
export class RoutingOperation extends BaseEntity {
  /**
   * 라우팅과의 다대일 관계
   */
  @ManyToOne(() => Routing, (routing) => routing.operations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'routingId' })
  routing: Routing;

  /**
   * 라우팅 ID (외래 키)
   */
  @Column()
  routingId: string;

  /**
   * 작업 번호
   */
  @Column()
  operationNumber: string;

  /**
   * 작업 이름
   */
  @Column()
  name: string;

  /**
   * 작업 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 작업 센터와의 다대일 관계
   */
  @ManyToOne(() => WorkCenter)
  @JoinColumn({ name: 'workCenterId' })
  workCenter: WorkCenter;

  /**
   * 작업 센터 ID (외래 키)
   */
  @Column()
  workCenterId: string;

  /**
   * 작업 스테이션과의 다대일 관계
   */
  @ManyToOne(() => WorkStation, { nullable: true })
  @JoinColumn({ name: 'workStationId' })
  workStation: WorkStation;

  /**
   * 작업 스테이션 ID (외래 키)
   */
  @Column({ nullable: true })
  workStationId: string;

  /**
   * 순서
   */
  @Column({ type: 'int' })
  sequence: number;

  /**
   * 설정 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  setupTime: number;

  /**
   * 작업 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  operationTime: number;

  /**
   * 대기 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  waitTime: number;

  /**
   * 이동 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  moveTime: number;

  /**
   * 작업 지침
   */
  @Column({ nullable: true, type: 'text' })
  instructions: string;

  /**
   * 품질 검사 필요 여부
   */
  @Column({ default: false })
  requiresInspection: boolean;

  /**
   * 품질 검사 지침
   */
  @Column({ nullable: true, type: 'text' })
  inspectionInstructions: string;

  /**
   * 필요 기술
   */
  @Column({ nullable: true })
  requiredSkills: string;

  /**
   * 필요 도구
   */
  @Column({ nullable: true })
  requiredTools: string;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
