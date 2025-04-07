/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","./library","sap/ui/core/IconPool","sap/m/Image"],function(e,t,o,n){"use strict";var i=e.extend("sap.ui.unified.MenuItemBase",{metadata:{library:"sap.ui.unified",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},startsSection:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"submenu",aggregations:{submenu:{type:"sap.ui.unified.Menu",multiple:false}},events:{select:{parameters:{item:{type:"sap.ui.unified.MenuItemBase"}}}}}});i.prototype.init=function(){};i.prototype.render=function(e,t,o){var n=e;n.openStart("li",t);n.openEnd();n.openStart("div",this.getId()+"-txt");n.style("white-space","nowrap");n.style("display","inline-block");n.style("padding","1px");n.style("color","black");n.openEnd();n.text(t.getId());if(this.getSubmenu()){n.text("&nbsp;&nbsp;->")}n.close("div");n.close("li")};i.prototype.hover=function(e,t){this.$("txt").attr("style",e?"white-space:nowrap;display:inline-block;padding:1px;color:red;":"white-space:nowrap;display:inline-block;padding:1px;color:black;")};i.prototype.focus=function(){};i.prototype.onSubmenuToggle=function(e){this.$().toggleClass("sapUiMnuItmSubMnuOpen",e)};i.prototype.onAfterRendering=function(){};i.prototype.onsapshow=function(e){if(this.getParent()&&this.getParent().close){this.getParent().close(true)}e.preventDefault()};i.prototype._getIcon=function(){return o.createControlByURI({src:this.getIcon(),useIconTooltip:false},n)};i.prototype.onsaphide=i.prototype.onsapshow;return i});
//# sourceMappingURL=MenuItemBase.js.map