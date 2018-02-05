
# # clean old builds
# sudo hexo clean

# nvm use 4.7.2

# to build a new blog to public folder
sudo hexo generate

echo "部署檔案大小資訊："
du -sh ./public
du -sh ./public/images
