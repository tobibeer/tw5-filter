/*\
title: $:/plugins/tobibeer/filter/filters.js
type: application/javascript
module-type: filteroperator

Filters tiddlers based on a filter expression given in the operand.

@preserve
\*/
(function(){"use strict";exports.filter=function(e,t,i){var l,n,r,s,f,u="inputTitle",a=0,p=0,c=i.widget,o=[],g=[],d="[all[tiddlers]tag<inputTitle>]";e(function(e,t){o.push(t)});$tw.utils.each((t.suffix||"").split(" "),function(e){e=e.trim();if(e){if(e.charAt(0)==="$"){a=e.length===1?1:2}else if(e.toUpperCase()==="INPUT"){p=1}else if(e.toUpperCase().substr(0,4)==="VAR:"){f=e.substr(4).trim()}}});if(!f){f=u}n=c&&c.parentWidget?c.parentWidget:null;s=n?n.getVariable(f):null;r=t.operand||d;e(function(e,t){var i=r;if(n){n.setVariable(f,t)}if(c){i=c.substituteVariableReferences(i)}i=i.replace(/%([^(\s\%]+)%/gm,function(e,t){return c.getVariable(t,"")});l=$tw.wiki.filterTiddlers(i,c,p?o:[t]);if(l.length){if(a===1){g.push(t)}else{$tw.utils.each(l,function(e){if(g.indexOf(e)<0){g.push(e)}})}}});if(s!==null){n.setVariable(f,s)}if(a===2){if(g.length){g=o}else{g=[]}}return g}})();