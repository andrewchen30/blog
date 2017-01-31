
var fs = require('fs-extra');
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
	host: "211.72.207.202", // www.andrewchen.tw
	username: "andrewchen.tw",
	// password: "",
	port: 21,
	localRoot: __dirname + "/public",
	remoteRoot: "/",
	// exclude: ['.git', '.idea', 'tmp/*']
};

ftpDeploy.deploy(config, function(err) {
	var exec = require('child_process').exec;
	var cmd = 'osascript -e \'display notification "@content" with title "@title"\'';
	if (err) {
		cmd = cmd.replace(/@title/, 'AndrewChenBlog ERROR').replace(/@content/, '上傳至FTP出現錯誤:' + err.message);
		console.log('%j', err);
	}
	else {
		cmd = cmd.replace(/@title/, 'AndrewChenBlog').replace(/@content/, '上傳至FTP完成');
		console.log('FINISHED');
	}
	exec(cmd);
});
