import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT 인증 가드
 * JWT 전략을 사용하는 인증 가드입니다.
 * 공개 라우트(@Public 데코레이터가 적용된 라우트)는 인증을 건너뜁니다.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * 인증 활성화 여부 결정
   * @param context 실행 컨텍스트
   * @returns 인증 활성화 여부
   */
  canActivate(context: ExecutionContext) {
    // 공개 라우트 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 공개 라우트인 경우 인증 건너뛰기
    if (isPublic) {
      return true;
    }

    // 인증 진행
    return super.canActivate(context);
  }
}
