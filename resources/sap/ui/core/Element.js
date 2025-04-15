/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/DataType","../base/Object","../base/ManagedObject","./ElementMetadata","./FocusMode","../Device","sap/ui/dom/findTabbable","sap/ui/performance/trace/Interaction","sap/base/future","sap/base/assert","sap/ui/thirdparty/jquery","sap/ui/events/F6Navigation","sap/ui/util/_enforceNoReturnValue","./RenderManager","./Rendering","./EnabledPropagator","./ElementRegistry","./Theming","sap/ui/core/util/_LocalizationHelper"],function(e,t,i,r,n,o,a,s,l,u,jQuery,p,f,c,g,d,h,y,m){"use strict";var D=i.extend("sap.ui.core.Element",{metadata:{stereotype:"element",abstract:true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",aggregations:{tooltip:{type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"},dependents:{type:"sap.ui.core.Element",multiple:true},dragDropConfig:{type:"sap.ui.core.dnd.DragDropBase",multiple:true,singularName:"dragDropConfig"}},associations:{fieldHelpDisplay:{type:"sap.ui.core.Element",multiple:false}}},constructor:function(e,t){i.apply(this,arguments);this._iRenderingDelegateCount=0},renderer:null},r);h.init(D);D.defineClass=function(e,i,n){return t.defineClass(e,i,n||r)};D.prototype.getInterface=function(){return this};D.prototype._handleEvent=function(e){var t=this,i="on"+e.type;function r(r){var n,o,a;if(r&&(o=r.length)>0){r=o===1?r:r.slice();for(n=0;n<o;n++){if(e.isImmediateHandlerPropagationStopped()){return}a=r[n].oDelegate;if(a[i]){a[i].call(r[n].vThis===true?t:r[n].vThis||a,e)}}}}r(this.aBeforeDelegates);if(e.isImmediateHandlerPropagationStopped()){return}if(this[i]){if(e._bNoReturnValue){f(this[i](e),{name:i,component:this.getId()})}else{this[i](e)}}r(this.aDelegates)};D.prototype.init=function(){return undefined};D.prototype.exit=function(){return undefined};D.create=i.create;D.prototype.toString=function(){return"Element "+this.getMetadata().getName()+"#"+this.sId};D.prototype.getDomRef=function(e){return document.getElementById(e?this.getId()+"-"+e:this.getId())};D.prototype.$=function(e){return jQuery(this.getDomRef(e))};D.prototype.isActive=function(){return this.oParent&&this.oParent.isActive()};D.prototype.prop=function(e,t){var i=this.getMetadata().getAllSettings()[e];if(i){if(arguments.length==1){return this[i._sGetter]()}else{this[i._sMutator](t);return this}}};D.prototype.setProperty=function(e,t,r){if(e!="enabled"&&e!="visible"||r){return i.prototype.setProperty.apply(this,arguments)}if(e=="enabled"){var o=this.mProperties.enabled;i.prototype.setProperty.apply(this,arguments);if(o!=this.mProperties.enabled){d.updateDescendants(this)}}else if(e==="visible"){i.prototype.setProperty.apply(this,arguments);if(t===false&&this.getDomRef()?.contains(document.activeElement)){D.fireFocusFail.call(this,n.RENDERING_PENDING)}}return this};function v(e,t){if(e?.contains(document.activeElement)||!jQuery(document.activeElement).is(":sapFocusable")){t?.focus({preventScroll:true})}}D.prototype.onfocusfail=function(e){let t=e._skipArea||e.srcControl.getDomRef();const i=t;let r=this;let o=r.getDomRef();let s;let l;do{if(o?.contains(t)){s=a(t,{scope:o,forward:true,skipChild:true});if(s?.startOver){s=a(t,{scope:o,forward:false})}l=s?.element;if(l===o){break}t=o;r=r?.getParent();o=r?.getDomRef?.()}else{l=o&&jQuery(o).firstFocusableDomRef();break}}while((!s||s.startOver)&&t);if(l){switch(e.mode){case n.SYNC:v(i,l);break;case n.RENDERING_PENDING:g.addPrerenderingTask(()=>{v(i,l)});break;case n.DEFAULT:default:Promise.resolve().then(()=>{v(i,l)});break}}};D.prototype.insertDependent=function(e,t){this.insertAggregation("dependents",e,t,true);return this};D.prototype.addDependent=function(e){this.addAggregation("dependents",e,true);return this};D.prototype.removeDependent=function(e){return this.removeAggregation("dependents",e,true)};D.prototype.removeAllDependents=function(){return this.removeAllAggregation("dependents",true)};D.prototype.destroyDependents=function(){this.destroyAggregation("dependents",true);return this};function b(e){let t=null;for(let i=0;i<e.length;i++){const r=e[i];const n=r?.getDomRef?.();if(n){if(!t){t=n.parentElement}else{while(t&&!t.contains(n)){t=t.parentElement}}}}return t}function E(e,t){const i=e==="KeepDom";const r=this.getDomRef();return e===true||!i&&t||this.isA("sap.ui.core.PopupInterface")||c.isPreservedContent(r)}function _(e,t){let r=null;let o=null;if(Array.isArray(e)){for(let t=0;t<e.length;t++){const i=e[t];const n=i.getDomRef?.();if(n?.contains(document.activeElement)){r=i}}if(r){o=b(e)}}else if(e instanceof i){r=e}if(!r){return}const a=r.getDomRef?.();if(a?.contains?.(document.activeElement)&&!t){const e=E.call(r,t,!this);const i=e?n.SYNC:n.RENDERING_PENDING;if(!this._bIsBeingDestroyed){D.fireFocusFail.call(r,i,this,o)}}}D.prototype.setAggregation=function(e,t,r){const n=this.getAggregation(e);const o=i.prototype.setAggregation.call(this,e,t,r);if(n&&t==null){_.call(this,n,r)}return o};D.prototype.removeAggregation=function(e,t,r){const n=i.prototype.removeAggregation.call(this,e,t,r);_.call(this,n,r);return n};D.prototype.removeAllAggregation=function(e,t){const r=i.prototype.removeAllAggregation.call(this,e,t);_.call(this,r,t);return r};D.prototype.destroyAggregation=function(e,t){const r=this.getAggregation(e);_.call(this,r,t);return i.prototype.destroyAggregation.call(this,e,t)};D.prototype.rerender=function(){if(this.oParent){this.oParent.rerender()}};D.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null};D.fireFocusFail=function(e,t,i){const r=jQuery.Event("focusfail");r.srcControl=this;r.mode=e||n.DEFAULT;r._skipArea=i;t??=this.getParent();if(t&&!t._bIsBeingDestroyed){t._handleEvent?.(r)}};D.prototype.destroy=function(e){if(this.bIsDestroyed){return}var t=!this.getParent();D._updateFocusInfo(this);i.prototype.destroy.call(this,e);this.data=w;var r=this.getDomRef();if(!r){return}if(E.call(this,e,t)){jQuery(r).remove()}else{r.removeAttribute("data-sap-ui-preserve");if(e!=="KeepDom"){r.id="sap-ui-destroyed-"+this.getId();for(var n=0,o=r.querySelectorAll('[id^="'+this.getId()+'-"]');n<o.length;n++){o[n].id="sap-ui-destroyed-"+o[n].id}}}};D.prototype.fireEvent=function(e,t,r,n){if(this.hasListeners(e)){s.notifyStepStart(e,this)}if(typeof t==="boolean"){n=r;r=t;t=null}t=t||{};t.id=t.id||this.getId();if(D._interceptEvent){D._interceptEvent(e,this,t)}return i.prototype.fireEvent.call(this,e,t,r,n)};D._interceptEvent=undefined;function A(e,t,i){if(t.canSkipRendering||!(t.onAfterRendering||t.onBeforeRendering)){return}e._iRenderingDelegateCount+=i||-1;if(e.bOutput===true&&e._iRenderingDelegateCount==i){c.canSkipRendering(e,1)}}D.prototype.hasRenderingDelegate=function(){return Boolean(this._iRenderingDelegateCount)};D.prototype.addDelegate=function(e,t,i,r){u(e,"oDelegate must be not null or undefined");if(!e){return this}this.removeDelegate(e);if(typeof t==="object"){r=i;i=t;t=false}if(typeof i==="boolean"){r=i;i=undefined}(t?this.aBeforeDelegates:this.aDelegates).push({oDelegate:e,bClone:!!r,vThis:i===this?true:i});A(this,e,1);return this};D.prototype.removeDelegate=function(e){var t;for(t=0;t<this.aDelegates.length;t++){if(this.aDelegates[t].oDelegate==e){this.aDelegates.splice(t,1);A(this,e,0);t--}}for(t=0;t<this.aBeforeDelegates.length;t++){if(this.aBeforeDelegates[t].oDelegate==e){this.aBeforeDelegates.splice(t,1);A(this,e,0);t--}}return this};D.prototype.addEventDelegate=function(e,t){return this.addDelegate(e,false,t,true)};D.prototype.removeEventDelegate=function(e){return this.removeDelegate(e)};D.prototype.getFocusDomRef=function(){return this.getDomRef()||null};function T(e,t){if(t[0]>e[1]||e[0]>t[1]){return null}else{return[Math.max(e[0],t[0]),Math.min(e[1],t[1])]}}D.prototype.isFocusable=function(){var e=this.getFocusDomRef();if(!e){return false}var t=e;var i=[[0,window.innerWidth],[0,window.innerHeight]];var r;var n;while(!r||!n){var o=t.getBoundingClientRect();r=T(i[0],[o.x,o.x+o.width]);n=T(i[1],[o.y,o.y+o.height]);if(t.assignedSlot){t=t.assignedSlot}if(t.parentElement){t=t.parentElement}else if(t.parentNode&&t.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE){t=t.parentNode.host}else{break}}var a=document.elementsFromPoint(Math.floor((r[0]+r[1])/2),Math.floor((n[0]+n[1])/2));var s=a.findIndex(function(t){return t.contains(e)});var l=a.findIndex(function(e){return e.classList.contains("sapUiBLy")||e.classList.contains("sapUiBlockLayer")});if(l!==-1&&s>l){return false}return jQuery(e).is(":sapFocusable")};function C(e){var t,i=[];t=e.parentNode;while(t){i.push({node:t,scrollLeft:t.scrollLeft,scrollTop:t.scrollTop});t=t.parentNode}return i}function R(e){e.forEach(function(e){var t=e.node;if(t.scrollLeft!==e.scrollLeft){t.scrollLeft=e.scrollLeft}if(t.scrollTop!==e.scrollTop){t.scrollTop=e.scrollTop}})}D.prototype.focus=function(e){var t=this.getFocusDomRef(),i=[];if(!t){return}if(jQuery(t).is(":sapFocusable")){e=e||{};if(o.browser.safari){if(e.preventScroll===true){i=C(t)}t.focus();if(i.length>0){setTimeout(R.bind(null,i),0)}}else{t.focus(e)}}else{const e=this.getDomRef();if(e&&!e.contains(document.activeElement)){D.fireFocusFail.call(this,n.DEFAULT)}}};D.prototype.getFocusInfo=function(){return{id:this.getId()}};D.prototype.applyFocusInfo=function(e){this.focus(e);return this};D.prototype._refreshTooltipBaseDelegate=function(e){var i=this.getTooltip();if(t.isObjectA(i,"sap.ui.core.TooltipBase")){this.removeDelegate(i)}if(t.isObjectA(e,"sap.ui.core.TooltipBase")){e._currentControl=this;this.addDelegate(e)}};D.prototype.setTooltip=function(e){this._refreshTooltipBaseDelegate(e);this.setAggregation("tooltip",e);return this};D.prototype.getTooltip=function(){return this.getAggregation("tooltip")};D.runWithPreprocessors=i.runWithPreprocessors;D.prototype.getTooltip_AsString=function(){var e=this.getTooltip();if(typeof e==="string"||e instanceof String){return e}return undefined};D.prototype.getTooltip_Text=function(){var e=this.getTooltip();if(e&&typeof e.getText==="function"){return e.getText()}return e};var I=D.extend("sap.ui.core.CustomData",{metadata:{library:"sap.ui.core",properties:{key:{type:"string",group:"Data",defaultValue:null},value:{type:"any",group:"Data",defaultValue:null},writeToDom:{type:"boolean",group:"Data",defaultValue:false}},designtime:"sap/ui/core/designtime/CustomData.designtime"}});I.prototype.setValue=function(e){this.setProperty("value",e,true);var t=this.getParent();if(t&&t.getDomRef()){var i=this._checkWriteToDom(t);if(i){t.$().attr(i.key,i.value)}}return this};I.prototype._checkWriteToDom=function(t){if(!this.getWriteToDom()){return null}var i=this.getKey();var r=this.getValue();function n(e){l.errorThrows("CustomData with key "+i+" should be written to HTML of "+t+" but "+e);return null}if(typeof r!="string"){return n("the value is not a string.")}var o=e.getType("sap.ui.core.ID");if(!o.isValid(i)||i.indexOf(":")!=-1){return n("the key is not valid (must be a valid sap.ui.core.ID without any colon).")}if(i==p.fastNavigationKey){r=/^\s*(x|true)\s*$/i.test(r)?"true":"false"}else if(i.indexOf("sap-ui")==0){return n("the key is not valid (may not start with 'sap-ui').")}return{key:"data-"+i,value:r}};function S(e,t){var i=e.getAggregation("customData");if(i){for(var r=0;r<i.length;r++){if(i[r].getKey()==t){return i[r]}}}return null}function N(e,t,i,r){var n=S(e,t);if(i===null){if(!n){return}var o=e.getAggregation("customData").length;if(o==1){e.destroyAggregation("customData",true)}else{e.removeAggregation("customData",n,true);n.destroy()}}else if(n){n.setValue(i);n.setWriteToDom(r)}else{e.addAggregation("customData",new I({key:t,value:i,writeToDom:r}),true)}}D.prototype.data=function(){var e=arguments.length;if(e==0){var t=this.getAggregation("customData"),i={};if(t){for(var r=0;r<t.length;r++){i[t[r].getKey()]=t[r].getValue()}}return i}else if(e==1){var n=arguments[0];if(n===null){this.destroyAggregation("customData",true);return this}else if(typeof n=="string"){var o=S(this,n);return o?o.getValue():null}else if(typeof n=="object"){for(var a in n){N(this,a,n[a])}return this}else{throw new TypeError("When data() is called with one argument, this argument must be a string, an object or null, but is "+typeof n+":"+n+" (on UI Element with ID '"+this.getId()+"')")}}else if(e==2){N(this,arguments[0],arguments[1]);return this}else if(e==3){N(this,arguments[0],arguments[1],arguments[2]);return this}else{throw new TypeError("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')")}};D._CustomData=I;D.getMetadata().getAggregation("customData").defaultClass=I;function w(){var e=arguments.length;if(e===1&&arguments[0]!==null&&typeof arguments[0]=="object"||e>1&&e<4&&arguments[1]!==null){l.errorThrows("Cannot create custom data on an already destroyed element '"+this+"'");return this}return D.prototype.data.apply(this,arguments)}D.prototype.clone=function(e,t){var r=i.prototype.clone.apply(this,arguments);for(var n=0;n<this.aDelegates.length;n++){if(this.aDelegates[n].bClone){r.aDelegates.push(this.aDelegates[n])}}for(var o=0;o<this.aBeforeDelegates.length;o++){if(this.aBeforeDelegates[o].bClone){r.aBeforeDelegates.push(this.aBeforeDelegates[o])}}if(this._sapui_declarativeSourceInfo){r._sapui_declarativeSourceInfo=Object.assign({},this._sapui_declarativeSourceInfo)}return r};D.prototype.findElements=i.prototype.findAggregatedObjects;function P(e){var t=e.getParent();if(t){var i=jQuery.Event("LayoutDataChange");i.srcControl=e;t._handleEvent(i)}}D.prototype.setLayoutData=function(e){this.setAggregation("layoutData",e,true);P(this);return this};D.prototype.destroyLayoutData=function(){this.destroyAggregation("layoutData",true);P(this);return this};D.prototype.bindElement=i.prototype.bindObject;D.prototype.unbindElement=i.prototype.unbindObject;D.prototype.getElementBinding=i.prototype.getObjectBinding;D.prototype._getFieldGroupIds=function(){var e;if(this.getMetadata().hasProperty("fieldGroupIds")){e=this.getFieldGroupIds()}if(!e||e.length==0){var t=this.getParent();if(t&&t._getFieldGroupIds){return t._getFieldGroupIds()}}return e||[]};D.prototype.getDomRefForSetting=function(e){var t=this.getMetadata().getAllSettings()[e];if(t&&t.selector){var i=this.getDomRef();if(i){i=i.parentNode;if(i&&i.querySelector){var r=t.selector.replace(/\{id\}/g,this.getId().replace(/(:|\.)/g,"\\$1"));return i.querySelector(r)}}}return null};D.prototype._getMediaContainerWidth=function(){if(typeof this._oContextualSettings==="undefined"){return undefined}return this._oContextualSettings.contextualWidth};D.prototype._getCurrentMediaContainerRange=function(e){var t=this._getMediaContainerWidth();e=e||o.media.RANGESETS.SAP_STANDARD;return o.media.getCurrentRange(e,t)};D.prototype._onContextualSettingsChanged=function(){var e=this._getMediaContainerWidth(),t=e!==undefined,i=t^!!this._bUsingContextualWidth,r=this._aContextualWidthListeners||[];if(i){if(t){r.forEach(function(e){o.media.detachHandler(e.callback,e.listener,e.name)})}else{r.forEach(function(e){o.media.attachHandler(e.callback,e.listener,e.name)})}this._bUsingContextualWidth=t}r.forEach(function(e){var t=this._getCurrentMediaContainerRange(e.name);if(t&&t.from!==e.media.from){e.media=t;e.callback.call(e.listener||window,t)}},this)};D.prototype._attachMediaContainerWidthChange=function(e,t,i){i=i||o.media.RANGESETS.SAP_STANDARD;this._aContextualWidthListeners=this._aContextualWidthListeners||[];this._aContextualWidthListeners.push({callback:e,listener:t,name:i,media:this._getCurrentMediaContainerRange(i)});if(!this._bUsingContextualWidth){o.media.attachHandler(e,t,i)}};D.prototype._detachMediaContainerWidthChange=function(e,t,i){var r;i=i||o.media.RANGESETS.SAP_STANDARD;if(!this._aContextualWidthListeners){return}for(var n=0,a=this._aContextualWidthListeners.length;n<a;n++){r=this._aContextualWidthListeners[n];if(r.callback===e&&r.listener===t&&r.name===i){if(!this._bUsingContextualWidth){o.media.detachHandler(e,t,i)}this._aContextualWidthListeners.splice(n,1);break}}};var F;D._updateFocusInfo=function(e){F=F||sap.ui.require("sap/ui/core/FocusHandler");if(F){F.updateControlFocusInfo(e)}};D.closestTo=function(e,t){var i="[data-sap-ui]",r,n;if(e===undefined||e===null){return undefined}if(typeof e==="string"){r=document.querySelector(e)}else if(typeof e==="object"&&e.nodeType===Node.ELEMENT_NODE&&typeof e.nodeName==="string"){r=e}else if(e.jquery){r=e[0];l.errorThrows("Do not call Element.closestTo() with jQuery object as parameter. The function should be called with either a DOM Element or a CSS selector.")}else{throw new TypeError("Element.closestTo accepts either a DOM element or a CSS selector string as parameter, but not '"+e+"'")}if(t){i+=",[data-sap-ui-related]"}r=r&&r.closest(i);if(r){if(t){n=r.getAttribute("data-sap-ui-related")}n=n||r.getAttribute("id")}return D.getElementById(n)};D.getElementById=h.get;D.getActiveElement=()=>{try{var e=jQuery(document.activeElement);if(e.is(":focus")){return D.closestTo(e[0])}}catch(e){}};D.registry=h;y.attachApplied(function(e){var t=jQuery.Event("ThemeChanged");t.theme=e.theme;h.forEach(function(e){t._bNoReturnValue=true;e._handleEvent(t)})});m.registerForUpdate("Elements",h.all);return D});
//# sourceMappingURL=Element.js.map