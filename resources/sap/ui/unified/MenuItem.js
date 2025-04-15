/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","./MenuItemBase","./library","sap/ui/core/library"],function(e,t,i,s){"use strict";var a=t.extend("sap.ui.unified.MenuItem",{metadata:{library:"sap.ui.unified",properties:{text:{type:"string",group:"Appearance",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});e.insertFontFaceStyle();a.prototype.render=function(e,t,i,a){var n=e,o=t.getSubmenu(),p=t.getEnabled(),r;n.openStart("li",t);if(t.getVisible()){n.attr("tabindex","0")}n.class("sapUiMnuItm");if(a.iItemNo==1){n.class("sapUiMnuItmFirst")}else if(a.iItemNo==a.iTotalItems){n.class("sapUiMnuItmLast")}if(!i.checkEnabled(t)){n.class("sapUiMnuItmDsbl")}if(t.getStartsSection()){n.class("sapUiMnuItmSepBefore")}if(t.getTooltip_AsString()){n.attr("title",t.getTooltip_AsString())}if(a.bAccessible){n.accessibilityState(t,{role:"menuitem",disabled:!p,posinset:a.iItemNo,setsize:a.iTotalItems,labelledby:{value:this.getId()+"-txt",append:true}});if(o){n.attr("aria-haspopup",s.aria.HasPopup.Menu.toLowerCase());n.attr("aria-owns",o.getId())}}n.openEnd();n.openStart("div");n.class("sapUiMnuItmL");n.openEnd();n.close("div");if(t.getIcon()&&t._getIcon){n.openStart("div");n.class("sapUiMnuItmIco");n.openEnd();r=t._getIcon(t);n.renderControl(r);n.close("div")}n.openStart("div",this.getId()+"-txt");n.class("sapUiMnuItmTxt");n.openEnd();n.text(t.getText());n.close("div");n.openStart("div",this.getId()+"-scuttxt");n.class("sapUiMnuItmSCut");n.openEnd();n.close("div");n.openStart("div");n.class("sapUiMnuItmSbMnu");n.openEnd();if(o){n.openStart("div");n.class("sapUiIconMirrorInRTL");n.openEnd();n.close("div")}n.close("div");n.openStart("div");n.class("sapUiMnuItmR");n.openEnd();n.close("div");n.close("li")};a.prototype.hover=function(e,t){this.$().toggleClass("sapUiMnuItmHov",e)};a.prototype.focus=function(e){if(this.getVisible()){this.$().trigger("focus")}else{e.focus()}};return a});
//# sourceMappingURL=MenuItem.js.map