/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/core/Renderer","./DateTimeFieldRenderer","sap/ui/core/library"],function(e,t,a,i){"use strict";var r=t.extend(a);r.apiVersion=2;r.writeInnerValue=function(e,t){if(t._inPreferredUserInteraction()){e.attr("value",t._$input.val())}else if(t._bValid||t._bOutOfAllowedRange){e.attr("value",t._formatValue(t.getDateValue()))}else{e.attr("value",t.getValue())}};r.writeInnerAttributes=function(e,t){e.attr("type","text");if(t._bMobile){e.attr("readonly","readonly")}};r.getAccessibilityState=function(t){var r=a.getAccessibilityState.apply(this,arguments);r["roledescription"]=e.getResourceBundleFor("sap.m").getText("ACC_CTR_TYPE_DATEINPUT");if(t.getEditable()&&t.getEnabled()){r["haspopup"]=i.aria.HasPopup.Grid.toLowerCase()}r["disabled"]=null;if(t._bMobile&&t.getEnabled()&&t.getEditable()){r["readonly"]=false}return r};r.addOuterClasses=function(e,t){if(t.getHideInput()){e.class("sapMDatePickerHiddenInput")}a.addOuterClasses.apply(this,arguments)};return r},true);
//# sourceMappingURL=DatePickerRenderer.js.map