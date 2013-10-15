var request = require('request'); 
var config = require('./config.json'); 

// https://jira.blackline.corp/rest/api/2/search?jql=assignee='Ryan.Regalado'
var reqOpts = {
    protocol: 'https://',
    host: 'jira.blackline.corp/',
    apiVersion: 'rest/api/2/'
};

var urlPrefix = reqOpts.protocol + reqOpts.host + reqOpts.apiVersion;

function makeUrl(suffix) {
    return urlPrefix + suffix;
}

var jiraApi =  {
    init: function() {
        console.log('starting up api');

        this.connect();

        // request('http://www.google.com', function(err, res, body) {
        //     if (!err && res.statusCode === 200) {
        //         console.log(body);
        //     }
        // });
    },

    connect: function() {
        console.log('connecting to api with: ', config.username);
        // this.getIssues();
        this.getUser(config.username);
    },

    getUser: function(user) {
        console.log('getting user:', user);
    },

    getIssues: function() {
        console.log('retrieve all issues');
        var urlSuffix = "search?jql=assignee='" + config.username + "'"
            , reqUrl = urlPrefix + urlSuffix
            ;

        var opts = {
            'url': reqUrl,
            'auth': {
                'user': config.username,
                'pass': config.password
            },
            'rejectUnauthorized': false
        };
        request.get(opts, function(err, data) {
            console.log('err', err);
            console.log('data', data);
        });
    }
};

module.exports = jiraApi;
