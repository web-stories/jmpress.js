/* global module, test, asyncTest */
module( "viewport", {
	setup: function() {
		this.fixture = "#qunit-fixture #jmpress";
	}
});

asyncTest( "optional keyboard.js dependency", function() {
	require( [ "jquery", "./core", "./viewport" ], function( $ ) {
		start();
		ok( true, "Should load viewport without additional dependencies (no error should occur)" );
	});
});