@echo off
echo ========================================
echo Git Automatic Installation
echo ========================================
echo.

echo Downloading Git installer...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe' -OutFile '%TEMP%\GitInstaller.exe'"

echo.
echo Installing Git...
echo (This will open installer - just click Next/Install)
echo.

start /wait %TEMP%\GitInstaller.exe /VERYSILENT /NORESTART

echo.
echo ========================================
echo Git Installation Complete!
echo ========================================
echo.
echo Please CLOSE this window and open a NEW Command Prompt
echo Then run the push command again.
echo.
pause
