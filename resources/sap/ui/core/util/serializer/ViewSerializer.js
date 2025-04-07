/*
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./HTMLViewSerializer","./XMLViewSerializer","sap/base/assert","sap/ui/base/DesignTime"],function(e,i,t,r,s){"use strict";var o=e.extend("sap.ui.core.util.serializer.ViewSerializer",{constructor:function(i,t,r){e.apply(this);this._oRootControl=i;this._oWindow=t||globalThis;this._mViews={};this._sDefaultXmlNamespace=r}});o.prototype.serializeToXML=function(){return this.serialize("XML")};o.prototype.serializeToHTML=function(){return this.serialize("HTML")};o.prototype.serialize=function(e){this._mViews={};this._sConvertToViewType=e||undefined;return this._serializeRecursive(this._oRootControl)};o.prototype._getViewType=function(e){if(!this._sConvertToViewType){if(e?.isA?.("sap.ui.core.mvc.HTMLView")){return"HTML"}if(e?.isA?.("sap.ui.core.mvc.XMLView")){return"XML"}}return this._sConvertToViewType};o.prototype._serializeRecursive=function(e){r(typeof e!=="undefined","The control must not be undefined");var i=this._oWindow.sap.ui.require("sap/ui/core/UIArea");var t=this._oWindow.sap.ui.require("sap/ui/core/ComponentContainer");if(e?.isA?.("sap.ui.core.mvc.View")){var s=this._getViewSerializer(e,this._getViewType(e));if(s){var o=e.getViewName()||e.getControllerName();if(!this._mViews[o]){this._mViews[o]=s.serialize(this._getViewType(e))}}}if(e.getMetadata().getClass()===i){var n=e.getContent();for(var a=0;a<n.length;a++){this._serializeRecursive(n[a])}}else if(e.getMetadata().getClass()===t){this._serializeRecursive(e.getComponentInstance().getRootControl())}else{var u=e.getMetadata().getAllAggregations();if(u){for(var l in u){var p=u[l];var c=e[p._sGetter]();if(c&&c.length){for(var a=0;a<c.length;a++){var f=c[a];if(f?.isA?.("sap.ui.core.Element")){this._serializeRecursive(f)}}}else if(c?.isA?.("sap.ui.core.Element")){this._serializeRecursive(c)}}}}return this._mViews};o.prototype._getViewSerializer=function(e,r){var o=function(i){if(i.fFunction&&i.fFunction._sapui_handlerName){var t=i.fFunction._sapui_handlerName;var r=e.getController();if(r[t]||s.isControllerCodeDeactivated()){return t}}};var n=function(i){if(i._sapui_controlId){return i._sapui_controlId}return i.getId().replace(e.createId(""),"")};if(r==="HTML"){return new i(e,this._oWindow,n,o)}if(r==="XML"){return new t(e,this._oWindow,this._sDefaultXmlNamespace,n,o)}else{var a=e?e.constructor:"?";throw Error("View type '"+a+"' is not supported for conversion. Only HTML and XML is supported")}};return o});
//# sourceMappingURL=ViewSerializer.js.map