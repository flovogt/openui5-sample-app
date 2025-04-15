/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Text","sap/ui/Device","./FeedContentRenderer","sap/ui/events/KeyCodes"],function(t,e,i,n,o,s){"use strict";var r=t.Size;var a=e.extend("sap.m.FeedContent",{metadata:{library:"sap.m",properties:{size:{type:"sap.m.Size",group:"Misc",defaultValue:r.Auto,deprecated:true},contentText:{type:"string",group:"Misc",defaultValue:null},subheader:{type:"string",group:"Misc",defaultValue:null},value:{type:"string",group:"Misc",defaultValue:null},valueColor:{type:"sap.m.ValueColor",group:"Misc",defaultValue:null},truncateValueTo:{type:"int",group:"Misc",defaultValue:4}},defaultAggregation:"_contentTextAgr",aggregations:{_contentTextAgr:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{press:{}}},renderer:o});a.prototype.init=function(){this._oContentText=new i(this.getId()+"-content-text",{maxLines:2});this._oContentText.cacheLineHeight=false;this.setAggregation("_contentTextAgr",this._oContentText,true);this.setTooltip("{AltText}")};a.prototype.onBeforeRendering=function(){this.$().off("mouseenter");this.$().off("mouseleave")};a.prototype.onAfterRendering=function(){this.$().on("mouseenter",this._addTooltip.bind(this));this.$().on("mouseleave",this._removeTooltip.bind(this))};a.prototype.exit=function(){this._oContentText=null};a.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};a.prototype._removeTooltip=function(){this.$().attr("title",null)};a.prototype.getAltText=function(){var t="";var e=true;if(this.getAggregation("_contentTextAgr").getText()){t+=this.getAggregation("_contentTextAgr").getText();e=false}if(this.getSubheader()){if(e){t+=""+this.getSubheader()}else{t+="\n"+this.getSubheader()}e=false}if(this.getValue()){if(e){t+=""+this.getValue()}else{t+="\n"+this.getValue()}}return t};a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var e=this.getAltText();if(typeof t==="string"||t instanceof String){e=t.split("{AltText}").join(e).split("((AltText))").join(e);return e}if(t){return t}else{return""}};a.prototype.setContentText=function(t){this._oContentText.setText(t);return this};a.prototype.ontap=function(t){if(n.browser.msie){this.$().trigger("focus")}this.firePress()};a.prototype.onkeydown=function(t){if(t.which===s.ENTER||t.which===s.SPACE){this.firePress();t.preventDefault()}};a.prototype.attachEvent=function(t,i,n,o){e.prototype.attachEvent.call(this,t,i,n,o);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer")}return this};a.prototype.detachEvent=function(t,i,n){e.prototype.detachEvent.call(this,t,i,n);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer")}return this};return a});
//# sourceMappingURL=FeedContent.js.map