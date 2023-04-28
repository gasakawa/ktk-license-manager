import { resolve as resolvePath } from 'path';
import { writeFile } from 'fs/promises';
import Logger from 'config/logger';

export class FileHelper {
  private static _log = Logger.getInstance().log;

  static async writeLicenseFile(
    prefix: string,
    product: string,
    account: string,
    customer: string,
    accountId: string,
    payload: string,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const filename = `${product}_${account}_${customer}`;
        await writeFile(
          resolvePath(
            __dirname,
            '..',
            '..',
            'files',
            `${prefix}`,
            `${filename}.lic`,
          ),
          payload,
        );

        this._log.info(
          `License file for account ${accountId}: ${filename}.lic`,
        );
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
