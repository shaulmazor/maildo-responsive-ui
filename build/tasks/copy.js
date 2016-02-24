module.exports = function(grunt) {

    grunt.config.set('copy', {

        script: {
            files: [
                {expand: true, cwd: 'src/scripts/', src: ['**'], dest: 'dist/scripts'}
            ]
        },

        images: {
            files: [
                {expand: true, cwd: 'src/images/', src: ['**'], dest: 'dist/images'}
            ]
        }
    });
};