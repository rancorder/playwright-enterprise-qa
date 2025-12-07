@echo off
echo ========================================
echo GitHub Push for rancorder
echo ========================================
echo.

cd C:\Users\xzeng\Desktop\playwright-enterprise-qa

echo [Step 1] Git初期化...
git init
echo.

echo [Step 2] ファイル追加...
git add .
echo.

echo [Step 3] コミット...
git commit -m "feat: Add enterprise Playwright QA framework (93%% success, 6 browsers, 30min build)"
echo.

echo [Step 4] リモート設定...
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
echo.

echo [Step 5] ブランチ設定...
git branch -M main
echo.

echo [Step 6] プッシュ...
git push -u origin main
echo.

echo ========================================
echo Push Complete!
echo ========================================
echo.
echo Check your repository:
echo https://github.com/rancorder/playwright-enterprise-qa
echo.
pause
