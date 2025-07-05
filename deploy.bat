@echo off
echo === Adding all changes to Git ===
git init
git remote add origin https://github.com/mosin11/MyAlgo.git

git add .

echo === Committing changes ===
git commit -m "Initial commit - MyAlgo React Trading Dashboard"

git branch -M main

echo === Pushing to origin master ===
git push -u origin master

echo === Renaming branch from master to main ===


echo === Building the app ===
npm run build

echo === Deploying the app ===
REM Step 7: Build and Deploy to GitHub Pages
call npm run deploy

echo === ✅ Deployment Complete ===
pause
