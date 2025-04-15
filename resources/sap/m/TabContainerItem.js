/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/IconPool","./TabStripItem","sap/m/ImageHelper"],function(t,e,i,a){"use strict";var o=t.extend("sap.m.TabContainerItem",{metadata:{properties:{name:{type:"string",group:"Misc",defaultValue:""},additionalText:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconTooltip:{type:"string",group:"Accessibility",defaultValue:null},key:{type:"string",group:"Data",defaultValue:null},modified:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,defaultValue:null},_image:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{_tabStripItem:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{itemPropertyChanged:{parameters:{itemChanged:{type:"sap.m.TabContainerItem"},propertyKey:{type:"string"},propertyValue:{type:"any"}}}},dnd:{draggable:true,droppable:false}}});o.prototype.init=function(){var t=new i;this.setAssociation("_tabStripItem",t,true)};o.prototype.exit=function(){var t=this._getTabStripItem();if(t){t.destroy()}};o.prototype.setProperty=function(e,i,a){this.fireItemPropertyChanged({itemChanged:this,propertyKey:e,propertyValue:i});return t.prototype.setProperty.call(this,e,i,a)};o.prototype.setIcon=function(t,e){var i,o=["sapMTabContIcon"],r=this.getAggregation("_image"),n=this.getId()+"-img",p=!!(this.getName()||this.getAdditionalText());if(!t){this.setProperty("icon",t,e);if(r){this.destroyAggregation("_image")}return this}if(this.getIcon()!==t){this.setProperty("icon",t,e);i={src:t,id:n,decorative:p,tooltip:this.getIconTooltip()};r=a.getImageControl(n,r,undefined,i,o);this.setAggregation("_image",r,e)}return this};o.prototype._getImage=function(){return this.getAggregation("_image")};o.prototype._getTabStripItem=function(){return t.getElementById(this.getAssociation("_tabStripItem"))};["addCustomData","getCustomData","destroyCustomData","indexOfCustomData","insertCustomData","removeAllCustomData","removeCustomData","data"].forEach(function(t){o.prototype[t]=function(){var e=this._getTabStripItem();if(e&&e[t]){var i=e[t].apply(e,arguments);return i===e?this:i}}});return o});
//# sourceMappingURL=TabContainerItem.js.map