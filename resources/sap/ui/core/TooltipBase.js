/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Control","./Element","./Popup","./StaticArea","./library","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(t,e,o,i,s,r,jQuery){"use strict";var n=s.OpenState;var p=t.extend("sap.ui.core.TooltipBase",{metadata:{abstract:true,library:"sap.ui.core",properties:{text:{type:"string",group:"Misc",defaultValue:""},openDuration:{type:"int",group:"Behavior",defaultValue:200},closeDuration:{type:"int",group:"Behavior",defaultValue:200},myPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:"begin top"},atPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:"begin bottom"},offset:{type:"string",group:"Behavior",defaultValue:"10 3"},collision:{type:"sap.ui.core.Collision",group:"Behavior",defaultValue:"flip"},openDelay:{type:"int",group:"Misc",defaultValue:500},closeDelay:{type:"int",group:"Misc",defaultValue:100}},events:{closed:{}}},renderer:null});p.prototype._getPopup=function(){var t=new o;t.setShadow(true);p.prototype._getPopup=function(){return t};return t};p.prototype.onfocusin=function(t){var o=e.closestTo(t.target);if(o!=null){var s=o.getFocusDomRef();this.sStoredTooltip=null;if(s.title&&s.title!=""){this.sStoredTooltip=s.title;s.title=""}var r=this._getPopup();if(!(r.isOpen()&&r.getContent()==this)){sap.ui.getCore().createRenderManager().render(this,i.getDomRef(),true)}var n=s.getAttribute("aria-describedby");var p=this.getId()+"-title "+this.getId()+"-txt";if(n==null||n==""){s.setAttribute("aria-describedby",p)}else if(n.indexOf(p)==-1){s.setAttribute("aria-describedby",n+" "+p)}}};p.prototype.onfocusout=function(t){var o=e.closestTo(t.target);if(o!=null){var i=o.getFocusDomRef();if(this.sStoredTooltip){i.title=this.sStoredTooltip}var s=i.getAttribute("aria-describedby");var r=this.getId()+"-title "+this.getId()+"-txt";if(s&&s.indexOf(r)>=0){if(s.trim()==r){i.removeAttribute("aria-describedby")}else{s=s.replace(r,"");i.setAttribute("aria-describedby",s)}}}if(p.sOpenTimeout){clearTimeout(p.sOpenTimeout);p.sOpenTimeout=undefined}this.sCloseNowTimeout=setTimeout(this["closePopup"].bind(this),this.getCloseDelay())};p.prototype.isStandardTooltip=function(t){return typeof t==="string"&&!!t.trim()};p.prototype.onmouseover=function(t){var o=e.closestTo(t.target),i=e.closestTo(t.currentTarget),s=e.closestTo(t.relatedTarget);if(!o){return}if(o===this){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null}t.stopPropagation();t.preventDefault();return}if(i===o||!this.isStandardTooltip(o.getTooltip())){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;t.stopPropagation();t.preventDefault()}}if(s){if(s.getParent()){if(s.getParent()===i&&i===o){var r=s.getTooltip();if(!this.isStandardTooltip(r)&&(!r||!(r instanceof p))){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;t.stopPropagation();t.preventDefault()}}}}}if(this._currentControl===o||!this.isStandardTooltip(o.getTooltip())){this.removeStandardTooltips();if(p.sOpenTimeout){clearTimeout(p.sOpenTimeout)}p.sOpenTimeout=setTimeout(this["openPopup"].bind(this,this._currentControl),this.getOpenDelay());t.stopPropagation();t.preventDefault()}};p.prototype.onmouseout=function(t){if(p.sOpenTimeout){clearTimeout(p.sOpenTimeout);p.sOpenTimeout=undefined}if(!this.sCloseNowTimeout){this.sCloseNowTimeout=setTimeout(this["closePopup"].bind(this),this.getCloseDelay())}this.restoreStandardTooltips();t.stopPropagation();t.preventDefault()};p.prototype.closePopup=function(){var t=this._getPopup();if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout)}this.sCloseNowTimeout=undefined;t.attachClosed(this.handleClosed,this);t.close();this.restoreStandardTooltips()};p.prototype.handleClosed=function(){this._getPopup().detachClosed(this.handleClosed,this);this.fireClosed()};p.prototype.openPopup=function(t){if(!this.getVisible()){return}if(t.getTooltip()!=null){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;return}var e=this._getPopup();if(e.isOpen()&&e.getContent()==this){return}var o=t.getDomRef();e.setContent(this);e.setPosition(this.getMyPosition(),this.getAtPosition(),o,this.getOffset(),this.getCollision());e.setDurations(this.getOpenDuration(),this.getCloseDuration());e.open();this.removeStandardTooltips()}};p.prototype.removeStandardTooltips=function(){var t=this._currentControl.getDomRef();if(!this.aStoredTooltips){this.aStoredTooltips=[]}else{return}var e="";while(t&&!(t===document)){e=t.title;if(e){this.aStoredTooltips.push({domref:t,tooltip:e});t.title=""}t=t.parentNode}if(this._currentControl.getTooltipDomRefs){var o=this._currentControl.getTooltipDomRefs();for(var i=0;i<o.length;i++){t=o[i];if(t){e=t.title;if(e){this.aStoredTooltips.push({domref:t,tooltip:e});t.title=""}}}}};p.prototype.restoreStandardTooltips=function(){var t=this._getPopup();var e=t.getOpenState();if(e===n.OPEN||e===n.OPENING){return}if(p.sOpenTimeout){return}if(this.aStoredTooltips){for(var o=0;o<this.aStoredTooltips.length;o++){var i=this.aStoredTooltips[o].domref;i.title=this.aStoredTooltips[o].tooltip}}this.aStoredTooltips=null};p.prototype.setParent=function(e,o){var i=this._getPopup();if(i&&i.isOpen()){this.closePopup()}t.prototype.setParent.apply(this,arguments)};p.prototype.onkeydown=function(t){if(t.ctrlKey&&t.which==r.I){var o=e.closestTo(t.target);if(o!=null){if(this._currentControl===o||!this.isStandardTooltip(o.getTooltip())){this.removeStandardTooltips();this.openPopup(this._currentControl);t.preventDefault();t.stopPropagation()}}}else if(t.which==r.ESCAPE){if(p.sOpenTimeout){clearTimeout(p.sOpenTimeout);p.sOpenTimeout=undefined}var i=this.oPopup&&this.oPopup.isOpen();this.closePopup();if(i){t.preventDefault();t.stopPropagation()}}};p.prototype._closeOrPreventOpen=function(){var t=this._getPopup();if(t.isOpen()){this.closePopup()}else if(p.sOpenTimeout){clearTimeout(p.sOpenTimeout);p.sOpenTimeout=undefined}};return p});
//# sourceMappingURL=TooltipBase.js.map