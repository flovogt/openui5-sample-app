/*
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","./PluginBase","../library","sap/ui/base/ManagedObjectObserver"],function(e,t,n,o){"use strict";const i=n.plugins.ContextMenuScope;const s=t.extend("sap.m.plugins.ContextMenuSetting",{metadata:{library:"sap.m",properties:{scope:{type:"sap.m.plugins.ContextMenuScope",group:"Behavior",defaultValue:i.Default}},events:{}}});s.findOn=t.findOn;s.prototype.init=function(e){this._oObserver=new o(this._observeChanges.bind(this))};s.prototype.exit=function(){this._oObserver.destroy();this._oObserver=null};s.prototype._observeChanges=function(e){if(e.mutation=="insert"){this._monkeypatch(e.child)}else{this._cleanupMonkeypatch(e.child)}};s.prototype._monkeypatch=function(t){if(!t||!t.isA("sap.m.Menu")){return}const n=this;this._original_openAsContextMenu=t.openAsContextMenu;t.openAsContextMenu=function(t,o){if(n.getScope()!==i.Selection){return n._original_openAsContextMenu.apply(this,arguments)}const s=n.getControl();const a=n.getConfig("items",s);if(o instanceof HTMLElement){o=e.closestTo(o,true)}const r=n.getConfig("isItemSelected",s,o);a.forEach(e=>{const t=n.getConfig("isItemSelected",s,e);if(e!==o&&!(r&&t)){e.addStyleClass("sapMContextMenuSettingContentOpacity")}});this.attachEventOnce("closed",()=>{a.forEach(e=>{e.removeStyleClass("sapMContextMenuSettingContentOpacity")})});return n._original_openAsContextMenu.apply(this,arguments)}};s.prototype._cleanupMonkeypatch=function(e){if(e&&this._original_openAsContextMenu){e.openAsContextMenu=this._original_openAsContextMenu;this._original_openAsContextMenu=null}};s.prototype.onActivate=function(e){const t=this.getConfig("contextMenuAggregation");this._monkeypatch(e.getAggregation(t));this._oObserver.observe(e,{aggregations:[t]})};s.prototype.onDeactivate=function(e){const t=this.getConfig("contextMenuAggregation");this._cleanupMonkeypatch(e.getAggregation(t));this._oObserver?.unobserve(e,{aggregations:[t]})};t.setConfigs({"sap.m.ListBase":{items:function(e){return e.getItems()},isItemSelected:function(e,t){return t.getSelected()},contextMenuAggregation:"contextMenu"},"sap.ui.table.Table":{items:function(e){return e.getRows()},isItemSelected:function(e,t){return e._getSelectionPlugin().isSelected(t)},contextMenuAggregation:"contextMenu"}},s);return s});
//# sourceMappingURL=ContextMenuSetting.js.map