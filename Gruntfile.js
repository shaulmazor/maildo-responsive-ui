module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-sass');

    grunt.loadTasks('build/tasks');

    grunt.registerTask('default', [
        'sass'
    ]);
};