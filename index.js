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
 * @param {object} data
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