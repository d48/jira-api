var request = require('request'); 
var config = require('./config.json'); 

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
    },

    getIssues: function() {
        console.log('retrieve all issues');
    }
};

module.exports = jiraApi;
