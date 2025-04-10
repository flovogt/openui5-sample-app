/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(t){"use strict";var e=t.extend("sap.m.plugins.PluginBase",{metadata:{abstract:true,library:"sap.m",properties:{enabled:{type:"boolean",defaultValue:true}}}});var i={};e.setConfigs=function(t,e){var n=typeof e=="function"?e.getMetadata().getName():e;Object.assign(i[n]=i[n]||{},t)};e.setControlConfig=function(t,e,i){var n={};var a=typeof t=="function"?t.getMetadata().getName():t;n[a]=e;this.setConfigs(n,i)};e.getPlugin=function(t,e){if(e==undefined){e=this.getMetadata().getName()}else if(typeof e=="function"){e=e.getMetadata().getName()}return t.getDependents().filter(function(t){return t.isA(e)})[0]||t.findElements(false,function(t){return t.isA(e)})[0]};e.prototype.getPlugin=function(t){return e.getPlugin(this.getParent(),t)};e.prototype.isActive=function(){return!!this._bActive};e.prototype.getControl=function(){var t=this.getParent();if(t){var e="get"+this.getMetadata().getName().split(".").pop()+"PluginOwner";t=t[e]?t[e](this):t}return t};e.prototype.getConfig=function(e,n,a,r,o){var s=this.getControl();if(!(s instanceof t)){return}var f=this.getMetadata().getName();var u=s.getMetadata().getName();var p=i[f]||{};var c=p[u]||{};var g=function(t){return typeof t[e]=="function"?t[e].call(t,n,a,r,o):t[e]};if(e in c){return g(c)}for(var l in p){if(s.isA(l)){if(!e){return p[l]}if(e in p[l]){return g(p[l])}}}};e.prototype.isApplicable=function(t){return Object.keys(this.getConfig()||{}).length>0};e.prototype.onActivate=function(t){};e.prototype.onDeactivate=function(t){};e.prototype.setParent=function(){this._deactivate();t.prototype.setParent.apply(this,arguments);if(this.getEnabled()){this._activate()}return this};e.prototype.setEnabled=function(t){var e=this.getEnabled();this.setProperty("enabled",t,true);if(this.getEnabled()!=e){if(e){this._deactivate()}else{this._activate()}}return this};e.prototype.setProperty=function(e,i,n){n=n||(this.getMetadata().getProperty(e).appData||{}).invalidate===false;return t.prototype.setProperty.call(this,e,i,n)};e.prototype._activate=function(){if(this._bActive){return}var t=this.getControl();if(!t){return}if(t instanceof Promise){return t.then(this._activate.bind(this))}if(!this.isApplicable(t)){throw new Error(this+" is not applicable to "+t)}this._bActive=true;this.getConfig("onActivate",t,this);this.onActivate(t)};e.prototype._deactivate=function(){if(!this._bActive){return}this._bActive=false;const t=this.getControl();this.getConfig("onDeactivate",t,this);this.onDeactivate(t)};return e});
//# sourceMappingURL=PluginBase.js.map