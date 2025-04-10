/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/f/GridContainer","sap/f/GridContainerSettings","sap/f/ProductSwitchItem","sap/f/ProductSwitchRenderer","sap/ui/core/Element"],function(t,e,i,r,n,s){"use strict";var o=t.extend("sap.f.ProductSwitch",{metadata:{library:"sap.f",aggregations:{_gridContainer:{type:"sap.f.GridContainer",visibility:"hidden",multiple:false},items:{type:"sap.f.ProductSwitchItem",multiple:true,singularName:"item",forwarding:{getter:"_getGridContainer",aggregation:"items"}}},associations:{selectedItem:{type:"sap.f.ProductSwitchItem",multiple:false}},events:{change:{parameters:{itemPressed:{type:"sap.f.ProductSwitchItem"}}}}},renderer:n});o.COLUMNS={THREE_COLUMNS:3,FOUR_COLUMNS:4};o.prototype.init=function(){this._oCurrentSelectedItem=null};o.prototype.exit=function(){this._oCurrentSelectedItem=null};o.prototype._gridContainerItemsUpdate=function(){var t=this._getGridContainer().getLayout();t.setColumns(this.getItems().length<=6?o.COLUMNS.THREE_COLUMNS:o.COLUMNS.FOUR_COLUMNS)};o.prototype._changeLayoutHandler=function(t){var e=t.getParameter("layout"),i=e==="layoutS"||e==="layoutXS";this._getGridContainer().toggleStyleClass("sapFProductSwitch-Popover-CTX",!i)};o.prototype._getGridContainer=function(){var t=this.getAggregation("_gridContainer");if(!t){t=new e({layoutChange:this._changeLayoutHandler.bind(this)}).setLayout(new i({columnSize:"11.25rem",rowSize:"7rem",gap:"0.5rem",columns:4})).setLayoutM(new i({columnSize:"11.25rem",rowSize:"7rem",gap:"0.5rem",columns:3})).setLayoutS(new i({columnSize:"100%",rowSize:"5rem",gap:"0",columns:1}));this.setAggregation("_gridContainer",t)}return t};o.prototype._onItemPress=function(t){this.setSelectedItem(t.oSource);this.fireChange({itemPressed:t.oSource})};o.prototype._setSelection=function(t){if(this._oCurrentSelectedItem){this._oCurrentSelectedItem.removeStyleClass("sapFPSItemSelected");this._oCurrentSelectedItem.$().removeAttr("aria-checked")}this._oCurrentSelectedItem=t;if(this._oCurrentSelectedItem){this._oCurrentSelectedItem.addStyleClass("sapFPSItemSelected");this._oCurrentSelectedItem.$().attr("aria-checked","true")}};o.prototype.setSelectedItem=function(t){if(typeof t==="string"){t=s.getElementById(t)}if(!(t instanceof r)&&t!==null){return this}this._setSelection(t);return this.setAssociation("selectedItem",t,true)};o.prototype.addItem=function(t){this.addAggregation("items",t);if(t){t.attachEvent("_itemPress",this._onItemPress,this)}this._gridContainerItemsUpdate();return this};o.prototype.insertItem=function(t,e){this.insertAggregation("items",t,e);if(t){t.attachEvent("_itemPress",this._onItemPress,this)}this._gridContainerItemsUpdate();return this};o.prototype.removeItem=function(t){var e=this.removeAggregation("items",t).detachEvent("_itemPress",this._onItemPress,this);this._gridContainerItemsUpdate();return e};o.prototype.removeAllItems=function(){var t=this.getItems(),e;t.forEach(function(t){t.detachEvent("_itemPress",this._onItemPress,this)},this);e=this.removeAllAggregation("items");this._gridContainerItemsUpdate();return e};o.prototype.destroyItems=function(){var t=this.getItems(),e;t.forEach(function(t){t.detachEvent("_itemPress",this._onItemPress,this)},this);e=this.destroyAggregation("items");this._gridContainerItemsUpdate();return e};o.prototype._getItemsCount=function(){return this.getItems().length};o.prototype._getItemPosition=function(t){var e=this.getItems(),i;e.forEach(function(e,r){if(e===t){i=r+1}});return i};return o});
//# sourceMappingURL=ProductSwitch.js.map