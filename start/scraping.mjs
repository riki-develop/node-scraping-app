import { chromium } from "@playwright/test";

async function getEmployeesByScraping() {
  // ブラウザを開いて処理を実行するか否か
  const browser = await chromium.launch({ headless: false, slowMo: 20 });
  const page = await browser.newPage();
  // スクレイピング対象を指定： 今回はコミック通販サイトを指定してみた
  await page.goto(process.env.TARGET_URL);

  // 対象の数を確認（取得）
  const cardLocators = page.locator(".stInfo .stContents .stHeading");
  const cardCount = await cardLocators.count();
  console.log(cardCount);

  // 空の配列を定義
  const fetchedCards = [];

  // 対象の数分ループを回す
  for(let i = 0; i < cardCount; i++) {
    // 対象のタイトルとURLを取得
    const cardLocator = cardLocators.locator(`nth=${i} >> a`);
    const titleText = await cardLocator.textContent();
    const hrefAttribute = await cardLocator.getAttribute('href');
    console.log('タイトル：', titleText);
    console.log('URL：', hrefAttribute);

    // ランキング一覧から各詳細へ遷移 -> 金額を取得
    await cardLocator.click();
    const priceLocator = page.locator('.stHeading.stCurrent .stPrice .stPrice');
    const priceText = await priceLocator.textContent();
    console.log('詳細ページ -> 金額：', priceText);

    // 上記で取得した（タイトル・販売日・金額・URLを配列に格納）
    fetchedCards.push({
      title: titleText,
      price: priceText,
      url: hrefAttribute
    });

    // 一連の処理が完了したらブラウザバックで戻る -> 次のループへ…
    await page.goBack();
  }
  console.table(fetchedCards);

  // ループが回り切ったらブラウザを閉じる
  await browser.close();

  // データが格納された配列を返す
  return fetchedCards;
};

export { getEmployeesByScraping };
