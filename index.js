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
    return this._request('files.upload',data);
};

/**
 * Send request to API method
 * @param {string} endpoint
 * @param {object} params
 * @returns {Promise}
 * @private
 */
Slack.prototype._request = function(endpoint, data) {

    var requestData = {
        url: 'https://slack.com/api/' + endpoint+'?token='+this.token,
        formData: data
    };

	// return new Promise(function(resolve, reject) {

 //        request.post(requestData, function(err, request, body) {
 //            if (err) {
 //                return reject(err);
 //            }

 //            try {
 //                body = JSON.parse(body);

 //                // Slack api has a boolean property ok to indicate success or failure on the response.
 //                if (body.ok) {
 //                    resolve(body);
 //                } else {
 //                    reject(body);
 //                }

 //            } catch (e) {
 //                reject(e);
 //            }
 //        });
 //    });
    return request.post(requestData)
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