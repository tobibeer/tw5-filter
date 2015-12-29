/*\
title: $:/plugins/tobibeer/filter/filters.js
type: application/javascript
module-type: filteroperator

Filters tiddlers based on a filter expression given in the operand.

@preserve
\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
The filter filter function...
*/
exports.filter = function(source,operator,options) {
	// Declare all vars
	var matches,parent,subFilter,value,variable,
		// Default variable
		defaultVariable = "inputTitle",
		// By default return matching titles
		$ = 0,
		// By default source is current title
		input = 0,
		// The context widget
		widget = options.widget,
		// Init arrays for input titles and results
		titles=[], results = [],
		// Default subfilter
		defaultFilter = "[all[tiddlers]tag<inputTitle>]";
	// Loop source
	source(function(tiddler,title) {
		// Collect input titles
		titles.push(title);
	});
	// Loop suffixes
	$tw.utils.each(
		(operator.suffix || "").split(" "),
		function(s) {
			s = s.trim();
			if(s) {
				// Prefixed $?
				if(s.charAt(0) === "$"){
					// Either any (1) or all (2)
					$ = s.length === 1 ? 1 : 2;
				// Taking input titles as source?
				} else if (s.toUpperCase() === "INPUT") {
					// Remember
					input = 1;
				// Variable?
				} else if (s.toUpperCase().substr(0,4) === "VAR:") {
					// Store
					variable = s.substr(4).trim();
				}
			}
		}
	);
	// No variable defined?
	if(!variable) {
		// Use default
		variable = defaultVariable;
	}
	// Get parent widget
	parent = widget && widget.parentWidget ? widget.parentWidget : null;
	// Get current variable value at  parent widget
	value = parent ? parent.getVariable(variable) : null;
	// Take subfilter as operand or default
	subFilter = operator.operand || defaultFilter;
	// Loop input titles
	source(function(tiddler,title) {
		var filter = subFilter;
		// Got a variable and a parent widget?
		if(parent) {
			// Set variable at parent widget
			parent.setVariable(variable,title);
		}
		// Got a widget?
		if(widget) {
			// Replace variable placeholders in the filter
			filter = widget.substituteVariableReferences(filter);
		}
		// Retrieve matches for...
		matches = $tw.wiki.filterTiddlers(
			// Replaced subFilter
			filter,
			// In the context of this widget
			widget,
			// Source is all input titles or current title
			input ? titles : [title]
		);
		// Got matches?
		if(matches.length) {
			// Returning input titles with matches?
			if($ === 1) {
				// Add to results
				results.push(title);
			// Otherwise
			} else {
				// Loop subFilter matches
				$tw.utils.each(matches, function(t) {
					// Not yet in filter results?
					if(results.indexOf(t) < 0) {
						// Add title
						results.push(t);
					}
				});
			}
		}
	});
	// Value was remembered and we got a parent?
	if(value !== null) {
		// Set back to what it was
		parent.setVariable(variable, value);
	}
	// Output all titles?
	if($ === 2) {
		// Got any subFilter matches at all?
		if(results.length) {
			// Return all input titles
			results = titles;
		// Otherwise
		} else {
			// Nothing to return
			results = [];
		}
	}
	// Return matches
	return results;
};

})();