# PowerShell版 GitHub Push Script for rancorder
# playwright-enterprise-qa プロジェクト専用

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Push for rancorder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# フォルダに移動
Write-Host "[Step 1] Moving to project directory..." -ForegroundColor Yellow
Set-Location "C:\Users\xzeng\Desktop\playwright-enterprise-qa"
Write-Host "Current directory: $PWD" -ForegroundColor Green
Write-Host ""

# Git初期化
Write-Host "[Step 2] Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host ""

# ファイル追加
Write-Host "[Step 3] Adding all files..." -ForegroundColor Yellow
git add .
Write-Host ""

# コミット
Write-Host "[Step 4] Committing..." -ForegroundColor Yellow
git commit -m "feat: Add enterprise Playwright QA framework (93% success, 6 browsers, 30min build)"
Write-Host ""

# ブランチ名変更
Write-Host "[Step 5] Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host ""

# リモート追加
Write-Host "[Step 6] Adding remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/rancorder/playwright-enterprise-qa.git
Write-Host ""

# プッシュ
Write-Host "[Step 7] Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "Push Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check your repository at:" -ForegroundColor Cyan
Write-Host "https://github.com/rancorder/playwright-enterprise-qa" -ForegroundColor White
Write-Host ""

# 自動でブラウザを開く
Write-Host "Opening repository in browser..." -ForegroundColor Yellow
Start-Process "https://github.com/rancorder/playwright-enterprise-qa"

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
