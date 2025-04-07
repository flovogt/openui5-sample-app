/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/BasePanel","sap/ui/model/FilterOperator","sap/m/List","sap/base/util/merge","sap/m/CustomListItem","sap/m/library","sap/m/HBox","sap/m/VBox","sap/m/Button","sap/m/Input","sap/m/Select","sap/ui/core/ListItem","sap/m/ComboBox","sap/ui/layout/cssgrid/CSSGrid","sap/ui/layout/cssgrid/GridItemLayoutData","sap/base/util/uid"],function(t,e,n,i,r,a,o,s,p,l,u,d,c,_,m,T){"use strict";const g=e.Contains;const y=[{operator:e.Contains,label:"p13n.FILTER_OPERATOR_CONTAINS"},{operator:e.NotContains,label:"p13n.FILTER_OPERATOR_NOT_CONTAINS"},{operator:e.EQ,label:"p13n.FILTER_OPERATOR_EQ"},{operator:e.GE,label:"p13n.FILTER_OPERATOR_GE"},{operator:e.GT,label:"p13n.FILTER_OPERATOR_GT"},{operator:e.LE,label:"p13n.FILTER_OPERATOR_LE"},{operator:e.LT,label:"p13n.FILTER_OPERATOR_LT"},{operator:e.NE,label:"p13n.FILTER_OPERATOR_NE"},{operator:e.StartsWith,label:"p13n.FILTER_OPERATOR_STARTSWITH"},{operator:e.EndsWith,label:"p13n.FILTER_OPERATOR_ENDSWITH"},{operator:e.NotStartsWith,label:"p13n.FILTER_OPERATOR_NOTSTARTSWITH"},{operator:e.NotEndsWith,label:"p13n.FILTER_OPERATOR_NOTENDSWITH"}];const R=12;const h=t.extend("sap.m.upload.FilterPanel",{metadata:{properties:{title:{type:"string",defaultValue:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("p13n.DEFAULT_TITLE_FILTER")},fields:{type:"sap.m.FilterPanelField[]",defaultValue:[]}}},renderer:{apiVersion:2}});h.prototype.applySettings=function(){t.prototype.applySettings.apply(this,arguments);this._setTemplate(this._getListTemplate())};h.prototype.init=function(){t.prototype.init.apply(this,arguments);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._bFocusOnRearrange=false;this.setEnableReorder(true);this.addStyleClass("sapMP13nQueryPanel");const e=this._createAddButton();e.setLayoutData(new m({gridColumn:`1 / ${R}`}));const n=new s({items:[this._getCSSGrid([e])]});n.addStyleClass("sapUiTinyMargin");const i=this.getAggregation("_content");i.addItem(n)};h.prototype._createInnerListControl=function(){return new n(this.getId()+"-innerP13nList",{itemPress:[this._onItemPressed,this],dragDropConfig:this._getDragDropConfig()})};h.prototype.setP13nData=function(e){e=i([],e);t.prototype.setP13nData.call(this,e);return this};h.prototype.getP13nData=function(t){const e=this._getP13nModel().getProperty("/items");return i([],e.filter(function(t){return!!t.path&&!!t.operator}))};h.prototype._getListTemplate=function(){const t=this._createKeySelect(),e=this._createFilterOperationSelect(),n=this._createSearchCriteriaInput();const i=new o({items:[new s({width:"100%",items:[t]}).addStyleClass("sapUiTinyMarginEnd"),new s({width:"100%",items:[e]})]});i.setLayoutData(new m({gridColumn:`1 / ${R}`,gridRow:"1"}));n.setLayoutData(new m({gridColumn:`1 / ${R}`,gridRow:"2"}));const p=this._createRemoveButton();p.setLayoutData(new m({gridColumn:`${R} / ${R+1}`,gridRow:"1 / 3"}));return new r({type:a.ListType.Active,content:[new s({items:[this._getCSSGrid([i,n,p])]}).addStyleClass("sapUiTinyMargin")]})};h.prototype._getCSSGrid=function(t){return new _({gridTemplateColumns:`repeat(${R-1}, 1fr) minmax(32px, 1fr)`,gridTemplateRows:"repeat(2, 1fr)",gridColumnGap:"0.3rem",items:t})};h.prototype._getAvailableItems=function(){if(!this.getFields()){return[]}return this.getFields().map(function(t){return new d({key:t.path,text:t.label})})};h.prototype._createKeySelect=function(t){return new c({width:"100%",items:this._getAvailableItems(),selectedKey:`{${this.P13N_MODEL}>path}`})};h.prototype._createFilterOperationSelect=function(t){return new u({width:"100%",selectedKey:`{${this.P13N_MODEL}>operator}`,items:y.map(function(t){return new d({key:t.operator,text:this._oRb.getText(t.label)})}.bind(this))})};h.prototype._createSearchCriteriaInput=function(t){return new l({value:`{${this.P13N_MODEL}>value}`})};h.prototype._createAddButton=function(){return new o({justifyContent:a.FlexJustifyContent.End,items:[new p({text:this._oRb.getText("p13n.ADD_FILTER_CRITERIA"),press:function(){const t=this._getP13nModel().getProperty("/items");t.push({name:T(),operator:g});this.setP13nData(t)}.bind(this)})]})};h.prototype._createRemoveButton=function(){return new s({alignItems:a.FlexAlignItems.End,justifyContent:a.FlexJustifyContent.End,items:[new p({type:a.ButtonType.Transparent,icon:"sap-icon://decline",press:function(t){let e=t.getSource();while(e&&!(e instanceof r)){e=e.getParent()}if(!(e instanceof r)){return}const n=this._getP13nModel().getProperty("/items"),i=n.indexOf(this._getModelEntry(e));n.splice(i,1);this.setP13nData(n)}.bind(this)})]})};return h});
//# sourceMappingURL=FilterPanel.js.map