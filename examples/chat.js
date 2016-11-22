var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');


//List Channels + Chat ME Message + Chat Post Message + Chat Update Message + Chat Delete Message
var firstChannelId;
slack.getChannels()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channels:',answer);
	firstChannelId = answer.channels[0].id;
	
	return slack.meMessage(firstChannelId, 'Testing new message');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}

	console.log('Message sent:',answer);
	
	var data = {
		channel: firstChannelId,
		text: 'postMessage Posted'
	}

	return slack.postMessage(data);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Message Post:',answer);

	var data = {
		ts: answer.ts,
		channel: firstChannelId,
		text: 'postMessage Updated'
	}

	return slack.updateMessage(data);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Message Updated:',answer);
	console.log('firstChannelId:',firstChannelId);
	console.log('answer.ts:',answer.ts);
	console.log('(typeof answer.ts):',(typeof answer.ts));
	return slack.deleteMessage(answer.ts, firstChannelId, 'true');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Message Deleted:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Request Failed:',err);
	return err;
});