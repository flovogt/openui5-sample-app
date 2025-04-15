/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/BindingParser","sap/ui/core/CommandExecution","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/json/JSONModel","sap/ui/model/base/ManagedObjectModel","sap/base/util/JSTokenizer","sap/base/util/resolveReference","sap/base/future","sap/ui/base/DesignTime"],function(e,t,r,n,a,i,s,o,d,l){"use strict";var f={resolveEventHandler:function(r,n,s){var f,u,m;r=r.trim();if(l.isControllerCodeDeactivated()){f=function(){}}else{if(r.startsWith("cmd:")){var c=r.substr(4);f=function(e){var n=t.find(e.getSource(),c);if(n){n.trigger()}else{d.errorThrows("Handler '"+r+"' could not be resolved. No CommandExecution defined for command: "+c)}};f._sapui_commandName=c}else{u=r.indexOf("(");m=r;if(u>0){m=r.substring(0,u).trim()}else if(u===0){throw new Error("Event handler name starts with a bracket, must start with a function name "+"(or with a dot followed by controller-local function name): "+r)}f=o(m,Object.assign({".":n},s),{preferDotContext:m.indexOf(".")===-1,bindContext:false})}if(f&&u>0){var g=r.lastIndexOf(")");if(g>u){if(r.substring(u).indexOf("{=")>-1){d.warningThrows("It looks like an event handler parameter contains a binding expression ({=...}). This is not allowed "+"because the entire event handler is already considered an expression: "+r)}f=function(t,n){return function(o){var d,l,f=r;if(r.indexOf("$parameters")>-1){d=new a(o.mParameters)}if(r.indexOf("$source")>-1){l=new i(o.getSource())}var u={$controller:n,$event:o};if(t.indexOf(".")>0){var m=t.split(".")[0];u[m]=window[m]}else if(t.indexOf(".")===-1){if(n&&n[t]){f="$controller."+f}else if(window[t]){u[t]=window[t]}}Object.assign(u,s);var c=e.parseExpression(f.replace(/^\./,"$controller."),0,{oContext:n},u);if(c.result){try{p(c.result,o.getSource(),n,d,l)}catch(e){e.message="Error when evaluating event handler '"+r+"': "+e.message;throw e}}if(d){d.destroy()}if(l){l.destroy()}}}(m,n)}else{d.errorThrows("Syntax error in event handler '"+r+"': arguments must be enclosed in a pair of brackets")}}}if(typeof f==="function"){f._sapui_handlerName=r;return[f,n]}d.warningThrows("Event handler name '"+r+"' could not be resolved to an event handler function")},parse:function e(t){t=t.trim();var r=new s;var n=[];var a="";var i=0;r.init(t,0);for(;;){var o=r.next();if(o==='"'||o==="'"){var d=r.getIndex();r.string();a+=t.slice(d,r.getIndex());o=r.getCh()}if(!o){break}switch(o){case"(":i++;break;case")":i--;break;default:break}if(o===";"&&i===0){n.push(a.trim());a=""}else{a+=o}}if(a){n.push(a.trim())}return n}};function p(e,t,a,i,s){var o,d;e.mode=r.OneWay;if(!e.parts){e.parts=[];e.parts[0]={path:e.path,targetType:e.targetType,type:e.type,suspended:e.suspended,formatOptions:e.formatOptions,constraints:e.constraints,model:e.model,mode:e.mode};delete e.path;delete e.targetType;delete e.mode;delete e.model}for(var l=0;l<e.parts.length;l++){d=e.parts[l];if(typeof d=="string"){d={path:d};e.parts[l]=d}if(!d.path&&d.parts){throw new Error("Bindings in event handler parameters cannot use parts. Just use one single path.")}var f=d.path.indexOf(">");if(f>0){d.model=d.path.substr(0,f);d.path=d.path.substr(f+1)}}var p,u,m=[];e.parts.forEach(function(n){var a;if(n.model==="$parameters"){a=i;p=i.createBindingContext("/")}else if(n.model==="$source"){a=s;p=s.createBindingContext("/")}else{a=t.getModel(n.model);p=t.getBindingContext(n.model)}o=n.type;u=a.bindProperty(n.path,p,e.parameters);u.setType(o,n.targetType||"any");u.setFormatter(n.formatter);u.setBindingMode(r.OneTime);m.push(u)});if(m.length>1||e.formatter&&e.formatter.textFragments){o=e.type;u=new n(m,e.useRawValues,e.useInternalValues);u.setType(o,d.targetType||"any");u.setBindingMode(r.OneTime)}else{u=m[0]}u.setFormatter(e.formatter);u.initialize();return u.getExternalValue()}return f});
//# sourceMappingURL=EventHandlerResolver.js.map