
# clean old builds
sudo hexo clean

# to build a new blog to public folder
sudo hexo generate

# notify
osascript -e 'display notification "Data Build Success, Starting server..." with title "AndrewChenBlog"'

# run dev server on local
sudo hexo server --watch

# 包含 push 到 gp-pages 的功能
# sudo hexo generate --deploy
