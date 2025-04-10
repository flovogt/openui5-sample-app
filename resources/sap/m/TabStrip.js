/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Control","sap/ui/core/ControlBehavior","sap/ui/core/Element","sap/ui/core/IconPool","sap/ui/core/Lib","sap/ui/core/RenderManager","sap/ui/core/delegate/ItemNavigation","sap/ui/base/ManagedObject","sap/ui/core/delegate/ScrollEnablement","./AccButton","./TabStripItem","sap/m/Select","sap/m/SelectList","sap/ui/Device","sap/ui/core/Renderer","sap/ui/core/ResizeHandler","sap/m/library","sap/ui/core/Icon","sap/m/Image","sap/m/SelectRenderer","sap/m/SelectListRenderer","./TabStripRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/Theming","sap/ui/core/Configuration","sap/ui/base/Object","sap/ui/dom/jquery/scrollLeftRTL"],function(t,e,i,o,s,r,n,a,l,c,h,p,g,f,d,m,u,I,_,S,y,v,T,A,jQuery,b,C,L,R){"use strict";var w=I.SelectType;var B=I.ButtonType;var E=e.extend("sap.m.TabStrip",{metadata:{library:"sap.m",properties:{hasSelect:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{items:{type:"sap.m.TabStripItem",multiple:true,singularName:"item"},addButton:{type:"sap.m.Button",multiple:false,singularName:"addButton"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"},_rightArrowButton:{type:"sap.m.AccButton",multiple:false,visibility:"hidden"},_leftArrowButton:{type:"sap.m.AccButton",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.m.TabStripItem",group:"Misc"}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabStripItem"}}},itemPress:{parameters:{item:{type:"sap.m.TabStripItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}}}},constructor:function(t,e){var i=false;if(!e&&typeof t==="object"){e=t}if(e){i=e["hasSelect"];delete e["hasSelect"]}l.prototype.constructor.apply(this,arguments);this.setProperty("hasSelect",i,true)},renderer:T});var O=r.getResourceBundleFor("sap.m");E.ICON_BUTTONS={LeftArrowButton:"slim-arrow-left",RightArrowButton:"slim-arrow-right",DownArrowButton:d.system.phone?"navigation-down-arrow":"slim-arrow-down",AddButton:"add"};E.SELECT_ITEMS_ID_SUFFIX="-SelectItem";E.SCROLL_SIZE=320;E.MIN_DRAG_OFFSET=d.support.touch?15:5;E.SCROLL_ANIMATION_DURATION=function(){var t=i.getAnimationMode();return t!==L.AnimationMode.none&&t!==L.AnimationMode.minimal?500:0}();E.prototype.init=function(){this._bDoScroll=!d.system.phone;this._bRtl=t.getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;this._bThemeApplied=false;this._handleThemeAppliedBound=this._handleThemeApplied.bind(this);if(!d.system.phone){this._oScroller=new c(this,this.getId()+"-tabs",{horizontal:true,vertical:false,nonTouchScrolling:true})}};E.prototype.exit=function(){this._bRtl=null;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;this._oTouchStartX=null;if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._sResizeListenerId){u.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this._removeItemNavigation()};E.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){u.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};E.prototype.onAfterRendering=function(){if(this._oScroller){this._oScroller.setIconTabBar(this,jQuery.proxy(this._handleOverflowButtons,this),null)}this._addItemNavigation();if(!d.system.phone){this._oScroller._$Container=this.$("tabsContainer");this._adjustScrolling();if(this.getSelectedItem()){if(!this._bThemeApplied){C.attachApplied(this._handleThemeAppliedBound)}else{this._handleInititalScrollToItem()}}this._sResizeListenerId=u.register(this.getDomRef(),jQuery.proxy(this._adjustScrolling,this))}else{this.$().toggleClass("sapUiSelectable",this.getItems().length>1)}};E.prototype._handleInititalScrollToItem=function(){var t=o.getElementById(this.getSelectedItem());if(t&&t.$().length>0){this._scrollIntoView(t,500)}};E.prototype.getFocusDomRef=function(){var t=o.getElementById(this.getSelectedItem());if(!t){return null}return t.getDomRef()};E.prototype.applyFocusInfo=function(t){if(t.focusDomRef){jQuery(t.focusDomRef).trigger("focus")}};E.prototype._addItemNavigation=function(){var t=this.getDomRef("tabsContainer"),e=this.getItems(),i=[];e.forEach(function(t){var e=t.getDomRef();jQuery(e).attr("tabindex","-1");i.push(e)});if(!this._oItemNavigation){this._oItemNavigation=new a}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(i);this._oItemNavigation.setCycling(false);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt","meta"],sapend:["meta"]});this.addDelegate(this._oItemNavigation)};E.prototype._checkScrolling=function(){var t=this.getDomRef("tabs"),e=t&&t.scrollWidth>this.getDomRef("tabsContainer").offsetWidth;this.$().toggleClass("sapMTSScrollable",e);return e};E.prototype.onkeyup=function(t){if(t&&t.keyCode===b.ARROW_LEFT||t.keyCode===b.ARROW_RIGHT){var e=o.closestTo(t.target);this._scrollIntoView(e,500)}};E.prototype._handleOverflowButtons=function(){var t=this.getDomRef("tabs"),e=this.getDomRef("tabsContainer"),i,o,s,r=false,a=false,l=this._checkScrolling();if(l&&!this.getAggregation("_rightArrowButton")&&!this.getAggregation("_leftArrowButton")){this._getLeftArrowButton();this._getRightArrowButton();var c=(new n).getInterface();this.getRenderer().renderRightOverflowButtons(c,this,true);this.getRenderer().renderLeftOverflowButtons(c,this,true);c.destroy()}if(l&&t&&e){if(this._bRtl){i=jQuery(e).scrollLeftRTL()}else{i=e.scrollLeft}o=t.scrollWidth;s=e.clientWidth;if(Math.abs(o-s)===1){o=s}if(i>0){if(this._bRtl){a=true}else{r=true}}if(o>s&&i+s<o){if(this._bRtl){r=true}else{a=true}}this.$().toggleClass("sapMTSScrollBack",r).toggleClass("sapMTSScrollForward",a)}else{this.$().toggleClass("sapMTSScrollBack",false).toggleClass("sapMTSScrollForward",false)}};E.prototype._adjustScrolling=function(){this._iMaxOffsetLeft=Math.abs(this.$("tabsContainer").width()-this.$("tabs").width());this._handleOverflowButtons()};E.prototype._getLeftArrowButton=function(){return this._getArrowButton("_leftArrowButton",O.getText("TABSTRIP_SCROLL_BACK"),E.ICON_BUTTONS.LeftArrowButton,-E.SCROLL_SIZE)};E.prototype._getRightArrowButton=function(){return this._getArrowButton("_rightArrowButton",O.getText("TABSTRIP_SCROLL_FORWARD"),E.ICON_BUTTONS.RightArrowButton,E.SCROLL_SIZE)};E.prototype._getArrowButton=function(t,e,i,o){var r=this.getAggregation(t),n=this;if(!r){r=new h({type:B.Transparent,icon:s.getIconURI(i),tooltip:e,tabIndex:"-1",ariaHidden:"true",press:function(t){n._scroll(o,E.SCROLL_ANIMATION_DURATION)}});this.setAggregation(t,r,true)}return r};E.prototype._removeItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};E.prototype._scroll=function(t,e){var i=this.getDomRef("tabsContainer").scrollLeft,o;if(this._bRtl){o=i-t;if(d.browser.firefox){if(o<-this._iMaxOffsetLeft){o=-this._iMaxOffsetLeft}if(o>0){o=0}}}else{o=i+t;if(o<0){o=0}if(o>this._iMaxOffsetLeft){o=this._iMaxOffsetLeft}}this._oScroller.scrollTo(o,0,e);this._iCurrentScrollLeft=o};E.prototype._scrollIntoView=function(t,e){var i=this.$("tabs"),o=t.$(),s=this.$("leftOverflowButtons")?this.$("leftOverflowButtons").width():0,r=this.$("rightOverflowButtons")?this.$("rightOverflowButtons").width():0,n=i.innerWidth()-i.width(),a=o.outerWidth(true),l=o.position().left-n/2,c=this.getDomRef("tabsContainer"),h=c.scrollLeft,p=this.$("tabsContainer").width(),g=h;if(l<s||l+r>p-a){if(this._bRtl&&d.browser.firefox){if(l>s){g+=l+a-p+r}else{g+=l-s}}else{if(l<s){g+=l-r}else{g+=l+a-p+s}}this._iCurrentScrollLeft=g;this._oScroller.scrollTo(g,0,e)}};E.prototype._createSelect=function(t){var e,i,o,r={type:w.IconOnly,autoAdjustWidth:true,maxWidth:"2.5rem",icon:s.getIconURI(E.ICON_BUTTONS.DownArrowButton),tooltip:O.getText("TABSTRIP_OPENED_TABS"),change:function(t){i=t.getParameters()["selectedItem"];o=this._findTabStripItemFromSelectItem(i);if(o instanceof p){this._activateItem(o,t)}}.bind(this)};e=new P(r).addStyleClass("sapMTSOverflowSelect");this._addItemsToSelect(e,t);return e};E.prototype.onsapselect=function(t){t.setMarked();t.preventDefault();if(t.srcControl instanceof p){this._activateItem(t.srcControl,t)}};E.prototype.onsapdelete=function(t){var e=o.closestTo(t.target),i=e.getId()===this.getSelectedItem(),s=function(){this._moveToNextItem(i)};this._removeItem(e,s)};E.prototype._moveToNextItem=function(t){if(!this._oItemNavigation){return}var e=this.getItems().length,i=this._oItemNavigation.getFocusedIndex(),o=e===i?--i:i,s=this.getItems()[o],r=function(){if(this._oItemNavigation){this._oItemNavigation.focusItem(o)}};if(t){this.setSelectedItem(s);this.fireItemPress({item:s})}setTimeout(r.bind(this),0)};E.prototype._activateItem=function(t,e){if(this.fireItemSelect({item:t})){if(!this.getSelectedItem()||this.getSelectedItem()!==t.getId()){this.setSelectedItem(t)}this.fireItemPress({item:t})}else if(e instanceof jQuery.Event&&!e.isDefaultPrevented()){e.preventDefault()}};E.prototype.addAggregation=function(t,i,o){if(t==="items"){this._handleItemsAggregation(["addAggregation",i,o],true)}return e.prototype.addAggregation.call(this,t,i,o)};E.prototype.insertAggregation=function(t,i,o,s){if(t==="items"){this._handleItemsAggregation(["insertAggregation",i,o,s],true)}return e.prototype.insertAggregation.call(this,t,i,o,s)};E.prototype.removeAggregation=function(t,i,o){if(t==="items"){this._handleItemsAggregation(["removeAggregation",i,o])}return e.prototype.removeAggregation.call(this,t,i,o)};E.prototype.removeAllAggregation=function(t,i){if(t==="items"){this._handleItemsAggregation(["removeAllAggregation",null,i])}return e.prototype.removeAllAggregation.call(this,t,i)};E.prototype.destroyAggregation=function(t,i){if(t==="items"){this._handleItemsAggregation(["destroyAggregation",i])}return e.prototype.destroyAggregation.call(this,t,i)};E.prototype.setSelectedItem=function(t){var e=!d.system.phone;if(!t){return this}if(t.$().length>0&&e){this._scrollIntoView(t,500)}if(e){this._updateAriaSelectedAttributes(this.getItems(),t);this._updateSelectedItemClasses(t.getId())}if(this.getHasSelect()){var i=this._findSelectItemFromTabStripItem(t);this.getAggregation("_select").setAssociation("selectedItem",i,true)}return this.setAssociation("selectedItem",t,e)};E.prototype.setProperty=function(t,i,o){var s;s=e.prototype.setProperty.call(this,t,i,o);if(t==="hasSelect"){if(i){if(!this.getAggregation("_select")){s=this.setAggregation("_select",this._createSelect(this.getItems()))}}else{s=this.destroyAggregation("_select")}}return s};E.prototype._attachItemEventListeners=function(t){if(t instanceof p){var e=["itemClosePressed","itemPropertyChanged"];e.forEach(function(e){e=e.charAt(0).toUpperCase()+e.slice(1);t["detach"+e](this["_handle"+e]);t["attach"+e](this["_handle"+e].bind(this))},this)}};E.prototype._detachItemEventListeners=function(t){if(!t||typeof t!=="object"||!(t instanceof p)){var e=this.getItems();e.forEach(function(t){if(typeof t!=="object"||!(t instanceof p)){return}return this._detachItemEventListeners(t)}.bind(this))}};E.prototype._handleItemPropertyChanged=function(t){var e=this._findSelectItemFromTabStripItem(t.getSource());var i=t["mParameters"].propertyKey;var o="set"+i.substr(0,1).toUpperCase()+i.substr(1);e[o](t["mParameters"].propertyValue)};E.prototype._handleItemClosePressed=function(t){this._removeItem(t.getSource())};E.prototype._removeItem=function(t,e){var i;if(!(t instanceof p)){A.error("Expecting instance of a TabStripSelectItem, given: ",t)}if(t.getId().indexOf(E.SELECT_ITEMS_ID_SUFFIX)!==-1){i=this._findTabStripItemFromSelectItem(t)}else{i=t}if(this.fireItemClose({item:i})){this.removeAggregation("items",i);this._moveToNextItem(t.getId()===this.getSelectedItem());if(e){e.call(this)}}};E.prototype._handleItemsAggregation=function(t,e){var i="items",o=t[0],s=t[1],r=[i];t.forEach(function(t,e){if(e>0){r.push(t)}});if(e){this._attachItemEventListeners(s)}else{this._detachItemEventListeners(s)}if(i!=="items"){return this}if(this.getHasSelect()){this._handleSelectItemsAggregation(r,e,o,s)}return this};E.prototype._handleSelectItemsAggregation=function(t,e,i,o){var s=this.getAggregation("_select"),r;if(i==="destroyAggregation"&&!s){return}if(o===null||typeof o!=="object"){return s[i]["apply"](s,t)}if(e){r=this._createSelectItemFromTabStripItem(o)}else{r=this._findSelectItemFromTabStripItem(o)}t.forEach(function(e,i){if(typeof e==="object"){t[i]=r}});return s[i]["apply"](s,t)};E.prototype._addItemsToSelect=function(t,e){e.forEach(function(e){var i=this._createSelectItemFromTabStripItem(e);t.addAggregation("items",i);if(e.getId()===this.getSelectedItem()){t.setSelectedItem(i)}},this)};E.prototype._createSelectItemFromTabStripItem=function(t){var e;if(!t&&!R.isObjectA(t,"sap.m.TabContainerItem")){A.error('Expecting instance of "sap.m.TabContainerItem": instead of '+t+" given.");return}e=new p({id:t.getId()+E.SELECT_ITEMS_ID_SUFFIX,text:t.getText(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),itemClosePressed:function(t){this._handleItemClosePressed(t)}.bind(this)});e.addEventDelegate({ontap:function(t){var e=t.srcControl;if(t.target.id===e.getParent().getId()+"-img"){t.srcControl=e=e.getParent()}if(e instanceof h||e instanceof _){this.fireItemClosePressed({item:this})}}},e);return e};E.prototype._findTabStripItemFromSelectItem=function(t){var e,i=t.getId().replace(E.SELECT_ITEMS_ID_SUFFIX,""),o=this.getItems();for(e=0;e<o.length;e++){if(o[e].getId()===i){return o[e]}}};E.prototype._findSelectItemFromTabStripItem=function(t){var e,i,o=t.getId()+E.SELECT_ITEMS_ID_SUFFIX;if(this.getHasSelect()){i=this.getAggregation("_select").getItems();for(e=0;e<i.length;e++){if(i[e].getId()===o){return i[e]}}}};E.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._handleInititalScrollToItem();C.detachApplied(this._handleThemeAppliedBound)};E.prototype._updateAriaSelectedAttributes=function(t,e){var i;t.forEach(function(t){i="false";if(t.$()){if(e&&e.getId()===t.getId()){i="true"}t.$().attr("aria-selected",i)}})};E.prototype._updateSelectedItemClasses=function(t){if(this.$("tabs")){this.$("tabs").children(".sapMTabStripItemSelected").removeClass("sapMTabStripItemSelected");jQuery("#"+t).addClass("sapMTabStripItemSelected")}};E.prototype.changeItemState=function(t,e){var i;var o=this.getItems();o.forEach(function(o){if(t===o.getId()){i=jQuery(o.$());if(e===true&&!i.hasClass(p.CSS_CLASS_MODIFIED)){i.addClass(p.CSS_CLASS_MODIFIED)}else{i.removeClass(p.CSS_CLASS_MODIFIED)}}})};E.prototype.ontouchstart=function(t){var e=o.closestTo(t.target);if(e instanceof p||e instanceof h||e instanceof _||e instanceof S||e instanceof P){this._oTouchStartX=t.changedTouches[0].pageX}};E.prototype.ontouchend=function(t){var e,i;if(!this._oTouchStartX){return}e=o.closestTo(t.target);if(t.target.id===e.getParent().getId()+"-img"){e=e.getParent()}i=Math.abs(t.changedTouches[0].pageX-this._oTouchStartX);if(i<E.MIN_DRAG_OFFSET){if(e instanceof p){this._activateItem(e,t)}else if(e instanceof h){if(e&&e.getParent&&e.getParent()instanceof p){e=e.getParent();this._removeItem(e)}}else if(e instanceof _){if(e&&e.getParent&&e.getParent().getParent&&e.getParent().getParent()instanceof p){e=e.getParent().getParent();this._removeItem(e)}}this._oTouchStartX=null}};E.prototype.destroyItems=function(){this.setAssociation("selectedItem",null);return this.destroyAggregation("items")};var M=m.extend(y);M.apiVersion=2;var P=g.extend("sap.m.internal.TabStripSelect",{metadata:{library:"sap.m"},renderer:M});P.prototype.onAfterRendering=function(){g.prototype.onAfterRendering.apply(this,arguments);this.$().attr("tabindex","-1")};P.prototype.onAfterRenderingPicker=function(){var e=this.getPicker();g.prototype.onAfterRenderingPicker.call(this);if(d.system.phone){return}e.setOffsetX(Math.round(t.getRTL()?this.getPicker().$().width()-this.$().width():this.$().width()-this.getPicker().$().width()));e.setOffsetY(this.$().parents().hasClass("sapUiSizeCompact")?2:3);e._calcPlacement()};P.prototype.createList=function(){this._oList=new x({width:"100%"}).attachSelectionChange(this.onSelectionChange,this).addEventDelegate({ontap:function(t){this.close()}},this);return this._oList};P.prototype.setValue=function(t){g.prototype.setValue.apply(this,arguments);this.$("label").toggleClass("sapMTSOverflowSelectLabelModified",this.getSelectedItem()&&this.getSelectedItem().getProperty("modified"));return this};P.prototype._getValueIcon=function(){return null};var D=m.extend(v);D.apiVersion=2;D.renderItem=function(t,e,i,o){t.openStart("li",i);t.class(v.CSS_CLASS+"ItemBase");t.class(v.CSS_CLASS+"Item");t.class("sapMTSOverflowSelectListItem");if(i.getProperty("modified")){t.class("sapMTSOverflowSelectListItemModified")}if(d.system.desktop){t.class(v.CSS_CLASS+"ItemBaseHoverable")}if(i===e.getSelectedItem()){t.class(v.CSS_CLASS+"ItemBaseSelected")}t.attr("tabindex",0);this.writeItemAccessibilityState.apply(this,arguments);t.openEnd();t.openStart("div");t.class("sapMSelectListItemText");t.openEnd();if(i.getIcon()){t.renderControl(i._getImage())}t.openStart("div");t.class("sapMTSTexts");t.openEnd();this.renderItemText(t,i.getAdditionalText(),p.CSS_CLASS_TEXT);this.renderItemText(t,i.getText(),p.CSS_CLASS_LABEL);t.close("div");t.close("div");t.renderControl(i.getAggregation("_closeButton"));t.close("li")};D.renderItemText=function(t,e,i){t.openStart("div");t.class(i);t.openEnd();t.text(e.slice(0,d.system.phone?e.length:p.DISPLAY_TEXT_MAX_LENGTH));if(!d.system.phone&&e.length>p.DISPLAY_TEXT_MAX_LENGTH){t.text("...")}t.close("div")};var x=f.extend("sap.m.internal.TabStripSelectList",{metadata:{library:"sap.m"},renderer:D});return E});
//# sourceMappingURL=TabStrip.js.map