import * as bcrypt from 'bcrypt';

/**
 * 비밀번호 유틸리티
 * 비밀번호 해싱 및 비교 기능을 제공합니다.
 */

// 환경에 따른 기본 솔트 라운드 설정
const DEFAULT_SALT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 10;

/**
 * 비밀번호 해싱
 * @param password 해싱할 비밀번호
 * @param saltRounds 솔트 라운드 (기본값: 환경에 따라 10 또는 12)
 * @returns 해싱된 비밀번호
 */
export const hashPassword = async (
  password: string,
  saltRounds: number = DEFAULT_SALT_ROUNDS,
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

/**
 * 비밀번호 비교
 * @param plainPassword 평문 비밀번호
 * @param hashedPassword 해싱된 비밀번호
 * @returns 비밀번호 일치 여부
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * 비밀번호 재해싱 필요 여부 확인
 * @param hashedPassword 해싱된 비밀번호
 * @param minRounds 최소 권장 라운드 (기본값: 환경에 따라 10 또는 12)
 * @returns 재해싱 필요 여부
 */
export const needsRehash = (
  hashedPassword: string,
  minRounds: number = DEFAULT_SALT_ROUNDS,
): boolean => {
  try {
    // bcrypt 해시에서 라운드 정보 추출 (형식: $2b$XX$...)
    const parts = hashedPassword.split('$');
    if (parts.length >= 3) {
      const rounds = parseInt(parts[2], 10);
      return rounds < minRounds;
    }
    return true; // 형식이 맞지 않으면 재해싱 필요
  } catch (error) {
    return true; // 오류 발생 시 안전을 위해 재해싱 필요로 판단
  }
};
