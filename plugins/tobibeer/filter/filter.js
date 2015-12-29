/*\
title: $:/plugins/tobibeer/filter/filters.js
type: application/javascript
module-type: filteroperator

Filters tiddlers based on a filter expression given in the operand.

@preserve
\*/
(function(){"use strict";exports.filter=function(e,i,t){var l,s,n,f,r,u="inputTitle",a=0,p=0,c=t.widget,o=[],d=[],h="[all[tiddlers]tag<inputTitle>]";e(function(e,i){o.push(i)});$tw.utils.each((i.suffix||"").split(" "),function(e){e=e.trim();if(e){if(e.charAt(0)==="$"){a=e.length===1?1:2}else if(e.toUpperCase()==="INPUT"){p=1}else if(e.toUpperCase().substr(0,4)==="VAR:"){r=e.substr(4).trim()}}});if(!r){r=u}s=c&&c.parentWidget?c.parentWidget:null;f=s?s.getVariable(r):null;n=i.operand||h;e(function(e,i){var t=n;if(s){s.setVariable(r,i)}if(c){t=c.substituteVariableReferences(t)}l=$tw.wiki.filterTiddlers(t,c,p?o:[i]);if(l.length){if(a===1){d.push(i)}else{$tw.utils.each(l,function(e){if(d.indexOf(e)<0){d.push(e)}})}}});if(f!==null){s.setVariable(r,f)}if(a===2){if(d.length){d=o}else{d=[]}}return d}})();