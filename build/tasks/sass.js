module.exports = function(grunt) {

    grunt.config.set('sass', {

        "all": {
            "files": {
                "responsive/css/dark.css": "responsive/scss/themes/dark/dark.scss",
                "responsive/css/light.css": "responsive/scss/themes/light/light.scss"
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