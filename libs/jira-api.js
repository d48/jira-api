var request = require('request'); 

var jiraApi = function() {
    return {
        init: function() {
            console.log('starting up api');

            request('http://www.google.com', function(err, res, body) {
                if (!err && res.statusCode === 200) {
                    console.log(body);
                }
            });
        }

    }
};

module.exports = jiraApi;
