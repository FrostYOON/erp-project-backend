import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../inventory/entities/product.entity';
import { RoutingOperation } from './routing-operation.entity';

/**
 * 라우팅 상태 열거형
 */
export enum RoutingStatus {
  DRAFT = 'draft', // 초안
  ACTIVE = 'active', // 활성
  OBSOLETE = 'obsolete', // 폐기
}

/**
 * 라우팅 엔티티
 * 제품 생산을 위한 작업 순서와 방법을 정의합니다.
 */
@Entity('routings')
export class Routing extends BaseEntity {
  /**
   * 라우팅 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 라우팅 이름
   */
  @Column()
  name: string;

  /**
   * 라우팅 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 라우팅 상태
   */
  @Column({
    type: 'enum',
    enum: RoutingStatus,
    default: RoutingStatus.DRAFT,
  })
  status: RoutingStatus;

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
   * 버전
   */
  @Column({ default: '1.0' })
  version: string;

  /**
   * 생성자와의 다대일 관계
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  /**
   * 생성자 ID (외래 키)
   */
  @Column()
  createdByUserId: string;

  /**
   * 승인자와의 다대일 관계
   */
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approvedByUserId' })
  approvedByUser: User;

  /**
   * 승인자 ID (외래 키)
   */
  @Column({ nullable: true })
  approvedByUserId: string;

  /**
   * 승인 날짜
   */
  @Column({ type: 'date', nullable: true })
  approvedDate: Date;

  /**
   * 유효 시작일
   */
  @Column({ type: 'date' })
  effectiveStartDate: Date;

  /**
   * 유효 종료일
   */
  @Column({ type: 'date', nullable: true })
  effectiveEndDate: Date;

  /**
   * 기본 수량
   */
  @Column({ type: 'float', default: 1 })
  quantity: number;

  /**
   * 총 작업 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  totalOperationTime: number;

  /**
   * 총 설정 시간 (분)
   */
  @Column({ type: 'float', default: 0 })
  totalSetupTime: number;

  /**
   * 라우팅 작업과의 일대다 관계
   */
  @OneToMany(() => RoutingOperation, (operation) => operation.routing, {
    cascade: true,
  })
  operations: RoutingOperation[];

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

  /**
   * 첨부 파일 URL (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  attachments: string[];
}
