module.exports = function (grunt) {

  grunt.registerTask('templates', 'Build templates file', function () {

    var templates = {};

    grunt.file.recurse('./src/templates/', function (abspath, rootdir, subdir, filename) {
      var data = grunt.file.read(abspath);
      if (data) {
        var name = filename.split('.tmpl')[0];
        templates[name] = data.replace('\n', '');
      }
    });

    grunt.file.write('./dist/templates.js', JSON.stringify(templates));
  });
};
