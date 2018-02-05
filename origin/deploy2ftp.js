
var fs = require('fs-extra');
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var getSize = require('get-folder-size');

var config = {
	host: "211.72.207.202", // www.andrewchen.tw
	username: "andrewchen.tw",
	// password: "",
	port: 21,
	localRoot: __dirname + "/public",
	remoteRoot: "/",
	// exclude: ['.git', '.idea', 'tmp/*']
};

// get size
getSize(__dirname + "/public", function(err, size) {
  if (err) { throw err; }
  console.log('public dir size : ' + size + ' bytes');
  console.log('public dir size : ' + (size / 1024 / 1024).toFixed(2) + ' Mb');

	// start deploy
	ftpDeploy.deploy(config, function(err) {
		var exec = require('child_process').exec;
		var cmd = 'osascript -e \'display notification "@content" with title "@title"\'';
		if (err) {
			cmd = cmd.replace(/@title/, 'AndrewChenBlog ERROR').replace(/@content/, '上傳至FTP出現錯誤:' + err.message);
			console.log('Error', err);
		}
		else {
			cmd = cmd.replace(/@title/, 'AndrewChenBlog').replace(/@content/, '上傳至FTP完成');
			console.log('FINISHED');
		}
		exec(cmd);
	});

});
