@echo off
echo "# MyAlgo" >> README.md
git init
git add README.md
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mosin11/MyAlgo.git
git push -u origin main

echo === Deploying the app ===
REM Step 7: Build and Deploy to GitHub Pages
call npm run deploy

echo === ✅ Deployment Complete ===
pause
