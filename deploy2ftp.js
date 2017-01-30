
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
	if (err) {
		var exec = require('child_process').exec;
		var cmd = 'osascript -e \'display notification "上傳至FTP出現錯誤" with title "AndrewChenBlog Deloy fail"\'';
		exec(cmd);
		console.log(err);
	}
	else {
		console.log('FINISHED');
	}
});
