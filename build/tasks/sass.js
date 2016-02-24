module.exports = function(grunt) {

    grunt.config.set('sass', {

        "all": {
            "files": {
                "dist/css/dark.css": "src/scss/themes/dark/dark.scss",
                "dist/css/light.css": "src/scss/themes/light/light.scss"
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