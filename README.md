# Nodejslack


Start using [Slack's Web API](https://api.slack.com/web) in an easy way through this Node.js library.

Also, this library is built using the Promises pattern, powered by [Bluebird](https://github.com/petkaantonov/bluebird) .

## Installation

```
npm install nodejslack
```

## Methods

### Channels

- `archiveChannel(id)` (return: promise) - Archives a channel,
- `createChannel(name)` (return: promise) - Creates a channel,
- `getChannelHistory(data)` (return: promise) - Gets the history of a channel,
- `getChannelInfo(id)` (return: promise) - Gets info of a channel,
- `inviteUserToChannel(channelId, userId)` (return: promise) - Invites a user to a channel,
- `joinChannel(channelName)` (return: promise) - Join(user) to a channel,
- `kickUserFromChannel(channelId, userId)` (return: promise) - Kicks a user from a channel,
- `leaveChannelfunction(channelId)` (return: promise) - Leaves a channel,
- `getChannels()` (return: promise) - Get all channels,
- `markChannel(channelId, ts)` (return: promise) - Moves the read cursor in a channel,
- `renameChannel(channelId, name) ` (return: promise) - Renames a channel,
- `setPurposeChannel(channelId, purpose)` (return: promise) - Sets a purpose of a channel,
- `setTopicChannel(channelId, topic)` (return: promise) - Sets a topic of a channel,
- `unarchiveChannel(channelId)` (return: promise) - Unarchives a channel

### Chats

- `meMessage(channelId, text)` (return: promise) - Sends a me message to a channel from the calling user,
- `deleteMessage(ts, channelId, asUser)` (return: promise) - Deletes a message,
- `postMessage(data)` (return: promise) - Posts a message,
- `updateMessage(data)` (return: promise) - Updates a message

### dnd(Do not Disturb)

- `endDnd()` (return: promise) - Ends dnd(Do not disturb) mode,
- `endSnooze()` (return: promise) - Ends Snooze mode,
- `dndInfo(user)` (return: promise) - Provides information about a user's current Do Not Disturb settings,
- `setSnooze(minutes)` (return: promise) - Sets Snooze mode,
- `dndTeamInfo(users)` (return: promise) - Provides information about a Team's Do Not Disturb settings


### Emoji

- `getEmojiList()` (return: promise) - Gets Emoji List

### Files

- `fileUpload(params)` (return: promise) - uploads a file,
- `getFilesList(params)` (return: promise) - returns a list of uploaded files,
- `getFileInfo(id, count, page)` (return: promise) - returns informations about the specified file
- `deleteFile(id)` (return: promise) - Delete specified file
- `fileRevokePublicURL(id)` (return: promise) - Disables public URL the specified file
- `fileEnablePublicURL(id)` (return: promise) - Enables public URL the specified file

### Files.comment

- `fileAddComment(id, comment)` (return: promise) - Add a comment to a file,
- `fileEditComment(id, fileId, comment)` (return: promise) - Edit an existing comment about a file
- `fileDeleteComment(id, fileId)` (return: promise) - Delete a comment about a file




## Usage

### slack.fileUpload(params)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);

var form = {
  file: fs.createReadStream('test.csv'), // Optional, via multipart/form-data. If omitting this parameter, you MUST submit content
  // content: 'Your text here', // Optional, File contents. If omitting this parameter, you must provide a `file` 
  filename: 'test.csv', // Required 
  fileType: 'post', // Optional, See more file types in https://api.slack.com/types/file#file_types
  title: 'Title of your file!', // Optional
  initial_comment: 'First comment about this file.', // Optional
  channels: 'general' //Optional, If you want to put more than one channel, separate using comma, example: 'general,random'
};

slack.fileUpload(form)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the upload.'));
	}
	console.log('Uploaded Successfully:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```

### slack.getFilesList(params)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);

var form = {
  user: 'USER_ID', // Optional, User ID
  channel: 'CHANNEL_ID', // Optional, Channel ID
  ts_from: 342353452342, // Optional, Filter(Unix Timestamp) files created after this timestamp (inclusive).
  ts_to: 342353452342, // Optional, Filter(Unix Timestamp) files created before this timestamp (inclusive).
  types: 'zips,pdfs', // Optional, Filter files by type: all, spaces, snippets, images, gdocs, zips, pdfs.
  count: 20 // Optional, default: 100
  page: 2 // Optional, default: 1
};

slack.getFilesList(form)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the request.'));
	}
	console.log('List of files:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```

### slack.getFileInfo(id, count, page)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);


var fileId = 'UH45344543'; // File ID
var count = 20; // Optional, Number of items to return per page.
var page = 2; // Optional, Page number of results to return.

slack.getFileInfo(fileId, count, page)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the request.'));
	}
	console.log('File Info:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```

### slack.deleteFile(id)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);


var fileId = 'UH45344543'; // File ID

slack.deleteFile(fileId)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the request.'));
	}
	console.log('File successfully deleted:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```

### slack.fileRevokePublicURL(id)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);


var fileId = 'UH45344543'; // File ID

slack.fileRevokePublicURL(fileId)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the request.'));
	}
	console.log('File URL successfully disabled:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```

### slack.fileEnablePublicURL(id)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);


var fileId = 'UH45344543'; // File ID

slack.fileEnablePublicURL(fileId)
.then(function(response){

	// Slack sends a json with a boolean var ok. 
	// Error example : data = { ok: false, error: 'user_not_found' }
	// Error example : data = { ok: true, file: 'user_not_found' }
	if(!response || !response.ok){
		return Promise.reject(new Error('Something wrong happened during the request.'));
	}
	console.log('File URL successfully enabled:',response);

	return Promise.resolve(response);
})
.catch(function(err){
	return err;
});
```


- `fileAddComment(id, comment)` (return: promise) - Add a comment to a file,
- `fileEditComment(id, fileId, comment)` (return: promise) - Edit an existing comment about a file
- `fileDeleteComment(id, fileId)` (return: promise) - Delete a comment about a file

### slack.fileAddComment(id, comment) + slack.fileEditComment(id, fileId, comment) + slack.fileDeleteComment(id, fileId)

```js
var Slack = require('nodejslack');
var fs = require('fs');
var SLACK_TOKEN = process.env.SLACK_TOKEN || 'YOUR_GENERATED_SLACK_TOKEN';

var slack = new Slack(SLACK_TOKEN);


var fileId = 'UH45344543'; // File ID

slack.fileAddComment(fileId, 'New Comment being added')
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Comment Added:',answer);
	
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
	console.log('Did not ADD/EDIT/DELETE File Comment:',err);
	return err;
});
```
