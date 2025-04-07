/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./MessageStripUtilities","sap/ui/core/IconPool"],function(e,t){"use strict";var n={apiVersion:2};n.render=function(e,t){this.startMessageStrip(e,t);this.renderAriaTypeText(e,t);if(t.getShowIcon()){this.renderIcon(e,t)}this.renderTextAndLink(e,t);if(t.getShowCloseButton()){this.renderCloseButton(e,t)}this.endMessageStrip(e)};n.startMessageStrip=function(t,n){t.openStart("div",n);t.class(e.CLASSES.ROOT);t.class(e.CLASSES.ROOT+n.getType());t.attr(e.ATTRIBUTES.CLOSABLE,n.getShowCloseButton());t.accessibilityState(n,this.getAccessibilityState.call(n));t.openEnd()};n.renderAriaTypeText=function(t,n){t.openStart("span",n.getId()+"-info");t.class("sapUiPseudoInvisibleText");t.openEnd();t.text(e.getAriaTypeText.call(n));t.close("span")};n.renderIcon=function(t,n){t.openStart("div");t.class(e.CLASSES.ICON);t.openEnd();t.icon(e.getIconURI.call(n),null,{title:null,"aria-hidden":true});t.close("div")};n.renderTextAndLink=function(t,n){var i=n.getAggregation("_formattedText");t.openStart("div",n.getId()+"-content");t.class(e.CLASSES.MESSAGE);t.openEnd();if(n.getEnableFormattedText()&&i){t.renderControl(i)}else{t.renderControl(n.getAggregation("_text"))}t.renderControl(n.getLink());t.close("div")};n.renderCloseButton=function(e,t){e.renderControl(t.getAggregation("_closeButton"))};n.endMessageStrip=function(e){e.close("div")};return n},true);
//# sourceMappingURL=MessageStripRenderer.js.map