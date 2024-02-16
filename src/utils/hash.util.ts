import crypto from 'crypto';

import {
  HASH_ENCODING,
  HASH_KEY_LENGTH,
  SALT_KEY_LENGTH,
  SALT_SPLIT_SYMBOL,
} from '@common/constants';

export class HashUtil {
  static comparePasswords(
    password?: string | null,
    oldPassword?: string | null,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      if (!oldPassword || !password) {
        return resolve(false);
      }

      const [salt, hashKey] = oldPassword.split(SALT_SPLIT_SYMBOL);

      if (!salt || !hashKey) {
        return resolve(false);
      }

      const hashKeyBuff = Buffer.from(hashKey, HASH_ENCODING);

      crypto.scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err || hashKeyBuff.length !== derivedKey.length) {
          return resolve(false);
        }

        // Accepts Buffer only and thereby preventing timing attack
        return resolve(crypto.timingSafeEqual(hashKeyBuff, derivedKey));
      });
    });
  }

  static generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static generateRandomString(length: number) {
    return crypto.randomBytes(length).toString('hex');
  }

  static generateRandomStringNumber(length: number) {
    return Math.random().toFixed(length).slice(2);
  }

  static generateString(str: string): string {
    const name = crypto.createHash('md5').update(str).digest('hex');

    return name.slice(0, Math.round(name.length / 2));
  }

  static generateUuid() {
    return crypto.randomUUID();
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(SALT_KEY_LENGTH).toString('hex');

      crypto.scrypt(password, salt, HASH_KEY_LENGTH, (err, derivedKey) => {
        if (err) reject(err);

        return resolve(
          `${salt}${SALT_SPLIT_SYMBOL}${derivedKey.toString(HASH_ENCODING)}`,
        );
      });
    });
  }
}
