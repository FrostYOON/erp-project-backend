import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { WorkCenter } from './work-center.entity';

/**
 * 작업 스테이션 엔티티
 * 작업 센터 내의 개별 작업 스테이션을 관리합니다.
 */
@Entity('work_stations')
export class WorkStation extends BaseEntity {
  /**
   * 작업 스테이션 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 작업 스테이션 이름
   */
  @Column()
  name: string;

  /**
   * 작업 스테이션 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 작업 센터와의 다대일 관계
   */
  @ManyToOne(() => WorkCenter, (center) => center.workStations)
  @JoinColumn({ name: 'workCenterId' })
  workCenter: WorkCenter;

  /**
   * 작업 센터 ID (외래 키)
   */
  @Column()
  workCenterId: string;

  /**
   * 위치
   */
  @Column({ nullable: true })
  location: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 생산 능력 (시간당)
   */
  @Column({ type: 'float', nullable: true })
  capacityPerHour: number;

  /**
   * 생산 능력 단위
   */
  @Column({ nullable: true })
  capacityUnit: string;

  /**
   * 시간당 비용
   */
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  costPerHour: number;

  /**
   * 통화
   */
  @Column({ default: 'KRW' })
  currency: string;

  /**
   * 설비 정보
   */
  @Column({ nullable: true })
  equipment: string;

  /**
   * 메모
   */
  @Column({ nullable: true })
  notes: string;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
