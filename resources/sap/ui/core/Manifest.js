/*
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/thirdparty/URI","sap/ui/VersionInfo","sap/base/util/Version","sap/base/Log","sap/ui/dom/includeStylesheet","sap/base/i18n/ResourceBundle","sap/base/util/uid","sap/base/util/merge","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions","sap/base/config","sap/ui/core/Configuration","sap/ui/core/Supportability","sap/ui/core/Lib","./_UrlResolver"],function(e,n,i,t,s,r,a,o,u,c,f,l,p,d,h,m){"use strict";function v(e){var n=t(e);return n.getSuffix()?t(n.getMajor()+"."+n.getMinor()+"."+n.getPatch()):n}function g(e,n){if(e&&n&&typeof n==="string"&&n[0]==="/"){var i=n.substring(1).split("/"),t;for(var s=0,r=i.length;s<r;s++){t=i[s];e=Object.hasOwn(e,t)?e[t]:undefined;if(e===null||typeof e!=="object"){if(s+1<r&&e!==undefined){e=undefined}break}}return e}return e&&e[n]}function b(e){if(e&&typeof e==="object"&&!Object.isFrozen(e)){Object.freeze(e);for(var n in e){if(Object.hasOwn(e,n)){b(e[n])}}}}var _=e.extend("sap.ui.core.Manifest",{constructor:function(i,t){e.apply(this,arguments);this._uid=o();this._iInstanceCount=0;this._oRawManifest=i;this._bProcess=!(t&&t.process===false);this._bAsync=!(t&&t.async===false);this._activeTerminologies=t&&t.activeTerminologies;this._bLoadManifestRequestFailed=t&&t._bLoadManifestRequestFailed;this._sComponentName=t&&t.componentName;var s=this.getComponentName(),r=t&&t.baseUrl||s&&sap.ui.require.toUrl(s.replace(/\./g,"/"))+"/";if(r){this._oBaseUri=new n(r).absoluteTo(new n(document.baseURI).search(""))}if(t&&typeof t.url==="string"){this._oManifestBaseUri=new n(t.url).absoluteTo(new n(document.baseURI).search("")).search("")}else{this._oManifestBaseUri=this._oBaseUri}b(this._oRawManifest);this._oManifest=u({},this._oRawManifest);if(this._bProcess){this._processI18n()}},_processI18n:function(e,n){if(!n){n=[];this._preprocess({i18nProperties:n})}if(n.length>0){var i=function(e){var i=function(n,i){return e.getText(i)};for(var t=0,s=n.length;t<s;t++){var r=n[t];r.object[r.key]=r.object[r.key].replace(_._rManifestTemplate,i)}};if(e){return this._loadI18n(e).then(i)}else{i(this._loadI18n(e))}}else{return e?Promise.resolve():undefined}},_loadI18n:function(e){var i=this._oRawManifest,t,s="manifest",r=i["sap.app"]&&i["sap.app"]["i18n"]||"i18n/i18n.properties";if(typeof r==="string"){t=new n(r);return a.create({url:this.resolveUri(t,s),async:e})}else if(typeof r==="object"){r=JSON.parse(JSON.stringify(r));s=r.bundleUrlRelativeTo||s;m._processResourceConfiguration(r,{alreadyResolvedOnRoot:false,baseURI:this._oBaseUri,manifestBaseURI:this._oManifestBaseUri,relativeTo:s});var o=Object.assign({activeTerminologies:this._activeTerminologies,async:e},r);return a.create(o)}},getJson:function(){return this._oManifest},getRawJson:function(){return this._oRawManifest},getEntry:function(e){if(!e||e.indexOf(".")<=0){s.warning("[FUTURE FATAL] Manifest entries with keys without namespace prefix can not be read via getEntry. Key: "+e+", Component: "+this.getComponentName());return null}var n=this.getJson();var i=g(n,e);if(e&&e[0]!=="/"&&!c(i)){s.warning("[FUTURE FATAL] Manifest entry with key '"+e+"' must be an object. Component: "+this.getComponentName());return null}return i},checkUI5Version:function(){var e=this.getEntry("/sap.ui5/dependencies/minUI5Version");if(e&&s.isLoggable(s.Level.WARNING)&&d.isDebugModeEnabled()){i.load().then(function(n){var i=v(e);var t=v(n&&n.version);if(i.compareTo(t)>0){s.warning('Component "'+this.getComponentName()+'" requires at least version "'+i.toString()+'" but running on "'+t.toString()+'"!')}}.bind(this),function(e){s.warning('The validation of the version for Component "'+this.getComponentName()+'" failed! Reason: '+e)}.bind(this))}},_loadIncludes:function(e){var n=this.getEntry("/sap.ui5/resources"),i;if(!n){return}var t=this.getComponentName();var a=n["js"];if(a){var o=function(e){return function(){return new Promise(function(n,i){sap.ui.require([e],n,i)})}};i=Promise.resolve();for(var u=0;u<a.length;u++){var c=a[u];var f=c.uri;if(f){var l=f.match(/\.js$/i);if(l){var p=t.replace(/\./g,"/")+(f.slice(0,1)==="/"?"":"/")+f.slice(0,l.index);s.info('Component "'+t+'" is loading JS: "'+p+'"');if(e){i=i.then(o(p))}else{sap.ui.requireSync(p)}}}}}var d=n["css"];if(d){for(var h=0;h<d.length;h++){var m=d[h];if(m.uri){var v=this.resolveUri(m.uri);s.info('Component "'+t+'" is loading CSS: "'+v+'"');r(v,{id:m.id,"data-sap-ui-manifest-uid":this._uid})}}}return i},removeIncludes:function(){var e=this.getEntry("/sap.ui5/resources");if(!e){return}var n=this.getComponentName();var i=e["css"];if(i){var t=document.querySelectorAll("link[data-sap-ui-manifest-uid='"+this._uid+"']");for(var r=0;r<t.length;r++){var a=t[r];s.info('Component "'+n+'" is removing CSS: "'+a.href+'"');a.parentNode.removeChild(a)}}},_loadDependencies:function(e){var n=[];var i=this.getEntry("/sap.ui5/dependencies"),t=this.getComponentName();if(i){var r=i["libs"];if(r){for(var a in r){if(!r[a].lazy){s.info('Component "'+t+'" is loading library: "'+a+'"');n.push(h._load(a,{sync:!e}))}}}var o=i["components"];var u=[];if(o){for(var c in o){if(!o[c].lazy){u.push(c)}}}if(e){var f=new Promise(function(e,n){sap.ui.require(["sap/ui/core/Component"],function(n){e(n)},n)}).then(function(e){return Promise.all(u.map(function(n){return e.load({name:n,manifest:false})}))});n.push(f)}else{u.forEach(function(e){var n=e.replace(/\./g,"/")+"/Component";var i=sap.ui.loader._.getModuleState(n+".js");if(i===-1){sap.ui.requireSync(n)}else if(i===0){s.info('Component "'+t+'" is loading component: "'+e+'.Component"');sap.ui.requireSync("sap/ui/core/Component");sap.ui.component.load({name:e})}})}}return Promise.all(n)},defineResourceRoots:function(){var e=this.getEntry("/sap.ui5/resourceRoots");if(e){for(var i in e){var t=e[i];var r=new n(t);if(r.is("absolute")||r.path()&&r.path()[0]==="/"){s.error('[FUTURE FATAL] Resource root for "'+i+'" is absolute and therefore won\'t be registered! "'+t+'"',this.getComponentName());continue}t=this.resolveUri(t);var a={};a[i.replace(/\./g,"/")]=t;sap.ui.loader.config({paths:a})}}},getComponentName:function(){var e=this.getRawJson();return this._sComponentName||g(e,"/sap.ui5/componentName")||g(e,"/sap.app/id")},resolveUri:function(e,n){var i=n==="manifest"?this._oManifestBaseUri:this._oBaseUri;var t=m._resolveUri(e,i);return t&&t.toString()},_preprocess:function(e){_.processObject(this._oManifest,function(n,i,t){if(e.resolveUI5Urls&&t.startsWith("ui5:")){n[i]=f.resolveUI5Url(t)}else if(e.i18nProperties&&t.match(_._rManifestTemplate)){e.i18nProperties.push({object:n,key:i})}})},init:function(e){if(this._iInstanceCount===0){this.loadDependenciesAndIncludes()}this._iInstanceCount++},loadDependenciesAndIncludes:function(e){if(this._pDependenciesAndIncludes){return this._pDependenciesAndIncludes}this.checkUI5Version();this.defineResourceRoots();this._preprocess({resolveUI5Urls:true});this._pDependenciesAndIncludes=Promise.all([this._loadDependencies(e),this._loadIncludes(e)]);return this._pDependenciesAndIncludes},exit:function(e){var n=Math.max(this._iInstanceCount-1,0);if(n===0){this.removeIncludes();delete this._pDependenciesAndIncludes}this._iInstanceCount=n}});_._rManifestTemplate=/\{\{([^\}\}]+)\}\}/g;_.load=function(e){var i=e&&e.manifestUrl,t=e&&e.componentName,r=e&&e.async,a=e&&e.failOnError,o=e&&e.processJson;var u=new n(i);if(!u.hasQuery("sap-language")){var c=p.getSAPLogonLanguage();if(c){u.addQuery("sap-language",c)}}if(!u.hasQuery("sap-client")){var c=l.get({name:"sapClient",type:l.Type.String,external:true});if(c){u.addQuery("sap-client",c)}}i=u.toString();s.info("Loading manifest via URL: "+i);if(!r){s.warning("Synchronous loading of manifest, due to Manifest.load() call for '"+i+"'. Use parameter 'async' true to avoid this.","SyncXHR",null,function(){return{type:"SyncXHR",name:"Manifest"}})}var d=f.loadResource({url:i,dataType:"json",async:typeof r!=="undefined"?r:false,headers:{"Accept-Language":p.getLanguageTag()},failOnError:typeof a!=="undefined"?a:true});var h={componentName:t,url:i,process:false};if(e.activeTerminologies){h["activeTerminologies"]=e.activeTerminologies}if(r){return d.then(function(e){if(o&&e){return o(e)}else{return e}}).then(function(e){if(!e){h._bLoadManifestRequestFailed=true}return new _(e,h)})}return new _(d,h)};_.processObject=function(e,n){for(var i in e){if(!Object.hasOwn(e,i)){continue}var t=e[i];switch(typeof t){case"object":if(t){_.processObject(t,n)}break;case"string":n(e,i,t);break;default:}}};return _});
//# sourceMappingURL=Manifest.js.map