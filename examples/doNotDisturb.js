var Slack = require('../index.js');
var slack = new Slack(process.env.SLACK_TOKEN);
var fs = require('fs');
var Promise = require('bluebird');

console.log('calling SLACK operations');


// END DND
slack.endDnd()
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Dnd ended:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not end Dnd mode:',err);
	return err;
});

// Set Snooze + End Snooze
slack.setSnooze(30)
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Snooze is activated:',answer);
	return slack.endSnooze();
})
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('Snooze is finished:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Set/finish Snooze mode:',err);
	return err;
});

// DND INFO
slack.dndInfo(null)
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('DND user Info:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Dnd Info:',err);
	return err;
});

// DND TEAM INFO
slack.dndTeamInfo(null)
.then(function(answer){
	if (!answer.ok && answer.error) {
		return Promise.reject(new Error(answer.error));
	}
	console.log('DND Team Info:',answer);
	return Promise.resolve(answer);
})
.catch(function(err){
	console.log('Did not Dnd Info:',err);
	return err;
});