/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/InvisibleText"],function(e,t,i,a,s){"use strict";var r=e.SelectDialogInitialFocus;var n=a.extend("sap.m.SelectDialogBase",{metadata:{library:"sap.m",abstract:true,properties:{initialFocus:{type:"sap.m.SelectDialogInitialFocus",group:"Behavior",defaultValue:r.List}},aggregations:{},events:{updateStarted:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},updateFinished:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},listItems:{type:"sap.m.ListItemBase[]"},selected:{type:"boolean"},selectAll:{type:"boolean"}}}}},renderer:{apiVersion:2,render:function(){}}});n.getInvisibleText=function(){if(!this.oInvisibleText){this.oInvisibleText=new s({text:i.getLibraryResourceBundle("sap.m").getText("SELECTDIALOGBASE_LISTLABEL")}).toStatic()}return this.oInvisibleText};n.prototype._setInitialFocus=function(){var e;if(!t.system.desktop){return}switch(this.getInitialFocus()){case r.SearchField:e=this._oSearchField;break;default:e=this._oDialog.getContent()[1];break}this._oDialog.setInitialFocus(e)};return n});
//# sourceMappingURL=SelectDialogBase.js.map