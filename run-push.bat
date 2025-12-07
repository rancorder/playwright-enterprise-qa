@echo off
echo Running PowerShell script...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0push-to-github.ps1"
