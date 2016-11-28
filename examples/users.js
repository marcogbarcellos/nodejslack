var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');

// User list+info+setPresence+getPresence+setPhoto+deletePhoto+setActive
var user;
slack.getUsersList()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Users List:',answer);
	user = answer.members[0];
	return slack.getUserInfo(user.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Users info:',answer);
	
	var presence = "auto"; // Either "auto" or "away"
	return slack.setUserPresence(presence);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('User presence setted:',answer);
	
	return slack.getUserPresence(user.id);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Users identity:',answer);
	console.log('Users photo path:',process.env.PHOTO_PATH);
	var photoUploadData = {
	  image: fs.createReadStream(process.env.PHOTO_PATH) //see all possibilities: https://api.slack.com/methods/users.setPhoto
	};
	return slack.setUserPhoto(photoUploadData);
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('User photo uploaded:',answer);
	
	return slack.deleteUserPhoto();
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('User photo deleted:',answer);
	
	return slack.setUserActive();
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('User is active:',answer);
	
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Error:',err);
	return err;
});

//User Identity, This method may only be used by tokens with the identity.basic scope, as provided in the 
//Sign in(https://api.slack.com/docs/sign-in-with-slack) with Slack process.
slack.getUserIdentity()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('User identity:',answer);
	
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Error:',err);
	return err;
});