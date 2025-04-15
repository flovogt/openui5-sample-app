/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Title","sap/m/Image","sap/m/MenuButton","sap/m/OverflowToolbar","sap/m/OverflowToolbarButton","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","sap/m/FlexItemData","./Accessibility","sap/m/library","sap/ui/core/library","sap/m/HBox"],function(t,o,e,n,i,s,r,a,l,p,c,h){"use strict";var u=p.OverflowToolbarPriority;var C=p.ToolbarDesign;var d=p.ButtonType;var _=c.TitleLevel;var y=function(t){this._oContext=t;this._oControls={};this._oAcc=new l};y.prototype.getOverflowToolbar=function(){var t=this._oAcc;if(!this._oControls.oOverflowToolbar){this._oControls.oOverflowToolbar=new n({design:C.Transparent,style:"Clear"}).addStyleClass("sapFShellBarOTB").setLayoutData(new a({growFactor:1,shrinkFactor:1,minWidth:"0px",maxWidth:"100%"}))._setEnableAccessibilty(false);this._oControls.oOverflowToolbar._getOverflowButton().addStyleClass("sapFShellBarItem sapFShellBarOverflowButton")}this._oControls.oOverflowToolbar._getOverflowButton()._updateBadgeInvisibleText=function(o){this._getBadgeInvisibleText().setText(o+t.getEntityTooltip("NOTIFICATIONS"))};return this._oControls.oOverflowToolbar};y.prototype.getAdditionalBox=function(){if(!this._oControls.oAdditionalBox){this._oControls.oAdditionalBox=new h({alignItems:"Center"}).addStyleClass("sapFShellBarOAHB")}return this._oControls.oAdditionalBox};y.prototype.getToolbarSpacer=function(){if(!this._oControls.oToolbarSpacer){this._oControls.oToolbarSpacer=new s}return this._oControls.oToolbarSpacer};y.prototype.getSecondTitle=function(){if(!this._oControls.oSecondTitle){this._oControls.oSecondTitle=new t({titleStyle:_.H6}).addStyleClass("sapFShellBarSecondTitle").setLayoutData(new a({shrinkFactor:2,minWidth:"1px"}))}return this._oControls.oSecondTitle};y.prototype.getHomeIcon=function(){if(!this._oControls.oHomeIcon){this._oControls.oHomeIcon=new o({densityAware:false,tooltip:this._oAcc.getEntityTooltip("LOGO"),press:function(){this._oContext.fireEvent("homeIconPressed",{icon:this._oControls.oHomeIcon})}.bind(this)}).addStyleClass("sapFShellBarHomeIcon")}return this._oControls.oHomeIcon};y.prototype.getMegaMenu=function(){if(!this._oControls.oMegaMenu){this._oControls.oMegaMenu=new e({type:d.Transparent,iconDensityAware:false,layoutData:new a({shrinkFactor:0,minWidth:"0px",maxWidth:"100%"})}).addStyleClass("sapFSHMegaMenu")}return this._oControls.oMegaMenu};y.prototype.getPrimaryTitle=function(){if(!this._oControls.oPrimaryTitle){this._oControls.oPrimaryTitle=new t({titleStyle:_.H6,level:_.H1}).setLayoutData(new a({shrinkFactor:0,minWidth:"0px",maxWidth:"100%"})).addStyleClass("sapFShellBarPrimaryTitle")}return this._oControls.oPrimaryTitle};y.prototype.getCopilot=function(){if(!this._oControls.oCopilot){this._oControls.oCopilot=new i({tooltip:this._oAcc.getEntityTooltip("COPILOT"),text:this._oAcc.getEntityTooltip("COPILOT"),icon:"sap-icon://da",type:d.Transparent,press:function(t){var o=t.getSource();o.getIcon()==="sap-icon://da"?o.setIcon("sap-icon://da-2"):o.setIcon("sap-icon://da");o.toggleStyleClass("sapFShellBarItemActive");this._oContext.fireEvent("copilotPressed",{image:null,button:this._oControls.oCopilot})}.bind(this)}).addStyleClass("sapFShellBarAssistantBtn").setLayoutData(new r({priority:u.Low}))}return this._oControls.oCopilot};y.prototype.getSearch=function(){if(!this._oControls.oSearch){this._oControls.oSearch=new i({text:this._oAcc.getEntityTooltip("SEARCH"),icon:"sap-icon://search",type:d.Transparent,tooltip:this._oAcc.getEntityTooltip("SEARCH"),press:function(){this._oContext.fireEvent("searchButtonPressed",{button:this._oControls.oSearch})}.bind(this)}).setLayoutData(new r({priority:u.Low}))}return this._oControls.oSearch};y.prototype.getManagedSearch=function(){if(!this._oControls.oManagedSearch){this._oControls.oManagedSearch=this._oContext.getSearchManager()._oSearch}return this._oControls.oManagedSearch};y.prototype.getNavButton=function(){if(!this._oControls.oNavButton){this._oControls.oNavButton=new i({icon:"sap-icon://nav-back",type:d.Transparent,tooltip:this._oAcc.getEntityTooltip("BACK"),press:function(){this._oContext.fireEvent("navButtonPressed",{button:this._oControls.oNavButton})}.bind(this)})}return this._oControls.oNavButton};y.prototype.getMenuButton=function(){if(!this._oControls.oMenuButton){this._oControls.oMenuButton=new i({ariaHasPopup:l.AriaHasPopup.MENU,icon:"sap-icon://menu2",type:d.Transparent,tooltip:this._oAcc.getEntityTooltip("MENU"),press:function(){this._oContext.fireEvent("menuButtonPressed",{button:this._oControls.oMenuButton})}.bind(this)})}return this._oControls.oMenuButton};y.prototype.getNotifications=function(){var t=this._oAcc;if(!this._oControls.oNotifications){this._oControls.oNotifications=new i({ariaHasPopup:l.AriaHasPopup.NOTIFICATIONS,text:t.getEntityTooltip("NOTIFICATIONS"),icon:"sap-icon://bell",type:d.Transparent,tooltip:t.getEntityTooltip("NOTIFICATIONS"),press:function(){this._oContext.fireEvent("notificationsPressed",{button:this._oControls.oNotifications})}.bind(this)}).addStyleClass("sapFButtonNotifications").setLayoutData(new r({priority:u.Low}));this._oControls.oNotifications._updateBadgeInvisibleText=function(o){this._getBadgeInvisibleText().setText(o+t.getEntityTooltip("NOTIFICATIONS"))}}return this._oControls.oNotifications};y.prototype.getProductSwitcher=function(){if(!this._oControls.oProductSwitcher){this._oControls.oProductSwitcher=new i({ariaHasPopup:l.AriaHasPopup.PRODUCTS,text:"My products",icon:"sap-icon://grid",type:d.Transparent,tooltip:this._oAcc.getEntityTooltip("PRODUCTS"),press:function(){this._oContext.fireEvent("productSwitcherPressed",{button:this._oControls.oProductSwitcher})}.bind(this)}).addStyleClass("sapFShellBarGridButton").addStyleClass("sapFShellBarItem")}return this._oControls.oProductSwitcher};y.prototype.destroy=function(){Object.keys(this._oControls).forEach(function(t){var o=this._oControls[t];if(o){o.destroy()}}.bind(this))};return y});
//# sourceMappingURL=Factory.js.map