/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./Element","./ShortcutHint","./Popup","./InvisibleText","sap/ui/events/checkMouseEnterOrLeave","sap/ui/Device"],function(t,e,i,n,o,r,s){"use strict";var u=function(t){this.sControlId=t.getId();this._hintConfigs=[]};u.init=function(t){t._shortcutHintsMixin=new u(t)};u.addConfig=function(t,e,i){if(s.system.phone){return}if(/sap-ui-xx-noshortcuthints=true/.test(document.location.search)){return}var n=t._shortcutHintsMixin;if(!n){u.init(t);n=t._shortcutHintsMixin}n._hintConfigs.push(e);n.initHint(e,i)};u.hideAll=function(){var t;for(var i in f.mControls){t=e.getElementById(i);if(t){t._shortcutHintsMixin.hideShortcutHint()}}};u.isDOMIDRegistered=function(t){return f.mDOMNodes[t]&&!!f.mDOMNodes[t].length};u.isControlRegistered=function(t){return!!f.mControls[t]};u.prototype._attachToEvents=function(){var t;if(!u.isControlRegistered(this.sControlId)){t=e.getElementById(this.sControlId);t.addEventDelegate(c,this)}};u.prototype.register=function(t,n,o){this._attachToEvents();if(!u.isControlRegistered(this.sControlId)){var r=e.getElementById(this.sControlId);r._originalExit=r.exit;r.exit=function(){if(r._originalExit){r._originalExit.apply(r,arguments)}this.deregister()}.bind(this)}f.mControls[this.sControlId]=true;if(!f.mDOMNodes[t]){f.mDOMNodes[t]=[]}f.mDOMNodes[t].push(new i(o,n))};u.prototype.deregister=function(){var t=this.getRegisteredShortcutInfos(),e;delete f.mControls[this.sControlId];for(e=0;e<t.length;e++){delete f.mDOMNodes[t[e].id]}};u.prototype.initHint=function(e,i){var n=this._getShortcutHintInfo(e);if(n.message){this.register(n.id,{message:n.message},i)}else if(n.messageBundleKey){this.register(n.id,{messageBundleKey:n.messageBundleKey},i)}else if(n.event){var o=t.getEventList(i)[n.event],r=[];if(o){r=o.reduce(function(t,e){if(e.fFunction&&e.fFunction._sapui_commandName){t.push(e.fFunction._sapui_commandName)}return t},[])}if(r.length){this.register(n.id,{commandName:r[0]},i)}else{i.attachEvent("EventHandlerChange",function(t){var e=t.getParameter("func");if(t.getParameter("type")==="listenerAttached"&&e&&e._sapui_commandName&&t.getParameter("EventId")===n.event){this.register(n.id,{commandName:e._sapui_commandName},i)}},this)}}};u.prototype._getShortcutHintInfos=function(){return this._hintConfigs.map(this._getShortcutHintInfo,this)};u.prototype._getShortcutHintInfo=function(t){var e;if(t.domrefid){e=t.domrefid}else if(t.domrefid_suffix){e=this.sControlId+t.domrefid_suffix}else{e=this.sControlId}return{id:e,event:t.event,position:t.position,messageBundleKey:t.messageBundleKey,message:t.message,addAccessibilityLabel:t.addAccessibilityLabel}};u.prototype.getRegisteredShortcutInfos=function(){return this._getShortcutHintInfos().filter(function(t){return u.isDOMIDRegistered(t.id)},this)};u.prototype.showShortcutHint=function(t){var e,i=t[0].position||"0 8",o=n.Dock.CenterTop,r=n.Dock.CenterBottom,s=h(),u=t[0].ref,f=d(t[0].id),c;if(!m(u)||!g(u)){return}c=this._getControlTooltips();if(c[t[0].id]){f=c[t[0].id].tooltip+" ("+f+")"}if(!s){s=l(f)}s.oContent.children[0].textContent=f;if(!s.isOpen()){s.open(1e3,o,r,u,i,"flipfit",function(t){s.oContent.style.visibility="hidden";if(e){clearTimeout(e)}e=setTimeout(function(){if(!m(u)||!g(u)){return}s.oContent.style.visibility="visible"},1e3);s._applyPosition(s._oLastPosition)})}};u.prototype.hideShortcutHint=function(){var t=h();if(t&&t.isOpen()){t.close()}};u.prototype._findShortcutOptionsForRef=function(t){var e,i=this.getRegisteredShortcutInfos(),n,o=[];for(n=0;n<i.length;n++){e=i[n];e.ref=document.getElementById(e.id);if(e.ref&&e.ref.contains(t)){o.push(e)}}return o};u.prototype._getControlTooltips=function(){var t=this.getRegisteredShortcutInfos(),i=e.getElementById(this.sControlId);return t.reduce(function(t,e){var n=i._getTitleAttribute&&i._getTitleAttribute(e.id);if(!n){n=i.getTooltip()}if(n){t[e.id]={tooltip:n}}return t},{})};u.prototype._updateShortcutHintAccLabel=function(t){var i,n,o;if(!t.addAccessibilityLabel){return}o=e.getElementById(this.sControlId);if(!o.getAriaDescribedBy){return}i=a(o);n=i.getId();i.setText(d(t.id));if(!i.getText()){o.removeAriaDescribedBy(n)}else if(o.getAriaDescribedBy().indexOf(n)===-1){o.addAriaDescribedBy(n)}};var f=Object.create(null);f.mControls={};f.mDOMNodes={};var c={onfocusin:function(t){var e=this._findShortcutOptionsForRef(t.target);if(!e.length){return}u.hideAll();this._updateShortcutHintAccLabel(e[0]);this.showShortcutHint(e)},onfocusout:function(t){var e=this._findShortcutOptionsForRef(t.target);if(!e.length){return}this.hideShortcutHint()},onmouseover:function(t){var e=this._findShortcutOptionsForRef(t.target),i;if(!e.length){return}i=e[0].ref;if(!v(i)){return}if(r(t,i)){u.hideAll();this.showShortcutHint(e)}},onmouseout:function(t){var e=this._findShortcutOptionsForRef(t.target);if(!e.length){return}if(r(t,e[0].ref)){if(e[0].ref.contains(document.activeElement)){return}this.hideShortcutHint()}},onAfterRendering:function(){var t=this.getRegisteredShortcutInfos(),e,i;for(var n=0;n<t.length;n++){i=t[n].id;e=document.getElementById(i);e.setAttribute("aria-keyshortcuts",d(i))}}};function d(t){var e=f.mDOMNodes[t];if(!e||!e.length){return}return e.map(function(t){return t._getShortcutText()}).join(", ")}function a(t){if(!t._shortcutInvisibleText){var e=t.exit;t._shortcutInvisibleText=new o;t._shortcutInvisibleText.toStatic();t.exit=function(){this._shortcutInvisibleText.destroy();e.call(this)}}return t._shortcutInvisibleText}function h(){return u._popup}function l(t){var e,i,o;i=document.createElement("span");i.classList.add("sapUiHintContainer");o=document.createElement("div");o.classList.add("sapUiHintText");o.textContent=t;i.appendChild(o);e=new n(i,false,false,false);e.setAnimations(function(t,e,i){setTimeout(i,e)},function(t,e,i){i()});u._popup=e;return e}function g(t){var e;if(!t){return false}e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function m(t){return t.offsetWidth>0||t.offsetHeight>0||t.getClientRects().length>0}function p(t){var e=t.tabIndex;return e!=null&&e>=0&&(t.getAttribute("disabled")==null||t.getAttribute("tabindex"))}function v(t){return t.nodeType==1&&m(t)&&p(t)}return u});
//# sourceMappingURL=ShortcutHintsMixin.js.map