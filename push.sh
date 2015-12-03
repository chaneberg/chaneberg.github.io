#!C:\Users\Charles\AppData\Local\GitHub\GitHub.appref-ms --open-shell
set -x
echo "Enter commit message: "
read message
git add -A
git commit -m "$message"
git push
send "chaneberg\n"
send "nh4j1a0x!\n"
echo Press enter...
read