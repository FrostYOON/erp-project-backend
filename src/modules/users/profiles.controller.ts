import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  ForbiddenException,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { FilesService } from '../files/files.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('프로필')
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * 현재 사용자의 프로필 조회 API
   * @param currentUser 현재 사용자
   * @returns 사용자 프로필 정보
   */
  @ApiOperation({
    summary: '내 프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser() currentUser: User) {
    const user = await this.usersService.findOne(currentUser.id);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user.profile;
  }

  /**
   * 특정 사용자의 프로필 조회 API
   * @param id 사용자 ID
   * @param currentUser 현재 사용자
   * @returns 사용자 프로필 정보
   */
  @ApiOperation({
    summary: '사용자 프로필 조회',
    description: '특정 사용자의 프로필 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 관리자이거나 자신의 프로필을 조회하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.id === id
    ) {
      return user.profile;
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }

  /**
   * 프로필 업데이트 API
   * @param currentUser 현재 사용자
   * @param updateProfileDto 프로필 업데이트 DTO
   * @returns 업데이트된 프로필 정보
   */
  @ApiOperation({
    summary: '내 프로필 업데이트',
    description: '현재 로그인한 사용자의 프로필 정보를 업데이트합니다.',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: '프로필 업데이트 성공' })
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @CurrentUser() currentUser: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateProfile(
      currentUser.id,
      updateProfileDto,
    );
  }

  /**
   * 특정 사용자의 프로필 업데이트 API
   * @param id 사용자 ID
   * @param updateProfileDto 프로필 업데이트 DTO
   * @param currentUser 현재 사용자
   * @returns 업데이트된 프로필 정보
   */
  @ApiOperation({
    summary: '사용자 프로필 업데이트',
    description: '특정 사용자의 프로필 정보를 업데이트합니다.',
  })
  @ApiParam({ name: 'id', description: '사용자 ID' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, description: '프로필 업데이트 성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() currentUser: User,
  ) {
    // 관리자이거나 자신의 프로필을 업데이트하는 경우에만 허용
    if (
      currentUser.roles.some((role) => role.name === 'admin') ||
      currentUser.id === id
    ) {
      return await this.usersService.updateProfile(id, updateProfileDto);
    }

    throw new ForbiddenException('이 작업을 수행할 권한이 없습니다.');
  }

  /**
   * 프로필 이미지 업로드 API
   * @param currentUser 현재 사용자
   * @param file 업로드할 이미지 파일
   * @returns 업로드된 이미지 URL
   */
  @ApiOperation({
    summary: '프로필 이미지 업로드',
    description: '현재 로그인한 사용자의 프로필 이미지를 업로드합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '프로필 이미지 파일 (최대 5MB, 이미지 파일만 허용)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '이미지 업로드 성공',
    schema: { properties: { profileImageUrl: { type: 'string' } } },
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('me/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB 제한
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('이미지 파일만 업로드할 수 있습니다.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadProfileImage(
    @CurrentUser() currentUser: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    // 이미지 업로드
    const imageUrl = await this.filesService.uploadProfileImage(file);

    // 기존 프로필 이미지가 있는 경우 삭제
    const user = await this.usersService.findOne(currentUser.id);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    if (user.profile?.profileImageUrl) {
      try {
        await this.filesService.deleteFile(user.profile.profileImageUrl);
      } catch (error) {
        console.error('기존 프로필 이미지 삭제 실패:', error);
      }
    }

    // 프로필 업데이트
    const updatedProfile = await this.usersService.updateProfile(
      currentUser.id,
      { profileImageUrl: imageUrl },
    );

    return { profileImageUrl: updatedProfile.profileImageUrl };
  }
}
