import { resolve } from 'path';
import { writeFileSync } from 'fs';
import Logger from 'config/logger';

export class FileHelper {
  private static _log = Logger.getInstance().log;

  static writeLicenseFile(
    prefix: string,
    product: string,
    account: string,
    customer: string,
    accountId: string,
    payload: string,
  ): void {
    const filename = `${product}_${account}_${customer}`;
    writeFileSync(
      resolve(__dirname, '..', '..', 'files', `${prefix}`, `${filename}.lic`),
      payload,
    );

    this._log.info(`License file for account ${accountId}: ${filename}.lic`);
  }
}
