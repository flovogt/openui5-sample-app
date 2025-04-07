/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/model/BindingMode","sap/ui/Device","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/InvisibleText","sap/ui/core/theming/Parameters","sap/ui/core/ShortcutHintsMixin","./library","./Button","./CheckBox","./RadioButton","./ListItemBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/core/Lib","sap/ui/dom/jquery/Selectors"],function(t,e,i,o,s,n,r,a,l,c,h,u,p,d,f,g,jQuery,y){"use strict";var I=h.ListMode;var T=h.ListType;var S=h.ButtonType;var _=o.MessageType;var m=s.extend("sap.m.ListItemBase",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.ListType",group:"Misc",defaultValue:T.Inactive},visible:{type:"boolean",group:"Appearance",defaultValue:true},unread:{type:"boolean",group:"Misc",defaultValue:false},selected:{type:"boolean",defaultValue:false},counter:{type:"int",group:"Misc",defaultValue:null},highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},detailTap:{deprecated:true},press:{},detailPress:{}},designtime:"sap/m/designtime/ListItemBase.designtime",dnd:true},renderer:f});m.getAccessibilityText=function(t,e,i){var o=y.getResourceBundleFor("sap.m");if(!t||!t.getVisible||!t.getVisible()){return e?o.getText("CONTROL_EMPTY"):""}var s;if(t.getAccessibilityInfo){s=t.getAccessibilityInfo()}if(!s||!t.getAccessibilityInfo){s=this.getDefaultAccessibilityInfo(t.getDomRef())}s=jQuery.extend({type:"",description:"",children:[]},s);var n=s.type+" "+s.description+" ",r=t.getTooltip_AsString();if(s.required===true){n+=o.getText(i?"CONTROL_IN_COLUMN_REQUIRED":"ELEMENT_REQUIRED")+" "}if(s.enabled===false){n+=o.getText("CONTROL_DISABLED")+" "}if(s.editable===false){n+=o.getText("CONTROL_READONLY")+" "}if(!s.type&&r&&n.indexOf(r)==-1){n=r+" "+n}s.children.forEach(function(t){n+=m.getAccessibilityText(t)+" "});n=n.trim();if(e&&!n){n=o.getText("CONTROL_EMPTY")}return n};m.getDefaultAccessibilityInfo=function(t){if(!t){return null}var e=[],i=window.Node,o=window.NodeFilter,s=document.createTreeWalker(t,o.SHOW_TEXT+o.SHOW_ELEMENT);while(s.nextNode()){var n=s.currentNode;if(n.nodeType===i.TEXT_NODE){var r=(n.nodeValue||"").trim();if(r){e.push(r)}}}return{description:e.join(" ")}};m.prototype.DetailIconURI=n.getIconURI("edit");m.prototype.NavigationIconURI=n.getIconURI("slim-arrow-right");m.prototype.TagName="li";m.prototype.init=function(){this._active=false;this._bGroupHeader=false;this._bNeedsHighlight=false;this._bNeedsNavigated=false};m.prototype.onBeforeRendering=function(){this._oDomRef=this.getDomRef()};m.prototype.onAfterRendering=function(){if(!this._oDomRef||this._oDomRef!==this.getDomRef()){this.informList("DOMUpdate",true)}this._oDomRef=undefined;this._checkHighlight();this._checkNavigated()};m.prototype.invalidate=function(){if(!this.bOutput){return}s.prototype.invalidate.apply(this,arguments)};m.prototype.getBindingContextPath=function(t){var e=this.getList();if(e&&!t){t=(e.getBindingInfo("items")||{}).model}var i=this.getBindingContext(t);if(i){return i.getPath()}};m.prototype.isSelectedBoundTwoWay=function(){var t=this.getBinding("selected");if(t&&t.getBindingMode()==e.TwoWay){return true}};m.prototype.getList=function(){var t=this.getParent();if(t&&t.isA("sap.m.ListBase")){return t}};m.prototype.getListProperty=function(t,e){var i=this.getList();if(i){t=g(t);return i["get"+t]()}return e};m.prototype.informList=function(t,e,i){var o=this.getList();if(o){var s="onItem"+t;if(o[s]){o[s](this,e,i)}}};m.prototype.informSelectedChange=function(t){var e=this.getList();if(e){e.onItemSelectedChange(this,t);this.bSelectedDelayed=undefined}else{this.bSelectedDelayed=t}};m.prototype.getAccessibilityType=function(t){return this.getListProperty("ariaRole")=="list"?t.getText("ACC_CTR_TYPE_LISTITEM"):""};m.prototype.getGroupAnnouncement=function(){return this.$().prevAll(".sapMGHLI:first").text()};m.prototype.getAccessibilityDescription=function(t){var e=[],i=this.getType(),o=this.getHighlight(),s=this.getListProperty("ariaRole")==="tree";if(this.getSelected()&&!s){e.push(t.getText("LIST_ITEM_SELECTED"))}if(o!==_.None){var n=this.getHighlightText();if(o in _&&!n){n=t.getText("LIST_ITEM_STATE_"+o.toUpperCase())}e.push(n)}if(this.getUnread()&&this.getListProperty("showUnread")){e.push(t.getText("LIST_ITEM_UNREAD"))}if(this.getCounter()){e.push(t.getText("LIST_ITEM_COUNTER",[this.getCounter()]))}if(i==T.Navigation){e.push(t.getText("LIST_ITEM_NAVIGATION"))}else{if(i==T.Active||i==T.DetailAndActive){e.push(t.getText("LIST_ITEM_ACTIVE"))}}var r=this.getGroupAnnouncement()||"";if(r){e.push(r)}if(this.getContentAnnouncement){var a=(this.getContentAnnouncement(t)||"").trim();a&&e.push(a)}if(this.getListProperty("ariaRole")=="list"&&!s&&this.isSelectable()&&!this.getSelected()){e.push(t.getText("LIST_ITEM_NOT_SELECTED"))}return e.join(" . ")};m.prototype.getAccessibilityInfo=function(){var t=y.getResourceBundleFor("sap.m");return{type:this.getAccessibilityType(t),description:this.getAccessibilityDescription(t),focusable:true}};m.prototype.getMode=function(){return this.getListProperty("mode","")};m.prototype.updateAccessibilityState=function(t){var e=this.$();if(!e.length){return}var i=e.parent().children(".sapMLIB");e.attr(jQuery.extend({"aria-setsize":i.length,"aria-posinset":i.index(e)+1},t))};m.prototype.getDeleteControl=function(t){if(!t||this._oDeleteControl){return this._oDeleteControl}if(!this.DeleteIconURI){m.prototype.DeleteIconURI=n.getIconURI(l.get({name:"_sap_m_ListItemBase_DeleteIcon"})||"decline")}this._oDeleteControl=new u({id:this.getId()+"-imgDel",icon:this.DeleteIconURI,type:S.Transparent,tooltip:y.getResourceBundleFor("sap.m").getText("LIST_ITEM_DELETE")}).addStyleClass("sapMLIBIconDel sapMLIBSelectD").setParent(this,null,true).attachPress(function(t){this.informList("Delete")},this);c.addConfig(this._oDeleteControl,{messageBundleKey:"LIST_ITEM_DELETE_SHORTCUT"},this._oDeleteControl);this._oDeleteControl.useEnabledPropagator(false);return this._oDeleteControl};m.prototype.onThemeChanged=function(){m.prototype.DeleteIconURI=n.getIconURI(l.get({name:"_sap_m_ListItemBase_DeleteIcon"}));if(this._oDeleteControl){this._oDeleteControl.setIcon(this.DeleteIconURI)}};m.prototype.getDetailControl=function(t){if(!t||this._oDetailControl){return this._oDetailControl}this._oDetailControl=new u({id:this.getId()+"-imgDet",icon:this.DetailIconURI,type:S.Transparent,tooltip:y.getResourceBundleFor("sap.m").getText("LIST_ITEM_EDIT")}).addStyleClass("sapMLIBType sapMLIBIconDet").setParent(this,null,true).attachPress(function(){this.fireDetailTap();this.fireDetailPress()},this);c.addConfig(this._oDetailControl,{messageBundleKey:i.os.macintosh?"LIST_ITEM_EDIT_SHORTCUT_MAC":"LIST_ITEM_EDIT_SHORTCUT"},this._oDetailControl);this._oDetailControl.useEnabledPropagator(false);return this._oDetailControl};m.prototype.getNavigationControl=function(t){if(!t||this._oNavigationControl){return this._oNavigationControl}this._oNavigationControl=new r({id:this.getId()+"-imgNav",src:this.NavigationIconURI,tooltip:y.getResourceBundleFor("sap.m").getText("LIST_ITEM_NAVIGATION_ICON"),useIconTooltip:false,decorative:false,noTabStop:true}).setParent(this,null,true).addStyleClass("sapMLIBType sapMLIBImgNav");return this._oNavigationControl};m.prototype.getSingleSelectControl=function(t){if(!t||this._oSingleSelectControl){t&&this._oSingleSelectControl.setSelected(this.getSelected());return this._oSingleSelectControl}this._oSingleSelectControl=new d({id:this.getId()+"-selectSingle",groupName:this.getListProperty("id")+"_selectGroup",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:a.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectS").setParent(this,null,true).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oSingleSelectControl.useEnabledPropagator(false);return this._oSingleSelectControl};m.prototype.getMultiSelectControl=function(t){if(!t||this._oMultiSelectControl){t&&this._oMultiSelectControl.setSelected(this.getSelected());return this._oMultiSelectControl}this._oMultiSelectControl=new p({id:this.getId()+"-selectMulti",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:a.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).addEventDelegate({onkeydown:function(t){this.informList("KeyDown",t)},onkeyup:function(t){this.informList("KeyUp",t)}},this).attachSelect(function(t){var e=t.getParameter("selected");this.setSelected(e);this.informList("Select",e)},this);this._oMultiSelectControl.useEnabledPropagator(false);return this._oMultiSelectControl};m.prototype.getModeControl=function(t){var e=this.getMode();if(!e||e==I.None){return}if(e==I.Delete){return this.getDeleteControl(t)}if(e==I.MultiSelect){return this.getMultiSelectControl(t)}return this.getSingleSelectControl(t)};m.prototype.getTypeControl=function(t){var e=this.getType();if(e==T.Detail||e==T.DetailAndActive){return this.getDetailControl(t)}if(e==T.Navigation){return this.getNavigationControl(t)}};m.prototype.destroyControls=function(t){t.forEach(function(t){t="_o"+t+"Control";if(this[t]){this[t].destroy("KeepDom");this[t]=null}},this)};m.prototype.isActionable=function(t){if(t&&!i.system.desktop){return false}return this.isIncludedIntoSelection()||this.getType()!=T.Inactive&&this.getType()!=T.Detail};m.prototype.exit=function(){this._oDomRef=null;this._oLastFocused=null;this._checkHighlight(false);this._checkNavigated(false);this.setActive(false);this.destroyControls(["Delete","SingleSelect","MultiSelect","Detail","Navigation"])};m.prototype.setHighlight=function(e){if(e==null){e=_.None}else if(!t.getType("sap.ui.core.MessageType").isValid(e)&&!t.getType("sap.ui.core.IndicationColor").isValid(e)){throw new Error('"'+e+'" is not a value of the enums sap.ui.core.MessageType or sap.ui.core.IndicationColor for property "highlight" of '+this)}return this.setProperty("highlight",e)};m.prototype.isSelectable=function(){var t=this.getMode();return!(t==I.None||t==I.Delete)};m.prototype.getSelected=function(){if(this.isSelectable()){return this.getProperty("selected")}return false};m.prototype.isSelected=m.prototype.getSelected;m.prototype.setSelected=function(t,e){t=this.validateProperty("selected",t);if(!this.isSelectable()||t==this.getSelected()){return this}if(!e){this.informSelectedChange(t)}var i=this.getModeControl();if(i){i.setSelected(t)}this.updateSelectedDOM(t,this.$());this.setProperty("selected",t,true);return this};m.prototype.updateSelectedDOM=function(t,e){e.toggleClass("sapMLIBSelected",t);if(e.attr("role")!=="listitem"){e.attr("aria-selected",t)}};m.prototype.setParent=function(t){if(!t){this.informList("Removed")}s.prototype.setParent.apply(this,arguments);this.informList("Inserted",this.bSelectedDelayed);return this};m.prototype.setBindingContext=function(){s.prototype.setBindingContext.apply(this,arguments);this.informList("BindingContextSet");return this};m.prototype.isGroupHeader=function(){return this._bGroupHeader};m.prototype.setGroupedItem=function(t){this._aGroupedItems=this._aGroupedItems||[];this._aGroupedItems.push(t.getId())};m.prototype.getGroupedItems=function(){return this._aGroupedItems};m.prototype.isIncludedIntoSelection=function(){if(!this.isSelectable()){return false}var t=this.getMode();return t==I.SingleSelectMaster||this.getListProperty("includeItemInSelection")&&(t==I.SingleSelectLeft||t==I.SingleSelect||t==I.MultiSelect)};m.prototype._checkHighlight=function(t){if(t==undefined){t=this.getVisible()&&this.getHighlight()!=_.None}if(this._bNeedsHighlight!=t){this._bNeedsHighlight=t;this.informList("HighlightChange",t)}};m.prototype._checkNavigated=function(t){if(t==undefined){t=this.getVisible()&&this.getNavigated()}if(this._bNeedsNavigated!=t){this._bNeedsNavigated=t;this.informList("NavigatedChange",t)}};m.prototype.hasActiveType=function(){var t=this.getType();return t==T.Active||t==T.Navigation||t==T.DetailAndActive};m.prototype.setActive=function(t){if(t==this._active){return this}if(t&&this.getListProperty("activeItem")){return this}var e=this.$();this._active=t;this._activeHandling(e);if(this.getType()==T.Navigation){this._activeHandlingNav(e)}if(t){this._activeHandlingInheritor(e)}else{this._inactiveHandlingInheritor(e)}this.informList("ActiveChange",t)};m.detectTextSelection=function(t){var e=window.getSelection(),i=e.toString().replace("\n","");return i&&(t!==e.focusNode&&t.contains(e.focusNode))};m.prototype.ontap=function(t){if(this._eventHandledByControl){return t.setMarked()}if(m.detectTextSelection(this.getDomRef())){return}if(this.isIncludedIntoSelection()){if(this.getMode()==I.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}}else if(this.hasActiveType()){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);if(document.activeElement!=this.getFocusDomRef()){this.focus()}setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}this.informList("Press",t.srcControl)};m.prototype.ontouchstart=function(t){this._eventHandledByControl=t.isMarked();var e=t.targetTouches[0];this._touchedY=e.clientY;this._touchedX=e.clientX;if(this._eventHandledByControl||t.touches.length!=1||!this.hasActiveType()){if(this.getListProperty("includeItemInSelection")&&this.getList()._mRangeSelection){t.preventDefault()}return}this._timeoutIdStart=setTimeout(function(){this.setActive(true)}.bind(this),100)};m.prototype.ontouchmove=function(t){if((this._active||this._timeoutIdStart)&&(Math.abs(this._touchedY-t.targetTouches[0].clientY)>10||Math.abs(this._touchedX-t.targetTouches[0].clientX)>10)){clearTimeout(this._timeoutIdStart);this._timeoutIdStart=null;this._timeoutIdEnd=null;this.setActive(false)}};m.prototype.ontouchend=function(t){if(this.hasActiveType()){this._timeoutIdEnd=setTimeout(function(){this.setActive(false)}.bind(this),100)}};m.prototype.ontouchcancel=m.prototype.ontouchend;m.prototype.ondragend=m.prototype.ontouchend;m.prototype._activeHandlingNav=function(){};m.prototype._activeHandlingInheritor=function(){};m.prototype._inactiveHandlingInheritor=function(){};m.prototype._activeHandling=function(t){t.toggleClass("sapMLIBActive",this._active);if(this.isActionable(true)){t.toggleClass("sapMLIBHoverable",!this._active)}};m.prototype.onsapspace=function(t){if(t.srcControl!==this||t.target!==this.getDomRef()){return}t.preventDefault();if(t.isMarked()||!this.isSelectable()){return}if(this.getMode()==I.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected())}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true)}t.setMarked()};m.prototype.onsapenter=function(t){var e=this.getList();if(t.isMarked()||!e){return}if(t.srcControl!==this||t.target!==this.getDomRef()){return}if(this.isIncludedIntoSelection()){t.type="sapspace";this.onsapspace(t)}else if(this.hasActiveType()){t.setMarked();this.setActive(true);setTimeout(function(){this.setActive(false)}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress()}.bind(this),0)}e.onItemPress(this,t.srcControl)};m.prototype.onsapdelete=function(t){if(t.isMarked()||t.srcControl!==this||this.getMode()!=I.Delete||t.target!==this.getDomRef()){return}this.informList("Delete");t.preventDefault();t.setMarked()};m.prototype.onkeydown=function(t){if(t.isMarked()){return}if(t.code=="KeyE"&&(t.metaKey||t.ctrlKey)){if(t.target===this.getDomRef()&&(this.hasListeners("detailPress")||this.hasListeners("detailTap"))){this.fireDetailTap();this.fireDetailPress();t.preventDefault();t.setMarked()}}if(t.srcControl!==this||t.target!==this.getDomRef()){return}this.informList("KeyDown",t)};m.prototype.onkeyup=function(t){if(t.isMarked()||t.srcControl!==this||t.target!==this.getDomRef()){return}this.informList("KeyUp",t)};m.prototype.onsapupmodifiers=function(t){if(t.isMarked()){return}this.informList("UpDownModifiers",t,-1)};m.prototype.onsapdownmodifiers=function(t){if(t.isMarked()){return}this.informList("UpDownModifiers",t,1)};m.prototype.getTabbables=function(t){return this.$(t?"content":"").find(":sapTabbable")};m.prototype.onfocusin=function(t){const e=this.getList();if(!e||t.isMarked()){return}this.informList("FocusIn",t.srcControl,t);t.setMarked()};m.prototype.onfocusout=function(t){if(t.isMarked()||t.srcControl!==this){return}this.informList("FocusOut",t.srcControl);t.setMarked()};m.prototype.onsapup=m.prototype.onsapdown=function(t){if(t.isMarked()||t.srcControl===this||t.target instanceof HTMLInputElement||t.target instanceof HTMLTextAreaElement||t.target.classList.contains("sapMTblCellFocusable")){return}this.informList("ArrowUpDown",t)};m.prototype.oncontextmenu=function(t){if(this._bGroupHeader){return}if(t.srcControl==this.getModeControl()||document.activeElement.matches(".sapMLIB,.sapMListTblCell,.sapMListTblSubRow")){this.informList("ContextMenu",t)}};return m});
//# sourceMappingURL=ListItemBase.js.map