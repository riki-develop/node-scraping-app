import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('../google_secrets.json');
import { getEmployeesByScraping } from "./scraping.mjs";

async function addEmployeesToGS() {
  // 書き込み対象のGoogleシートを指定
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  // Googleシートの認証設定
  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key,
  });

  await doc.loadInfo();

  //【scraping.mjs】から受け取った配列をGoogleシートに書き込む
  const employees = await getEmployeesByScraping();
  const sheet = doc.sheetsByTitle['test'];
  const rows = await sheet.addRows(employees);

  rows.forEach(row => row.save());
}

export { addEmployeesToGS };