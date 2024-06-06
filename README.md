# ◾️概要  
Node.jsを使った簡易的なスクレイピングApp  

### ▼機能詳細  
* Webコンテンツから特定の情報を取得しGoogleシートに出力  
* 実行結果をメール送信  
* CRON定期実行機能（オプション）  
* CSV出力（オプション）  
  
# ◾️推奨環境
```
node v16以上
```
  
# ◾️環境構築
### ▼本パッケージをインストール -> 初期設定  
```
## 作業Dirに移動
cd path/to/dir

## このリポジトリをクローン
git clone https://github.com/chikara-karasawa/node-scraping-app.git

## クローンしたリポジトリに移動
cd node-scraping-app

## 依存関係をインストール
npm i
```
  
### ▼GoogleシートとGmailの設定
* Googleシートの使用、および書き込み許可設定 [Google Cloud APIs](https://console.cloud.google.com/projectselector2/apis) から設定を行う  
    1. プロジェクトの作成
    2. APIサービスの有効化
    3. サービスアカウントを作成
    4. 認証キーの作成とダウンロード
        * 認証キーは必ずjsonを選択
        * DLしたファイル名を【google_secrets.json】とする
        * 【google_secrets.json】を**rootに設置**する
    5. Googleシートを作成
        * ファイル名は任意
        * シートタブ名はデフォルトで【test】とする（コードと合わせて変更可）
* メール機能（Gmailを使用する前提）[Googleアカウント](https://support.google.com/accounts/answer/185833?hl=ja)の設定  
    1. Googleアカウントへ移動
    2. 「セキュリティ」から2段階認証を有効にする
    3. アプリパスワードを発行 -> メモ  **※一度しか表示されないので注意**
  
### ▼【.env】作成 -> 環境変数を定義  
```
TARGET_URL=<ターゲットとなるサイトのURL>
GOOGLE_SHEET_ID=<GoogleシートのURLにあるID>
EMAIL_FROM=<"任意のGmail">
EMAIL_TO=<"任意">
APP_PASS=<"アプリパスワード">
```
※作成した【.env】はrootに設置する
  
**最後に…**  
【scraping.mjs】にてターゲットサイトの要素指定をする  
※デフォルトのコードは使えない  
  
# ◾️基本的な使い方
```
## Examplem.jsを実行しスクレイピングを走らせる
node ~/node-scraping-app/start/Examplem.js
```
  