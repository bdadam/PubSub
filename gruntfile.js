module.exports = function(grunt) {

    grunt.initConfig({

        uglify: {
            pubsub: {
                files: {
                    'pubsub.min.js': 'src/pubsub.js'
                }
            }
        },

        jshint: {
            pubsub: ['src/*.js', 'tests/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                strict: true,
                globals: {
                    PubSub: true,
                    define: true,
                    require: true
                }
            }
        },

        jasmine: {
            pubsub: {
                src: 'src/pubsub.js',
                options: {
                    specs: 'tests/pubsub.specs.js'
                }
            },

            "pubsub-amd": {
                src: 'src/pubsub.js',
                options: {
                    template: require('grunt-template-jasmine-requirejs'),
                    specs: 'tests/pubsub.amd.specs.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'jasmine']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
