/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Popup","sap/ui/core/Core","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/m/Button","sap/ui/core/ResizeHandler","sap/ui/Device","./InstanceManager","sap/ui/core/InvisibleText","sap/ui/core/library","./LightBoxRenderer","sap/m/BusyIndicator","sap/ui/thirdparty/jquery","sap/ui/dom/units/Rem"],function(e,t,i,s,o,n,r,a,h,p,g,u,l,_,d,jQuery,c){"use strict";var f=e.ButtonType;var m=e.LightBoxLoadingStates;var I=l.OpenState;var y=t.extend("sap.m.LightBox",{metadata:{library:"sap.m",interfaces:["sap.ui.core.PopupInterface"],aggregations:{imageContent:{type:"sap.m.LightBoxItem",multiple:true,bindable:"bindable"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_errorMessage:{type:"sap.m.IllustratedMessage",multiple:false,visibility:"hidden"},_invisiblePopupText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_busy:{type:"sap.m.BusyIndicator",multiple:false,visibility:"hidden"}},defaultAggregation:"imageContent",events:{},designtime:"sap/m/designtime/LightBox.designtime"},renderer:_});y.prototype.init=function(){this._createPopup();this._iWidth=0;this._iHeight=0;this._isRendering=true;this._iResizeListenerId=null;this._$lightBox=null;this._oRB=s.getLibraryResourceBundle("sap.m");this.setAggregation("_invisiblePopupText",new u)};y.prototype.onBeforeRendering=function(){var e=this._getImageContent(),t=e._getNativeImage(),i=e.getImageSrc(),s=e._getImageState(),o=this._oRB.getText("LIGHTBOX_ARIA_ENLARGED",[e.getTitle(),e.getSubtitle()]);this._createErrorControls();if(t.getAttribute("src")!==i){t.src=i}if(this._iResizeListenerId){p.resize.detachHandler(this._fnResizeListener);h.deregister(this._iResizeListenerId);this._iResizeListenerId=null}switch(s){case m.Loading:if(!this._iTimeoutId){this._iTimeoutId=setTimeout(function(){e._setImageState(m.TimeOutError)},1e4)}break;case m.Loaded:clearTimeout(this._iTimeoutId);this._calculateSizes(t);break;case m.Error:case m.TimeOutError:clearTimeout(this._iTimeoutId);break;default:break}if(e){this.getAggregation("_invisiblePopupText").setText(o)}this._isRendering=true};y.prototype.onAfterRendering=function(){this._isRendering=false;this._$lightBox=this.$();if(!this._iResizeListenerId){this._fnResizeListener=this._onResize.bind(this);p.resize.attachHandler(this._fnResizeListener);this._iResizeListenerId=h.register(this,this._fnResizeListener)}};y.prototype.forceInvalidate=t.prototype.invalidate;y.prototype.invalidate=function(e){var t=this._getImageContent();if(this.isOpen()){if(t&&t.getImageSrc()){this.forceInvalidate(e)}else{this.close()}}return this};y.prototype.exit=function(){if(this._oPopup){this._oPopup.detachOpened(this._fnPopupOpened,this);this._oPopup.detachClosed(this._fnPopupClosed,this);this._oPopup.destroy();this._oPopup=null}if(this._iResizeListenerId){p.resize.detachHandler(this._fnResizeListener);h.deregister(this._iResizeListenerId);this._iResizeListenerId=null}g.removeLightBoxInstance(this)};y.prototype.open=function(){var e=this._getImageContent();this._oPopup.setContent(this);if(e&&e.getImageSrc()){this._oPopup.open(300,i.Dock.CenterCenter,i.Dock.CenterCenter,window,null);g.addLightBoxInstance(this)}return this};y.prototype.isOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){return true}return false};y.prototype.close=function(){if(this._iResizeListenerId){p.resize.detachHandler(this._fnResizeListener);h.deregister(this._iResizeListenerId);this._iResizeListenerId=null}this._oPopup.close();g.removeLightBoxInstance(this);return this};y.prototype._getCloseButton=function(){var e=this.getAggregation("_closeButton");if(!e){e=new a({id:this.getId()+"-closeButton",text:this._oRB.getText("LIGHTBOX_CLOSE_BUTTON"),type:f.Transparent,press:this.close.bind(this)});this.setAggregation("_closeButton",e,true)}return e};y.prototype._getBusyIndicator=function(){var e=this.getAggregation("_busy");if(!e){e=new d;this.setAggregation("_busy",e,true)}return e};y.prototype._imageStateChanged=function(e){if(e!==m.Loading&&!this._isRendering){this.invalidate()}};y.prototype._createPopup=function(){this._oPopup=new i(this,true,true);this._oPopup.attachOpened(this._fnPopupOpened,this);this._oPopup.attachClosed(this._fnPopupClosed,this)};y.prototype._fnPopupOpened=function(){this._onResize();jQuery("#sap-ui-blocklayer-popup").on("click",function(){this.close()}.bind(this))};y.prototype._fnPopupClosed=function(){jQuery("#sap-ui-blocklayer-popup").off("click")};y.prototype._createErrorControls=function(){var e=this._oRB.getText("LIGHTBOX_IMAGE_TIMED_OUT"),t=this._oRB.getText("LIGHTBOX_IMAGE_TIMED_OUT_DETAILS"),i;if(this.getAggregation("_errorMessage")){if(this._getImageContent()._getImageState()===m.TimeOutError){this.getAggregation("_errorMessage").setTitle(e);this.getAggregation("_errorMessage").setDescription(t)}return}if(this._getImageContent()._getImageState()!==m.TimeOutError){e=this._oRB.getText("LIGHTBOX_IMAGE_ERROR");t=this._oRB.getText("LIGHTBOX_IMAGE_ERROR_DETAILS")}i=new o({illustrationType:n.UnableToLoadImage,illustrationSize:p.system.phone?r.Auto:r.Scene,enableVerticalResponsiveness:true,title:e,description:t});this.setAggregation("_errorMessage",i)};y.prototype._onResize=function(){var e=this.getDomRef();if(!e){return}var t,i,s,o,n=Math.round(window.scrollY),r=Math.round(window.scrollX),a,h,p=this._getImageContent();if(p._getImageState()===m.Loaded){this._calculateSizes(p._getNativeImage());t=this._iWidth;i=this._iHeight;this._$lightBox.width(t);this._$lightBox.height(i)}else{t=e.clientWidth;i=e.clientHeight}s=window.innerHeight-i;o=window.innerWidth-t;a=n+Math.round(s/2);h=r+Math.round(o/2);this._$lightBox.css({top:a,left:h})};y.prototype._calculateSizes=function(e){var t=this._calculateFooterHeightInPx(),i=288-t,s=this._getImageContent().getAggregation("_image"),o;this._setImageSize(s,e.naturalWidth,e.naturalHeight);this._calculateAndSetLightBoxSize(s);o=this._pxToNumber(s.getHeight());this.toggleStyleClass("sapMLightBoxMinSize",o<i);this._isBusy=false};y.prototype._calculateFooterHeightInPx=function(){var e=this.$().parents().hasClass("sapUiSizeCompact"),t=this._getImageContent().getSubtitle(),i=3;if(e&&!t){i-=.5}if(t){i+=.5}return c.toPx(i)};y.prototype._calculateAndSetLightBoxSize=function(e){var t,i,s=20*16,o=18*16,n=this._calculateFooterHeightInPx();t=this._pxToNumber(e.getHeight());i=this._pxToNumber(e.getWidth());this._iWidth=Math.max(s,i);this._iHeight=Math.max(o,t+n);this._bIsLightBoxBiggerThanMinDimensions=i>=s&&t>=o-n};y.prototype._setImageSize=function(e,t,i){var s=this._calculateFooterHeightInPx(),o=this._getDimensions(t,i,s);e.setWidth(o.width+"px");e.setHeight(o.height+"px")};y.prototype._getDimensions=function(e,t,i){var s=20*16,o=18*16,n=jQuery(window),r=n.height(),a=n.width(),h=this._calculateOffset(),p=Math.max(a-h,s),g=Math.max(r-h,o),u;g-=i;if(t<=g){if(e<=p){}else{t*=p/e;e=p}}else if(e<=p){e*=g/t;t=g}else{u=Math.max(e/p,t/g);e/=u;t/=u}return{width:Math.round(e),height:Math.round(t)}};y.prototype._pxToNumber=function(e){return e.substring(0,e.length-2)*1};y.prototype._getImageContent=function(){var e=this.getAggregation("imageContent");return e&&e[0]};y.prototype._calculateOffset=function(){if(p.system.desktop){return 4*16}if(p.system.tablet){return 2*16}if(p.system.phone&&p.resize.width>320){return 1*16}return 0};y.prototype.onsapescape=function(e){var t=this._oPopup.getOpenState();if(t!==I.CLOSED||t!==I.CLOSING){this.close();e.stopPropagation()}};return y});
//# sourceMappingURL=LightBox.js.map