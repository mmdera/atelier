@echo off
title Atelier - Install and Start
cd /d "%~dp0"
echo.
echo Installing project dependencies (including Supabase JS)...
call npm install
if errorlevel 1 (
  echo.
  echo Dependency installation failed. Check your internet connection and Node.js/npm installation.
  pause
  exit /b 1
)
echo.
echo Starting Atelier...
call npm run dev
pause
