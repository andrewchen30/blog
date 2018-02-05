
# notify
# osascript -e 'display notification "Data Build Success, Starting server..." with title "AndrewChenBlog"'

# sync node version
nvm use 4

# run dev server on local
sudo hexo server --watch

# # clean old builds
# sudo hexo clean
#
# # to build a new blog to public folder
# sudo hexo generate

# 包含 push 到 gp-pages 的功能
# sudo hexo generate --deploy
