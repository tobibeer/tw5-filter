/*\
title: $:/plugins/tobibeer/make/filters.js
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
	var matches, parent, pass, all, variable, value,
		input=[], results = [];
	// Loop suffixes
	$tw.utils.each(
		// Split by blanks
		(operator.suffix || "").split(" "),
		function(s) {
			s = s.trim();
			if(s) {
				// Output specifier?
				if(s.charAt(0) === "$") {
					// Just a $
					if(s.length === 1) {
						// Pass input titles with matches
						pass = 1;
					// Otherwise
					} else {
						// Pass all input titles if any have matches
						all = 1;
					}
				// No $ prefix?
				} else {
					// Got a variable
					variable = s;
				}
			}
		}
	);
	// Got a variable or an output specifier?
	if(variable || pass) {
		// Get parent widget
		parent = options.widget && options.widget.parentWidget ? options.widget.parentWidget : null;
		// Get current variable value at  parent widget
		value = parent && variable ? parent.getVariable(variable) : null;
		// Loop input titles
		source(function(tiddler,title) {
			// Got a variable and a parent widget?
			if(variable && parent) {
				// Set variable at parent widget
				parent.setVariable(variable,title);
			}
			// Evaluate subfilter
			matches = $tw.wiki.filterTiddlers(
				operator.operand,
				options.widget,
				// Passing the current input title as the source
				[title]
			);
			// Got matches?
			if(matches.length) {
				// Returning input titles with matches?
				if(pass) {
					// Add to results
					results.push(title);
				// Otherwise
				} else {
					// Loop subfilter matches
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
	// No variable or output specifier
	} else {
		// Just evaluae the subfilter as if directly concatenated
		results = $tw.wiki.filterTiddlers(operator.operand,options.widget,source);
	}
	// Output all titles?
	if(all) {
		// Got any subfilter matches at all?
		if(results.length) {
			// Loop source
			source(function(tiddler,title) {
				// Collect input title
				input.push(title);
			});
			// Return all input titles
			results = input;
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