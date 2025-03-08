import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

/**
 * 측정 단위 유형 열거형
 */
export enum UnitOfMeasureType {
  UNIT = 'unit', // 개수 단위
  WEIGHT = 'weight', // 무게 단위
  VOLUME = 'volume', // 부피 단위
  LENGTH = 'length', // 길이 단위
  TIME = 'time', // 시간 단위
  PACKAGE = 'package', // 패키지 단위
}

/**
 * 측정 단위 엔티티
 * 제품의 수량을 측정하는 단위를 관리합니다.
 */
@Entity('units_of_measure')
export class UnitOfMeasure extends BaseEntity {
  /**
   * 단위 이름
   */
  @Column()
  name: string;

  /**
   * 단위 약어
   */
  @Column()
  abbreviation: string;

  /**
   * 단위 설명
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 기본 단위 여부
   */
  @Column({ default: false })
  isBaseUnit: boolean;

  /**
   * 단위 유형 (무게, 길이, 부피, 개수 등)
   */
  @Column({ nullable: true })
  type: string;

  /**
   * 변환 비율 (기본 단위 대비)
   */
  @Column({ type: 'float', default: 1 })
  conversionFactor: number;
}
