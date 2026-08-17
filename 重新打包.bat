@echo off
chcp 65001 >nul
title IMAC · 一键重新打包
cd /d "%~dp0"

echo.
echo  ==============================
echo    IMAC 网站 · 一键重新打包
echo  ==============================
echo.

rem 检查 node 是否可用
where node >nul 2>nul
if errorlevel 1 (
  echo  [错误] 未检测到 Node.js，无法打包。
  echo         下载地址: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

node rebuild.cjs
if errorlevel 1 (
  echo.
  echo  [错误] 打包失败，请检查上方输出。
  pause
  exit /b 1
)

echo.
echo  输出文件：
echo   1. 预览-双击打开.html  （单文件版，直接发给朋友双击即看）
echo   2. ..\IMAC-网站部署包.zip （链接部署用，解压后上传托管平台）
echo.
pause
