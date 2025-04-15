/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log"],function(t,e){"use strict";var n="UIManager: This class is a singleton and should not be used without an AdaptationProvider. Please use 'Engine.getInstance().uimanager' instead";var i;var a=t.extend("sap.m.p13n.modules.UIManager",{constructor:function(e){if(i){throw Error(n)}this.oAdaptationProvider=e;t.call(this)}});var o=function(t){return new Promise(function(e,n){sap.ui.require(t,e,n)})};a.prototype.show=function(t,n,i){var a=n instanceof Array?n:[n];var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var s=this;i=Object.assign({},i);if(!this.hasActiveP13n(t)){this.setActiveP13n(t,n);return this.create(t,n,i).then(function(e){return o(["sap/m/p13n/Popup"]).then(function(n){var o;if(!i.title&&a.length===1&&e.length>0){o=e[0].getTitle()}else{o=i.title||r.getText("p13n.VIEW_SETTINGS")}var c=new n({mode:i.mode,warningText:i.warningText||r.getText("p13n.RESET_WARNING_TEXT"),title:o,close:function(e){var n=e.getParameter("reason");if(n=="Ok"){s.oAdaptationProvider.handleP13n(t,a)}var o=c.getPanels();o.forEach(function(t){if(t.keepAlive instanceof Function&&t.keepAlive()){c.removePanel(t)}});s.setActiveP13n(t,null);c._oPopup.attachAfterClose(function(){if(i.close instanceof Function){i.close()}c.destroy()})}});if(i.showReset!==false){c.setReset(function(){var e=i.reset instanceof Function?i.reset:s.oAdaptationProvider.reset.bind(s.oAdaptationProvider);e(t,a)})}e.forEach(function(t,e){c.addPanel(t,a[e])});t.addDependent(c);c.open(i.source,i);return c._oPopup})},function(n){this.setActiveP13n(t,null);e.error("UIManager failure:"+n.stack)}.bind(this))}else{return Promise.resolve()}};a.prototype.create=function(t,e){var n=e instanceof Array?e:[e];var i=this;return this.oAdaptationProvider.initAdaptation(t,n).then(function(){var e=this.oAdaptationProvider.getUISettings(t,n);if(e instanceof Promise){return e}else{var i=[],a=[];Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.hasOwnProperty("adaptationUI")){var o=n.adaptationUI;i.push(o);a.push({key:t,settings:n})}});return Promise.all(i).then(function(t){var e={};t.forEach(function(t,n){if(t){var i=a[n];var o=i.settings.containerSettings;if(o.title){t.setTitle(o.title)}e[i.key]={panel:t}}});return e})}}.bind(this)).then(function(e){var a=[];Object.keys(e).forEach(function(o,r){var s=e[o].panel;if(s.attachChange instanceof Function){s.attachChange(function(e){i.oAdaptationProvider.validateP13n(t,n[r],e.getSource())})}a.push(s)});return a})};a.getInstance=function(t){if(!i){this._checkValidInterface(t);i=new a(t)}return i};a.prototype.setActiveP13n=function(t,e,n){if(this.oAdaptationProvider.setActiveP13n instanceof Function){this.oAdaptationProvider.setActiveP13n(t,e,n)}};a.prototype.hasActiveP13n=function(t){var e=false;if(this.oAdaptationProvider.hasActiveP13n instanceof Function){e=this.oAdaptationProvider.hasActiveP13n(t)}return e};a._checkValidInterface=function(t){if(!t||!t.isA("sap.m.p13n.modules.AdaptationProvider")){throw Error("The UIManager singleton must not be accessed without an AdaptationProvider interface!")}};a.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);i=null};return a});
//# sourceMappingURL=UIManager.js.map