@echo off
echo "# MyAlgo" >> README.md
REM  git init
git add README.md
git add .
git commit -m "first commit"
git branch -M main
REM  git remote add origin https://github.com/mosin11/MyAlgo.git
git push -u origin main

echo === Deploying the app ===
REM Step 7: Build and Deploy to GitHub Pages
call npm run deploy

echo === ✅ Deployment Complete ===
pause
