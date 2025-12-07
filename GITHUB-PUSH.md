# 🚀 GitHub へのプッシュ - rancorder 専用コマンド

## ⚠️ 事前準備: Gitのインストール

### Gitがインストールされているか確認

```cmd
git --version
```

**エラーが出る場合 → Gitをインストール**

---

## 📥 Gitのインストール（2つの方法）

### 方法1: 自動インストール（推奨）

```
install-git.bat をダブルクリック
```

インストール完了後、**新しいコマンドプロンプトを開く**

### 方法2: 手動インストール

1. https://git-scm.com/download/win にアクセス
2. 「64-bit Git for Windows Setup」をダウンロード
3. インストーラーを実行（全てデフォルトでOK）
4. インストール完了後、**コマンドプロンプトを再起動**

---

## ⚡ GitHubへプッシュ

### 📋 超簡単バッチファイル版（推奨）

```
push-to-github.bat をダブルクリック
```

これだけで全自動でGitHubにプッシュ完了！

---

### 📋 コマンドライン版

#### PowerShell版（推奨）

```powershell
# フォルダに移動
cd "C:\Users\xzeng\Desktop\playwright-enterprise-qa"

# 一気に実行
git init
git add .
git commit -m "feat: Add enterprise Playwright QA framework (93% success, 6 browsers, 30min build)"
git branch -M main
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
git push -u origin main
```

**または PowerShell スクリプトを実行:**

```powershell
.\push-to-github.ps1
```

**または バッチファイルで実行:**

```cmd
run-push.bat
```

#### コマンドプロンプト版

```bash
cd C:\Users\xzeng\Desktop\playwright-enterprise-qa && git init && git add . && git commit -m "feat: Add enterprise Playwright QA framework (93% success, 6 browsers, 30min build)" && git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git && git branch -M main && git push -u origin main
```

---

## 📝 ステップバイステップ版

```bash
# ステップ1: ディレクトリ移動
cd C:\Users\xzeng\Desktop\playwright-enterprise-qa

# ステップ2: Git初期化
git init

# ステップ3: 全ファイル追加
git add .

# ステップ4: コミット
git commit -m "feat: Add enterprise Playwright QA framework (93% success, 6 browsers, 30min build)"

# ステップ5: リモートリポジトリ設定
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git

# ステップ6: メインブランチ設定
git branch -M main

# ステップ7: プッシュ
git push -u origin main
```

---

## ✅ プッシュ成功後の確認

### 1. GitHubで確認
ブラウザで開く:
```
https://github.com/rancorder/playwright-enterprise-qa
```

### 2. README.mdが表示されているか確認

### 3. エビデンス画像をアップロード

#### 方法1: GitHubのWeb UIで
1. https://github.com/rancorder/playwright-enterprise-qa にアクセス
2. 「Add file」→「Upload files」
3. `evidence.png` をドラッグ&ドロップ
4. Commit message: "docs: Add test execution evidence screenshot"
5. 「Commit changes」

#### 方法2: コマンドラインで（推奨）
```bash
# エビデンス画像をコピー
copy C:\Users\xzeng\Desktop\FireShot_Capture_002_-_Playwright_Test_Report_-__localhost_.png C:\Users\xzeng\Desktop\playwright-enterprise-qa\evidence.png

# Git追加
git add evidence.png
git commit -m "docs: Add test execution evidence screenshot"
git push
```

---

## 🎯 完成！

リポジトリURL:
```
https://github.com/rancorder/playwright-enterprise-qa
```

これでポートフォリオとして完璧です！🎉

---

## 🔑 認証が必要な場合

### Personal Access Token の作成

1. GitHub → Settings → Developer settings → Personal access tokens
2. 「Generate new token (classic)」
3. Select scopes: `repo` にチェック
4. 「Generate token」
5. トークンをコピー（一度しか表示されません！）

### トークンを使用してプッシュ

```bash
git push -u origin main
# Username: あなたのGitHubユーザー名
# Password: 生成したPersonal Access Token（パスワードではない）
```

---

## 📝 その後の更新

```bash
# 変更をステージング
git add .

# コミット
git commit -m "更新内容の説明"

# プッシュ
git push
```

---

## ✅ 確認

プッシュ後、以下のURLで確認:
```
https://github.com/YOUR_USERNAME/playwright-enterprise-qa
```

---

## 🎯 セット完了後のタスク

1. ✅ README.md が表示されているか確認
2. ✅ テスト結果スクリーンショットを追加（オプション）
3. ✅ About セクションを編集（リポジトリページ右上）
   - Description: "Enterprise Playwright QA Framework - 93% success rate, 6 browsers, built in 30min"
   - Topics: `playwright`, `qa`, `automation`, `typescript`, `testing`

---

## 🌟 完成！

これでポートフォリオとして公開完了です！

リンク:
```
https://github.com/YOUR_USERNAME/playwright-enterprise-qa
```

このリンクを履歴書やポートフォリオサイトに追加しましょう！
