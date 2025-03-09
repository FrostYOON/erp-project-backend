import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * 사용자 컨트롤러
 * 사용자 관련 API 엔드포인트를 처리합니다.
 */
@ApiTags('사용자')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 사용자 생성 API
   * 관리자 권한이 필요합니다.
   * @param createUserDto 사용자 생성 DTO
   * @returns 생성된 사용자
   */
  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다. (관리자 전용)',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '사용자 생성 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @Post()
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * 모든 사용자 조회 API
   * 관리자 권한이 필요합니다.
   * @returns 모든 사용자 목록
   */
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자 목록을 조회합니다. (관리자 전용)',
  })
  @ApiResponse({ status: 200, description: '사용자 목록 조회 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @Get()
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * 특정 사용자 조회 API
   * 관리자이거나 자신의 정보를 조회하는 경우에만 허용됩니다.
   * @param id 사용자 ID
   * @param currentUser 현재 사용자
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: 'ID로 사용자 조회',
    description: '특정 사용자 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  @ApiResponse({ status: 200, description: '사용자 조회 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    // 관리자이거나 자신의 정보를 조회하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.id === id
    ) {
      return this.usersService.findOne(id);
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }

  /**
   * 사용자 정보 수정 API
   * 관리자 권한이 필요하거나 자신의 정보를 수정하는 경우에만 허용됩니다.
   * @param id 사용자 ID
   * @param updateUserDto 사용자 수정 DTO
   * @param currentUser 현재 사용자
   * @returns 수정된 사용자 정보
   */
  @ApiOperation({
    summary: '사용자 정보 수정',
    description: '사용자 정보를 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: '사용자 정보 수정 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    // 관리자이거나 자신의 정보를 수정하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.id === id
    ) {
      return this.usersService.update(id, updateUserDto);
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }

  /**
   * 사용자 삭제 API
   * 관리자 권한이 필요합니다.
   * @param id 사용자 ID
   * @returns 삭제 결과
   */
  @ApiOperation({
    summary: '사용자 삭제',
    description: '사용자를 삭제합니다. (관리자 전용)',
  })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  @ApiResponse({ status: 200, description: '사용자 삭제 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
   * 이메일로 사용자 조회 API
   * 관리자이거나 자신의 이메일을 조회하는 경우에만 허용합니다.
   * @param email 사용자 이메일
   * @param currentUser 현재 사용자
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: '이메일로 사용자 조회',
    description: '이메일로 사용자 정보를 조회합니다.',
  })
  @ApiParam({ name: 'email', description: '사용자 이메일' })
  @ApiResponse({ status: 200, description: '사용자 조회 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Get('by-email/:email')
  async findByEmail(
    @Param('email') email: string,
    @CurrentUser() currentUser: User,
  ) {
    // 관리자이거나 자신의 정보를 조회하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.email === email
    ) {
      return this.usersService.findByEmail(email);
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }

  /**
   * ID 또는 이메일로 사용자 조회 API
   * 관리자이거나 자신의 정보를 조회하는 경우에만 허용합니다.
   * @param identifier ID 또는 이메일
   * @param currentUser 현재 사용자
   * @returns 사용자 정보
   */
  @ApiOperation({
    summary: 'ID 또는 이메일로 사용자 조회',
    description: 'ID 또는 이메일로 사용자 정보를 조회합니다.',
  })
  @ApiParam({ name: 'identifier', description: '사용자 ID 또는 이메일' })
  @ApiResponse({ status: 200, description: '사용자 조회 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Get('find/:identifier')
  async findByIdOrEmail(
    @Param('identifier') identifier: string,
    @CurrentUser() currentUser: User,
  ) {
    const user = await this.usersService.findByIdOrEmail(identifier);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 관리자이거나 자신의 정보를 조회하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.id === user.id
    ) {
      return user;
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }
}
