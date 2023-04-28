import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

export class ValidationHelper {
  static async validateHeader(
    sheet: GoogleSpreadsheetWorksheet,
  ): Promise<boolean> {
    const expectedHeaders = [
      'Sequence_ID',
      'Full_Name',
      'Email_Address',
      'Product_Name',
      'Date',
      'Months',
      'Broker',
      'Account',
    ];
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    let isOk = true;
    for (let i = 0; i < expectedHeaders.length; i++) {
      if (headers[i] !== expectedHeaders[i]) {
        isOk = false;
        break;
      }
    }

    return isOk;
  }

  static async validateMandatoryFields(
    row: GoogleSpreadsheetRow,
  ): Promise<string> {
    if (!row['Date']) {
      return 'Date';
    }

    return '';
  }
}
