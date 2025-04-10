/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/core/Renderer","sap/ui/unified/CalendarRenderer"],function(e,t,r){"use strict";var a=t.extend(r);a.apiVersion=2;a.render=function(t,r){var a=r.getId(),n=r.getTooltip_AsString(),i=r.getAggregation("month"),o=r.getWidth(),s=e.getResourceBundleFor("sap.f"),l={labelledby:{value:"",append:false}};t.openStart("div",r);t.class("sapUiCal");if(i.length>1){t.class("sapUiCalMulti")}t.accessibilityState(r,l);if(n){t.attr("title",n)}if(o){t.class("sapUiCalWidth");t.style("width",o)}if(r._getSecondaryCalendarType()){t.class("sapUiCalSecType")}t.openEnd();var c=r.getAggregation("header");t.renderControl(c);t.openStart("div",a+"-content");t.class("sapUiCalContent");t.openEnd();switch(r.getProperty("_currentPicker")){case"month":t.renderControl(i[0]);break;case"monthPicker":t.renderControl(r._getMonthPicker());break;case"yearPicker":t.renderControl(r._getYearPicker());break;case"yearRangePicker":t.renderControl(r._getYearRangePicker());break}t.close("div");if(!r._bSkipCancelButtonRendering){t.openStart("button",a+"-cancel");t.class("sapUiCalCancel");t.attr("tabindex","-1");t.openEnd();t.text(s.getText("CALENDAR_CANCEL"));t.close("button")}this.renderCalContentAndArrowsOverlay(t,r,a);t.close("div")};return a},true);
//# sourceMappingURL=CalendarInCardRenderer.js.map