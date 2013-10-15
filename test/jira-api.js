var should = require('should');
var jiraApi = require('./../libs/jira-api.js');

describe('test suite for jira api', function() {
    it('should have init', function() {
        jiraApi.init().should.equal(true);
        // true.should.equal(false);
    });
});
