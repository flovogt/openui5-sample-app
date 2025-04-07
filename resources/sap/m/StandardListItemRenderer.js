/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Core","sap/ui/core/Renderer","sap/ui/core/IconPool","./library","./ListItemBaseRenderer"],function(e,t,i,n,r,s){"use strict";var a=e.TextDirection;var o=i.extend(s);o.apiVersion=2;o.renderLIAttributes=function(e,t){var i=t.getIcon(),r=t.getTitle();e.class("sapMSLI");if(i&&!n.isIconURI(i)){e.class("sapMSLIThumbnail")}if(!t.getIconInset()){e.class("sapMSLINoIconInset")}if(r&&t.getDescription()){e.class("sapMSLIWithDescription")}if(r&&!t.getAdaptTitleSize()){e.class("sapMSLINoTitleAdapt")}if(r&&t.getWrapping()){e.class("sapMSLIWrapping")}};o.renderLIContent=function(e,t){var i=t.getInfo(),n=t.getTitle(),r=t.getDescription(),s=t.getAdaptTitleSize(),a=!n&&i;if(t.getAvatar()){e.renderControl(t._getAvatar())}else if(t.getIcon()){e.renderControl(t._getImage())}e.openStart("div").class("sapMSLIDiv");if(!r&&s&&i||a){e.class("sapMSLIInfoMiddle")}e.openEnd();this.renderTitleWrapper(e,t);if(n&&r){this.renderDescription(e,t)}if(a&&!t.getWrapping()){this.renderInfo(e,t)}e.close("div")};o.renderTitleWrapper=function(e,t){var i=t.getTitleTextDirection(),n=t.getTitle(),r=t.getDescription(),s=t.getInfo(),o=t.getWrapping(),p=!n&&s;e.openStart("div");if(!p&&r){e.class("sapMSLITitle")}else{e.class("sapMSLITitleOnly")}if(i!==a.Inherit){e.attr("dir",i.toLowerCase())}e.openEnd();if(o){this.renderWrapping(e,t,"title");if(s&&!r){this.renderInfo(e,t)}}else{this.renderTitle(e,t)}e.close("div");if(s&&!r&&!o&&!p){this.renderInfo(e,t)}};o.renderTitle=function(e,t){e.text(t.getTitle())};o.renderDescription=function(e,t){var i=t.getWrapping(),n=t.getDescription(),r=t.getInfo();e.openStart("div").class("sapMSLIDescription");if(r){e.class("sapMSLIDescriptionAndInfo")}e.openEnd();if(r){e.openStart("div").class("sapMSLIDescriptionText").openEnd();if(i){this.renderWrapping(e,t,"description");this.renderInfo(e,t)}else{e.text(n)}e.close("div");if(!i){this.renderInfo(e,t)}}else if(i){this.renderWrapping(e,t,"description")}else{e.text(n)}e.close("div")};o.renderInfo=function(e,t){var i=t.getInfoTextDirection(),n=t.getInfoStateInverted();e.openStart("div",t.getId()+"-info");if(i!==a.Inherit){e.attr("dir",i.toLowerCase())}e.class("sapMSLIInfo");e.class("sapMSLIInfo"+t.getInfoState());if(n){e.class("sapMSLIInfoStateInverted")}var r=t._measureInfoTextWidth();e.style("min-width",t._getInfoTextMinWidth(r));e.openEnd();if(t.getWrapping()&&!n){this.renderWrapping(e,t,"info")}else{e.text(t.getInfo())}e.close("div")};o.renderExpandCollapse=function(e,i,n){var r=i.getId(),s=n=="title"?true:false,a=s?i._bTitleTextExpanded:i._bDescriptionTextExpanded,o=t.getLibraryResourceBundle("sap.m");e.openStart("span",r+"-"+n+"ThreeDots").openEnd();e.text(a?" ":" ... ");e.close("span");e.openStart("span",s?r+"-titleButton":r+"-descriptionButton").class("sapMSLIExpandCollapse");e.attr("tabindex","0").attr("role","button").attr("aria-live","polite");e.openEnd();e.text(o.getText(a?"EXPANDABLE_TEXT_SHOW_LESS":"EXPANDABLE_TEXT_SHOW_MORE"));e.close("span")};o.renderWrapping=function(e,t,i){var n=t.getId(),r=t._getWrapCharLimit(),s,a;if(i==="title"){s=t.getTitle();a=t._bTitleTextExpanded}else if(i==="description"){s=t.getDescription();a=t._bDescriptionTextExpanded}else{s=t.getInfo()}e.openStart("span",n+"-"+i+"Text").attr("aria-live","polite").openEnd();if(!a&&i!=="info"){var o=t._getCollapsedText(s);e.text(o)}else if(i=="title"){this.renderTitle(e,t)}else{e.text(s)}e.close("span");if(s.length>r&&i!=="info"){this.renderExpandCollapse(e,t,i)}};return o},true);
//# sourceMappingURL=StandardListItemRenderer.js.map