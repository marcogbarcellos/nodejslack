var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');


// EMOJI List
slack.getEmojiList()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Emoji List:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Get Emoji List:',err);
	return err;
});