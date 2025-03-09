import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { hashPassword } from '../../common/utils/password.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 비밀번호 해싱
    const hashedPassword = await hashPassword(createUserDto.password);

    // 해싱된 비밀번호로 사용자 생성
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['roles', 'profile'],
    });
  }

  /**
   * ID로 사용자 찾기
   * @param id 사용자 ID
   * @returns 사용자 정보
   */
  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'],
    });
  }

  /**
   * 이메일로 사용자 찾기
   * @param email 사용자 이메일
   * @returns 사용자 정보
   */
  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'profile'],
    });
  }

  /**
   * ID 또는 이메일로 사용자 찾기
   * @param identifier ID 또는 이메일
   * @returns 사용자 정보
   */
  async findByIdOrEmail(identifier: string) {
    // 이메일인 경우
    if (identifier.includes('@')) {
      return this.findByEmail(identifier);
    }

    // UUID인 경우
    return this.findOne(identifier);
  }

  /**
   * 사용자 정보 업데이트
   * @param id 사용자 ID
   * @param updateUserDto 업데이트할 정보
   * @returns 업데이트된 사용자 정보
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // 비밀번호가 포함된 경우 해싱
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  /**
   * 사용자 삭제
   * @param id 사용자 ID
   * @returns 삭제 결과
   */
  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`사용자 ID ${id}를 찾을 수 없습니다.`);
    }
    return this.userRepository.remove(user);
  }

  /**
   * 사용자 프로필 업데이트
   * @param userId 사용자 ID
   * @param updateProfileDto 프로필 업데이트 DTO
   * @returns 업데이트된 프로필 정보
   */
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(`사용자 ID ${userId}를 찾을 수 없습니다.`);
    }

    // 프로필이 없는 경우 생성
    if (!user.profile) {
      user.profile = this.userProfileRepository.create({
        userId: user.id,
      });
    }

    // 프로필 정보 업데이트
    Object.assign(user.profile, updateProfileDto);

    // 프로필 완성도 계산
    user.profile.completionRate = this.calculateProfileCompletionRate(
      user.profile,
    );

    // 프로필 저장
    await this.userProfileRepository.save(user.profile);

    return user.profile;
  }

  /**
   * 프로필 완성도 계산
   * @param profile 사용자 프로필
   * @returns 프로필 완성도 (%)
   */
  private calculateProfileCompletionRate(profile: UserProfile): number {
    const fields = [
      'firstName',
      'lastName',
      'phoneNumber',
      'dateOfBirth',
      'profileImageUrl',
      'address',
      'occupation',
      'bio',
    ];

    const filledFields = fields.filter((field) => !!profile[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  }
}
