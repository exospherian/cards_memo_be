import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
// import { UserStorage } from '../../user/storages';
import { AuthRedisStorage } from '../storages';

@Injectable()
export class PasswordService {
  appDomain: string;
  constructor(
    private readonly configService: ConfigService,
    // private readonly userStorage: UserStorage,
    private readonly authStorage: AuthRedisStorage,
    // private readonly mailService: SendGridService,
    private readonly logger: Logger,
  ) {
    this.appDomain = this.configService.get('APP_DOMAIN');
  }

  async recoveryRequest(email: string) {
    try {
      const recoveryId = uuid();
      // await this.userStorage.getByUnique(
      //   {
      //     email_accountStatus: {
      //       email,
      //       accountStatus: AccountStatus.Active,
      //     },
      //   },
      //   'recovery with not existing email',
      // );
      await this.authStorage.addRecoveryId(email, recoveryId);
      // await this.mailService.sendDynamicEmailTemplate(
      //   {
      //     to: email,
      //     subject: 'SugarDaddy Password Recovery Request',
      //     html: `<a href="${`${this.appDomain}/auth/password-recovery/${recoveryId}`}">recovery link</a>`,
      //   },
      //   false,
      // );
    } catch (e) {
      this.logger.error(e?.message);
    }
  }

  async changePasswordByRecoveryLink(recoveryId: string, pass: string) {
    const email = await this.authStorage.getRecoveryId(recoveryId);
    // if (!email)
    //   throw new BadRequestException({
    //     errorCode: ERROR_CODES.RecoveryIdDoseNotExist,
    //     message:
    //       "[PasswordService changePasswordByRecoveryLink]: Provided recovery id doesn't exist or has been already used",
    //   } as CommonErrorResponse);
    // const user = await this.userStorage.getByUnique(
    //   {
    //     email_accountStatus: {
    //       email,
    //       accountStatus: AccountStatus.Active,
    //     },
    //   },
    //   'recovery with not existing email',
    // );
    // await this.userStorage.update(user.id, { password: pass });
    // await this.authStorage.deleteAllSession(user.id);
  }
}
