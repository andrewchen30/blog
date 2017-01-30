
"use strict";

var debug = require('debug')('AndrewChenBlog:v1:ftp');
var FTP = require('ftp');
var fs = require('fs-extra');

module.exports = {

	list : function(path, config, callback) {
		try {
			var ftp = new FTP();
			ftp.on('ready', function() {
				ftp.list(path, function(err, list) {
					if (err) throw err;
					ftp.end();
					return callback(null, list);
				});
			});
			ftp.connect(config);
		}
		catch(err) {
			return callback(err);
		}
	},

	upload : function(filePath, distname, config, callback) {
		try {
			var ftp = new FTP();
			ftp.on('ready', function() {
				ftp.put(filePath, distname, function(err) {
					if (err) throw err;
					ftp.end();
					return callback(null, true);
				});
			});
			ftp.connect(config);
		}
		catch(err) {
			return callback(err);
		}
	},

	rename : function(originName, newName, config, callback) {
		try {
			var ftp = new FTP();
			ftp.on('ready', function() {
				ftp.rename(originName, newName, function(err) {
					if (err) throw err;
					ftp.end();
					return callback(null, true);
				});
			});
			ftp.connect(config);
		}
		catch(err) {
			return callback(err);
		}
	},

	remove : function(targetPath, config, callback) {
		try {
			var ftp = new FTP();
			ftp.on('ready', function() {
				ftp.delete(targetPath, function(err) {
					if (err) throw err;
					ftp.end();
					return callback(null, true);
				});
			});
			ftp.connect(config);
		}
		catch(err) {
			return callback(err);
		}
	},

	download : function(targetPath, savePath, config, callback) {
		try {
			var ftp = new FTP();
			ftp.on('ready', function() {
				var dirPath = targetPath.substring(0, targetPath.lastIndexOf('/'));
				var fileName = targetPath.substring(targetPath.lastIndexOf('/') + 1, targetPath.length);
				ftp.list(dirPath, function(err, list) {
					if (err) throw err;
					var valid = list.some(function(file){
						return file.name == fileName;
					});
					if(valid) {
						ftp.get(targetPath, function(err, stream) {
							if (err) throw err;
							stream.once('close', function() { ftp.end(); });
							stream.pipe(fs.createWriteStream(savePath));
							return callback(null, savePath);
						});
					}
					else {
						return callback(null, null);
					}
				});
			});
			ftp.connect(config);
		}
		catch(err) {
			return callback(err);
		}
	},

};
