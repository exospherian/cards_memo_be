import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT_TOKEN } from '@app/redis';
import Redis from 'ioredis';
import { AUTH_SESSIONS_PREFIX, RECOVERY_PASS_PREFIX } from '../consts';

@Injectable()
export class AuthRedisStorage {
  constructor(@Inject(REDIS_CLIENT_TOKEN) private readonly client: Redis) {}

  private sessionTTL = 14 * 24 * 60 * 60; // 14 days

  async addNewSession(userId: string, token: string): Promise<void> {
    const sign = token.split('.')[2];
    await this.client.setex(
      `${AUTH_SESSIONS_PREFIX}:${userId}:${sign}`,
      this.sessionTTL,
      token,
    );
  }

  async deleteSession(userId: string, token: string): Promise<void> {
    const sign = token.split('.')[2];
    await this.client.del(`${AUTH_SESSIONS_PREFIX}:${userId}:${sign}`);
  }

  async deleteAllSession(userId: string): Promise<void> {
    await this.client.del(`${AUTH_SESSIONS_PREFIX}:${userId}:*`);
  }

  async checkSession(userId: string, token: string): Promise<boolean> {
    const sign = token.split('.')[2];
    const isExist = await this.client.get(
      `${AUTH_SESSIONS_PREFIX}:${userId}:${sign}`,
    );
    return !!isExist;
  }

  async replaceToken(
    userId: string,
    oldToken: string,
    newToken: string,
  ): Promise<void> {
    const signOld = oldToken.split('.')[2];
    const signNew = newToken.split('.')[2];
    await this.client
      .multi()
      .del(`${AUTH_SESSIONS_PREFIX}:${userId}:${signOld}`)
      .setex(`${AUTH_SESSIONS_PREFIX}:${userId}:${signNew}`, this.sessionTTL, 1)
      .exec();
  }

  async addRecoveryId(email: string, uniqueId: string): Promise<void> {
    const ttl = 2 * 24 * 60 * 60; // 2 days
    await this.client.setex(`${RECOVERY_PASS_PREFIX}:${uniqueId}`, ttl, email);
  }

  async getRecoveryId(uniqueId: string): Promise<string> {
    const recoveryId = this.client.get(`${RECOVERY_PASS_PREFIX}:${uniqueId}`);
    await this.client.del(`${RECOVERY_PASS_PREFIX}:${uniqueId}`);
    return recoveryId;
  }
}
