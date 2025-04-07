/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Page"],function(t,e){"use strict";var i=t.extend("sap.m.p13n.AbstractContainer",{metadata:{library:"sap.m",defaultAggregation:"views",properties:{defaultView:{type:"string"}},aggregations:{header:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-AbstractContainer",aggregation:"customHeader",forwardBinding:true}},subHeader:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-AbstractContainer",aggregation:"subHeader",forwardBinding:true}},footer:{type:"sap.m.IBar",multiple:false,forwarding:{idSuffix:"-AbstractContainer",aggregation:"footer",forwardBinding:true}},views:{type:"sap.m.p13n.AbstractContainerItem",multiple:true},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{beforeViewSwitch:{allowPreventDefault:true,parameters:{source:{type:"string"},target:{type:"string"}}},afterViewSwitch:{allowPreventDefault:true,parameters:{source:{type:"string"},target:{type:"string"}}}}},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e);t.style("height","100%");t.openEnd();t.renderControl(e.getAggregation("_content"));t.close("div")}}});i.prototype.init=function(){t.prototype.init.apply(this,arguments);this.addStyleClass("sapMAbstractContainer");this._initializeContent()};i.prototype.applySettings=function(){t.prototype.applySettings.apply(this,arguments);this.switchView(this.getDefaultView());return this};i.prototype._initializeContent=function(){this.oLayout=new e(this.getId()+"-AbstractContainer");this.setAggregation("_content",this.oLayout)};i.prototype.removeView=function(t,e){var i=typeof t=="string"?this.getView(t):t;i=this.removeAggregation("views",i,e);if(i&&i.getKey()===this.getCurrentViewKey()){this.switchView()}return this};i.prototype.addView=function(t){if(t&&t.getContent()&&!t.getContent().hasStyleClass("sapUiMAbstractContainerContent")){t.getContent().addStyleClass("sapUiMAbstractContainerContent")}this.addAggregation("views",t);return this};i.prototype.getCurrentViewKey=function(){return this._sCurrentView?this._sCurrentView:this.getDefaultView()};i.prototype.getCurrentViewContent=function(){return this.getView(this.getCurrentViewKey()).getContent()};i.prototype.switchView=function(t){var e=this.getView(t);if(!e){e=this.getViews()[0];if(!e){return}}if(!this.fireBeforeViewSwitch({source:i,target:t})){this._bPrevented=true;return}this._bPrevented=false;var i=this.getCurrentViewKey();this._sCurrentView=e.getKey();this.oLayout.removeAllContent();this.oLayout.addContent(e.getContent());if(i!==t){this.oAfterRenderingDelegate={onAfterRendering:function(){this.removeEventDelegate(this.oAfterRenderingDelegate);this.fireAfterViewSwitch({source:i,target:t})}.bind(this)};this.addEventDelegate(this.oAfterRenderingDelegate,this)}};i.prototype.getView=function(t){return this.getViews().find(function(e){if(e.getKey()===t||e.getContent()===t){return e}})};i.prototype.getViewMap=function(){return this.getViews().map(function(t){return{key:t.getKey(),content:t.getContent()}})};i.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._sCurrentView=null;this.oResourceBundle=null};return i});
//# sourceMappingURL=AbstractContainer.js.map