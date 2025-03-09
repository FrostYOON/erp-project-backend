import { SetMetadata } from '@nestjs/common';

/**
 * 역할 메타데이터 키
 */
export const ROLES_KEY = 'roles';

/**
 * 역할 데코레이터
 * 컨트롤러나 메서드에 필요한 역할을 지정합니다.
 * @param roles 필요한 역할 목록
 * @returns 데코레이터
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
