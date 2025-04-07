/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/isEmptyObject","sap/ui/core/Component","sap/ui/core/Element","sap/ui/core/Shortcut"],function(t,e,i,n,r){"use strict";var a=n.extend("sap.ui.core.CommandExecution",{metadata:{library:"sap.ui.core",properties:{command:{type:"string"},enabled:{type:"boolean",defaultValue:true},visible:{type:"boolean",defaultValue:true}},events:{execute:{}}},bSkipUpdate:false,trigger:function(){if(this.getVisible()&&this.getEnabled()){this.fireExecute({})}},setCommand:function(e){if(!this.getCommand()){this.setProperty("command",e,true)}else{t.error("The 'command' property can only be applied initially!")}return this},_getCommandInfo:function(){if(!this.oCommand){var t,e=this.getParent(),n=i.getOwnerComponentFor(this);while(!n&&e&&e.getParent()){n=i.getOwnerComponentFor(e);e=e.getParent()}if(n){t=n.getCommand(this.getCommand())}this.oCommand=t?Object.assign({},t):null}return this.oCommand},_updateContextData:function(t){var e=this.getParent();t[this.getCommand()]={};t[this.getCommand()].enabled=this.getEnabled();t[this.getCommand()].id=this.getId();t[this.getCommand()].visible=this.getVisible();this.getModel("$cmd").setProperty("/"+e.getId(),t)},_createCommandData:function(t){if(!this.bSkipUpdate){this.bSkipUpdate=true;var e=this.getParent(),i=e.getModel("$cmd"),n=i.getData(),r=n[e.getId()];if(!r){r=Object.create(t)}else if(t!==Object.getPrototypeOf(r)){r=Object.create(t)}this._updateContextData(r);if(!e.getObjectBinding("$cmd")){e.bindElement("$cmd>/"+e.getId())}this.bSkipUpdate=false}},setParent:function(e){var i=this,a,o=this.getParent(),s,d,g;function m(){var t=e.oPropagatedProperties.oBindingContexts["$cmd"];return t?t.getObject():null}function p(){if(e.getModel("$cmd")){var t=m();i.getParent().detachModelContextChange(p);i._createCommandData(t)}}n.prototype.setParent.apply(this,arguments);a=this._getCommandInfo();if(a){if(this.getVisible()){if(e&&e!==o){d=a.shortcut;g=r.isRegistered(this.getParent(),d);if(!g){r.register(e,d,this.trigger.bind(this))}if(e.getModel("$cmd")){s=m();this._createCommandData(s)}else{e.attachModelContextChange(p)}if(!e._propagateProperties._sapui_fnOrig){var c=e._propagateProperties;e._propagateProperties=function(t,n,r,a,o,d){c.apply(e,arguments);var g=e.getBindingContext("$cmd");var p=arguments[1];if(g&&p.isA("sap.ui.core.CommandExecution")){var h=g.getObject();var u=Object.getPrototypeOf(h);s=m();if(u!==s){i._createCommandData.apply(p,[s])}}};e._propagateProperties._sapui_fnOrig=c}}if(o&&o!=e){d=a.shortcut;g=r.isRegistered(o,d);if(g){r.unregister(o,a.shortcut)}this._cleanupContext(o)}}}else{t.error(`${this}: Command '${this.getCommand()}' is not defined in component manifest. No shortcut will be registered.`)}return this},_cleanupContext:function(t){if(t.getBindingContext("$cmd")){var i=t.getBindingContext("$cmd").getObject();if(i){delete i[this.getCommand()];if(e(Object.assign({},i))){if(t._propagateProperties._sapui_fnOrig){t._propagateProperties=t._propagateProperties._sapui_fnOrig}if(!t._bIsBeingDestroyed){t.unbindElement("$cmd")}}}}},setVisible:function(t){var e=this.getParent(),i=this.getModel("$cmd");this.setProperty("visible",t,true);t=this.getProperty("visible");if(e){var n=this._getCommandInfo(),a=n.shortcut,o=r.isRegistered(e,a);if(t&&!o){r.register(e,a,this.trigger.bind(this))}else if(!t&&o){r.unregister(e,a)}}if(i){var s=this.getBindingContext("$cmd");i.setProperty(this.getCommand()+"/visible",t,s)}return this},setEnabled:function(t){var e=this.getModel("$cmd");this.setProperty("enabled",t,true);if(e){var i=this.getBindingContext("$cmd");e.setProperty(this.getCommand()+"/enabled",this.getProperty("enabled"),i)}return this},destroy:function(){var t=this.getParent();var e=this._getCommandInfo();if(t&&e){r.unregister(this.getParent(),e.shortcut);this._cleanupContext(t)}n.prototype.destroy.apply(this,arguments)}});a.find=function(t,e){var i,n,r;r=t.getDependents();for(i=0;i<r.length;i++){if(r[i].isA("sap.ui.core.CommandExecution")&&r[i].getCommand()===e){n=r[i]}}if(!n&&t.getParent()){n=a.find(t.getParent(),e)}return n};return a});
//# sourceMappingURL=CommandExecution.js.map