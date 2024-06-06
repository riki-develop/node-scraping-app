import cron from "node-cron";

import { addEmployeesToGS } from "./google-sheet.mjs";
import { sendEmail } from "./email.mjs";

// 定期実行設定、使わないのでコメントアウト
// cron.schedule("53 17 * * *", () => {
//   main();
// });

async function main() {
  const dt = new Date;
  const dtStr = dt.toDateString();
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`;

  try{
    // スクレイピング -> Googleシート書き込みを実行
    await addEmployeesToGS();

    // メール送信機能をGmailでホスティングしているが、認証周りの不具合が発生しているため一旦コメントアウト
    // sendEmail('処理が成功しました。', `完了時刻：${dtStr}\n${sheetUrl}`);
  }catch(e) {
    // メール送信機能をGmailでホスティングしているが、認証周りの不具合が発生しているため一旦コメントアウト
    // sendEmail('エラーが発生しました。', `エラー発生時刻：${dtStr}\n${e}`);
  }
}

main();