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
FILES.COMMENTS ENDPOINTS
***************
**/

/**
 * Add comment to file
 * @param {string} id - File Id
 * @param {string} comment
 * @returns {object}
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
 * @returns {object}
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
 * @returns {object}
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
 * @returns {object}
 */
Slack.prototype.fileUpload = function(data) {
    return this._post('files.upload',data);
};

/**
 * Get a list of Files
 * @param {object} data
 * @returns {object}
 */
Slack.prototype.getFilesList = function(data) {
    return this._post('files.list',data);
};


/**
 * Get informations about a specific File
 * @param {string} id
 * @param {number} count - default 100
 * @param {number} page - default 1
 * @returns {object}
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
 * @returns {object}
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
 * @returns {object}
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
 * @returns {object}
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