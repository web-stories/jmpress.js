/*
 * jqevents.js
 * Fires jQuery events
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	/* HOOKS */
	// the events should not bubble up the tree
	// elsewise nested jmpress would cause buggy behavior
	$.jmpress( "setActive", function( step, eventData ) {
		if ( eventData.prevStep !== step ) {
			$( step ).triggerHandler( "enterStep" );
		}
	});
	$.jmpress( "setInactive", function( step, eventData ) {
		if ( eventData.nextStep !== step ) {
			$( step ).triggerHandler( "leaveStep" );
		}
	});
}));
