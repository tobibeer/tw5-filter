/*\
title: test-tobibeer/filter-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the make filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test filter filter", function() {
	// Create a wiki
	var wiki = new $tw.Wiki({});
	// Make global wiki
	$tw.wiki = wiki;
	// Add a few  tiddlers
	wiki.addTiddler({title: "A",text:"[[B]] [[C]]"});
	wiki.addTiddler({title: "B"});
	wiki.addTiddler({title: "C"});
	var fakeWidget = {
		variables: {},
		setVariable: function(name,value) {
			this.variables[name] = value;
		},
		getVariable: function(name) {
			var v;
			switch (name) {
				case "simple":
					v = "[backlinks[]]";
					break;
				case "title":
					v = "[<item>]";
					break;
				case "var":
					v = "[backlinks[]links<item>]";
					break;
				default:
					v = this.variables[name];
			}
			return v;
		}
	};
	fakeWidget.parentWidget = fakeWidget;
	// Tests
	it("simple subfilter", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter<simple>]"
		,fakeWidget).join(",")).toBe("A");
	});
	it("titles with subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$<simple>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("all titles if any have subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$all<simple>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
	it("basic subfilter variable", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:item<title>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
	it("parametric subfilter", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:item<var>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("titles with parametric subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:item $<var>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("all titles if any have parametric subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:item $all<var>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
});

})();
