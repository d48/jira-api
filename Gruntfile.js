module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jasmine: {
            src: './libs/jira-api.js',
            options: {
                specs: './test/*'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['jasmine']);
};
