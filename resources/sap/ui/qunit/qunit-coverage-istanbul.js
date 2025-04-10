/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";if(typeof QUnit==="undefined"){throw new Error("qunit-coverage-istanbul.js: QUnit is not loaded yet!")}function e(e){return e.replace(/\\/g,"/")}function t(r,n){if(typeof n==="string"){if(n.indexOf("[")===0){var i=n.slice(1,n.length-1).split(",");return i.some(function(n){return t(r,e(n.slice(1,-1)))})}else if(n.indexOf("//")===0){var o=n.slice(2,n.lastIndexOf("/"));var a=n.slice(n.lastIndexOf("/")+1);var s=new RegExp(o,a);return s.test(r)}else if(n.indexOf("#")===0){return window[n.slice(1)].call(window,r)}else{return r.indexOf(e(n))>-1}}else if(n instanceof Array){return n.some(function(e){return t(r,e)})}else if(n instanceof RegExp){return n.test(r)}else if(typeof n==="function"){return n.call(window,r)}}window["sap-ui-qunit-coverage"]="client";var r;var n=document.currentScript;function i(){var e,t;if(r){return r}if(n){if(n.hasAttribute("data-sap-ui-cover-only")){e=n.getAttribute("data-sap-ui-cover-only")}if(n.hasAttribute("data-sap-ui-cover-never")){t=n.getAttribute("data-sap-ui-cover-never")}}r={filter:e,antiFilter:t};return r}function o(e){var r=i(),n=r.filter,o=r.antiFilter;if(typeof o!=="undefined"&&t(e,o)){return false}else if(typeof n==="undefined"||t(e,n)){return true}else{return false}}function a(e){var t=new URL(e,document.baseURI);t.searchParams.set("instrument","true");return t.toString()}function s(){if(!n){return{}}var e={};var t=["statements","functions","branches","lines"];t.reduce(function(e,t){if(n.hasAttribute("data-sap-ui-cover-watermarks-"+t)){e["watermarks"]=e["watermarks"]||{};e["watermarks"][t]=JSON.parse(n.getAttribute("data-sap-ui-cover-watermarks-"+t))}return e},e);return e}if(QUnit.urlParams.coverage){var u=HTMLScriptElement.prototype.setAttribute;HTMLScriptElement.prototype.setAttribute=function(e,t){if(e==="data-sap-ui-module"&&o(t||"")){this.src=a(this.src)}u.apply(this,arguments)};var c=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,t){if(globalThis.sap?.ui?.loader&&t&&t.endsWith(".js")&&o(sap.ui.loader._.guessResourceName(t)||"")){arguments[1]=a(t)}c.apply(this,arguments)};QUnit.done(function(){if(window.top!==window){return}sap.ui.require(["sap/base/util/fetch","sap/base/util/Version"],function(e,t){var r=s();var n=r.watermarks;e("/.ui5/coverage/ping",{method:"GET"}).then(function(e){return e.json()}).then(function(e){var r=new t(e.version);var i=r.compareTo("1.1.0")<0;if(i){if(n){console.error('Coverage option "watermarks" is provided, but the current version of '+"@ui5/middleware-code-coverage ("+r.toString()+") doesn't support it. "+"Please upgrade @ui5/middleware-code-coverage to v1.1.0 or higher.")}return window.top.__coverage__}else{return{coverage:window.top.__coverage__,watermarks:n}}}).then(function(t){return e("/.ui5/coverage/report",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})}).then(function(e){return e.json()}).then(function(e){var t=e.availableReports;var r=t.filter(function(e){return e.report==="html"})[0];if(!r){return}var n=document.body;var i=document.createElement("iframe");i.src="/.ui5/coverage/report/"+r.destination;i.style.border="none";i.style.width="100%";i.style.height="100vh";i.sandbox="allow-scripts";n.appendChild(i)})})})}var f=QUnit.config.urlConfig.some(function(e){return e.id==="coverage"});if(!f){QUnit.config.urlConfig.push({id:"coverage",label:"Enable coverage",tooltip:"Enable code coverage."})}})();
//# sourceMappingURL=qunit-coverage-istanbul.js.map