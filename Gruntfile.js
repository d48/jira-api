module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        mochaTest: {
            test: {
                options: {
                    reporter: 'mocha-unfunk-reporter'
                }
            },
            src: 'test/*'
        },

        watch: {
            scripts: {
                files: ['./libs/*','./test/*'],
                tasks: ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['mochaTest']);
    // grunt.registerTask('watch', ['watch']);
    grunt.registerTask('default', ['mochaTest']);
};
