import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * 역할 기반 접근 제어 가드
 * 사용자의 역할에 따라 접근을 제어하는 가드입니다.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * 접근 제어 메서드
   * @param context 실행 컨텍스트
   * @returns 접근 허용 여부
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 역할 제한이 없으면 접근 허용
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // 사용자 정보가 없으면 접근 거부
    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    // 사용자의 역할이 필요한 역할 중 하나라도 포함되어 있으면 접근 허용
    const hasRole = requiredRoles.some(
      (role) =>
        user.roles && user.roles.some((userRole) => userRole.name === role),
    );

    if (!hasRole) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}
