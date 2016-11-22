var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');



// List Channels
slack.getChannels()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channels:',answer);
	firstChannelId = answer.channels[0].id;
	
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Dnd Info:',err);
	return err;
});

//Create + Archive + Unarchive + rename + setPurpose + setTopic + history + info + leave + join
var channel;
slack.createChannel('test11-channel')
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Created Channel:',answer);
	channel = answer.channel;
	console.log('Channel ID:',channel.id);
	
	return slack.archiveChannel(channel.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channel Archived:',answer);
	
	return slack.unarchiveChannel(channel.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channel Unarchived:',answer);
	
	return slack.renameChannel(channel.id, 'testRename11');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channel Renamed:',answer);
	channel = answer.channel;
	
	return slack.setTopicChannel(channel.id, 'new Topic');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('New Topic:',answer);
	
	return slack.setPurposeChannel(channel.id, 'new Purpose');
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('New Purpose:',answer);
	
	return slack.getChannelHistory( {channel:channel.id} );
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channel History:',answer);
	
	return slack.getChannelInfo(channel.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Channel Info:',answer);
	
	return slack.leaveChannel(channel.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Left Channel:',answer);
	
	return slack.joinChannel(channel.name);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Joined Channel:',answer);
	
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Dnd Info:',err);
	return err;
});

//TO DO: missing example of the following ENDPOINTS invite, kick and mark 