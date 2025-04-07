/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};var t={MONTH:"month",MONTH_PICKER:"monthPicker",YEAR_PICKER:"yearPicker",YEAR_RANGE_PICKER:"yearRangePicker"};e.render=function(e,n){var r=n.getId(),a=n.getTooltip_AsString(),i=n.getAggregation("month"),o=n.getProperty("_currentPicker"),s=n.getWidth(),l=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),c={labelledby:{value:"",append:false}};e.openStart("div",n);e.class("sapUiCal");if(i.length>1){e.class("sapUiCalMulti")}e.accessibilityState(n,c);if(a){e.attr("title",a)}if(s){e.class("sapUiCalWidth");e.style("width",s)}if(n._getSecondaryCalendarType()){e.class("sapUiCalSecType")}if(this.addAttributes){this.addAttributes(e,n)}e.openEnd();var d=n.getAggregation("header");e.renderControl(d);e.openStart("div",r+"-content");e.class("sapUiCalContent");e.openEnd();if(n.getMonths()>1){switch(o){case t.MONTH_PICKER:case t.YEAR_PICKER:case t.YEAR_RANGE_PICKER:this.renderMonths(e,n,i);this.renderCalContentOverlay(e,n,r);break}}switch(o){case t.MONTH:this.renderMonths(e,n,i);break;case t.MONTH_PICKER:e.renderControl(n._getMonthPicker());break;case t.YEAR_PICKER:e.renderControl(n._getYearPicker());break;case t.YEAR_RANGE_PICKER:e.renderControl(n._getYearRangePicker());break}e.close("div");if(!n._bSkipCancelButtonRendering){e.openStart("button",r+"-cancel");e.class("sapUiCalCancel");e.attr("tabindex","-1");e.openEnd();e.text(l.getText("CALENDAR_CANCEL"));e.close("button")}this.renderCalContentAndArrowsOverlay(e,n,r);e.close("div")};e.renderMonths=function(e,t,n){n.forEach(function(r,a){e.renderControl(r);if(n.length===2&&a===0){e.renderControl(t.getAggregation("secondMonthHeader"))}})};e.renderCalContentOverlay=function(e,t,n){e.openStart("div",n+"-contentOver");e.class("sapUiCalContentOver");e.openEnd();e.close("div")};e.renderCalContentAndArrowsOverlay=function(e,t,n){};return e},true);
//# sourceMappingURL=CalendarRenderer.js.map