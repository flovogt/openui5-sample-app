/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/security/encodeCSS","sap/m/GenericTile"],function(e,t,n){"use strict";var o=e.GenericTileMode,i=e.FrameType,a=e.Priority;var r={apiVersion:2};r.render=function(e,n){var o=n.getTooltip_AsString();var i=n._getContentType();var r=n.getPriority();if(i){i=t(i)}var s=t("sapMFrameType"+n.getFrameType());e.openStart("div",n);e.class(n.getState()=="Disabled"?"sapMTileCnt sapMTileCntDisabled":"sapMTileCnt");e.class(i);e.class(s);if(r===a.None){e.class("sapMGTNoPriority")}else{e.class("sapMGTPriority")}if(o.trim()){e.attr("title",o)}if(n.getFooter()){e.class("sapMTileFooterPresent")}e.openEnd();if(n.getState()=="Loading"){e.openStart("div").class("sapMTileCntContentShimmerPlaceholderItem");e.class("sapMTileCntContentShimmerPlaceholderWithDescription");e.openEnd();e.openStart("div").class("sapMTileCntContentShimmerPlaceholderRows").openEnd();if(!(n.getParent().getFrameType()==="TwoByHalf"||n.getParent().getFrameType()==="OneByHalf")){e.openStart("div").class("sapMTileCntContentShimmerPlaceholderItemBox").class("sapMTileCntLoadingShimmer").openEnd().close("div")}e.openStart("div").class("sapMTileCntContentShimmerPlaceholderItemTextFooter").class("sapMTileCntLoadingShimmer").openEnd().close("div");e.close("div");e.close("div")}else if(n.getState()=="Failed"){e.openStart("div",n.getId()+"-failed-ftr");e.class("sapMTileCntFtrFld");e.openEnd();e.openStart("div",n.getId()+"-failed-icon");e.class("sapMTileCntFtrFldIcn");e.openEnd();e.renderControl(n.getParent()._oErrorIcon);e.close("div");e.openStart("div",n.getId()+"-failed-text");e.class("sapMTileCntFtrFldTxt");e.openEnd();e.renderControl(n.getParent().getAggregation("_failedMessageText"));e.close("div");e.close("div")}else{this._renderContent(e,n);this._renderFooter(e,n)}e.close("div")};r._renderContent=function(e,t){if(!t._bRenderContent){return}var r=t.getContent(),s=t.getPriority(),l=t.getParent(),d=l instanceof n&&l.getMode()===o.ActionMode&&l.getFrameType()===i.TwoByOne,c=t.getPriorityText(),p=d&&s&&s!==a.None&&c,g=s!==a.None&&c?1:3;if(r){if(p){e.openStart("div",t.getId()+"-content-container");e.class("sapMTileContainer");e.openEnd();e.openStart("div",t.getId()+"-priority");e.class("sapMTilePriority");e.class(s);e.openEnd();e.openStart("div",t.getId()+"-priority-content");e.class("sapMTilePriorityCnt");e.openEnd();e.openStart("span",t.getId()+"-priority-value");e.class("sapMTilePriorityValue");e.openEnd();e.text(c);e.close("span");e.close("div");e.close("div");e.close("div")}if(r.isA("sap.m.Text")&&d&&(t.getFrameType()===i.TwoByOne||t.getFrameType()===i.Auto)){r.setMaxLines(g)}e.openStart("div",t.getId()+"-content");e.class("sapMTileCntContent");e.openEnd();if(!r.hasStyleClass("sapMTcInnerMarker")){r.addStyleClass("sapMTcInnerMarker")}e.renderControl(r);e.close("div")}};r._renderFooter=function(e,o){if(!o._bRenderFooter){return}var i="sapMTileCntFooterTextColor"+o.getFooterColor(),a=o._getFooterText(e,o),r=o.getParent();if(r instanceof n&&(r._isNavigateActionEnabled()||r._isActionMode())){e.openStart("div",r.getId()+"-footer-container");e.class("sapMTileFtrCnt");e.openEnd()}e.openStart("div",o.getId()+"-footer-text");e.class("sapMTileCntFtrTxt");e.class(t(i));e.openEnd();e.text(a);e.close("div");if(r instanceof n&&r._isActionMode()){e.openStart("div",r.getId()+"-actionButtons");e.class("sapMGTActionModeContainer");e.openEnd();r.getActionButtons().forEach(function(t){e.renderControl(t)});e.close("div");e.close("div")}else if(r instanceof n&&r._isNavigateActionEnabled()){e.openStart("div",r.getId()+"-navigateActionContainer");e.class("sapMTileNavContainer");e.openEnd();e.renderControl(r._getNavigateAction());e.close("div");e.close("div")}};return r},true);
//# sourceMappingURL=TileContentRenderer.js.map