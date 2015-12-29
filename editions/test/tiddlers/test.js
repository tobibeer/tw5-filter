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
	wiki.addTiddler({
		title: "A",
		filter: "B C",
		tags: "A",
		text:"[[B]] [[C]]"
	});
	wiki.addTiddler({title: "B",tags:"A"});
	wiki.addTiddler({title: "C",tags:"D"});
	wiki.addTiddler({title: "D",tags:"A"});
	var fakeWidget = {
		variables: {},
		setVariable: function(name,value) {
			this.variables[name] = value;
		},
		getVariable: function(name) {
			var v;
			switch (name) {
				case "currentTiddler":
					v = "A";
					break;
				case "backlinks":
					v = "[backlinks[]]";
					break;
				case "titleAsTag":
					v = "[tag<inputTitle>]";
					break;
				case "customVariable":
					v = "[tag<item>]";
					break;
				case "linksOfBacklinks":
					v = "[backlinks[]links[]]";
					break;
				case "testVariable":
					v = "A";
					break;
				default:
					v = this.variables[name];
			}
			return v;
		}
	};
	fakeWidget.parentWidget = fakeWidget;
	fakeWidget.substituteVariableReferences = function(text) {
		var self = fakeWidget;
		return (text || "").replace(/\$\(([^\)\$]+)\)\$/g,function(match,p1) {
			return self.getVariable(p1) || "";
		});
	};

	// Tests
	it("default for single tiddler", function() {
		expect(wiki.filterTiddlers(
			"A +[filter[]]"
		,fakeWidget).join(",")).toBe("A,B,D");
	});
	it("default for all tiddlers", function() {
		expect(wiki.filterTiddlers(
			"[filter[]]"
		,fakeWidget).join(",")).toBe("A,B,D,C");
	});
	it("backlinks subfilter", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter<backlinks>]"
		,fakeWidget).join(",")).toBe("A");
	});
	it("titles with subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$<backlinks>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("all titles if any have subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$all<backlinks>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
	it("being its own tag", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter<titleAsTag>]"
		,fakeWidget).join(",")).toBe("A");
	});
	it("source:input and having this tag", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:input<titleAsTag>]"
		,fakeWidget).join(",")).toBe("A,B");
	});
	it("source:input and having this tag, $", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$ input<titleAsTag>]"
		,fakeWidget).join(",")).toBe("A");
	});
	it("source:input and having this tag, $all", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$all input<titleAsTag>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
	it("source:input and having this tag, all titles", function() {
		expect(wiki.filterTiddlers(
			"[filter:input<titleAsTag>]"
		,fakeWidget).join(",")).toBe("A,B,D,C");
	});
	it("source:input, custom variable 'item'", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$ input var:item<customVariable>]"
		,fakeWidget).join(",")).toBe("A");
	});
	it("parametric subfilter", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter<linksOfBacklinks>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("titles with parametric subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$<linksOfBacklinks>]"
		,fakeWidget).join(",")).toBe("B,C");
	});
	it("all titles if any have parametric subfilter output", function() {
		expect(wiki.filterTiddlers(
			"A B C +[filter:$all<linksOfBacklinks>]"
		,fakeWidget).join(",")).toBe("A,B,C");
	});
});

})();
