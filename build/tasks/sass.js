module.exports = function(grunt) {

    grunt.config.set('sass', {

        "all": {
            "files": {
                "responsive/css/initial.css": "responsive/scss/initial.scss"
            },
            "options": {
                "includePaths": [
                    "responsive/scss"
                ],
                "outputStyle": "compressed"
            }
        }
    });
};