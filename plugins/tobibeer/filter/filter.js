/*\
title: $:/plugins/tobibeer/make/filters.js
type: application/javascript
module-type: filteroperator

Filters tiddlers based on a filter expression given in the operand.

@preserve
\*/
(function(){"use strict";exports.filter=function(i,e,t){var l,n,f,r,s,u,a=[],d=[];$tw.utils.each((e.suffix||"").split(" "),function(i){i=i.trim();if(i){if(i.charAt(0)==="$"){if(i.length===1){f=1}else{r=1}}else{s=i}}});if(s||f){n=t.widget&&t.widget.parentWidget?t.widget.parentWidget:null;u=n&&s?n.getVariable(s):null;i(function(i,r){if(s&&n){n.setVariable(s,r)}l=$tw.wiki.filterTiddlers(e.operand,t.widget,[r]);if(l.length){if(f){d.push(r)}else{$tw.utils.each(l,function(i){if(d.indexOf(i)<0){d.push(i)}})}}});if(u!==null){n.setVariable(s,u)}}else{d=$tw.wiki.filterTiddlers(e.operand,t.widget,i)}if(r){if(d.length){i(function(i,e){a.push(e)});d=a}else{d=[]}}return d}})();