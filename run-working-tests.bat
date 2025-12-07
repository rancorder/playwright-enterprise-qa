@echo off
echo ========================================
echo Running WORKING Tests Only
echo ========================================
echo.

echo [E2E Tests] The Internet - 15 test cases
call npx playwright test tests/e2e/internet.spec.ts
echo.

echo [API Tests] ReqRes API - 18 test cases  
call npx playwright test tests/api/reqres.spec.ts
echo.

echo ========================================
echo Test Execution Complete!
echo ========================================
echo.

echo To view the report:
echo   npm run report
echo.
pause
