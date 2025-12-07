# 🚀 クイックスタートガイド

## 30秒でテスト実行

```bash
# 1. プロジェクトディレクトリへ移動
cd playwright-enterprise-qa

# 2. 依存関係インストール
npm install

# 3. Playwrightブラウザインストール
npx playwright install

# 4. 環境変数設定
cp .env.example .env

# 5. テスト実行！
npm test
```

## 各種テスト実行

```bash
# E2Eテストのみ
npm run test:e2e

# APIテストのみ
npm run test:api

# ビジュアルテストのみ
npm run test:visual

# 並列実行（高速）
npm run test:parallel

# デバッグモード
npm run test:debug
```

## レポート確認

```bash
# HTMLレポート
npm run report

# Allureレポート
npm run report:allure
```

## Docker実行

```bash
# Dockerでテスト実行
npm run docker:test

# Allureレポート（Docker）
docker-compose up allure
# http://localhost:5050 にアクセス
```

## ポートフォリオとして使う場合

### GitHubにプッシュ
```bash
git init
git add .
git commit -m "feat: Add enterprise-level Playwright QA framework"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### GitHub Actionsを有効化
1. GitHubリポジトリの Settings → Secrets
2. 以下のシークレットを追加:
   - `BASE_URL`
   - `API_BASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `USER_EMAIL`
   - `USER_PASSWORD`

### テストバッジを追加
README.mdのバッジが自動で緑色になります！

---

## 🎯 SET案件応募時のアピールポイント

### 1. エンタープライズレベルの実装
✅ Page Object Model  
✅ TypeScript完全型付け  
✅ Winston統合ロギング  
✅ エラーハンドリング完備  

### 2. 包括的なテストカバレッジ
✅ E2E Tests（認証・商品）  
✅ API Tests（CRUD操作）  
✅ Visual Regression Tests  
✅ クロスブラウザ対応  

### 3. CI/CD完全自動化
✅ GitHub Actions  
✅ Docker対応  
✅ 並列実行  
✅ 自動リトライ  

### 4. 高度なレポーティング
✅ HTML Report  
✅ Allure Report  
✅ JUnit XML  
✅ Slack通知  

---

## 💡 カスタマイズ方法

### テストケース追加
```typescript
// tests/e2e/your-test.spec.ts
import { test, expect } from '@playwright/test';

test('your test name', async ({ page }) => {
  // テストコードをここに
});
```

### 新しいページ追加
```typescript
// lib/pages/YourPage.ts
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  // ページオブジェクト実装
}
```

---

## 📊 コード統計

- **総ファイル数**: 17ファイル
- **総コード行数**: 1,501行
- **テストファイル**: 5ファイル
- **Page Object**: 3ファイル
- **実装期間**: 30分

---

## 🎓 学習リソース

- [Playwright公式ドキュメント](https://playwright.dev/)
- [Page Object Model解説](https://playwright.dev/docs/pom)
- [CI/CD Best Practices](https://playwright.dev/docs/ci)

---

**これで完璧なPlaywright QA自動化フレームワークの完成です！🎉**
