npm run build

cd example/public

git init
git add -A
date=`date +%Y-%m-%d_%H:%M:%S`
git commit -m "deploy ${date}"

git push -f git@gitee.com:recoluan/reco-example-test.git master

cd ../../
rm -rf example/public

