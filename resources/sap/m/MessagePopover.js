/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./ResponsivePopover","./Button","./Toolbar","./Bar","sap/ui/core/Control","sap/ui/core/IconPool","./semantic/SemanticPage","./Popover","./MessageView","./MessageItem","sap/ui/Device","./MessagePopoverRenderer","sap/base/Log","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/jquery"],function(e,t,o,s,i,n,r,a,p,g,l,c,h,u,d,jQuery){"use strict";var f=n.extend("sap.m.MessagePopover",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"function",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"function",group:"Behavior",defaultValue:null},placement:{type:"sap.m.VerticalPlacementType",group:"Behavior",defaultValue:"Vertical"},initiallyExpanded:{type:"boolean",group:"Behavior",defaultValue:true},groupItems:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessageItem",multiple:true,singularName:"item",forwarding:{getter:"_getMessageView",aggregation:"items"}},headerButton:{type:"sap.m.Button",multiple:false,forwarding:{idSuffix:"-messageView",aggregation:"headerButton"}}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},itemSelect:{parameters:{item:{type:"sap.m.MessageItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}},longtextLoaded:{},urlValidated:{},activeTitlePress:{parameters:{item:{type:"sap.m.MessageItem"}}}}},renderer:h});function _(e){return e.charAt(0).toUpperCase()+e.slice(1)}var y="sapMMsgPopover",m="320px",v="440px",P={back:r.getIconURI("nav-back"),close:r.getIconURI("decline"),information:r.getIconURI("message-information"),warning:r.getIconURI("message-warning"),error:r.getIconURI("message-error"),success:r.getIconURI("message-success")},M=["asyncDescriptionHandler","asyncURLHandler"],B={asyncDescriptionHandler:function(e){var t=e.item.getLongtextUrl();if(t){jQuery.ajax({type:"GET",url:t,success:function(t){e.item.setDescription(t);e.promise.resolve()},error:function(){var o="A request has failed for long text data. URL: "+t;u.error(o);e.promise.reject(o)}})}}};f.setDefaultHandlers=function(e){M.forEach(function(t){if(e.hasOwnProperty(t)){B[t]=e[t]}})};f.prototype.init=function(){var s=this;var i;this._oOpenByControl=null;this._oResourceBundle=e.getLibraryResourceBundle("sap.m");this._oMessageView=this._initMessageView();this._oMessageView.addEventDelegate({onBeforeRendering:function(){var e=s._oMessageView._oSegmentedButton.getVisible(),t=!s.getInitiallyExpanded()||e;s._oMessageView._oSegmentedButton.setVisible(t);s._oMessageView._listPage.setShowHeader(true)}});this._insertCloseBtn(this._oMessageView._oListHeader);this._insertCloseBtn(this._oMessageView._oDetailsHeader);this._oMessageView._oSegmentedButton.attachEvent("select",this._onSegButtonSelect,this);this._oPopover=new t(this.getId()+"-messagePopover",{showHeader:false,contentWidth:v,contentHeight:m,placement:this.getPlacement(),showCloseButton:false,verticalScrolling:false,horizontalScrolling:false,modal:false,afterOpen:function(e){s.fireAfterOpen({openBy:e.getParameter("openBy")});s.getInitiallyExpanded()&&s._oMessageView._restoreFocus()},afterClose:function(e){s._oMessageView._navContainer.removeAllPages().forEach(function(e){s._oMessageView._navContainer.addPage(e)});s.fireAfterClose({openBy:e.getParameter("openBy")})},beforeOpen:function(e){var t=s.getItems();if(!s.getBindingInfo("items")&&!t.length){s._bindToMessageModel()}s.fireBeforeOpen({openBy:e.getParameter("openBy")})},beforeClose:function(e){s.fireBeforeClose({openBy:e.getParameter("openBy")})}}).addStyleClass(y);this._oPopover._setAriaModal(false);this._oPopover.addContent(this._oMessageView);this._oPopover.addAssociation("ariaLabelledBy",this.getId()+"-messageView-HeadingDescr",true);i=this._oPopover.getAggregation("_popup");i.oPopup.setAutoClose(false);i.addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopover,onAfterRendering:this.onAfterRenderingPopover},this);if(c.system.phone){this._oPopover.setBeginButton(new o({text:this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),press:this.close.bind(this)}))}M.forEach(function(e){if(B.hasOwnProperty(e)){this["set"+_(e)](B[e])}},this);this._observeItems()};f.prototype._bindToMessageModel=function(){var t=this;this.setModel(e.getMessageManager().getMessageModel(),"message");this._oMessageItemTemplate=new l({type:"{message>type}",title:"{message>message}",description:"{message>description}",longtextUrl:"{message>longtextUrl}"});this.bindAggregation("items",{path:"message>/",template:t._oMessageItemTemplate})};f.prototype._observeItems=function(){var e=new d(function(e){var t=e.mutation;var o=e.child;switch(t){case"insert":o.attachEvent("_change",this.invalidate,this);break;case"remove":o.detachEvent("_change",this.invalidate,this);break;default:break}}.bind(this));e.observe(this._oMessageView,{aggregations:["items"]})};f.prototype.onBeforeRendering=function(){if(this.getDependents().indexOf(this._oPopover)===-1){this.addDependent(this._oPopover)}this._oPopover.setPlacement(this.getPlacement())};f.prototype.onBeforeRenderingPopover=function(){this._setInitialFocus();if(this._oOpenByControl&&!this._oOpenByControl.getVisible()){this._oPopover.close()}this._syncMessageView()};f.prototype.onAfterRenderingPopover=function(){if(this._oPopover._oControl._sFocusControlId){this._oPopover._oControl._sFocusControlId=null}};f.prototype.exit=function(){this._oResourceBundle=null;this._oOpenByControl=null;if(this._oMessageView){this._oMessageView.destroy();this._oMessageView=null}if(this._oPopover){this._oPopover.destroy();this._oPopover=null}};f.prototype.openBy=function(e){var t=this._oPopover.getAggregation("_popup"),o=e.getParent();this._oOpenByControl=e;if(t instanceof p){if(o instanceof s||o instanceof i||o instanceof a){t._minDimensions={width:400,height:128};t.setShowArrow(false);t.setResizable(true)}else{t.setShowArrow(true)}}if(this._oPopover){this._restoreExpansionDefaults();this._oPopover.openBy(e)}return this};f.prototype.close=function(){if(this._oPopover){this._oPopover.close()}return this};f.prototype.isOpen=function(){return this._oPopover?this._oPopover.isOpen():false};f.prototype.toggle=function(e){if(this.isOpen()){this.close()}else{this.openBy(e)}return this};f.prototype.getDomRef=function(e){return this._oPopover&&this._oPopover.getAggregation("_popup").getDomRef(e)};f.prototype._initMessageView=function(){var e=this,t;t=new g(this.getId()+"-messageView",{activeTitlePress:function(t){if(c.system.phone){e.close()}e.fireActiveTitlePress({item:t.getParameter("item")})},listSelect:function(t){e.fireListSelect({messageTypeFilter:t.getParameter("messageTypeFilter")})},itemSelect:function(t){e.fireItemSelect({messageTypeFilter:t.getParameter("messageTypeFilter"),item:t.getParameter("item")})},longtextLoaded:function(){e.fireLongtextLoaded()},urlValidated:function(){e.fireUrlValidated()}});t._makeAutomaticBinding=function(){var t=e.getItems();if(!e.getBindingInfo("items")&&!t.length){this._bindToMessageModel()}};return t};f.prototype._onSegButtonSelect=function(){if(this.isOpen()&&!this.getInitiallyExpanded()&&this._oPopover.hasStyleClass(y+"-init")){this._expandMsgPopover()}};f.prototype._restoreExpansionDefaults=function(){if(this._oMessageView&&!this.getInitiallyExpanded()&&this.getItems().length!=1){this._collapseMsgPopover();this._oMessageView._oSegmentedButton.setSelectedButton("none")}else{this._expandMsgPopover()}};f.prototype._expandMsgPopover=function(){var e=m,t=this._oPopover.$("cont").css("height");if(this.getInitiallyExpanded()&&t!=="0px"){e=parseFloat(t)?t:e}this._oPopover.setContentHeight(e).removeStyleClass(y+"-init")};f.prototype._collapseMsgPopover=function(){this._oPopover.addStyleClass(y+"-init").setContentHeight("auto")};f.prototype._insertCloseBtn=function(e){var t=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),s=new o({icon:P["close"],visible:!c.system.phone,tooltip:t,press:this.close.bind(this)}).addStyleClass(y+"CloseBtn");e.insertContent(s,3,true)};f.prototype._setInitialFocus=function(){if(this._oMessageView&&this._oMessageView._isListPage()&&this.getInitiallyExpanded()){this._oPopover.setInitialFocus(this._oMessageView._oLists[this._sCurrentList||"all"])}};f.prototype._syncMessageView=function(){if(this._oMessageView){this._oMessageView.setProperty("asyncDescriptionHandler",this.getAsyncDescriptionHandler(),true);this._oMessageView.setProperty("asyncURLHandler",this.getAsyncURLHandler(),true);this._oMessageView.setProperty("groupItems",this.getGroupItems(),false)}};f.prototype._getMessageView=function(){return this._oMessageView};f.prototype.setModel=function(e,t){if(this._oMessageView){this._oMessageView.setModel(e,t)}return n.prototype.setModel.apply(this,arguments)};f.prototype.navigateBack=function(){if(this._oMessageView){this._oMessageView.navigateBack()}};["invalidate","addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","getBusyIndicatorDelay","setBusyIndicatorDelay","getVisible","setVisible","getBusy","setBusy"].forEach(function(e){f.prototype[e]=function(){if(this._oPopover&&this._oPopover[e]){var t=this._oPopover;var o=t[e].apply(t,arguments);return o===t?this:o}}});["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(e){f.prototype["_"+e+"Old"]=f.prototype[e];f.prototype[e]=function(){var t=f.prototype["_"+e+"Old"].apply(this,arguments);this._bItemsChanged=true;if(this._oPopover){this._oPopover.invalidate()}if(["removeAggregation","removeAllAggregation"].indexOf(e)!==-1){return t}return this}});return f});
//# sourceMappingURL=MessagePopover.js.map