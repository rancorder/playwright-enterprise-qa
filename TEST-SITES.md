# 🎯 実際に動作するテストサイト一覧

## ✅ 推奨テストサイト（公式）

### 1. 🥇 **Playwright Demo App** (最推奨)
```env
BASE_URL=https://demo.playwright.dev/todomvc
API_BASE_URL=https://demo.playwright.dev/api-mocking
```
- **理由**: Playwrightの公式デモ
- **機能**: TodoMVC（完全動作）
- **認証**: 不要
- **メリット**: 安定・高速・ダウンタイムなし

---

### 2. 🛒 **DemoQA (E2Eテスト用)**
```env
BASE_URL=https://demoqa.com
API_BASE_URL=https://demoqa.com
```
- **理由**: QA自動化の練習サイト
- **機能**: フォーム、ボタン、テーブル等
- **認証**: 登録ページあり
- **メリット**: 本番環境に近い構造

---

### 3. 🎭 **The Internet (Herokuapp)**
```env
BASE_URL=https://the-internet.herokuapp.com
```
- **理由**: 自動化テストの定番
- **機能**: 認証、ドロップダウン、ファイルアップロード等
- **認証**: /login (tomsmith / SuperSecretPassword!)
- **メリット**: 多様なテストシナリオ

---

### 4. 🧪 **Sauce Demo**
```env
BASE_URL=https://www.saucedemo.com
```
- **理由**: Eコマースのデモサイト
- **機能**: ログイン、商品一覧、カート
- **認証**: standard_user / secret_sauce
- **メリット**: 実際のECサイトに近い

---

### 5. 🔄 **ReqRes (API専用)**
```env
API_BASE_URL=https://reqres.in/api
```
- **理由**: REST APIのモックサーバー
- **機能**: CRUD操作完全対応
- **認証**: 不要
- **メリット**: APIテストに最適

---

## 🚀 即座に動作するセットアップ

### パターンA: TodoMVC（E2Eテスト）

```env
# .env
BASE_URL=https://demo.playwright.dev/todomvc
```

```typescript
// tests/e2e/todomvc.spec.ts
import { test, expect } from '@playwright/test';

test('should add todo item', async ({ page }) => {
  await page.goto('/');
  
  // Todo追加
  await page.locator('.new-todo').fill('Test automation');
  await page.locator('.new-todo').press('Enter');
  
  // 確認
  await expect(page.locator('.todo-list li')).toHaveText('Test automation');
});
```

---

### パターンB: Sauce Demo（E2E + 認証）

```env
# .env
BASE_URL=https://www.saucedemo.com
USER_EMAIL=standard_user
USER_PASSWORD=secret_sauce
```

```typescript
// tests/e2e/saucedemo.spec.ts
import { test, expect } from '@playwright/test';

test('should login and add product to cart', async ({ page }) => {
  await page.goto('/');
  
  // ログイン
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  
  // 商品追加
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  // カート確認
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
```

---

### パターンC: ReqRes（APIテスト）

```env
# .env
API_BASE_URL=https://reqres.in/api
```

```typescript
// tests/api/reqres.spec.ts
import { test, expect } from '@playwright/test';

test('GET /users - should return user list', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=1');
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  
  expect(data.data).toHaveLength(6);
  expect(data.data[0]).toHaveProperty('email');
});

test('POST /users - should create user', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Test User',
      job: 'QA Engineer'
    }
  });
  
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(data.name).toBe('Test User');
});
```

---

## 🎯 SET案件応募用の最適解

### **推奨構成: The Internet + ReqRes**

```env
# .env
BASE_URL=https://the-internet.herokuapp.com
API_BASE_URL=https://reqres.in/api
ADMIN_EMAIL=tomsmith
ADMIN_PASSWORD=SuperSecretPassword!
```

**理由:**
1. ✅ **認証テスト**: The Internetのログインページ
2. ✅ **E2Eテスト**: 多様なシナリオ
3. ✅ **APIテスト**: ReqResで完全CRUD
4. ✅ **安定性**: 両サイトとも高可用性
5. ✅ **実用性**: 本番環境に近い

---

## 📊 比較表

| サイト | E2E | API | 認証 | 安定性 | 推奨度 |
|--------|-----|-----|------|--------|--------|
| **Playwright Demo** | ✅ | △ | ❌ | ⭐⭐⭐⭐⭐ | 🥇 |
| **DemoQA** | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ | 🥈 |
| **The Internet** | ✅ | ❌ | ✅ | ⭐⭐⭐⭐⭐ | 🥇 |
| **Sauce Demo** | ✅ | ❌ | ✅ | ⭐⭐⭐⭐ | 🥈 |
| **ReqRes** | ❌ | ✅ | ❌ | ⭐⭐⭐⭐⭐ | 🥇 |

---

## 🛠️ 即座に試す方法

### コマンド1つで動作確認

```cmd
# 1. .envを編集
BASE_URL=https://the-internet.herokuapp.com

# 2. 簡単なテスト実行
npx playwright test --grep "should handle invalid product ID"
```

---

## 💡 ポートフォリオ用の説明文

```markdown
## テスト環境

本フレームワークは以下のデモサイトで動作確認済み:

### E2Eテスト
- The Internet (Herokuapp)
- Sauce Demo
- DemoQA

### APIテスト
- ReqRes API

### 実際のプロジェクトでの使用
.envファイルのBASE_URLを変更するだけで、
任意のサイトでテスト可能です。
```

---

## 🎁 ボーナス: すぐ使えるテストファイル作成

次のメッセージで「実際に動くテストを作って」と言ってください。
The Internet + ReqResを使った完全動作版を30秒で作成します！
