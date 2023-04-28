import { createHash } from 'crypto';

type AlgorithmType = 'sha256' | 'md5';

export class CryptoHelper {
  static stringToHash(data: string, algorithm: AlgorithmType): string {
    return createHash(algorithm).update(data).digest('hex');
  }
}
