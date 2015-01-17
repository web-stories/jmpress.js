/* jshint node:true */
module.exports = function( grunt ) {
	var banner = grunt.file.read( "src/banners/dist.js" ),
		pluginBanner = grunt.file.read( "src/banners/plugins.js" ),
		sourceFiles = [ "Gruntfile.js", "src/**/*.js", "test/components/*.js" ];

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		watch: {
			all: {
				files: [ "src/**", "test/components/*.js" ],
				tasks: [ "default" ]
			}
		},
		jshint: {
			all: {
				src: sourceFiles,
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		jscs: {
			all: {
				options: {
					preset: "jquery"
				},
				src: sourceFiles
			}
		},
		qunit: {
			all: {
				options: {
					urls: [
						"http://localhost:8000/test/index.html",
						"http://localhost:8000/test/amd.html"
					]
				}
			}
		},
		connect: {
			dev: {
				options: {
					open: "http://localhost:8000/test"
				}
			},
			test: {}
		},
		concat: {
			dist: {
				options: {
					banner: banner
				},
				files: [
					{
						"dist/jmpress.js": [
							"src/components/core.js",
							"src/components/near.js",
							"src/components/transform.js",
							"src/components/active.js",
							"src/components/circular.js",
							"src/components/start.js",
							"src/components/ways.js",
							"src/components/ajax.js",
							"src/components/hash.js",
							"src/components/keyboard.js",
							"src/components/viewport.js",
							"src/components/mouse.js",
							"src/components/mobile.js",
							"src/components/templates.js",
							"src/components/jqevents.js",
							"src/components/animation.js"
						],
						"dist/jmpress.impress.js": [
							"src/components/core.js",
							"src/components/near.js",
							"src/components/transform.js",
							"src/components/active.js",
							"src/components/circular.js",
							"src/components/hash.js",
							"src/components/keyboard.js",
							"src/components/mouse.js"
						]
					}
				]
			},
			plugins: {
				options: {
					banner: pluginBanner
				},
				files: [
					{
						"dist/jmpress.allplugins.js": [
							"src/plugins/toggle.js",
							"src/plugins/secondary.js",
							"src/plugins/duration.js",
							"src/plugins/presentation-mode.js"
						],
						"dist/jmpress.all.js": [
							"dist/jmpress.js",
							"dist/jmpress.allplugins.js"
						],
						"dist/plugins/jmpress.secondary.js": [
							"src/plugins/secondary.js"
						],
						"dist/plugins/jmpress.toggle.js": [
							"src/plugins/toggle.js"
						],
						"dist/plugins/jmpress.duration.js": [
							"src/plugins/duration.js"
						],
						"dist/plugins/jmpress.presentation-mode.js": [
							"src/plugins/presentation-mode.js"
						]
					}
				]
			},
			css: {
				options: {
					banner: banner
				},
				files: [
					{
						"dist/basic-animations.css": [ "src/css/animations/basic/*" ],
						"dist/demo.css": [ "dist/basic-animations.css", "src/css/demo/*.css" ]
					}
				]
			}
		},
		clean: [ "dist/**/*" ]
	});

	require( "matchdep" )
		.filterDev( "grunt-*" )
		.forEach( grunt.loadNpmTasks );

	grunt.registerTask( "files", [ "concat" ]);
	grunt.registerTask( "validate", [ "jshint", "jscs" ]);

	grunt.registerTask( "dev", [ "connect:dev", "watch" ] );
	grunt.registerTask( "ci", [ "validate", "files", "connect:test", "qunit" ] );
	grunt.registerTask( "default", [ "clean", "validate", "files" ]);
};
