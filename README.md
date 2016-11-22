# Nodejslack


Start using [Slack's Web API](https://api.slack.com/web) in an easy way through this Node.js library.

Also, this library is built using the Promises pattern, powered by [Bluebird](https://github.com/petkaantonov/bluebird) .

## Installation

```
npm install nodejslack
```

### Methods

- `fileUpload(params)` (return: promise) - uploads a file,
- `getFilesList(params)` (return: promise) - returns a list of uploaded files,
- `getFileInfo(id, count, page)` (return: promise) - returns informations about the specified file


## Usage

### slack.fileUpload

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
	return Promise.reject(err);
});
```

### slack.getFilesList

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
	return Promise.reject(err);
});
```

### slack.getFileInfo

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
	return Promise.reject(err);
});
```