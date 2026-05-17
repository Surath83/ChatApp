@echo off 

echo Starting Backend... start "Backend Server" cmd /k "cd /d %~dp0backend && node index.js" 
echo Starting Frontend... start "Frontend Server" cmd /k "cd /d %~dp0realtime_chatapp && npm run dev" 

timeout /t 6 > nul 
start http://localhost:5173 

exit