import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import Logger from 'config/logger';
import { CryptoHelper } from './crypto.helper';

export class FileHelper {
  private static _log = Logger.getInstance().log;

  static async writeLicenseFile(
    filename: string,
    prefix: string,
    accountId: string,
    payload: string,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const filenameHash = CryptoHelper.stringToHash(filename,'sha256');
      try {
        await writeFile(
          resolvePath(
            __dirname,
            '..',
            '..',
            'files',
            `${prefix}`,
            `${filenameHash}.lic`,
          ),
          payload,
        );

        this._log.info(
          `License file for account ${accountId}: ${filenameHash}.lic`,
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
