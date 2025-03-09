import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('파일')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * 프로필 이미지 업로드 API
   * @param file 업로드할 이미지 파일
   * @returns 업로드된 이미지 URL
   */
  @ApiOperation({
    summary: '프로필 이미지 업로드',
    description: '사용자 프로필 이미지를 업로드합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '이미지 업로드 성공',
    schema: { properties: { url: { type: 'string' } } },
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('profile-image')
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
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    const url = await this.filesService.uploadProfileImage(file);
    return { url };
  }
}
