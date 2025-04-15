/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/core/Element","sap/ui/core/library","./TitleRenderer","sap/m/HyphenationSupport"],function(e,t,i,a,r,n){"use strict";var l=a.TextDirection;var p=a.TextAlign;var o=a.TitleLevel;var s=t.WrappingType;var u=e.extend("sap.m.Title",{metadata:{library:"sap.m",interfaces:["sap.ui.core.IShrinkable","sap.m.IHyphenation","sap.m.IToolbarInteractiveControl"],properties:{text:{type:"string",group:"Appearance",defaultValue:null},level:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:o.Auto},titleStyle:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:o.Auto},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:p.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:l.Inherit},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:s.Normal}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.ITitleContent",multiple:false}},associations:{title:{type:"sap.ui.core.Title",multiple:false}},designtime:"sap/m/designtime/Title.designtime"},renderer:r});u.prototype._getTitle=function(){var e=this.getTitle();if(e){var t=i.getElementById(e);if(t&&t.isA("sap.ui.core.Title")){return t}}return null};u.prototype._onTitleChanged=function(){this.invalidate()};u.prototype.setTitle=function(e){var t=this;var i=this._getTitle();if(i){i.invalidate=i.__sapui5_title_originvalidate;i.exit=i.__sapui5_title_origexit;delete i.__sapui5_title_origexit;delete i.__sapui5_title_originvalidate}this.setAssociation("title",e);var a=this._getTitle();if(a){a.__sapui5_title_originvalidate=a.invalidate;a.__sapui5_title_origexit=a.exit;a.exit=function(){t._onTitleChanged();if(this.__sapui5_title_origexit){this.__sapui5_title_origexit.apply(this,arguments)}};a.invalidate=function(){t._onTitleChanged();this.__sapui5_title_originvalidate.apply(this,arguments)}}return this};u.prototype.getAccessibilityInfo=function(){var e=this._getTitle()||this;return{role:"heading",description:e.getText(),focusable:false}};u.prototype.getTextsToBeHyphenated=function(){var e=this._getTitle();return{main:e?e.getText():this.getText()}};u.prototype.getDomRefsForHyphenatedTexts=function(){var e;if(!this._getTitle()){e={main:this.getDomRef("inner")}}return e};u.prototype._getAriaLevel=function(){var e=2,t=1;if(this.getTitleStyle()!==o.Auto){e=parseInt(this.getTitleStyle()[t])}return e};u.prototype._getToolbarInteractive=function(){return false};n.mixInto(u.prototype);return u});
//# sourceMappingURL=Title.js.map