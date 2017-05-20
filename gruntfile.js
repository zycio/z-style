(function() {
    'use strict';

    var watch = {
        less: {
            files: ['src/**/*.less'],
            tasks: ['injector', 'less', 'cssmin', 'copy']
        }
    };

    var less = {
        options: {},
        dest: {
            files: {
                'dest/z-style.css': 'src/index.less'
            }
        }
    };

    var injector = {
        options: {},
        less: {
            options: {
                transform: function (filePath) {
                    filePath = filePath.replace('/src/', '');
                    return '@import \'' + filePath + '\';';
                },
                starttag: '// injector:less',
                endtag: '// endinjector:less',
                template: 'src/index.less'
            },
            files: {
                'src/index.less': [
                    'src/**/*.less',
                    '!src/index.less'
                ]
            }
        }
    };

    var cssmin = {
        target: {
            files: {
                'dest/z-style.min.css': ['dest/z-style.css']
            }
        }
    };

    var copy = {
        main: {
            files: [
                {
                    expand: true,
                    src: '*.min.css',
                    dest: 'docs/',
                    cwd: 'dest/'
                }
            ]
        }
    };

    var clean = {
        dest: {
            files: [{
                src: ['dest']
            }]
        }
    };

    module.exports = function(grunt) {
        require('jit-grunt')(grunt, {});

        grunt.initConfig({
            watch: watch,
            less: less,
            injector: injector,
            cssmin: cssmin,
            copy: copy,
            clean: clean
        });

        grunt.registerTask('dest', [
            'clean',
            'injector',
            'less',
            'cssmin',
            'copy'
        ]);

        grunt.registerTask('default', [
            'dest',
            'watch'
        ]);
    };
})();
