/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/ui/core/Lib"],(t,e,n)=>{"use strict";const o="UIManager: This class is a singleton and should not be used without an AdaptationProvider. Please use 'Engine.getInstance().uimanager' instead";let i;const a=t.extend("sap.m.p13n.modules.UIManager",{constructor:function(e){if(i){throw Error(o)}this.oAdaptationProvider=e;t.call(this)}});const s=t=>new Promise((e,n)=>{sap.ui.require(t,e,n)});a.prototype.show=function(t,o,i){const a=o instanceof Array?o:[o];const r=n.getResourceBundleFor("sap.m");const c=this;i=Object.assign({},i);if(!this.hasActiveP13n(t)){this.setActiveP13n(t,o);return this.create(t,o,i).then(e=>s(["sap/m/p13n/Popup"]).then(n=>{let o;if(!i.title&&a.length===1&&e.length>0){o=e[0].getTitle()}else{o=i.title||r.getText("p13n.VIEW_SETTINGS")}const s=new n({mode:i.mode,warningText:i.warningText||r.getText("p13n.RESET_WARNING_TEXT"),title:o,close:function(e){const n=e.getParameter("reason");if(n=="Ok"){c.oAdaptationProvider.handleP13n(t,a)}const o=s.getPanels();o.forEach(t=>{if(t.keepAlive instanceof Function&&t.keepAlive()){s.removePanel(t)}});c.setActiveP13n(t,null);s._oPopup.attachAfterClose(()=>{if(i.close instanceof Function){i.close()}s.destroy()})}});s._getContainer().attachAfterViewSwitch(n=>{const o=n.getParameter("target");const i=e[a.indexOf(o)];c.oAdaptationProvider.validateP13n(t,o,i)});if(i.showReset!==false){s.setReset(()=>{const e=i.reset instanceof Function?i.reset:c.oAdaptationProvider.reset.bind(c.oAdaptationProvider);e(t,a)})}e.forEach((t,e)=>{s.addPanel(t,a[e])});t.addDependent(s);s.open(i.source,i);return s._oPopup}),n=>{this.setActiveP13n(t,null);e.error("UIManager failure:"+n.stack)})}else{return Promise.resolve()}};a.prototype.create=function(t,e){const n=e instanceof Array?e:[e];const o=this;return this.oAdaptationProvider.initAdaptation(t,n).then(()=>{const e=this.oAdaptationProvider.getUISettings(t,n);if(e instanceof Promise){return e}else{const t=[],n=[];Object.keys(e).forEach(o=>{const i=e[o];if(i&&i.hasOwnProperty("adaptationUI")){const e=i.adaptationUI;t.push(e);n.push({key:o,settings:i})}});return Promise.all(t).then(t=>{const e={};t.forEach((t,o)=>{if(t){const i=n[o];const a=i.settings.containerSettings;if(a.title){t.setTitle(a.title)}e[i.key]={panel:t}}});return e})}}).then(e=>{const i=[];Object.keys(e).forEach((a,s)=>{const r=e[a].panel;if(r.attachChange instanceof Function){r.attachChange(e=>{o.oAdaptationProvider.validateP13n(t,n[s],e.getSource())})}i.push(r)});return i})};a.getInstance=function(t){if(!i){this._checkValidInterface(t);i=new a(t)}return i};a.prototype.setActiveP13n=function(t,e,n){if(this.oAdaptationProvider.setActiveP13n instanceof Function){this.oAdaptationProvider.setActiveP13n(t,e,n)}};a.prototype.hasActiveP13n=function(t){let e=false;if(this.oAdaptationProvider.hasActiveP13n instanceof Function){e=this.oAdaptationProvider.hasActiveP13n(t)}return e};a._checkValidInterface=t=>{if(!t||!t.isA("sap.m.p13n.modules.AdaptationProvider")){throw Error("The UIManager singleton must not be accessed without an AdaptationProvider interface!")}};a.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);i=null};return a});
//# sourceMappingURL=UIManager.js.map