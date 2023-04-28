import { GoogleSheetHelper } from 'helpers/google-sheet-helper';
import 'dotenv/config';
import { CryptoHelper } from 'helpers/crypto.helper';

async function main() {
  // const document = await GoogleSheetHelper.getDocument(
  //   process.env.GOOGLE_SHEET_FILE_ID,
  // );
  // document.sheetsByIndex[0].getRows().then(rows => {
  //   console.log(
  //     '🚀 ~ file: main.ts:12 ~ document.sheetsByIndex[0].getRows ~ rows[0]:',
  //     rows[0].Sequence_ID,
  //   );
  // });
  const productName = CryptoHelper.stringToHash('Edge-Bot', 'sha256');
  // console.log(`product hash ${productName}`);
  const customerId = CryptoHelper.stringToHash(
    'cowracapital@gmail.com',
    'sha256',
  );
  // console.log(`customer hash ${customerId}`);
  const accountId = CryptoHelper.stringToHash('1057100982', 'sha256');

  const payload = `v1.0\n${productName}\n${customerId}\n${accountId}\n2023.04.30\n2023.06.14\n[...]`;

  const secret = '17abd5b523f1b2b4abec41ae9893d610';

  const rev_secret = CryptoHelper.stringToHash(
    secret.split('').reverse().join(''),
    'md5',
  );

  const key_string = `${secret}\n${payload}\n${rev_secret}`;

  const signature = CryptoHelper.stringToHash(key_string, 'sha256');

  const license = `${signature}\n${payload}`;
  // const payloadHash = CryptoHelper.stringToHash(payload, 'sha256');
  console.log(license);

  // console.log(
  //   `${payloadHash}\nv1.0\n${productName}\n${customerId}\n${accountId}\n2023.04.30\n2023.06.14\n[...]`,
  // );
}

main();
