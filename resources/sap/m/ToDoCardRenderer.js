/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/security/encodeCSS"],function(){"use strict";var e={apiVersion:2};e.render=function(e,n){e.openStart("div",n);e.class("sapMATStateLoading");e.attr("tabindex","0");e.openEnd();this._renderLoadingShimmers(e,n);this._renderFocusDiv(e,n);e.close("div")};e._renderFocusDiv=function(e,n){e.openStart("div",n.getId()+"-focus");e.class("sapMATFocusDiv");e.openEnd();e.close("div")};e._renderLoadingShimmers=function(e,n){e.openStart("div").class("sapMGTContentShimmerPlaceholderItem");e.class("sapMGTContentShimmerPlaceholderWithDescription");e.openEnd();for(var s=0;s<5;s++){this._renderShimmer(e,n)}e.close("div")};e._renderShimmer=function(e,n){e.openStart("div").class("sapMGTContentShimmerPlaceholderRows").openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderItemHeader").class("sapMGTLoadingShimmer").openEnd().close("div");e.openStart("div").class("sapMGTContentShimmerPlaceholderItemText").class("sapMGTLoadingShimmer").openEnd().close("div");e.close("div")};return e},true);
//# sourceMappingURL=ToDoCardRenderer.js.map