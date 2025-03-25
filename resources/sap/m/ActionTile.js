/*!
* OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/m/GenericTile","sap/m/Avatar","sap/m/ToDoCardRenderer","sap/m/GenericTileRenderer","sap/ui/core/library"],function(e,t,a,r,o,i){"use strict";var s=e.FrameType,n=e.GenericTileMode,p=e.LoadState,l=e.Priority,u=e.AvatarSize,d=e.AvatarShape,y=e.AvatarColor,c=i.ValueState;var g=t.extend("sap.m.ActionTile",{metadata:{library:"sap.m",properties:{enableDynamicHeight:{type:"boolean",group:"Appearance",defaultValue:false},enableIconFrame:{type:"boolean",group:"Appearance",defaultValue:false},priority:{type:"sap.m.Priority",group:"Data",defaultValue:l.None},priorityText:{type:"string",group:"Data",defaultValue:null},badgeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},badgeValueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:c.None}}},renderer:{apiVersion:2,render:function(e,t){if(t.getState()===p.Loading){r.render(e,t)}else{o.render(e,t)}}}});g.prototype.init=function(){this.addStyleClass("sapMAT");this.setMode(n.ActionMode);this.setFrameType(s.TwoByOne);t.prototype.init.apply(this,arguments)};g.prototype.onBeforeRendering=function(){if(this.getHeaderImage()){this.addStyleClass("sapMATHeaderImage")}this.toggleStyleClass("sapMATDynamicHeight",this.getEnableDynamicHeight());this.toggleStyleClass("sapMATHideActionButton",!this.getEnableNavigationButton());t.prototype.onBeforeRendering.apply(this,arguments)};g.prototype.onAfterRendering=function(){if(this.getDomRef()){this._removeStyleClasses()}t.prototype.onAfterRendering.apply(this,arguments)};g.prototype._removeStyleClasses=function(){this.getDomRef().classList.remove("sapMGT");this.getDomRef().classList.remove("TwoByOne");this.getDomRef().classList.remove("sapMGTActionMode")};g.prototype._getSizeDescription=function(){return this._oRb.getText("ACTION_TILE_SIZE")};g.prototype._setupResizeClassHandler=function(){};g.prototype.setEnableIconFrame=function(e){if(!this._oAvatar&&e){this._oAvatar=new a(this.getId()+"-icon-frame",{displaySize:u.Custom,customDisplaySize:"3.25rem",displayShape:d.Square,backgroundColor:y.Placeholder}).addStyleClass("sapMATIconFrame");this.addDependent(this._oAvatar);var t=this.getHeaderImage();if(t){this._oAvatar.setSrc(t)}}this.setProperty("enableIconFrame",e);return this};g.prototype.setBadgeIcon=function(e){if(this._oAvatar){this._oAvatar.setBadgeIcon(e)}this.setProperty("badgeIcon",e);return this};g.prototype.setBadgeValueState=function(e){if(this._oAvatar){this._oAvatar.setBadgeValueState(e)}this.setProperty("badgeValueState",e);return this};g.prototype._getIconFrame=function(){return this._oAvatar};g.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._oAvatar){this._oAvatar.destroy()}};return g});
//# sourceMappingURL=ActionTile.js.map