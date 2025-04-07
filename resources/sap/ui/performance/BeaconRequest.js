/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=function(e){e=e||{};if(!t.isSupported()){throw Error("Beacon API is not supported")}if(typeof e.url!=="string"){throw Error("Beacon url must be valid")}this._nMaxBufferLength=e.maxBufferLength||10;this._aBuffer=[];this._sUrl=e.url;document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){this.send()}}.bind(this))};t.isSupported=function(){return"navigator"in window&&"sendBeacon"in window.navigator&&"Blob"in window};t.prototype.append=function(t,e){this._aBuffer.push({key:t,value:e});if(this.getBufferLength()===this._nMaxBufferLength){this.send()}};t.prototype.getBufferLength=function(){return this._aBuffer.length};t.prototype.send=function(){if(this.getBufferLength()){var t=this._aBuffer.reduce(function(t,e){t+="&"+e.key+"="+e.value;return t},"sap-fesr-only=1");var e=new Blob([t],{type:"application/x-www-form-urlencoded;charset=UTF-8"});window.navigator.sendBeacon(this._sUrl,e);this.clear()}};t.prototype.clear=function(){this._aBuffer=[]};return t});
//# sourceMappingURL=BeaconRequest.js.map