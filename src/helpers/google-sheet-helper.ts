import { GoogleSpreadsheet } from 'google-spreadsheet';
import config from 'config/config';

export class GoogleSheetHelper {
  static async getDocument(fileId: string): Promise<GoogleSpreadsheet> {
    const document = new GoogleSpreadsheet(fileId);

    await document.useServiceAccountAuth({
      client_email: config.google.sheets.clientId,
      private_key: config.google.sheets.privateKey,
    });

    await document.loadInfo();

    return document;
  }
}
