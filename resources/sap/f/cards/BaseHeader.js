/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IntervalTrigger","sap/ui/core/Lib","sap/ui/core/format/DateFormat","sap/ui/core/date/UniversalDate","sap/ui/core/library","sap/ui/events/KeyCodes","sap/m/library","sap/m/Text","sap/f/cards/util/addTooltipIfTruncated"],function(e,t,i,a,s,r,o,n,p,l){"use strict";const u=6e4;const d=i.getResourceBundleFor("sap.f");const m=r.TextAlign;const g=n.WrappingType;var f=e.extend("sap.f.cards.BaseHeader",{metadata:{library:"sap.f",interfaces:["sap.m.IBar"],abstract:true,properties:{dataTimestamp:{type:"string",defaultValue:""},statusVisible:{type:"boolean",defaultValue:true},dataTimestampUpdating:{type:"boolean",defaultValue:false,visibility:"hidden"},focusable:{type:"boolean",defaultValue:true,visibility:"hidden"},useTileLayout:{type:"boolean",group:"Appearance",visibility:"hidden"},headingLevel:{type:"string",visibility:"hidden",defaultValue:"3"},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:g.Normal},useTooltips:{type:"boolean",visibility:"hidden",defaultValue:false},href:{type:"string"},target:{type:"string"}},aggregations:{_dataTimestamp:{type:"sap.m.Text",multiple:false,visibility:"hidden"},toolbar:{type:"sap.ui.core.Control",multiple:false},_error:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},bannerLines:{type:"sap.m.Text",group:"Appearance",multiple:true}},events:{press:{}}}});f.prototype._setRootAccessibilityRole=function(){};f.prototype._setRootAriaLevel=function(){};f.prototype._applyContextClassFor=function(){};f.prototype.init=function(){this._oRb=i.getResourceBundleFor("sap.f");this._oToolbarDelegate={onfocusin:this._onToolbarFocusin,onfocusout:this._onToolbarFocusout,onAfterRendering:this._addMarginToHeaderText}};f.prototype.exit=function(){this._removeTimestampListener();if(this._oToolbarDelegate){this._oToolbarDelegate=null}this._oRb=null};f.prototype.onBeforeRendering=function(){var e=this.getToolbar(),t=this.getBannerLines();if(e){e.addStyleClass("sapFCardHeaderToolbar");e.removeEventDelegate(this._oToolbarDelegate,this);if(e.updateVisibility){e.updateVisibility()}}if(t){t.forEach(e=>{e.setTextAlign(m.End);e.setWrapping(false)})}};f.prototype.onAfterRendering=function(){var e=this.getToolbar();if(e){e.addEventDelegate(this._oToolbarDelegate,this)}this._addMarginToHeaderText();this.getBannerLines()?.forEach(e=>{this._enhanceText(e)})};f.prototype.getFocusDomRef=function(){return this.getDomRef("focusable")};f.prototype.getTitleId=function(){return null};f.prototype.isLink=function(){return!!this.getHref()};f.prototype.onkeydown=function(e){if(e.key!=="Enter"&&e.keyCode!==o.ENTER){return}if(!this._hasModifierKeys(e)){this._handleTap(e)}};f.prototype.onkeyup=function(e){if(e.key!==" "&&e.keyCode!==o.SPACE){return}if(!this._hasModifierKeys(e)){this._handleTap(e)}};f.prototype.ontap=function(e){if(this.isLink()&&e.ctrlKey){return}this._handleTap(e)};f.prototype._handleTap=function(e){if(!e.target.closest(".sapFCardSectionClickable")||!this.isInteractive()||this._isInsideToolbar(e.target)){return}this.firePress({originalEvent:e});e.preventDefault();e.stopPropagation()};f.prototype._onToolbarFocusin=function(){this.addStyleClass("sapFCardHeaderToolbarFocused")};f.prototype._onToolbarFocusout=function(){this.removeStyleClass("sapFCardHeaderToolbarFocused")};f.prototype._addMarginToHeaderText=function(){const e=this.getToolbar();const t=this.getDomRef().getElementsByClassName("sapFCardHeaderText")[0];if(t&&e){if(e.getVisible()){t.style.marginInlineEnd=e.getDomRef().offsetWidth+"px"}else{t.style.marginInlineEnd=0}}};f.prototype.setDataTimestamp=function(e){var t=this.getDataTimestamp();if(t&&!e){this.destroyAggregation("_dataTimestamp");this._removeTimestampListener()}this.setProperty("dataTimestamp",e);if(e){this._updateDataTimestamp();this._addTimestampListener()}return this};f.prototype.setDataTimestampUpdating=function(e){var t=this._createDataTimestamp();this.setProperty("dataTimestampUpdating",e);if(e){t.setText("updating...");t.addStyleClass("sapFCardDataTimestampUpdating");this._removeTimestampListener()}else{t.removeStyleClass("sapFCardDataTimestampUpdating")}return this};f.prototype._createDataTimestamp=function(){var e=this.getAggregation("_dataTimestamp");if(!e){e=new p({id:this.getId()+"-dataTimestamp",wrapping:false,textAlign:"End"});e.addStyleClass("sapFCardDataTimestamp");this.setAggregation("_dataTimestamp",e)}return e};f.prototype._updateDataTimestamp=function(){var e=this._createDataTimestamp(),t=this.getDataTimestamp(),i,r,o;if(!t){e.setText("");return}i=a.getDateTimeInstance({relative:true});r=new s(t);o=i.format(r);if(r.getTime()+59e3>Date.now()){o=d.getText("CARD_HEADER_DATETIMESTAMP_NOW")}e.setText(o);e.removeStyleClass("sapFCardDataTimestampUpdating")};f.prototype._addTimestampListener=function(){f.getTimestampIntervalTrigger().addListener(this._updateDataTimestamp,this);this._bHasTimestampListener=true};f.prototype._removeTimestampListener=function(){if(!this._bHasTimestampListener){return}f.getTimestampIntervalTrigger().removeListener(this._updateDataTimestamp,this);this._bHasTimestampListener=false};f.getTimestampIntervalTrigger=function(){if(!f._oTimestampIntervalTrigger){f._oTimestampIntervalTrigger=new t(u)}return f._oTimestampIntervalTrigger};f.prototype.getTitleAriaRole=function(){return"heading"};f.prototype.getFocusableElementAriaRole=function(){if(this.isLink()){return"link"}return this.hasListeners("press")?"button":"group"};f.prototype.getAriaHeadingLevel=function(){return this.getProperty("headingLevel")};f.prototype.getAriaRoleDescription=function(){return this.hasListeners("press")?this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER"):this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER")};f.prototype._getBannerLinesIds=function(){return this.getBannerLines().map(e=>e.getId()).join(" ")};f.prototype.isInteractive=function(){return this.hasListeners("press")};f.prototype.isFocusable=function(){if(!this.getProperty("focusable")){return false}const e=this.getParent();if(e&&e.isA("sap.f.CardBase")&&e.isRoleListItem()){return this.isInteractive()}return true};f.prototype._isInsideToolbar=function(e){var t=this.getToolbar();return t&&t.getDomRef()&&t.getDomRef().contains(e)};f.prototype._enhanceText=function(e){if(this.getProperty("useTooltips")){l(e)}};f.prototype._hasModifierKeys=function(e){return e.shiftKey||e.altKey||e.ctrlKey||e.metaKey};return f});
//# sourceMappingURL=BaseHeader.js.map