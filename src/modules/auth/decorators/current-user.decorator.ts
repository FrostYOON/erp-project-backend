import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 현재 사용자 데코레이터
 * 컨트롤러 메서드에서 현재 인증된 사용자 정보를 가져옵니다.
 * @param data 사용자 객체에서 추출할 속성 (선택 사항)
 * @param context 실행 컨텍스트
 * @returns 사용자 정보 또는 지정된 속성
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 사용자 정보가 없는 경우
    if (!user) {
      return null;
    }

    // 특정 속성을 요청한 경우 해당 속성만 반환
    if (data) {
      return user[data];
    }

    // 전체 사용자 정보 반환
    return user;
  },
);
