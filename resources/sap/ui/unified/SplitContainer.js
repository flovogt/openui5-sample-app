/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Control","sap/ui/core/theming/Parameters","./library","sap/ui/core/library","./SplitContainerRenderer","sap/base/Log"],function(t,e,n,o,r,i,a){"use strict";var s=r.Orientation;var d=e.extend("sap.ui.unified.SplitContainer",{metadata:{library:"sap.ui.unified",deprecated:true,properties:{showSecondaryContent:{type:"boolean",group:"Appearance",defaultValue:null},secondaryContentSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"250px"},secondaryContentWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"250px",deprecated:true},orientation:{type:"sap.ui.core.Orientation",group:"Appearance",defaultValue:s.Horizontal}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},secondaryContent:{type:"sap.ui.core.Control",multiple:true,singularName:"secondaryContent"}}},renderer:i});(function(e){d.prototype.init=function(){this.bRtl=t.getRTL();this._paneRenderer=new o._ContentRenderer(this,this.getId()+"-panecntnt","secondaryContent");this._canvasRenderer=new o._ContentRenderer(this,this.getId()+"-canvascntnt","content");this._moveContent=true};d.prototype.exit=function(){this._paneRenderer.destroy();delete this._paneRenderer;this._canvasRenderer.destroy();delete this._canvasRenderer;if(this._closeContentDelayId){clearTimeout(this._closeContentDelayId);delete this._closeContentDelayId}delete this._contentContainer;delete this._secondaryContentContainer};d.prototype.onAfterRendering=function(){this.bRtl=t.getRTL();this._contentContainer=this.$("canvas");this._secondaryContentContainer=this.$("pane");this._applySecondaryContentSize()};d.prototype._applySecondaryContentSize=function(){if(this.getDomRef()){var t=this.getOrientation()==s.Vertical;var e,o;var r,i;var a=this.getSecondaryContentSize();var d=this.getShowSecondaryContent();if(t){e="height";o="width";r="top";i=this.bRtl?"right":"left"}else{e="width";o="height";r=this.bRtl?"right":"left";i="top"}if(this._closeContentDelayId){clearTimeout(this._closeContentDelayId);delete this._closeContentDelayId}this._secondaryContentContainer.css(e,a);this._secondaryContentContainer.css(o,"");this._secondaryContentContainer.css(r,d?"0":"-"+a);this._secondaryContentContainer.css(i,"");if(this._moveContent){this._contentContainer.css(r,d?a:"0")}else{this._contentContainer.css(r,"0")}if(!d){var c=parseInt(n.get("_sap_ui_unified_SplitContainer_AnimationDuration"));this._closeContentDelayId=setTimeout(function(){this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",true)}.bind(this),c)}else{this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",false)}}};d.prototype._mod=function(t,e){var n=!!this.getDomRef();var o=t.apply(this,[n]);if(n&&e){e.render()}return o};d.prototype.setShowSecondaryContent=function(t){var e=this.getDomRef();this.setProperty("showSecondaryContent",!!t,e);this._applySecondaryContentSize();return this};d.prototype.setSecondaryContentSize=function(t){this.setProperty("secondaryContentSize",t,true);this._applySecondaryContentSize();return this};d.prototype.getSecondaryContentWidth=function(){a.warning('SplitContainer: Use of deprecated property "SecondaryContentWidth", please use '+'"SecondaryContentSize" instead.');return this.getSecondaryContentSize.apply(this,arguments)};d.prototype.setSecondaryContentWidth=function(){a.warning('SplitContainer: Use of deprecated property "SecondaryContentWidth", please use '+'"SecondaryContentSize" instead.');return this.setSecondaryContentSize.apply(this,arguments)};d.prototype.insertContent=function(t,e){return this._mod(function(n){return this.insertAggregation("content",t,e,n)},this._canvasRenderer)};d.prototype.addContent=function(t){return this._mod(function(e){return this.addAggregation("content",t,e)},this._canvasRenderer)};d.prototype.removeContent=function(t){return this._mod(function(e){return this.removeAggregation("content",t,e)},this._canvasRenderer)};d.prototype.removeAllContent=function(){return this._mod(function(t){return this.removeAllAggregation("content",t)},this._canvasRenderer)};d.prototype.destroyContent=function(){return this._mod(function(t){return this.destroyAggregation("content",t)},this._canvasRenderer)};d.prototype.insertSecondaryContent=function(t,e){return this._mod(function(n){return this.insertAggregation("secondaryContent",t,e,n)},this._paneRenderer)};d.prototype.addSecondaryContent=function(t){return this._mod(function(e){return this.addAggregation("secondaryContent",t,e)},this._paneRenderer)};d.prototype.removeSecondaryContent=function(t){return this._mod(function(e){return this.removeAggregation("secondaryContent",t,e)},this._paneRenderer)};d.prototype.removeAllSecondaryContent=function(){return this._mod(function(t){return this.removeAllAggregation("secondaryContent",t)},this._paneRenderer)};d.prototype.destroySecondaryContent=function(){return this._mod(function(t){return this.destroyAggregation("secondaryContent",t)},this._paneRenderer)}})(window);return d});
//# sourceMappingURL=SplitContainer.js.map