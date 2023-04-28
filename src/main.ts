import 'dotenv/config';
import { format, parse } from 'date-fns';
import { GoogleSheetHelper } from 'helpers/google-sheet-helper';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { ValidationHelper } from 'helpers/validation.helper';
import { SubscriptionBuilder } from 'builders/subscription.builder';
import Logger from 'config/logger';
import LicenseModel from 'model/license.model';
import { FileHelper } from 'helpers/file.helper';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';
class Main {
  private _log = Logger.getInstance().log;
  private _timestamp = format(new Date(), 'yyyyMMdd_HHmmss');

  async getDocument(): Promise<GoogleSpreadsheet> {
    return await GoogleSheetHelper.getDocument(
      process.env.GOOGLE_SHEET_FILE_ID,
    );
  }

  async getRows(document: GoogleSpreadsheet): Promise<GoogleSpreadsheetRow[]> {
    const sheet = document.sheetsByIndex[0];

    if (!(await ValidationHelper.validateHeader(sheet))) {
      this._log.error(
        `Error validating Google Sheet source, the columns in incorrect order or missing`,
      );
      process.exit(1);
    }

    await mkdir(resolve(__dirname, '..', `files`, `${this._timestamp}`));

    return await sheet.getRows();
  }

  async processRows(rows: GoogleSpreadsheetRow[]): Promise<void> {
    for (const row of rows) {
      this._log.info(`Generating license for account ${row['Account']}`);
      const subscription = new SubscriptionBuilder()
        .setSequenceId(row['Sequence_ID'])
        .setFullName(row['Full_Name'])
        .setEmailAddress(row['Email_Address'])
        .setProductName(row['Product_Name'])
        .setDate(new Date(row['Date']))
        .setMonths(Number(row['Months']))
        .setBroker(row['Broker'])
        .setAccount(row['Account'])
        .build();

      const licenseModel = new LicenseModel(subscription);
      const license = licenseModel.generateLicense();

      FileHelper.writeLicenseFile(
        this._timestamp,
        licenseModel.getProductNameHash(),
        licenseModel.getAccountIdHash(),
        licenseModel.getCustomerIdHash(),
        subscription.getAccount(),
        license,
      );
    }
  }

  async run(): Promise<void> {
    this._log.info(`Starting license generation`);
    const document = await this.getDocument();

    const rows = await this.getRows(document);

    await this.processRows(rows);
  }
}

new Main().run();
