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
    const mandatoryFields = [
      'Email_Address',
      'Product_Name',
      'Date',
      'Months',
      'Broker',
      'Account',
    ];

    const missingFields = mandatoryFields.filter(field => !row[field]);

    if (missingFields.length > 0) {
      return missingFields.join(';');
    }

    return '';
  }
}
