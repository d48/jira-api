/**
 * cli for jira api. Each request will send authentication header. 
 * This will consume JSON response for pretty stdout ouput
 * 
 * @name jiraApi
 * @returns {object} - API for cli 
 * @method 
 * @author Ryan Regalado <ryan@design48.net>
 */

var request = require('./../node_modules/request')
    , config = require('./config.json')
    , url = {
        protocol: 'https://',
        host: 'jira.blackline.corp/',
        apiVersion: 'rest/api/2/'
    }
    , urlPrefix = url.protocol + url.host + url.apiVersion
    , reqOpts = {
        'url': '',
        'method': 'GET',
        'auth': {
            'user': config.username,
            'pass': config.password
        },
        'rejectUnauthorized': false
    }
    ;


function _makeUrl(suffix) {
    return urlPrefix + suffix;
}

function _makeRequest(options, callback) {
    request(options, callback);
}

function _padding(num) {
    var str = '';

    for ( var i = 0; i < num; i++) {
        str += ' ';
    }
    return str;
}

/*e
 * pretty output of object
 * 
 * @name log
 * @param {object} data -  with multiple keys
 * @returns {void} - outputs to console
 * @method 
 * @author Ryan Regalado <ryan@design48.net>
 */
function log(data, numSpaces) {

    var numSpaces = numSpaces || 0;

    // prettify json output
    // console.log('data keys', JSON.stringify(data, null, 4));

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            switch(typeof data[key]) {
                case 'string':
                    var str = _padding(numSpaces);
                    console.log(str + key + ': ' + data[key]);
                    break;
                case 'object':
                    var obj = data[key];
                    console.log(key + ' ->');
                    log(obj, 4);
                default:

                    break;
            } 
        }
    }


}



 // start api
 // ---------------------------------------------------------------------------
var jiraApi =  {
    init: function() {
        console.log('starting up api');

        var result = this.getIssues(config.username);
        return result;
    },

    getUser: function(user) {
        console.log('getting user:', user, '\n');

        reqOpts.url = _makeUrl("user?username=" + user);

        _makeRequest(reqOpts, function(err, res) {
            var data = JSON.parse(res.body); 

            log(data);
        });

        return true;
    },

    getIssues: function(user) {
        console.log('retrieve all issues for user:', user);

        var urlSuffix = "search?jql=assignee='" + user + "'&project=MTCH"
            , reqUrl = _makeUrl(urlSuffix)
            ;

        reqOpts.url = reqUrl;

        _makeRequest(reqOpts, function(err, res) {

            var data = JSON.parse(res.body); 
            console.log(Object.keys(data));
            // console.log(Object.keys(data.issues[0]));
            console.log('total', data.total);
        });
        return true;
    }
};

module.exports = jiraApi;
