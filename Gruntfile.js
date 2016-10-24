'use strict';


module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      clean: {
        command: 'npm run clean'
      },
      build: {
        command: 'npm run build'
      },
      serve: {
        command: 'npm start'
      },
      forceserve: {
        command: 'killall npm; npm start'
      }
    },

    copy: {
        files: {
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'build',
          src: [
            '*.jpg',
            '*.png'
          ]
      }
    },

    'gh-pages': {
      options: {
        base: 'build',
        branch: 'gh-pages',
        repo: 'git@github.com:yyfjmb/vermilion.git'
      },
      src: '**/*'
    }

  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('serve',  ['shell:serve']);
  grunt.registerTask('serve:force',  ['shell:forceserve']);
  grunt.registerTask('build',  ['shell:clean', 'shell:build', 'copy']);
  grunt.registerTask('deploy:staging', ['rsync']);
  grunt.registerTask('deploy:prod', ['gh-pages']);
};