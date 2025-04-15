/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ControlBehavior","sap/ui/core/Renderer","sap/ui/core/library","sap/ui/core/ValueStateSupport","sap/ui/Device","sap/ui/core/Lib"],function(e,t,n,a,i,s){"use strict";var r=n.TextDirection;var l=n.ValueState;var d={apiVersion:2};d.render=function(n,a){var s=a.getValueState(),d=a.getTextDirection(),o=t.getTextAlign(a.getTextAlign(),d),u=e.isAccessibilityEnabled(),c=a.getAggregation("_beginIcon")||[],g=a.getAggregation("_endIcon")||[],p,f;n.openStart("div",a);this.addOuterStyles(n,a);this.addControlWidth(n,a);n.class("sapMInputBase");this.addPaddingClass(n,a);this.addCursorClass(n,a);this.addOuterClasses(n,a);if(!a.getEnabled()){n.class("sapMInputBaseDisabled")}if(!a.getEditable()){n.class("sapMInputBaseReadonly")}if(s!==l.None&&a.getEditable()&&a.getEnabled()){n.class("sapMInputBaseState")}if(c.length){p=c.filter(function(e){return e.getVisible()});p.length&&n.class("sapMInputBaseHasBeginIcons")}if(g.length){f=g.filter(function(e){return e.getVisible()});f.length&&n.class("sapMInputBaseHasEndIcons")}this.writeOuterAttributes(n,a);var b=a.getTooltip_AsString();if(b){n.attr("title",b)}n.openEnd();n.openStart("div",a.getId()+"-content");n.class("sapMInputBaseContentWrapper");if(!a.getEnabled()){n.class("sapMInputBaseDisabledWrapper")}else if(!a.getEditable()){n.class("sapMInputBaseReadonlyWrapper")}if(s!==l.None&&a.getEditable()&&a.getEnabled()){this.addValueStateClasses(n,a)}this.addWrapperStyles(n,a);n.openEnd();if(c.length){this.writeIcons(n,c)}this.prependInnerContent(n,a);this.openInputTag(n,a);if(a.getName()){n.attr("name",a.getName())}if(!a.bShowLabelAsPlaceholder&&a._getPlaceholder()){n.attr("placeholder",a._getPlaceholder())}if(a.getMaxLength&&a.getMaxLength()>0){n.attr("maxlength",a.getMaxLength())}if(!a.getEnabled()){n.attr("disabled","disabled")}else if(!a.getEditable()){n.attr("readonly","readonly")}if(d!=r.Inherit){n.attr("dir",d.toLowerCase())}this.writeInnerValue(n,a);if(u){this.writeAccessibilityState(n,a)}if(i.browser.mozilla){if(b){n.attr("x-moz-errormessage",b)}else{n.attr("x-moz-errormessage"," ")}}this.writeInnerAttributes(n,a);n.class("sapMInputBaseInner");this.addInnerClasses(n,a);n.style("text-align",o);this.addInnerStyles(n,a);this.endInputTag(n,a);this.writeInnerContent(n,a);this.closeInputTag(n,a);this.writeAdditionalContent(n,a);if(g.length){this.writeIcons(n,g)}n.close("div");this.writeDecorations(n,a);if(u){this.renderAriaLabelledBy(n,a);this.renderAriaDescribedBy(n,a);this.renderValueStateAccDom(n,a)}n.close("div")};d.getAriaRole=function(e){return"textbox"};d.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};d.getLabelledByAnnouncement=function(e){return""};d.renderAriaLabelledBy=function(e,t){var n=this.getLabelledByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-labelledby").attr("aria-hidden","true").class("sapUiInvisibleText").openEnd().text(n.trim()).close("span")}};d.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};d.getDescribedByAnnouncement=function(e){return""};d.renderAriaDescribedBy=function(e,t){var n=this.getDescribedByAnnouncement(t);if(n){e.openStart("span",t.getId()+"-describedby").attr("aria-hidden","true").class("sapUiInvisibleText").openEnd().text(n.trim()).close("span")}};d.renderValueStateAccDom=function(e,t){var n=t.getValueState();if(n===l.None||!t.getEditable()||!t.getEnabled()){return}var i=t.getAggregation("_invisibleFormattedValueStateText");var r;r=s.getResourceBundleFor("sap.m").getText("INPUTBASE_VALUE_STATE_"+n.toUpperCase());e.openStart("div",t.getValueStateMessageId()+"-sr").class("sapUiPseudoInvisibleText");e.openEnd().text(r).text(" ");if(i){e.renderControl(i)}else{e.text(t.getValueStateText()||a.getAdditionalText(t))}e.close("div")};d.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),n=this.getAriaDescribedBy(e),a=this.getAriaRole(e),i=e.getValueStateMessageId()+"-sr",s={};if(a){s.role=a}if(e.getValueState()===l.Error&&e.getEditable()&&e.getEnabled()){s.invalid=true;s.errormessage=i}else if(e.getValueState()!==l.None&&e.getEditable()&&e.getEnabled()){n=n?i+" "+n:i}if(t){s.labelledby={value:t.trim(),append:true}}if(n){s.describedby={value:n.trim(),append:true}}s.disabled=null;s.readonly=null;return s};d.writeAccessibilityState=function(e,t){e.accessibilityState(t,this.getAccessibilityState(t))};d.openInputTag=function(e,t){e.voidStart("input",t.getId()+"-"+this.getInnerSuffix())};d.endInputTag=function(e,t){e.voidEnd()};d.writeInnerValue=function(e,t){e.attr("value",t.getValue())};d.addCursorClass=function(e,t){};d.addPaddingClass=function(e,t){e.class("sapMInputBaseHeightMargin")};d.addOuterStyles=function(e,t){};d.addControlWidth=function(e,t){if(!t.getProperty("width")){e.class("sapMInputBaseNoWidth")}e.style("width",t.getWidth())};d.addOuterClasses=function(e,t){};d.writeOuterAttributes=function(e,t){};d.addInnerStyles=function(e,t){};d.addWrapperStyles=function(e,t){e.style("width","100%")};d.addInnerClasses=function(e,t){};d.writeInnerAttributes=function(e,t){};d.prependInnerContent=function(e,t){};d.writeInnerContent=function(e,t){};d.writeAdditionalContent=function(e,t){};d.writeIcons=function(e,t){e.openStart("div").attr("tabindex","-1").class("sapMInputBaseIconContainer").openEnd();t.forEach(e.renderControl,e);e.close("div")};d.writeDecorations=function(e,t){};d.closeInputTag=function(e,t){};d.addPlaceholderStyles=function(e,t){};d.addPlaceholderClasses=function(e,t){};d.addValueStateClasses=function(e,t){e.class("sapMInputBaseContentWrapperState");e.class("sapMInputBaseContentWrapper"+t.getValueState())};d.getInnerSuffix=function(){return"inner"};return d},true);
//# sourceMappingURL=InputBaseRenderer.js.map