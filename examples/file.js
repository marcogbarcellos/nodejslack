var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');

// File Upload
var fileUploadData = {
  filename: 'package.json',
  channels: 'scripts', // If you want to put more than one channel, separate using comma, example: 'general,random'
  file: fs.createReadStream('package.json')
};
slack.fileUpload(fileUploadData)
.then(function(answer){
	console.log('Uploaded:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT UPLOAD FILE:',err);
	return err;
});

// Get a files List
slack.getFilesList({})
.then(function(answer){
	console.log('GET FILES LIST(length):',answer.files.length);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT GET FILES LIST:',err);
	return err;
});

// Get info about a specific file
slack.getFilesList({})
.then(function(answer){
	return slack.getFileInfo(answer.files[0].id, null, null);
})
.then(function(answer){
	console.log('GET FILE INFO:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT GET FILE INFO:',err);
	return err;
});


// Revoke file public URL
slack.getFilesList({})
.then(function(answer){
	console.log('ID to revoke URL:',answer.files[0].id);
	return slack.fileRevokePublicURL(answer.files[0].id);
})
.then(function(answer){
	console.log('REVOKED FILE:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT REVOKE FILE URL:',err);
	return err;
});

// Enable file public URL
slack.getFilesList({})
.then(function(answer){
	return slack.fileEnablePublicURL(answer.files[0].id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('URL ENABLED:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT ENABLE FILE URL:',err);
	return err;
});

// Delete file
slack.getFilesList({})
.then(function(answer){
	console.log('ID to delete:',answer.files[0].id);
	return slack.deleteFile(answer.files[0].id);
})
.then(function(answer){
	console.log('DELETE FILE:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('DID NOT DELETE FILE:',err);
	return err;
});

// ADD COMMENT TO FILE, EDIT COMMENT THEN DELETE IT
var fileId;
slack.getFilesList({})
.then(function(answer){
	fileId = answer.files[0].id;
	return slack.fileAddComment(fileId, 'New Comment being added');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Comment Added:',answer);
	console.log('Comment ID:',answer.comment.id);
	console.log('File ID:',fileId);
	
	return slack.fileEditComment(answer.comment.id, fileId, 'New Comment being edited');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Comment Edited:',answer);
	return slack.fileDeleteComment(answer.comment.id, fileId);
})

.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Comment Deleted:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not ADD/EDIT/DELETE File URL:',err);
	return err;
});