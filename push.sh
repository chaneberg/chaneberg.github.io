echo "Enter commit message in quote marks: "
read message
git add -A
git commit -m "$message"
git push
echo Press enter...
read