/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var t={apiVersion:2};t.render=function(a,n){var o=n.getTitle(),r=n.getHeader(),i=n.getFooter(),s=n.getContent(),c=n.getHeaderExpanded(),l=r?r.getContent():[],p=l.length>0,d=n.getShowFooter(),g=n._preserveHeaderStateOnScroll(),F=g||n._bHeaderInTitleArea,C=n.getLandmarkInfo(),f=n._getHeaderTag(C),m=n._getFooterTag(C);a.openStart("article",n);a.class("sapFDynamicPage");if(n.getToggleHeaderOnTitleClick()){a.class("sapFDynamicPageTitleClickEnabled")}if(i&&d){a.class("sapFDynamicPageFooterVisible")}a.attr("aria-roledescription",n._getAriaRoleDescription());a.accessibilityState(n,n._formatLandmarkInfo(C,"Root"));a.openEnd();a.openStart(f,n.getId()+"-header");a.class("sapContrastPlus");a.class("sapFDynamicPageTitleWrapper");if(!c){a.class(e.system.phone&&o&&o.getSnappedTitleOnMobile()?"sapFDynamicPageTitleSnappedTitleOnMobile":"sapFDynamicPageTitleSnapped")}if(!p){a.class("sapFDynamicPageTitleOnly")}a.accessibilityState(n,n._getAccessibilityStateTitle());a.attr("data-sap-ui-customfastnavgroup",true);a.openEnd();a.renderControl(o);a.openStart("div",n.getId()+"-stickyPlaceholder");a.openEnd();if(F){a.renderControl(r)}a.close("div");a.close(f);a.openStart("div",n.getId()+"-contentWrapper");a.class("sapFDynamicPageContentWrapper");if(n.getBackgroundDesign()){a.class("sapFDynamicPageContentWrapper"+n.getBackgroundDesign())}a.openEnd();a.openStart("div",n.getId()+"-headerWrapper");a.class("sapFDynamicPageHeaderWrapper");a.openEnd();if(!F){a.renderControl(r)}a.close("div");a.openStart("div",n.getId()+"-content");a.class("sapFDynamicPageContent");a.accessibilityState(n,n._formatLandmarkInfo(C,"Content"));a.openEnd();a.openStart("div",n.getId()+"-contentFitContainer");if(n.getFitContent()){a.class("sapFDynamicPageContentFitContainer")}if(i&&d){a.class("sapFDynamicPageContentFitContainerFooterVisible")}a.openEnd();a.renderControl(s);a.close("div");a.close("div");a.close("div");t.renderFooter(a,n,i,d,m,C);a.close("article")};t.renderFooter=function(e,t,a,n,o,r){if(a){e.openStart(o,t.getId()+"-footerWrapper");e.class("sapContrast").class("sapContrastPlus").class("sapFDynamicPageFooter").class("sapMFooter-CTX");if(!n){e.class("sapUiHidden")}e.accessibilityState(t,t._formatLandmarkInfo(r,"Footer"));e.openEnd();a.addStyleClass("sapFDynamicPageActualFooterControl");e.renderControl(a);e.close(o)}};return t},true);
//# sourceMappingURL=DynamicPageRenderer.js.map