module.exports = function(grunt) {

  // Initialize configuration object
  grunt.initConfig({

   babel: {
    options: {
      sourceMap: false,
      presets: ['@babel/preset-env']
    },
    dist: {
     files: [{
            expand: true,     // Enable dynamic expansion.
            cwd: './assets/js/',      // Src matches are relative to this path.
            src: ['*.js'],
            dest: './assets/js/babel/',   // Destination path prefix.
            ext: '.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          }]
        }
      },

      comments: {
        your_target: {
      // Target-specific file lists and/or options go here.
      options: {
        singleline: true,
        multiline: true,
        keepSpecialComments: false
      },
      src: [ './assets/js/babel/**/*.js'] // files to remove comments from
    },
  },

      // Define configuration for each task
      sass: {
      	development: {
      		options: {
                  style: 'compressed', // Minification
                },
                files: {
                  // Compile sass into css
                  "./public/css/styles.min.css": "./assets/sass/main.scss",
                }
              }
            },
            concat: {
            	options: {
            		separator: ';',
            	},
            	js_script: {
            		src: [
                './assets/js/babel/**/*.js',
                ],
              // Concatenate script.js
              dest: './public/js/script.js',
            },
          },

          uglify: {
          	options: {
              mangle: false // Leaves function and variable names unchanged
            },

            script: {
            	files: {
                  // Minifies  script.js
                  './public/js/script.min.js': './public/js/script.js',
                }
              },
            },

            imagemin: {
            	dynamic: {
            		files: [{
            			expand: true,
                  // Compresses all png / jpg / gif images
                  cwd: './assets/img/',
                  src: ['**/*.{png,jpg,gif,svg}', 'favicon.ico'],
                  dest: './public/img/'
                }],
                options: {
                	optimizationLevel: 3,
                	progressive: true,
                }
              }
            },
						// copy third-party vendor files bootstrap/jquery from node_modules into public folder
            copy: {
            	js: {
            		files: [
            		{
            			expand: true, 
            			cwd: 'node_modules/jquery/dist/', 
            			src: 'jquery.min.js', 
            			dest: 'public/js/vendors/'
            		},
            		{
            			expand: true, 
            			cwd: 'node_modules/bootstrap/scss/', 
            			src: '**/*', 
            			dest: 'public/css/vendors/bootstrap/'
            		},
                {
                  expand: true, 
                  cwd: 'node_modules/font-awesome/scss/', 
                  src: '**/*', 
                  dest: 'public/css/vendors/font-awesome/'
                },
                {
                  expand: true, 
                  cwd: 'node_modules/font-awesome/fonts/', 
                  src: '**/*', 
                  dest: 'public/fonts/'
                },
                {
                 expand: true, 
                 cwd: 'node_modules/bootstrap/dist/js/', 
                 src: 'bootstrap.min.js', 
                 dest: 'public/js/vendors/'
               },
               {
                 expand: true, 
                 cwd: 'node_modules/popper.js/dist/', 
                 src: 'popper.min.js', 
                 dest: 'public/js/vendors/'
               },
               {
                expand: true, 
                cwd: 'node_modules/axios/dist/', 
                src: 'axios.min.js', 
                dest: 'public/js/vendors/'
              },
              {
                expand: true, 
                cwd: 'node_modules/promise-polyfill/src/', 
                src: '**/*',
                dest: 'public/js/vendors/'
              },
              {
                expand: true, 
                cwd: 'node_modules/jquery-mask-plugin/dist/', 
                src: 'jquery.mask.min.js', 
                dest: 'public/js/vendors/'
              }
              ]
            },
            main: {
              files: [
                // makes all src relative to cwd
                {expand: true, cwd: './assets/fonts', src: ['**'], dest: './public/fonts'},
                ],
              },
            },

            compress: {
            	main: {
            		options: {
            			archive: 'nfl.zip'
            		},
            		files: [{
            			expand: true,
            			cwd: '',
            			src: ['**/*','!node_modules/**','!assets/**','!.sass-cache/**'],
            			dest: '/'
            		}]
            	}
            },

            watch: {
            	js_script: {
            		files: [
                  // Watched files
                  './assets/js/*.js',
                  ],
                  tasks: ['babel:dist', 'comments:your_target', 'concat:js_script', 'uglify:script'],
                  options: {
                  	livereload: true
                  }
                },
                sass: {
              // Watched files
              files: ['./assets/sass/**/*.scss'],
              tasks: ['sass'],
              options: {
              	livereload: true
              }
            },
            images: {
              // Watched files
              files: ['./assets/img/**/*.{png,jpg,gif}'],
              tasks: ['imagemin'],
              options: {
              	livereload: true
              }
            },
            html: {
              // Watch php for changes
              files: ['**/*.html'],
              tasks: [],
              options: {
              	livereload: true
              }
            }
          }
        });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-stripcomments');


  // Compile CSS and Javascript
  grunt.registerTask('compile', ['babel','comments','copy','sass','concat','uglify','imagemin']);

  // Set default task
  grunt.registerTask('default', ['watch']);

  // production usage
  //grunt.registerTask('deploy', ['sass','concat','uglify','copy','imagemin','compress']);  

};
