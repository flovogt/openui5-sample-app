/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";const e=Array.from(document.getElementsByTagName("script")).find(e=>/ModuleTracking.js$/.test(e.getAttribute("src")));function t(e){return e&&JSON.parse(JSON.stringify(e))}var n,i="sap.ui.base.SyncPromise",o=0,r={},s=new Map;function c(e){var t,o=Object.keys(r).length+(s?s.size:0),c="Uncaught (in promise): "+o+" times\n",f,u,a,l;if(o){for(t in r){f=r[t];if(f.getResult()&&f.getResult().stack){c+=f.getResult().stack}else{c+=f.getResult()}if(f.$error.stack){c+="\n>>> SyncPromise rejected with above reason...\n"+f.$error.stack.split("\n").slice(2).join("\n")}c+="\n\n"}r={};if(s&&s.size){l=s.values();for(;;){a=l.next();if(a.done){break}u=a.value;c+=(u&&u.stack||u)+"\n\n"}s.clear()}if(e){e(c)}else if(n){n.info(`Clearing ${o} uncaught promises`,c,i)}}}if(e.getAttribute("data-uncaught-in-promise")!=="true"){window.addEventListener("unhandledrejection",function(e){if(e.reason&&e.reason.$uncaughtInPromise){return}if(s){s.set(e.promise,e.reason);e.preventDefault()}else{alert("Uncaught (in promise) "+e.reason)}});window.addEventListener("rejectionhandled",function(e){if(s){s.delete(e.promise)}})}function f(e,t){if(t){delete r[e.$id];if(n){n.info(`Promise ${e.$id} caught`,Object.keys(r),i)}return}e.$id=o++;e.$error=new Error;r[e.$id]=e;if(n){n.info(`Promise ${e.$id} rejected with ${e.getResult()}`,Object.keys(r),i)}}let u;const a={};const l=/(testId|filter)=/.test(window.location.search);function d(){if(window.__coverage__&&Object.keys(a).length){if(window.location.search.includes("moduleId=")){window.__coverage__=a}else{for(const[e,t]of Object.entries(a)){h(e,t)}}}}function g(e){if(!window.__coverage__){return undefined}if(e.endsWith(".js")){return e}const t=`${e.replace(/\./g,"/")}.js`;return Object.keys(window.__coverage__).find(e=>e.endsWith(t))}function m(e,t){const n=e.b;const i=t.b;for(const[e,t]of Object.entries(i)){const i=n[e];t.forEach((e,t)=>{i[t]=e})}}function _(e,t){for(const[n,i]of Object.entries(t)){e[n]=i}}function h(e,t){const n=g(e);if(n){const e=window.__coverage__[n];const i=t||u[n];m(e,i);_(e.f,i.f);_(e.s,i.s)}}function b(){u=t(window.__coverage__)}function w(e){const n=g(e);if(!n){return false}const i=t(window.__coverage__[n]);a[n]=i;if(l){return false}return Object.values(i.b).some(e=>e.some(e=>e===0))||Object.values(i.f).some(e=>e===0)||Object.values(i.s).some(e=>e===0)}const p=QUnit.module.bind(QUnit);function v(e,t){t=t||{};const n=t.after||function(){};const i=t.afterEach||function(){};const o=t.before||function(){};const r=t.beforeEach||function(){};t.after=function(t){if(!this.__ignoreIsolatedCoverage__&&w(e)){t.ok(false,`${e}: Coverage below 100%`)}return n.apply(this,arguments)};t.afterEach=function(e){const t=c.bind(null,e.ok.bind(e,false));function n(e){t();throw e}function o(e){if(e&&typeof e.then==="function"){return e.then(o,n)}t();return e}try{return o(i.apply(this,arguments))}catch(e){return n(e)}};t.before=function(){const t=o.apply(this,arguments);if(!this.__ignoreIsolatedCoverage__){h(e)}return t};t.beforeEach=function(){c();return r.apply(this,arguments)};p(e,t)}if(QUnit.module!==v){QUnit.module=v;sap.ui.require(["sap/base/Log","sap/ui/base/SyncPromise"],function(e,t){if(e.isLoggable(e.Level.INFO,i)){n=e}t.listener=f});QUnit.begin(()=>{document.body.style.overflow="scroll";document.getElementById("qunit-modulefilter-dropdown-list").style.maxHeight="none";document.getElementById("qunit-modulefilter-dropdown").addEventListener("click",function(e){if(e.target.tagName==="LABEL"&&e.target.innerText!=="All modules"){setTimeout(function(){document.getElementById("qunit-modulefilter-actions").firstChild.dispatchEvent(new MouseEvent("click"))})}});b()});QUnit.done(()=>{d()})}})();
//# sourceMappingURL=ModuleTracking.js.map