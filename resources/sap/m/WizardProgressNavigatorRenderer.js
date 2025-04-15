/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/IconPool","sap/ui/core/Lib"],function(t,e,a){"use strict";var s={NAVIGATION:"sapMWizardProgressNav",LIST:"sapMWizardProgressNavList",LIST_VARYING:"sapMWizardProgressNavListVarying",LIST_NO_TITLES:"sapMWizardProgressNavListNoTitles",STEP:"sapMWizardProgressNavStep",STEP_CIRCLE:"sapMWizardProgressNavStepCircle",STEP_TITLE:"sapMWizardProgressNavStepTitle",STEP_TITLE_OPTIONAL_TITLE:"sapMWizardProgressNavStepTitleOptional",STEP_TITLE_OPTIONAL_LABEL:"sapMWizardProgressNavStepLabelOptional",STEP_ICON:"sapMWizardProgressNavStepIcon",STEP_TITLE_CONTAINER:"sapMWizardProgressNavStepTitleContainer"};var r={STEP:"data-sap-ui-wpn-step",STEP_COUNT:"data-sap-ui-wpn-step-count",CURRENT_STEP:"data-sap-ui-wpn-step-current",ACTIVE_STEP:"data-sap-ui-wpn-step-active",OPEN_STEP:"data-sap-ui-wpn-step-open",OPEN_STEP_PREV:"data-sap-ui-wpn-step-open-prev",OPEN_STEP_NEXT:"data-sap-ui-wpn-step-open-next",ARIA_CURRENT:"aria-current",ARIA_LABEL:"aria-label",ARIA_HASPOPUP:"aria-haspopup",ARIA_DESCRIBEDBY:"aria-describedby"};var i={apiVersion:2,CLASSES:s,ATTRIBUTES:r},n=a.getResourceBundleFor("sap.m");i.render=function(t,e){this.startNavigator(t,e);this.renderList(t,e);this.endNavigator(t)};i.startNavigator=function(t,e){var a=n.getText("WIZARD_PROGRESS_NAVIGATOR_ARIA_LABEL");t.openStart("nav",e).class(s.NAVIGATION).class("sapContrastPlus").attr(r.STEP_COUNT,e.getStepCount()).accessibilityState({label:a}).openEnd()};i.renderList=function(t,e){this.startList(t,e);this.renderSteps(t,e);this.endList(t)};i.startList=function(e,a){var r=a.getStepTitles();var i=n.getText("WIZARD_PROGRESS_NAVIGATOR_LIST_ARIA_LABEL");e.openStart("ul");if(a.getVaryingStepCount()){e.class(s.LIST_VARYING)}else{e.class(s.LIST)}if(!r.length){e.class(s.LIST_NO_TITLES)}e.accessibilityState({role:"list",label:i,controls:a.getParent().sId+"-step-container",describedby:t.getStaticId("sap.m","WIZARD_PROGRESS_NAVIGATOR_LIST_ARIA_DESCRIBEDBY")});e.openEnd()};i.renderSteps=function(t,e){var a=e.getStepCount(),s=e.getStepTitles(),r=e._aStepOptionalIndication,i=e.getStepIcons(),p=n.getText("WIZARD_STEP_OPTIONAL_STEP_TEXT");for(var T=1;T<=a;T++){var o=r[T-1]?p:"";this.startStep(t,e,T,s[T-1],i[T-1],o);this.endStep(t)}};i.startStep=function(t,e,a,i,p,T){var o=e._isActiveStep(a);var S=o?"ACTIVE":"INACTIVE";var E=n.getText("WIZARD_STEP_"+S+"_LABEL",[a,i,T]);var I={role:"listitem",label:E};const l=e.getId()+"-step-"+e._aStepIds[a-1];t.openStart("li",l).class(s.STEP).attr(r.STEP,a).attr("tabindex","-1").accessibilityState(I);t.attr("aria-posinset",a);if(!e.getVaryingStepCount()){t.attr("aria-setsize",e.getStepCount())}else{t.attr("aria-setsize","-1")}t.openEnd();t.openStart("div").class("sapMWizardProgressNavStepContainer");t.openEnd();this.renderStepCircle(t,p,a);if(i){this.renderStepTitle(t,i,T)}t.close("div")};i.renderStepCircle=function(t,e,a){t.openStart("span").class(s.STEP_CIRCLE).openEnd();if(e){t.icon(e,[s.STEP_ICON],{title:null})}else{t.text(a)}t.close("span")};i.renderStepTitle=function(t,e,a){t.openStart("span").class(s.STEP_TITLE_CONTAINER).openEnd();t.openStart("span").class(s.STEP_TITLE);if(a){t.class(s.STEP_TITLE_OPTIONAL_TITLE)}t.openEnd().text(e).close("span");if(a){t.openStart("span").class(s.STEP_TITLE_OPTIONAL_LABEL).openEnd().text(a).close("span")}t.close("span")};i.endStep=function(t){t.close("li")};i.endList=function(t){t.close("ul")};i.endNavigator=function(t){t.close("nav")};return i},true);
//# sourceMappingURL=WizardProgressNavigatorRenderer.js.map