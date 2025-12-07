# 🪟 Windows セットアップガイド

## ⚡ 超簡単セットアップ（推奨）

### 方法1: バッチファイル実行（ダブルクリックのみ！）

```
1. setup.bat をダブルクリック
2. 完了！（自動で全部やってくれます）
```

---

## 📝 手動セットアップ

### 方法2: コマンドプロンプトで実行

```cmd
REM 1. 環境変数ファイルをコピー
copy .env.example .env

REM 2. 依存関係インストール
npm install

REM 3. Playwrightブラウザインストール
npx playwright install

REM 4. テスト実行
npm test
```

---

## 🚀 テスト実行コマンド（Windows）

```cmd
REM 全テスト実行
npm test

REM E2Eテストのみ
npm run test:e2e

REM APIテストのみ
npm run test:api

REM Visualテストのみ
npm run test:visual

REM デバッグモード
npm run test:debug

REM レポート表示
npm run report
```

---

## 🔧 PowerShell を使う場合

```powershell
# 環境変数ファイルをコピー
Copy-Item .env.example .env

# 依存関係インストール
npm install

# Playwrightブラウザインストール
npx playwright install

# テスト実行
npm test
```

---

## ❗ よくあるエラーと解決方法

### エラー1: 'npm' が認識されない

**原因**: Node.jsがインストールされていない

**解決策**:
1. https://nodejs.org/ から Node.js をダウンロード
2. インストール実行
3. コマンドプロンプトを再起動

---

### エラー2: スクリプトの実行が無効

**エラーメッセージ**:
```
このシステムではスクリプトの実行が無効になっているため...
```

**解決策** (PowerShellの場合):
```powershell
# 管理者権限でPowerShellを開く
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### エラー3: ブラウザが見つからない

**解決策**:
```cmd
npx playwright install chromium
```

---

## 📂 ファイル構造確認

```cmd
REM ディレクトリ構造を表示
tree /F
```

---

## 🎯 次のステップ

1. ✅ setup.bat 実行完了
2. ✅ npm test でテスト実行
3. ✅ npm run report でレポート確認
4. ✅ コードを編集してカスタマイズ

---

## 💡 ヒント

- **VSCode推奨**: コード編集に便利
- **Git Bash**: Linuxコマンドが使える（cp, lsなど）
- **Windows Terminal**: モダンなターミナル

---

## 🆘 困ったら

1. setup.bat をダブルクリック（これで99%解決）
2. エラーメッセージをコピーして検索
3. Node.jsを再インストール

---

**🎉 セットアップ完了したら `npm test` を実行してください！**
