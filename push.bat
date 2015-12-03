set /p message="Enter commit message: "
call git add -A
call git commit -m "%message%"
call git push
pause