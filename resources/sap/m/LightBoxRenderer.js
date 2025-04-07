/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(e){"use strict";var t=e.LightBoxLoadingStates;var r={apiVersion:2};r.render=function(e,r){var i=r._getImageContent();var o=i._getImageState();var s=r.getAggregation("_invisiblePopupText");e.openStart("div",r).class("sapMLightBox").attr("tabindex","-1").accessibilityState({role:"dialog",modal:true,labelledby:s&&s.getId()});if(i.getSubtitle()){e.class("sapMLightBoxTwoLines")}if(r._bIsLightBoxBiggerThanMinDimensions){e.class("sapMLightBoxTopCornersRadius")}if(o===t.TimeOutError||o===t.Error){e.class("sapMLightBoxError");e.style("width","auto");e.style("height","auto")}else{e.style("width",r._iWidth+"px");e.style("height",r._iHeight+"px")}e.openEnd();e.renderControl(s);if(o===t.Loading){this.renderBusyState(e,r)}else if(o===t.TimeOutError||o===t.Error){this.renderError(e,r)}else{this.renderImage(e,r)}this.renderFooter(e,r,i);e.close("div");r._isRendering=false};r.renderImage=function(e,t){var r=t._getImageContent();e.openStart("div",r);if(r.getSubtitle()){e.class("sapMLightBoxImageContainerTwoLines")}else{e.class("sapMLightBoxImageContainer")}e.openEnd();e.renderControl(r.getAggregation("_image"));e.close("div")};r.renderError=function(e,t){var r=t._getImageContent();e.openStart("div");if(r&&r.getSubtitle()){e.class("sapMLightBoxErrorContainerTwoLines")}else{e.class("sapMLightBoxErrorContainer")}e.openEnd();e.renderControl(t.getAggregation("_errorMessage"));e.close("div")};r.renderBusyState=function(e,t){e.renderControl(t._getBusyIndicator())};r.renderFooter=function(e,t,r){var i=r.getAggregation("_title"),o=r.getAggregation("_subtitle");e.openStart("div").class("sapMLightBoxFooter").class("sapContrast").class("sapContrastPlus");if(r.getSubtitle()){e.class("sapMLightBoxFooterTwoLines")}e.openEnd();e.openStart("div").class("sapMLightBoxTitleSection").accessibilityState({hidden:true}).openEnd();if(i){e.renderControl(i.addStyleClass("sapMLightBoxTitle"))}if(o&&o.getText()){e.renderControl(o.addStyleClass("sapMLightBoxSubtitle"))}e.close("div");e.renderControl(t._getCloseButton());e.close("div")};return r},true);
//# sourceMappingURL=LightBoxRenderer.js.map