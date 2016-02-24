module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadTasks('build/tasks');

    grunt.registerTask('default', [
        'sass',
        'templates',
        'replace:templates',
        'copy'
    ]);
};