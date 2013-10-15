var request = require('request'); 
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

var jiraApi =  {
    init: function() {
        console.log('starting up api');

        this.connect();
    },

    connect: function() {
        console.log('connecting to api with: ', config.username);
        this.getIssues(config.username);
        // this.getUser(config.username);
    },

    getUser: function(user) {
        console.log('getting user:', user);
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
    }
};

module.exports = jiraApi;
