/**
 * cli for jira api. Each request will send authentication header. 
 * This will consume JSON response for pretty stdout ouput
 * 
 * @name jiraApi
 * @returns {object} - API for cli 
 * @method 
 * @author Ryan Regalado <ryan@design48.net>
 */
var request = require('./../node_modules/request'); 
var config = require('./config.json'); 

// https://jira.blackline.corp/rest/api/2/search?jql=assignee='Ryan.Regalado'
var reqOpts = {
    protocol: 'https://',
    host: 'jira.blackline.corp/',
    apiVersion: 'rest/api/2/'
};

var urlPrefix = reqOpts.protocol + reqOpts.host + reqOpts.apiVersion;


var opts = {
    'url': '',
    'method': 'GET',
    'auth': {
        'user': config.username,
        'pass': config.password
    },
    'rejectUnauthorized': false
};


function _makeUrl(suffix) {
    return urlPrefix + suffix;
}

function _makeRequest(options, callback) {
    request(options, callback);
}


function log(data) {
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            switch(typeof data[key]) {
                case 'string':
                    console.log(key + ': ' + data[key] + '\n');
                    break;
                case 'object':
                    var obj = data[key];
                    console.log(key + '->');
                    for (var key2 in obj) {
                        if (obj.hasOwnProperty(key2)) {
                            console.log('    ' + key2 + ': ' + obj[key2]);
                        }
                    }
                    console.log('\n');
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

        // var result = this.connect();
        var result = this.getUser(config.username);
        return result;
    },

    getUser: function(user) {
        console.log('getting user:', user, '\n');

        opts.url = _makeUrl("user?username=" + user);

        _makeRequest(opts, function(err, res) {
            var data = JSON.parse(res.body); 
            // console.log('err', err);
            // console.log('data', data);
            // console.log('data keys', JSON.stringify(data, null, 4));

            log(data);
        });

        return true;
    },

    getIssues: function(user) {
        console.log('retrieve all issues for user:', user);

        var urlSuffix = "search?jql=assignee='" + user + "'"
            , reqUrl = _makeUrl(urlSuffix)
            ;

        opts.url = reqUrl;

        _makeRequest(opts, function(err, data) {
            console.log('err', err);
            console.log('data', data);
        });
        return true;
    }
};

module.exports = jiraApi;
