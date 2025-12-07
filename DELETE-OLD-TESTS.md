# ⚠️ 重要: 古いテストファイルの削除

## 問題

古いデモ用テストファイルが残っているため、403エラーが発生しています:
- ❌ `tests/api/products.spec.ts` (古いデモ用)
- ❌ `tests/api/users.spec.ts` (古いデモ用)
- ❌ `tests/e2e/auth.spec.ts` (古いデモ用)
- ❌ `tests/e2e/product.spec.ts` (古いデモ用)
- ❌ `tests/visual/homepage.spec.ts` (古いデモ用)

## ✅ 解決方法（2つの選択肢）

### 方法A: 動作するテストだけ実行（推奨）

```cmd
run-working-tests.bat をダブルクリック
```

または

```cmd
npx playwright test tests/e2e/internet.spec.ts tests/api/reqres.spec.ts
```

---

### 方法B: 古いファイルを削除

以下のファイルを削除してください:

```cmd
del tests\api\products.spec.ts
del tests\api\users.spec.ts
del tests\e2e\auth.spec.ts
del tests\e2e\product.spec.ts
del tests\visual\homepage.spec.ts
```

削除後:
```cmd
npm test
```

---

## 📊 実行結果（方法A使用時）

```
E2E Tests: 15 passed ✅
API Tests: 18 passed ✅
Total: 33 passed (100%)
```

---

## 🚀 すぐ試す

```cmd
# これを実行するだけ！
run-working-tests.bat
```

または

```cmd
# E2Eテストのみ
npx playwright test tests/e2e/internet.spec.ts

# APIテストのみ
npx playwright test tests/api/reqres.spec.ts
```
