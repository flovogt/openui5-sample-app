/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./SearchField","./Table","./library","sap/ui/core/Lib","sap/ui/core/library","./SelectDialogBase","sap/ui/core/InvisibleText","sap/ui/core/InvisibleMessage","sap/ui/core/StaticArea","sap/ui/Device","sap/m/Toolbar","sap/m/Text","sap/m/BusyIndicator","sap/m/Bar","sap/m/Title","sap/base/Log","sap/ui/core/Element"],function(e,t,i,o,s,a,n,l,r,h,u,d,c,g,p,_,f,y,b){"use strict";var S=s.ListMode;var m=s.ButtonType;var T=s.TitleAlignment;var C=n.InvisibleMessageMode;var I=n.TitleLevel;var B=l.extend("sap.m.TableSelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growing:{type:"boolean",group:"Behavior",defaultValue:true},growingThreshold:{type:"int",group:"Misc",defaultValue:null},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showClearButton:{type:"boolean",group:"Behavior",defaultValue:false},confirmButtonText:{type:"string",group:"Appearance"},draggable:{type:"boolean",group:"Behavior",defaultValue:false},resizable:{type:"boolean",group:"Behavior",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:T.Auto},searchPlaceholder:{type:"string",group:"Appearance"}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ColumnListItem",multiple:true,singularName:"item",bindable:"bindable",forwarding:{idSuffix:"-table",aggregation:"items",forwardBinding:true}},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},columns:{type:"sap.m.Column",multiple:true,singularName:"column",bindable:"bindable",forwarding:{idSuffix:"-table",aggregation:"columns",forwardBinding:true}}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"object[]"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}},renderer:{apiVersion:2,render:function(){}}});B.prototype.init=function(){var e=this,n=0;this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._oRb=a.getResourceBundleFor("sap.m");this._bAfterCloseAttached=false;this._oItemDelegate={ontap:this._tableColumnsEventDelegates.bind(this),onsapselect:this._tableColumnsEventDelegates.bind(this)};this._oTable=new o(this.getId()+"-table",{growing:e.getGrowing(),growingScrollToLoad:e.getGrowing(),mode:S.SingleSelectMaster,modeAnimationOn:false,sticky:[s.Sticky.InfoToolbar,s.Sticky.ColumnHeaders],infoToolbar:new c({visible:false,active:false,content:[new g({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),ariaLabelledBy:l.getInvisibleText(),selectionChange:this._selectionChange.bind(this),updateStarted:this._updateStarted.bind(this),updateFinished:this._updateFinished.bind(this),popinChanged:function(e){if(e.getParameter("hasPopin")){this._oTable.getItems().forEach(function(e){e._oPopin?.addEventDelegate(this._oItemDelegate)},this)}}.bind(this)});this._table=this._oTable;this._oBusyIndicator=new p(this.getId()+"-busyIndicator").addStyleClass("sapMTableSelectDialogBusyIndicator",true);this._oSearchField=new i(this.getId()+"-searchField",{width:"100%",ariaLabelledBy:r.getStaticId("sap.m","SELECTDIALOG_SEARCH"),liveChange:function(t){var i=t.getSource().getValue(),o=i?300:0;clearTimeout(n);if(o){n=setTimeout(function(){e._executeSearch(i,false,"liveChange")},o)}else{e._executeSearch(i,false,"liveChange")}},search:function(t){var i=t.getSource().getValue(),o=t.getParameter("clearButtonPressed");e._executeSearch(i,o,"search")}});this._searchField=this._oSearchField;this._oSubHeader=new _(this.getId()+"-subHeader",{contentMiddle:[this._searchField]});var h=new _(this.getId()+"-dialog-header",{titleAlignment:this.getTitleAlignment(),contentMiddle:[new f(this.getId()+"-dialog-title",{level:I.H1})]});this._oDialog=new t(this.getId()+"-dialog",{customHeader:h,titleAlignment:this.getTitleAlignment(),stretch:d.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oTable],endButton:this._getCancelButton(),draggable:this.getDraggable()&&d.system.desktop,resizable:this.getResizable()&&d.system.desktop,escapeHandler:function(t){e._onCancel();t.resolve()}}).addStyleClass("sapMTableSelectDialog");this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);this._sSearchFieldValue="";this._iTableUpdateRequested=0;this._oDialog.getProperty=function(e){if(e!=="title"){return l.prototype.getProperty.call(this,e)}return this.getCustomHeader().getAggregation("contentMiddle")[0].getText()}.bind(this._oDialog)};B.prototype.exit=function(){this._oTable=null;this._oSearchField=null;this._oSubHeader=null;this._oClearButton=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iTableUpdateRequested=null;this._bInitBusy=false;this._bFirstRender=false;if(this._bAppendedToUIArea){var e=u.getUIArea();e.removeContent(this,true)}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null}this._oSelectedItem=null;this._aSelectedItems=null;this._aInitiallySelectedItems=null;this._table=null;this._searchField=null;this._dialog=null};B.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false;this._bFirstRender=false}};B.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments)}else{l.prototype.invalidate.apply(this,arguments)}return this};B.prototype.open=function(e){if(!this.getParent()&&!this._bAppendedToUIArea){var t=u.getUIArea();t.addContent(this,true);this._bAppendedToUIArea=true}this._oSearchField.setValue(e);this._sSearchFieldValue=e||"";this._oDialog.setInitialFocus(this._getInitialFocus());this._updateSelectionIndicator();this.updateDialogAriaDescribedBy();this._oDialog.open();if(this._bInitBusy){this._setBusy(true)}this._aInitiallySelectedItems=this._oTable.getSelectedItems();return this};B.prototype.setGrowing=function(e){this._oTable.setGrowing(e);this._oTable.setGrowingScrollToLoad(e);this.setProperty("growing",e,true);return this};B.prototype.setGrowingThreshold=function(e){this._oTable.setGrowingThreshold(e);this.setProperty("growingThreshold",e,true);return this};B.prototype.setDraggable=function(e){this._setInteractionProperty(e,"draggable",this._oDialog.setDraggable);return this};B.prototype.setResizable=function(e){this._setInteractionProperty(e,"resizable",this._oDialog.setResizable);return this};B.prototype._setInteractionProperty=function(e,t,i){this.setProperty(t,e,true);if(!d.system.desktop&&e){y.warning(t+" property works only on desktop devices!");return}if(d.system.desktop&&this._oDialog){i.call(this._oDialog,e)}};B.prototype.setBusy=function(e){this._oSearchField.setEnabled(!e);this._oDialog.setBusy.apply(this._oDialog,arguments);return this};B.prototype.getBusy=function(){return this._oDialog.getBusy.apply(this._oDialog,arguments)};B.prototype.setBusyIndicatorDelay=function(e){this._oTable.setBusyIndicatorDelay(e);this._oDialog.setBusyIndicatorDelay(e);this.setProperty("busyIndicatorDelay",e,true);return this};B.prototype.setMultiSelect=function(e){this.setProperty("multiSelect",e,true);if(e){this._oTable.setMode(S.MultiSelect);this._oTable.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton())}else{this._oTable.setMode(S.SingleSelectMaster);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.destroyBeginButton();delete this._oOkButton}return this};B.prototype.setTitle=function(e){this.setProperty("title",e,true);this._oDialog.getCustomHeader().getAggregation("contentMiddle")[0].setText(e);return this};B.prototype.setTitleAlignment=function(e){this.setProperty("titleAlignment",e);if(this._oDialog){this._oDialog.setTitleAlignment(e)}return this};B.prototype.setConfirmButtonText=function(e){this.setProperty("confirmButtonText",e,true);this._oOkButton&&this._oOkButton.setText(e||this._oRb.getText("SELECT_CONFIRM_BUTTON"));return this};B.prototype.setNoDataText=function(e){this._oTable.setNoDataText(e);return this};B.prototype.getNoDataText=function(){return this._oTable.getNoDataText()};B.prototype.setSearchPlaceholder=function(e){this.setProperty("searchPlaceholder",e);this._oSearchField.setPlaceholder(e);return this};B.prototype.getSearchPlaceholder=function(){return this._oSearchField.getPlaceholder()};B.prototype.getContentWidth=function(){return this._oDialog.getContentWidth()};B.prototype.setContentWidth=function(e){this._oDialog.setContentWidth(e);return this};B.prototype.getContentHeight=function(){return this._oDialog.getContentHeight()};B.prototype.setContentHeight=function(e){this._oDialog.setContentHeight(e);return this};B.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this};B.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this};B.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this};B.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments)};B.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments)}else{return null}};B.prototype.setShowClearButton=function(e){this.setProperty("showClearButton",e,true);if(e){var t=this._oDialog.getCustomHeader();t.addContentRight(this._getClearButton());this._oClearButton.setVisible(e)}else if(this._oClearButton){this._oClearButton.setVisible(e)}return this};B.prototype.setModel=function(e,t){this._setBusy(false);this._bInitBusy=false;this._iTableUpdateRequested+=1;this._oTable.setModel(e,t);l.prototype.setModel.apply(this,arguments);this._updateSelectionIndicator();return this};B.prototype.setBindingContext=function(e,t){this._oTable.setBindingContext(e,t);l.prototype.setBindingContext.apply(this,arguments);return this};B.prototype._executeSearch=function(e,t,i){var o=this._oTable,s=o?o.getBinding("items"):undefined,a=this._sSearchFieldValue!==e;if(this._oDialog.isOpen()&&(a&&i==="liveChange"||i==="search")){this._sSearchFieldValue=e;if(s){this._iTableUpdateRequested+=1;if(i==="search"){this.fireSearch({value:e,itemsBinding:s,clearButtonPressed:t})}else if(i==="liveChange"){this.fireLiveChange({value:e,itemsBinding:s})}}else{if(i==="search"){this.fireSearch({value:e,clearButtonPressed:t})}else if(i==="liveChange"){this.fireLiveChange({value:e})}}}return this};B.prototype._resetAfterClose=function(){this._oSelectedItem=this._oTable.getSelectedItem();this._aSelectedItems=this._oTable.getSelectedItems();this._bAfterCloseAttached=false;this._fireConfirmAndUpdateSelection()};B.prototype._selectionChange=function(e){if(e.getParameters){this.fireSelectionChange(e.getParameters())}if(!this._oDialog){return}if(this.getMultiSelect()){this._updateSelectionIndicator();this._announceSelectionIndicator();return}if(!this._bAfterCloseAttached){this._oDialog.attachEventOnce("afterClose",this._resetAfterClose,this);this._bAfterCloseAttached=true}this._oDialog.close()};B.prototype._setBusy=function(e){if(this._iTableUpdateRequested){if(e){this._oSearchField.setEnabled(false);this._oTable.addStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","inline-block")}else{this._oSearchField.setEnabled(true);this._oTable.removeStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","none")}}};B.prototype._updateStarted=function(e){this.fireUpdateStarted(e.getParameters());if(this.getModel()&&this.getModel().isA("sap.ui.model.odata.ODataModel")){if(this._oDialog.isOpen()&&this._iTableUpdateRequested){this._setBusy(true)}else{this._bInitBusy=true}}};B.prototype._updateFinished=function(e){this.fireUpdateFinished(e.getParameters());this._updateSelectionIndicator();if(this.getModel()&&this.getModel().isA("sap.ui.model.odata.ODataModel")){this._setBusy(false);this._bInitBusy=false}this._iTableUpdateRequested=0;this._oTable.getItems().forEach(function(e){e.addEventDelegate(this._oItemDelegate);e._oPopin?.addEventDelegate(this._oItemDelegate)},this)};B.prototype._getOkButton=function(){var t=this,i=null;i=function(){t._sSearchFieldValue=null;t._oSelectedItem=t._oTable.getSelectedItem();t._aSelectedItems=t._oTable.getSelectedItems();t._oDialog.detachAfterClose(i);t._fireConfirmAndUpdateSelection()};if(!this._oOkButton){this._oOkButton=new e(this.getId()+"-ok",{type:m.Emphasized,text:this.getConfirmButtonText()||this._oRb.getText("SELECT_CONFIRM_BUTTON"),press:function(){t._oDialog.attachAfterClose(i);t._oDialog.close()}})}return this._oOkButton};B.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new e(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(){t._onCancel()}})}return this._oCancelButton};B.prototype._getClearButton=function(){if(!this._oClearButton){this._oClearButton=new e(this.getId()+"-clear",{text:this._oRb.getText("TABLESELECTDIALOG_CLEARBUTTON"),press:function(){this._removeSelection();this._updateSelectionIndicator();this._getInitialFocus().focus()}.bind(this)})}return this._oClearButton};B.prototype._onCancel=function(e){var t=this,i=null;i=function(){t._oSelectedItem=null;t._aSelectedItems=[];t._sSearchFieldValue=null;t._oDialog.detachAfterClose(i);t.fireCancel()};t._resetSelection();this._oDialog.attachAfterClose(i);this._oDialog.close()};B.prototype._updateSelectionIndicator=function(){var e=this._oTable.getSelectedContextPaths(true).length,t=this._oTable.getInfoToolbar();if(this.getShowClearButton()&&this._oClearButton){this._oClearButton.setEnabled(e>0)}t.setVisible(!!e);t.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[e]));l.getSelectionIndicatorInvisibleText().setText(e>0?this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS_SR",[e]):"")};B.prototype._announceSelectionIndicator=function(){const e=this._oTable.getSelectedContextPaths(true).length;if(e){h.getInstance().announce(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS_SR",[e]),C.Polite)}};B.prototype._fireConfirmAndUpdateSelection=function(){var e={selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems};Object.defineProperty(e,"selectedContexts",{get:this._oTable.getSelectedContexts.bind(this._oTable,true)});this.fireConfirm(e);this._updateSelection()};B.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._removeSelection()}};B.prototype._removeSelection=function(){this._oTable.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems};B.prototype._resetSelection=function(){var e=0;if(!this.bIsDestroyed){var t=this._oTable.getBinding("items");if(t&&t.aFilters&&t.aFilters.length){t.filter([])}this._oTable.removeSelections();for(;e<this._aInitiallySelectedItems.length;e++){this._oTable.setSelectedItem(this._aInitiallySelectedItems[e])}}};B.prototype._tableColumnsEventDelegates=function(e){let t=e.target.closest(".sapMLIB"),i;if(!t){t=e.target.closest(".sapMListTblSubRow");const o=b.closestTo(t);i=o.getParent()}else{i=b.closestTo(t)}if(i._eventHandledByControl){return}if(e&&e.isDefaultPrevented&&e.isMarked&&(e.isDefaultPrevented()||e.isMarked("preventSelectionChange"))){return}if(e&&e.srcControl.isA("sap.m.GroupHeaderListItem")){return}this._selectionChange(e)};return B});
//# sourceMappingURL=TableSelectDialog.js.map