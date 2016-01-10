/*\
title: $:/plugins/tobibeer/filter/filters.js
type: application/javascript
module-type: filteroperator

Filters tiddlers based on a filter expression given in the operand.

@preserve
\*/
(function(){"use strict";exports.filter=function(t,e,i){try{var r,l,n,s,a,f="inputTitle",u=0,c=0,p=i.widget,o=[],h=[],g="[all[tiddlers]tag<inputTitle>]";t(function(t,e){o.push(e)});$tw.utils.each((e.suffix||"").split(" "),function(t){t=t.trim();if(t){if(t.charAt(0)==="$"){u=t.length===1?1:2}else if(t.toUpperCase()==="INPUT"){c=1}else if(t.toUpperCase().substr(0,4)==="VAR:"){a=t.substr(4).trim()}}});if(!a){a=f}l=p&&p.parentWidget?p.parentWidget:null;s=l?l.getVariable(a):null;n=e.operand||g;t(function(t,e){try{var i=n;if(l){l.setVariable(a,e)}if(p){i=p.substituteVariableReferences(i)}i=i.replace(/%([^(\s\%]+)%/gm,function(t,e){return p.getVariable(e,"")});r=$tw.wiki.filterTiddlers(i,p,c?o:[e]);if(r.length){if(u===1){h.push(e)}else{$tw.utils.each(r,function(t){if(h.indexOf(t)<0){h.push(t)}})}}}catch(s){throw"can't evaluate subfilter `"+i+"`"}});if(s!==null){l.setVariable(a,s)}if(u===2){if(h.length){h=o}else{h=[]}}return h}catch(b){return["filter error: "+b]}}})();