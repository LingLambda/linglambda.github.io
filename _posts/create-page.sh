if [ -z "$1" ]; then
  echo "未传递标题"
else
  cd ../
  bundle exec jekyll post "$1" --timestamp-format "%Y-%m-%d %H:%M"
  echo "创建 $1 完毕！"
fi
