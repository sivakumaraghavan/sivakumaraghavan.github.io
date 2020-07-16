module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task to concat all CSS and JS files
        concat: {
            options: {
              separator: ''
            },
            css: {
              src: ['css/*.css'],
              dest: 'public/css/<%= pkg.name %>.css'
            },
            js: {
              src: ['js/*.js'],
              dest: 'public/js/<%= pkg.name %>.js'
            }
        },

        // Task to minify JS file
        uglify: {
            options: {
              banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
            },
            dist: {
              files: [{
                expand: true,
                cwd: '.',
                src: '<%= concat.js.dest %>',
                ext: '.min.js'
              }]
            }
        },

        // Task to minify CSS file
        cssmin: {
            target: {
              files: [{
                expand: true,
                cwd: 'public/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
              }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat','uglify','cssmin']);
}