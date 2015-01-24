/* global module, test, asyncTest */
module( "hash", {
	setup: function() {
		this.fixture = "#qunit-fixture #jmpress";
	}
});

asyncTest( "Changing the hash after initialized without an active step", function() {
	var fixture = this.fixture;
	require( [ "jquery", "./core", "./hash" ], function( $ ) {
		start();

		window.location.hash = "#";
		$( fixture ).jmpress();
		window.location.hash = "#docs";

		ok( true, "No error should occur" );
	});
});
