/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Metadata","sap/base/util/merge","sap/ui/core/mvc/OverrideExecution","sap/base/future"],function(t,e,i,r){"use strict";var o=function(e,i){t.apply(this,arguments);if(this.isA("sap.ui.core.mvc.ControllerExtension")&&this.getParent().getClass().override){this.getClass().override=this.getParent().getClass().override}};o.prototype=Object.create(t.prototype);o.prototype.constructor=o;o.prototype.applySettings=function(o){if(o.overrides||o.override){this._override=o.overrides||o.override;delete o.override;delete o.overrides}t.prototype.applySettings.call(this,o);var s=o.metadata;this._defaultLifecycleMethodMetadata={onInit:{public:true,final:false,overrideExecution:i.After},onExit:{public:true,final:false,overrideExecution:i.Before},onBeforeRendering:{public:true,final:false,overrideExecution:i.Before},onAfterRendering:{public:true,final:false,overrideExecution:i.After}};var a=this.isA("sap.ui.core.mvc.ControllerExtension");var n=/^_/;var h=this._oParent.isA("sap.ui.core.mvc.Controller");var d=o.metadata&&o.metadata.methods?true:false;if(!a){if(h&&!d){n=/^_|^on|^init$|^exit$/}if(h&&d){e(s.methods,this._defaultLifecycleMethodMetadata)}}if(a||d){this._aPublicMethods=[]}this._mMethods=s.methods||{};for(var l in o){if(l!=="metadata"&&l!=="constructor"){if(!l.match(n)){if(h&&this._oParent&&this._oParent.isMethodFinal(l)){r.errorThrows("Method: '"+l+"' of controller '"+this._oParent.getName()+"' is final and cannot be overridden by controller '"+this.getName()+"'");delete this._oClass.prototype[l]}if(!(l in this._mMethods)&&typeof o[l]==="function"){if(!(o[l].getMetadata&&o[l].getMetadata().isA("sap.ui.core.mvc.ControllerExtension"))){this._mMethods[l]={public:true,final:false}}}}}}for(var c in this._mMethods){if(this.isMethodPublic(c)){this._aPublicMethods.push(c)}}};o.prototype.afterApplySettings=function(){t.prototype.afterApplySettings.call(this);var i=this.isA("sap.ui.core.mvc.ControllerExtension");if(this._oParent){var r=this._oParent._mMethods?this._oParent._mMethods:{};for(var o in r){if(this._mMethods[o]&&!i){var s=this._mMethods[o].public;this._mMethods[o]=e({},r[o]);if(s!==undefined){this._mMethods[o].public=s}if(!this.isMethodPublic(o)&&this._mMethods[o].public!==r[o].public){this._aAllPublicMethods.splice(this._aAllPublicMethods.indexOf(o),1)}}else{this._mMethods[o]=r[o]}}}if(this._oParent&&this._oParent.isA("sap.ui.core.mvc.ControllerExtension")){this._bFinal=true}};o.prototype.getNamespace=function(){var t=this._sClassName.indexOf("anonymousExtension~")==0;var e=t?this._oParent._sClassName:this._sClassName;return e.substr(0,e.lastIndexOf("."))};o.prototype.isMethodFinal=function(t){var e=this._mMethods[t];return e&&e.final};o.prototype.isMethodPublic=function(t){var e=this._mMethods[t];return e&&e.public};o.prototype.getAllMethods=function(){return this._mMethods};o.prototype.getOverrideExecution=function(t){var e=this._mMethods[t];var r=i.Instead;if(e){r=e.overrideExecution}return r};o.prototype.getOverrides=function(){return this._override};o.prototype.getStaticOverrides=function(){return this._staticOverride};o.prototype.hasOverrides=function(){return!!this._override||!!this._staticOverride};o.prototype.getLifecycleConfiguration=function(){return this._defaultLifecycleMethodMetadata};return o});
//# sourceMappingURL=ControllerMetadata.js.map