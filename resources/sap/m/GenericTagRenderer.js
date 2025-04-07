/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/core/Core"],function(e,t,a){"use strict";var r=e.GenericTagDesign,n=e.GenericTagValueState,s=t.ValueState,i={apiVersion:2};i.render=function(e,t){var r=this._getAriaLabelledBy(t),n=a.getLibraryResourceBundle("sap.m"),s=t.getTooltip_AsString();e.openStart("div",t);e.class("sapMGenericTag");e.attr("tabindex",0);e.class("sapMGenericTag"+t.getStatus());e.accessibilityState(t,{role:"button",roledescription:n.getText("GENERICTAG_ROLEDESCRIPTION"),labelledby:r.join(" ")});if(s){e.attr("title",s)}e.openEnd();e.openStart("div");e.class("sapMGenericTagWrap");e.openEnd();this.renderElements(e,t);e.close("div");e.close("div")};i.renderElements=function(e,t){var a=t.getDesign()===r.StatusIconHidden,i=t.getValueState()===n.Error,o=t.getValue();if(!a&&t.getStatus()!==s.None){e.renderControl(t._getStatusIcon())}this.renderText(e,t);if(i){e.renderControl(t._getErrorIcon())}else if(o){e.renderControl(o.addStyleClass("sapMGenericTagValue"))}this.renderHiddenARIAElement(e,t)};i.renderText=function(e,t){e.openStart("span",t.getId()+"-text");e.class("sapMGenericTagText");e.openEnd();e.text(t.getText());e.close("span")};i.renderHiddenARIAElement=function(e,t){if(t.getStatus()===s.None){return}e.openStart("span",t.getId()+"-status");e.class("sapUiInvisibleText");e.attr("aria-hidden","true");e.openEnd();e.text(this._getGenericTagStatusText(t));e.close("span")};i._getAriaLabelledBy=function(e){var t=e.getAriaLabelledBy().slice(),a=e.getId(),r=this._getTagValueId(e),i=this._getTagValueState(e),o=e.getStatus();if(o!==s.None&&o!==i){t.push(a+"-status")}t.push(a+"-text");t.push(e.getValueState()===n.Error?a+"-errorIcon":r);return t};i._getGenericTagStatusText=function(e){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m"),a;switch(e.getStatus()){case s.Error:a=t.getText("GENERICTAG_ARIA_VALUE_STATE_ERROR");break;case s.Warning:a=t.getText("GENERICTAG_ARIA_VALUE_STATE_WARNING");break;case s.Success:a=t.getText("GENERICTAG_ARIA_VALUE_STATE_SUCCESS");break;case s.Information:a=t.getText("GENERICTAG_ARIA_VALUE_STATE_INFORMATION");break;default:}return a};i._getTagValueId=function(e){var t=e.getValue();return t?t.getId():""};i._getTagValueState=function(e){var t=e.getValue();return t?t.getState():""};return i},true);
//# sourceMappingURL=GenericTagRenderer.js.map