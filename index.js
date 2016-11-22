var request = require('request-promise');
var Promise = require('bluebird');

/**
 * @param {object} params
 * @constructor
 */
function Slack(token) {
    if (!token) {
        throw new Error('Slack Token is required');
    }
    this.token = token;
}

/**
***************
Channels ENDPOINTS
***************
**/

/**
 * Archives a channel
 * @param {string} id - Channel Id
 * @returns {Promise}
 */
Slack.prototype.archiveChannel = function(id) {
    return this._post('channels.archive', {channel: id} );
};

/**
 * Creates a channel
 * @param {string} name
 * @returns {Promise}
 */
Slack.prototype.createChannel = function(name) {
    return this._post('channels.create', {name: name} );
};

/**
 * Get history info from a Channel
 * @param {object} data - see: https://api.slack.com/methods/channels.history
 * @returns {Promise}
 */
Slack.prototype.getChannelHistory = function(data) {
    return this._post('channels.history', data );
};

/**
 * Get Info from a Channel
 * @param {string} id 
 * @returns {Promise}
 */
Slack.prototype.getChannelInfo = function(id) {
    return this._post('channels.info', {channel: id} );
};

/**
 * Invite User to a channel
 * @param {string} channelId 
 * @param {string} userId 
 * @returns {Promise}
 */
Slack.prototype.inviteUserToChannel = function(channelId, userId) {
    return this._post('channels.invite', {channel: channelId, user: userId} );
};

/**
 * Join(user) a channel
 * @param {string} channelName
 * @returns {Promise}
 */
Slack.prototype.joinChannel = function(channelName) {
    return this._post('channels.join', {name: channelName} );
};

/**
 * Kick User from a channel
 * @param {string} channelId 
 * @param {string} userId 
 * @returns {Promise}
 */
Slack.prototype.kickUserFromChannel = function(channelId, userId) {
    return this._post('channels.kick', {channel: channelId, user: userId} );
};

/**
 * Join(user) a channel
 * @param {string} channelId 
 * @param {string} userId 
 * @returns {Promise}
 */
Slack.prototype.leaveChannel = function(channelId) {
    return this._post('channels.leave', {channel: channelId} );
};

/**
 * This method returns a list of all channels in the team.
 * @returns {Promise}
 */
Slack.prototype.getChannels = function() {
    return this._get('channels.list', {} );
};

/**
 * This method moves the read cursor in a channel.
 * @param {string} channelId 
 * @param {string} ts - Timestamp of the most recently seen message.
 * @returns {Promise}
 */
Slack.prototype.markChannel = function(channelId, ts) {
    return this._post('channels.mark', {channel: channelId, ts: ts} );
};

/**
 * This method renames a channel.
 * @param {string} channelId 
 * @param {string} name - New name of the channel
 * @returns {Promise}
 */
Slack.prototype.renameChannel = function(channelId, name) {
    return this._post('channels.rename', {channel: channelId, name: name} );
};

/**
 * This method is used to change the purpose of a channel. The calling user must be a member of the channel.
 * @param {string} channelId 
 * @param {string} purpose
 * @returns {Promise}
 */
Slack.prototype.setPurposeChannel = function(channelId, purpose) {
    return this._post('channels.setPurpose', {channel: channelId, purpose: purpose} );
};

/**
 * This method is used to change the topic of a channel. The calling user must be a member of the channel.
 * @param {string} channelId 
 * @param {string} purpose
 * @returns {Promise}
 */
Slack.prototype.setTopicChannel = function(channelId, topic) {
    return this._post('channels.setTopic', {channel: channelId, topic: topic} );
};

/**
 * Unarchives a channel
 * @param {string} channelId
 * @returns {Promise}
 */
Slack.prototype.unarchiveChannel = function(channelId) {
    return this._post('channels.unarchive', {channel: channelId} );
};


/**
***************
Chat ENDPOINTS
***************
**/

/**
 * This method sends a me message to a channel from the calling user.
 * @param {string} channelId
 * @param {string} text
 * @returns {Promise}
 */
Slack.prototype.meMessage = function(channelId, text) {
    return this._post('chat.meMessage', {channel: channelId, text: text} );
};

/**
 * This method sends a me message to a channel from the calling user.
 * @param {string} ts - Timestamp of the message to be deleted.
 * @param {string} channelId
 * @param {string} asUser - Pass 'true' to delete the message as the authed user. Bot users are considered authed users.
 * @returns {Promise}
 */
Slack.prototype.deleteMessage = function(ts, channelId, asUser) {
    return this._post('chat.delete', {ts: ts, channel: channelId, as_user: asUser} );
};

/**
 * This method posts a message to a public channel, private channel, or direct message/IM channel.
 * @param {object} data - Check its format in: https://api.slack.com/methods/chat.postMessage
 * @returns {Promise}
 */
Slack.prototype.postMessage = function(data) {
    return this._post('chat.postMessage', data);
};

/**
 * This method updates a message in a channel. 
 * @param {object} data - Check its format in: https://api.slack.com/methods/chat.update
 * @returns {Promise}
 */
Slack.prototype.updateMessage = function(data) {
    return this._post('chat.update', data );
};


/**
***************
DND(Do not Disturb) ENDPOINTS TODO: README
***************
**/

/**
 * Ends dnd(Do not disturb) mode
 * @returns {Promise}
 */
Slack.prototype.endDnd = function() {
    return this._post('dnd.endDnd',{});
};

/**
 * Ends Snooze mode
 * @returns {Promise}
 */
Slack.prototype.endSnooze = function() {
    return this._post('dnd.endSnooze',{});
};

/**
 * Provides information about a user's current Do Not Disturb settings.
 * @param {string} user - Optional, User to fetch status for (defaults to current user)
 * @returns {Promise}
 */
Slack.prototype.dndInfo = function(user) {
    var data = {};
    
    if (user) {
        data.user = user;
    }
    
    return this._post('dnd.info', data );
};

/**
 * Set Snooze mode.
 * @param {number} minutes - Number of minutes, from now, to snooze until.
 * @returns {Promise}
 */
Slack.prototype.setSnooze = function(minutes) {
    return this._post('dnd.setSnooze', {num_minutes: minutes} );
};

/**
 * Provides information about a user's current Do Not Disturb settings.
 * @param {string} users - Optional, User Ids Separated by comma(default to all Users), example: "UH3434,UH24234"
 * @returns {Promise}
 */
Slack.prototype.dndTeamInfo = function(users) {
    var data = {};
    
    if (users) {
        data.users = users;
    }

    return this._get('dnd.teamInfo', data );
};

/**
***************
EMOJI ENDPOINT TODO: README
***************
**/

/**
 * Get Emoji List
 * @returns {Promise}
 */
Slack.prototype.getEmojiList = function() {
    return this._get('emoji.list',{});
};

/**
***************
FILES.COMMENTS ENDPOINTS
***************
**/

/**
 * Add comment to file
 * @param {string} id - File Id
 * @param {string} comment
 * @returns {Promise}
 */
Slack.prototype.fileAddComment = function(id, comment) {
    var data = {
        file: id,
        comment: comment
    }
    return this._post('files.comments.add',data);
};

/**
 * Edit an existing comment from a file
 * @param {string} id - Comment Id
 * @param {string} fileId - File Id
 * @param {string} comment
 * @returns {Promise}
 */
Slack.prototype.fileEditComment = function(id, fileId, comment) {
    var data = {
        id: id,
        file: fileId,
        comment: comment
    }
    return this._post('files.comments.edit',data);
};

/**
 * Delete a comment from a file
 * @param {string} id - Comment Id
 * @param {string} fileId - File Id
 * @returns {Promise}
 */
Slack.prototype.fileDeleteComment = function(id, fileId) {
    var data = {
        id: id,
        file: fileId
    }
    return this._post('files.comments.delete',data);
};


/**
***************
FILES ENDPOINTS
***************
**/

/**
 * Upload File
 * @param {object} data
 * @returns {Promise}
 */
Slack.prototype.fileUpload = function(data) {
    return this._post('files.upload',data);
};

/**
 * Get a list of Files
 * @param {object} data
 * @returns {Promise}
 */
Slack.prototype.getFilesList = function(data) {
    return this._post('files.list',data);
};


/**
 * Get informations about a specific File
 * @param {string} id
 * @param {number} count - default 100
 * @param {number} page - default 1
 * @returns {Promise}
 */
Slack.prototype.getFileInfo = function(id, count, page) {
    var data = {
    	file: id,
    	count: count || 100,
    	page: page || 1
    }
    return this._post('files.info',data);
};

/**
 * Get informations about a specific File
 * @param {string} id
 * @returns {Promise}
 */
Slack.prototype.deleteFile = function(id) {
    var data = {
        file: id
    }
    return this._post('files.delete',data);
};

/**
 * Disables public/external sharing for a file.
 * @param {string} id
 * @returns {Promise}
 */
Slack.prototype.fileRevokePublicURL = function(id) {
    var data = {
        file: id
    }
    return this._post('files.revokePublicURL',data);
};

/**
 * Enables public/external sharing for a file.
 * @param {string} id
 * @returns {Promise}
 */
Slack.prototype.fileEnablePublicURL = function(id) {
    var data = {
        file: id
    }
    return this._post('files.sharedPublicURL',data);
};

/**
 * Send POST request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._post = function(endpoint, data) {
	return this._request(request.post, endpoint, data);
};

/**
 * Send POST request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._get = function(endpoint, data) {
	return this._request(request.get, endpoint, data);
};

/**
 * Send POST request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._put = function(endpoint, data) {
	return this._request(request.put, endpoint, data);
};

/**
 * Send POST request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._delete = function(endpoint, data) {
	return this._request(request.del, endpoint, data);
};

/**
 * Send request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._request = function(httpFunction, endpoint, data) {

    var requestData = {
        url: 'https://slack.com/api/' + endpoint+'?token='+this.token,
        formData: data
    };

    return httpFunction(requestData)
    .then(function (response) {

    	try {
    		response = JSON.parse(response);

            // Slack api has a boolean property ok to indicate success or failure on the response.
            if (response.ok) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response);
            }

        } catch (e) {
            return Promise.reject(e);
        }
    })
    .catch(function (err) {
        return Promise.reject(err);
    });
};

module.exports = Slack;