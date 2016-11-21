var SLACK_TOKEN = 'xoxp-106920829607-105558453169-106262548050-ed0055946dc3ca8a1ed40eaf3e8e48c8';
var Slack = require('./index.js');
var slack = new Slack(SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling upload file');

var formData = {
  filename: 'test.csv',
  channels: 'general', // If you want to put more than one channel, separate using comma, example: 'general,random'
  file: fs.createReadStream('test.csv')
};

slack.fileUpload(formData).then(function(answer){
	console.log('upload answer:',answer);
})

