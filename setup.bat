@echo off
echo ========================================
echo Playwright Enterprise QA Setup
echo ========================================
echo.

echo [1/4] Copying .env file...
copy .env.example .env
echo.

echo [2/4] Installing dependencies...
call npm install
echo.

echo [3/4] Installing Playwright browsers...
call npx playwright install
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo You can now run tests:
echo   npm test
echo ========================================
echo.
pause
