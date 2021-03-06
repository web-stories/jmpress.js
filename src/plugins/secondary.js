/*
 * jmpress.secondary plugin
 * Apply a secondary animation when step is selected.
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery", "./core" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

	"use strict";

	$.jmpress( "initStep", function( step, eventData ) {
		var name;
		for ( name in eventData.data ) {
			if ( name.indexOf( "secondary" ) === 0 ) {
				eventData.stepData[ name ] = eventData.data[ name ];
			}
		}
	});
	function exchangeIf( childStepData, condition, step ) {
		var name, tmp, normal;
		if ( childStepData.secondary &&
				childStepData.secondary.split( " " ).indexOf( condition ) !== -1 ) {
			for ( name in childStepData ) {
				if ( name.length > 9 && name.indexOf( "secondary" ) === 0 ) {
					tmp = childStepData[ name ];
					normal = name.substr( 9 );
					normal = normal.substr( 0, 1 ).toLowerCase() + normal.substr( 1 );
					childStepData[ name ] = childStepData[ normal ];
					childStepData[ normal ] = tmp;
				}
			}
			$( this ).jmpress( "reapply", $( step ) );
		}
	}
	$.jmpress( "beforeActive", function( step, eventData ) {
		exchangeIf.call( eventData.jmpress, $( step ).data( "stepData" ), "self", step );
		var i,
			parent = $( step ).parent();
		$( parent )
			.children( eventData.settings.stepSelector )
			.each(function( idx, child ) {
				var childStepData = $( child ).data( "stepData" );
				exchangeIf.call( eventData.jmpress, childStepData, "siblings", child );
			});
		function grandchildrenFunc( idx, child ) {
			var childStepData = $( child ).data( "stepData" );
			exchangeIf.call( eventData.jmpress, childStepData, "grandchildren", child );
		}
		for ( i = 1; i < eventData.parents.length; i++ ) {
			$( eventData.parents[ i ] )
				.children( eventData.settings.stepSelector )
				.each( grandchildrenFunc );
		}
	});
	$.jmpress( "setInactive", function( step, eventData ) {
		exchangeIf.call( eventData.jmpress, $( step ).data( "stepData" ), "self", step );
		var i,
			parent = $( step ).parent();
		$( parent )
			.children( eventData.settings.stepSelector )
			.each(function( idx, child ) {
				var childStepData = $( child ).data( "stepData" );
				exchangeIf.call( eventData.jmpress, childStepData, "siblings", child );
			});
		function grandchildrenFunc( idx, child ) {
			var childStepData = $( child ).data( "stepData" );
			exchangeIf.call( eventData.jmpress, childStepData, "grandchildren", child );
		}
		for ( i = 1; i < eventData.parents.length; i++ ) {
			$( eventData.parents[ i ] )
				.children( eventData.settings.stepSelector )
				.each( grandchildrenFunc );
		}
	});
}));
