import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS 설정이 올바르지 않습니다. 환경 변수를 확인하세요.');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('AWS S3 버킷 이름이 설정되지 않았습니다.');
    }
    this.bucketName = bucketName;
  }

  /**
   * 파일을 S3에 업로드합니다.
   * @param file 업로드할 파일
   * @param folder 저장할 폴더 경로
   * @returns 업로드된 파일의 URL
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('파일이 제공되지 않았습니다.');
    }

    // 파일 확장자 추출
    const fileExtension = file.originalname.split('.').pop();

    // 고유한 파일명 생성
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    // S3 업로드 파라미터
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      // S3에 파일 업로드
      await this.s3Client.send(new PutObjectCommand(params));

      // S3 URL 생성
      const region = this.configService.get<string>('AWS_REGION');
      return `https://${this.bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new BadRequestException(`파일 업로드 실패: ${error.message}`);
    }
  }

  /**
   * 프로필 이미지를 업로드합니다.
   * @param file 업로드할 이미지 파일
   * @returns 업로드된 이미지의 URL
   */
  async uploadProfileImage(file: Express.Multer.File): Promise<string> {
    // 이미지 파일 타입 검증
    if (!file.mimetype.includes('image')) {
      throw new BadRequestException('이미지 파일만 업로드할 수 있습니다.');
    }

    return this.uploadFile(file, 'profiles');
  }

  /**
   * S3에서 파일을 삭제합니다.
   * @param fileUrl 삭제할 파일의 URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    // URL에서 키 추출
    const key = this.extractKeyFromUrl(fileUrl);

    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
      throw new BadRequestException(`파일 삭제 실패: ${error.message}`);
    }
  }

  /**
   * S3 URL에서 키를 추출합니다.
   * @param url S3 파일 URL
   * @returns 파일 키
   */
  private extractKeyFromUrl(url: string): string {
    const region = this.configService.get<string>('AWS_REGION');
    const pattern = new RegExp(
      `https://${this.bucketName}.s3.${region}.amazonaws.com/(.*)`,
    );
    const match = url.match(pattern);

    if (!match) {
      throw new BadRequestException('유효하지 않은 S3 URL입니다.');
    }

    return match[1];
  }
}
