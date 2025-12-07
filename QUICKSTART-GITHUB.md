# 🚀 クイックスタートガイド - rancorder専用

## 📋 実行方法（3つから選べます）

---

## 方法1: バッチファイル（超簡単・推奨）

### ステップ1: Gitインストール（初回のみ）
```
install-git.bat をダブルクリック
```

### ステップ2: GitHubにプッシュ
```
push-to-github.bat をダブルクリック
```

### ステップ3: エビデンス画像アップロード
```
upload-evidence.bat をダブルクリック
```

**完了！** ブラウザで確認:
```
https://github.com/rancorder/playwright-enterprise-qa
```

---

## 方法2: PowerShell版（開発者向け）

### PowerShellを開いて実行:

```powershell
# フォルダに移動
cd "C:\Users\xzeng\Desktop\playwright-enterprise-qa"

# スクリプト実行
.\push-to-github.ps1
```

**または:**

```powershell
cd "C:\Users\xzeng\Desktop\playwright-enterprise-qa"
git init
git add .
git commit -m "feat: Add enterprise Playwright QA framework (93% success, 6 browsers, 30min build)"
git branch -M main
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
git push -u origin main
```

---

## 方法3: コマンドプロンプト版

```cmd
cd C:\Users\xzeng\Desktop\playwright-enterprise-qa
git init
git add .
git commit -m "feat: Add enterprise Playwright QA framework (93%% success, 6 browsers, 30min build)"
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
git branch -M main
git push -u origin main
```

---

## 🎯 推奨手順（初めての場合）

### 1. Gitインストール確認

```cmd
git --version
```

エラーが出る → `install-git.bat` を実行

### 2. プッシュ実行

**一番簡単な方法:**
```
run-push.bat をダブルクリック
```

### 3. 認証

**Username:** `rancorder`
**Password:** Personal Access Token

#### Personal Access Token作成方法:
1. https://github.com/settings/tokens
2. 「Generate new token (classic)」
3. Note: `playwright-qa`
4. Expiration: `No expiration`
5. Select scopes: `repo` ✅
6. 「Generate token」
7. トークンをコピー（保存推奨）

### 4. エビデンス画像アップロード

```
upload-evidence.bat をダブルクリック
```

### 5. 確認

```
https://github.com/rancorder/playwright-enterprise-qa
```

---

## 📊 利用可能なファイル一覧

| ファイル | 用途 | 実行方法 |
|---------|------|---------|
| `install-git.bat` | Git自動インストール | ダブルクリック |
| `push-to-github.bat` | GitHubプッシュ（CMD版） | ダブルクリック |
| `push-to-github.ps1` | GitHubプッシュ（PowerShell版） | `.\push-to-github.ps1` |
| `run-push.bat` | PowerShellスクリプト実行 | ダブルクリック |
| `upload-evidence.bat` | エビデンス画像アップロード | ダブルクリック |

---

## ✅ 完了チェックリスト

```
□ Git がインストールされている (git --version)
□ GitHubリポジトリが作成されている
□ Personal Access Token を取得済み
□ プッシュが成功した
□ エビデンス画像がアップロードされた
□ README.mdが正しく表示される
□ Mermaid図が描画される
□ エビデンス画像が表示される
```

---

## 🎉 完成！

**リポジトリURL:**
```
https://github.com/rancorder/playwright-enterprise-qa
```

**ポートフォリオに追加しましょう！**

---

## 💡 よくある質問

### Q: 「git: command not found」エラー
**A:** `install-git.bat` を実行し、コマンドプロンプトを再起動

### Q: 認証エラー
**A:** Personal Access Tokenを使用（パスワードではない）

### Q: 「remote origin already exists」エラー
**A:** 
```cmd
git remote remove origin
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
git push -u origin main
```

### Q: PowerShell実行ポリシーエラー
**A:** 
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

**すぐに始めましょう！🚀**
