import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../inventory/entities/product.entity';
import { BomItem } from './bom-item.entity';

/**
 * BOM 상태 열거형
 */
export enum BomStatus {
  DRAFT = 'draft', // 초안
  ACTIVE = 'active', // 활성
  OBSOLETE = 'obsolete', // 폐기
}

/**
 * 자재 명세서 엔티티
 * 제품 생산에 필요한 자재 구성을 관리합니다.
 */
@Entity('boms')
export class Bom extends BaseEntity {
  /**
   * BOM 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * BOM 이름
   */
  @Column()
  name: string;

  /**
   * BOM 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * BOM 상태
   */
  @Column({
    type: 'enum',
    enum: BomStatus,
    default: BomStatus.DRAFT,
  })
  status: BomStatus;

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
   * BOM 항목과의 일대다 관계
   */
  @OneToMany(() => BomItem, (item) => item.bom, { cascade: true })
  items: BomItem[];

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
