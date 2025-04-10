/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/i18n/ResourceBundle","sap/ui/base/SyncPromise","sap/ui/core/Supportability","sap/ui/model/BindingMode","sap/ui/model/Model","./ResourcePropertyBinding"],function(e,n,t,i,o,r,s){"use strict";var a="sap.ui.model.resource.ResourceModel",u=/^(?:\/|\.)*/;var c=r.extend("sap.ui.model.resource.ResourceModel",{constructor:function(t){var i;r.apply(this,arguments);this.aCustomBundles=[];this.bReenhance=false;this.bAsync=!!(t&&t.async);if(!this.bAsync){e.warning("Usage of synchronous loading is deprecated. For performance reasons, asynchronous loading"+" is strongly recommended.",undefined,a)}this.sDefaultBindingMode=t.defaultBindingMode||o.OneWay;this.mSupportedBindingModes={OneWay:true,TwoWay:false,OneTime:!this.bAsync};if(this.bAsync&&this.sDefaultBindingMode==o.OneTime){e.warning("Using binding mode OneTime for asynchronous ResourceModel is not supported!")}this.oData=Object.assign({},t);i=Array.isArray(this.oData.enhanceWith)&&this.oData.enhanceWith.some(function(e){return e instanceof n});if(t&&t.bundle){this._oResourceBundle=t.bundle;i=true}else if(t&&(t.bundleUrl||t.bundleName)){if(i){delete this.oData.enhanceWith;if(t.terminologies||t.activeTerminologies){throw new Error("'terminologies' parameter and 'activeTerminologies' parameter are not"+" supported in configuration when enhanceWith contains ResourceBundles")}}l(this)}else{throw new Error("At least bundle, bundleName or bundleUrl must be provided!")}if(i&&Array.isArray(t.enhanceWith)){if(this.bAsync){this._pEnhanced=t.enhanceWith.reduce(function(e,n){return e.then(this.enhance.bind(this,n))}.bind(this),Promise.resolve())}else{t.enhanceWith.forEach(this.enhance.bind(this))}}}});c._sanitizeBundleName=function(n){if(n&&(n[0]==="/"||n[0]===".")){e.error('Incorrect resource bundle name "'+n+'"',"Leading slashes or dots in resource bundle names are ignored, since such names are"+' invalid UI5 module names. Please check whether the resource bundle "'+n+'" is actually needed by your application.',a);n=n.replace(u,"")}return n};c.loadResourceBundle=function(e,t){var o=e.bundleLocale,r;e.bundleName=c._sanitizeBundleName(e.bundleName);r=Object.assign({async:t,includeInfo:i.collectOriginInfo(),locale:o},e);return n.create(r)};c.prototype.enhance=function(e){var t=this,i,o=this.bAsync?new Promise(function(e){i=e}):null;function r(){if(e instanceof n){t._oResourceBundle._enhance(e);t.checkUpdate(true);if(o){i(true)}}else{if(e.terminologies){throw new Error("'terminologies' parameter is not"+" supported for enhancement")}var r=c.loadResourceBundle(e,t.bAsync);if(r instanceof Promise){r.then(function(e){t._oResourceBundle._enhance(e);t.checkUpdate(true);i(true)},function(){i(true)})}else if(r){t._oResourceBundle._enhance(r);t.checkUpdate(true)}}}if(this._oPromise){Promise.resolve(this._oPromise).then(r)}else{r()}if(!this.bReenhance){this.aCustomBundles.push(e)}return o};c.prototype.bindProperty=function(e){return new s(this,e)};c.prototype.getProperty=function(e){return this._oResourceBundle?this._oResourceBundle.getText(e):null};c.prototype.getResourceBundle=function(){if(!this.bAsync){return this._oResourceBundle}else{var e=this._oPromise;if(e){return new Promise(function(n,t){function i(e){n(e)}e.then(i,i)})}else{return Promise.resolve(this._oResourceBundle)}}};c.prototype._handleLocalizationChange=function(){var i=this;t.resolve(this.getResourceBundle()).then(function(e){var o;if(i.bAsync){o={url:n._getUrl(i.oData.bundleUrl,c._sanitizeBundleName(i.oData.bundleName)),async:true};i.fireRequestSent(o)}var r=e._recreate();if(r instanceof Promise){i._oPromise=r}return t.resolve(r).then(function(e){i._oResourceBundle=e;i._reenhance();delete i._oPromise;i.checkUpdate(true)}).finally(function(){if(i.bAsync){i.fireRequestCompleted(o)}})}).catch(function(n){e.error("Failed to reload bundles after localization change",n,a)})};c.prototype._reenhance=function(){this.bReenhance=true;this.aCustomBundles.forEach(function(e){this.enhance(e)}.bind(this));this.bReenhance=false};function l(e){var t=e.oData;if(t&&(t.bundleUrl||t.bundleName)){var i=c.loadResourceBundle(t,t.async);if(i instanceof Promise){var o={url:n._getUrl(t.bundleUrl,c._sanitizeBundleName(t.bundleName)),async:true};e.fireRequestSent(o);e._oPromise=i;e._oPromise.then(function(n){e._oResourceBundle=n;e._reenhance();delete e._oPromise;e.checkUpdate(true);e.fireRequestCompleted(o)})}else{e._oResourceBundle=i;e._reenhance();e.checkUpdate(true)}}}return c});
//# sourceMappingURL=ResourceModel.js.map