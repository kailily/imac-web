@echo off
chcp 65001 >nul
title IMAC 门户 · 本地预览
cd /d "%~dp0"

echo.
echo  ============================================
echo    IMAC 国际异常管理联盟 · 本地预览
echo  ============================================
echo.

rem 检查 Node.js 是否可用
where node >nul 2>nul
if errorlevel 1 (
  echo  [错误] 未检测到 Node.js，请先安装 Node.js 后重试。
  echo         下载地址: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

rem 检查 8090 端口是否已被占用（已在运行则直接开浏览器）
netstat -ano 2>nul | findstr "8090" | findstr "LISTENING" >nul
if not errorlevel 1 (
  echo  [提示] 本地服务器已在运行，正在打开浏览器...
  start "" "http://127.0.0.1:8090/"
  timeout /t 2 /nobreak >nul
  exit /b 0
)

echo  [启动] 正在启动本地服务器，请稍候...
start /b node serve.cjs
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8090/"
echo  [完成] 浏览器已打开预览地址: http://127.0.0.1:8090/
echo.
echo  提示：本窗口用于保持服务器运行，关闭窗口即停止服务。
echo.
pause
