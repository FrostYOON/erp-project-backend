import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Asset } from './asset.entity';

/**
 * 자산 위치 엔티티
 * 자산의 위치 정보를 관리합니다.
 */
@Entity('asset_locations')
export class AssetLocation extends BaseEntity {
  /**
   * 위치 이름
   */
  @Column()
  name: string;

  /**
   * 위치 설명
   */
  @Column({ nullable: true, type: 'text' })
  description: string;

  /**
   * 위치 코드
   */
  @Column({ unique: true })
  code: string;

  /**
   * 상위 위치와의 다대일 관계
   */
  @ManyToOne(() => AssetLocation, (location) => location.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: AssetLocation;

  /**
   * 상위 위치 ID (외래 키)
   */
  @Column({ nullable: true })
  parentId: string;

  /**
   * 하위 위치와의 일대다 관계
   */
  @OneToMany(() => AssetLocation, (location) => location.parent)
  children: AssetLocation[];

  /**
   * 자산과의 일대다 관계
   */
  @OneToMany(() => Asset, (asset) => asset.location)
  assets: Asset[];

  /**
   * 주소
   */
  @Column({ nullable: true })
  address: string;

  /**
   * 도시
   */
  @Column({ nullable: true })
  city: string;

  /**
   * 주/도
   */
  @Column({ nullable: true })
  state: string;

  /**
   * 국가
   */
  @Column({ nullable: true })
  country: string;

  /**
   * 우편번호
   */
  @Column({ nullable: true })
  postalCode: string;

  /**
   * 위도
   */
  @Column({ type: 'float', nullable: true })
  latitude: number;

  /**
   * 경도
   */
  @Column({ type: 'float', nullable: true })
  longitude: number;

  /**
   * 건물 이름
   */
  @Column({ nullable: true })
  building: string;

  /**
   * 층
   */
  @Column({ nullable: true })
  floor: string;

  /**
   * 방 번호
   */
  @Column({ nullable: true })
  room: string;

  /**
   * 정렬 순서
   */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /**
   * 활성화 상태
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 태그 (JSON 형식으로 저장)
   */
  @Column({ type: 'json', nullable: true })
  tags: string[];
}
