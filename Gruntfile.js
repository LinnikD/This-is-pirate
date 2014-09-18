module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: { 
            build: { /* Подзадача */
                options: {
                    almond: true,
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public/js/build/main.js"
                }
            }
        },
        uglify: {
            build: { /* Подзадача */
                files: [{
                    src: ['public/js/build.js'],
                    dest: 'public/js/build.min.js'
                }]
            }
        },
        concat: {
            build: { /* Подзадача */
                options: {
                    separator: ';\n'
                },
                src: ['public/js/lib/almond.js','public/js/build/main.js'],
                dest: 'public/js/build.js'
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            sass: {
                files: ['public/css/*.scss'],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            express: {
                files:  [
                    'routes/**/*.js',
                    'app.js'
                ],
                tasks:  [ 'express' ],
                options: {
                    spawn: false
                }
            },
            server: {
                files: [
                    'public/js/**/*.js',
                    'public/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },
        express: {
            server: {
                options: {
                    livereload: true,
                    port: 8000,
                    script: 'app.js'
                }
            }
        },
        /*qrcode: {
            options:{
                port:'8000'
            },
            all: {

            }
        }*/
	    sass: {
	        css: {
                options: {                       // Target options
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'public/css', /* исходная директория */
                    src: '*.scss', /* имена шаблонов */
                    dest: 'public/css', /* результирующая директория */
                    ext: '.css'
                }]
            }
	    },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    //grunt.loadNpmTasks('grunt-qrcode');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['express', 'watch']);
    grunt.registerTask('build', ['fest', 'requirejs:build', 'concat:build', 'uglify:build']);
};
//в developer не сжат - в express сжат
    
