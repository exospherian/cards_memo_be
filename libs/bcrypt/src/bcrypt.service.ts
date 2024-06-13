import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import generator from 'generate-password-ts';

@Injectable()
export class BcryptService {
  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  comparePassword(hash: string, password: string) {
    return compare(password, hash);
  }

  generatePassword(length: number) {
    return generator.generate({
      length,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      strict: true,
    });
  }
}
