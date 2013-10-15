var should = require('should');
var jiraApi = require('./../libs/jira-api.js');

// @todo make all tests async
describe('test suite for jira api', function() {
    it('should have init', function() {
        jiraApi.init().should.equal(true);
    });
});
