/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/library","sap/ui/thirdparty/jquery","sap/ui/unified/FileUploaderHelper"],function(t,jQuery,e){"use strict";var a={};a.apiVersion=2;a.render=function(t,a){var r=a.getEnabled();var n=e.getHelper();t.openStart("div",a);t.class("sapUiFup");if(a.getButtonOnly()){t.class("sapUiFupButtonOnly")}var i=n.addFormClass();if(i){t.class(i)}if(!r){t.class("sapUiFupDisabled")}t.openEnd();t.openStart("form",a.getId()+"-fu_form");t.style("display","inline-block");t.attr("enctype","multipart/form-data");t.attr("method",a.getHttpRequestMethod().toLowerCase());t.attr("action",a.getUploadUrl());t.attr("target",a.getId()+"-frame");t.openEnd();t.openStart("div");if(!a.bMobileLib){t.class("sapUiFupInp")}t.openEnd();t.openStart("div");t.class("sapUiFupGroup");t.style("border","0");t.style("cellPadding","0");t.style("cellSpacing","0");t.openEnd();t.openStart("div");t.openEnd();t.openStart("div");if(a.getButtonOnly()){t.style("display","none")}t.openEnd();t.renderControl(a.oFilePath);t.close("div");t.openStart("div");t.openEnd();a._ensureBackwardsReference();t.renderControl(a.oBrowse);t.openStart("span",a.getId()+"-AccDescr");t.class("sapUiInvisibleText");t.attr("aria-hidden","true");t.openEnd();t.text(a._generateAccDescriptionText());t.close("span");t.close("div");t.close("div");t.close("div");var d=a.getName()||a.getId();t.openStart("div");t.class("sapUiFupInputMask");t.openEnd();t.voidStart("input");t.attr("type","hidden");t.attr("name","_charset_");t.attr("aria-hidden","true");t.voidEnd();t.voidStart("input",a.getId()+"-fu_data");t.attr("type","hidden");t.attr("aria-hidden","true");t.attr("name",d+"-data");t.attr("value",a.getAdditionalData()||"");t.voidEnd();jQuery.each(a.getParameters(),function(e,a){t.voidStart("input");t.attr("type","hidden");t.attr("aria-hidden","true");t.attr("name",a.getName()||"");t.attr("value",a.getValue()||"");t.voidEnd()});t.close("div");t.close("div");t.close("form");t.close("div")};return a},true);
//# sourceMappingURL=FileUploaderRenderer.js.map