@echo off
echo ========================================
echo Evidence Image Upload to GitHub
echo ========================================
echo.

echo [Step 1] Copying screenshot...
copy "C:\Users\xzeng\Desktop\FireShot_Capture_002_-_Playwright_Test_Report_-__localhost_.png" "C:\Users\xzeng\Desktop\playwright-enterprise-qa\evidence.png"
echo.

echo [Step 2] Adding to Git...
cd C:\Users\xzeng\Desktop\playwright-enterprise-qa
git add evidence.png
echo.

echo [Step 3] Committing...
git commit -m "docs: Add test execution evidence screenshot"
echo.

echo [Step 4] Pushing to GitHub...
git push
echo.

echo ========================================
echo Upload Complete!
echo ========================================
echo.
echo Check your repository:
echo https://github.com/rancorder/playwright-enterprise-qa
echo.
pause
