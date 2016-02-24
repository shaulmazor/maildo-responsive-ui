var fs = require('fs');

module.exports = function (grunt) {

    grunt.config.set('replace', {

        templates: {
            files: [
                {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/'}
            ],

            options: {
                patterns: [{
                    match: 'templates',
                    replacement: '<%= grunt.file.read("./dist/templates.js") %>'
                }]
            }
        }
    });

};