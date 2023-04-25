import { GoogleSheetHelper } from 'helpers/google-sheet-helper';
import 'dotenv/config';

async function main() {
  const document = await GoogleSheetHelper.getDocument(
    process.env.GOOGLE_SHEET_FILE_ID,
  );

  document.sheetsByIndex[0].getRows().then(rows => {
    console.log(
      '🚀 ~ file: main.ts:12 ~ document.sheetsByIndex[0].getRows ~ rows[0]:',
      rows[0].Sequence_ID,
    );
  });
}

main();
