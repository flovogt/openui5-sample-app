/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/LayoutData","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/jquery"],function(e,t,jQuery){"use strict";var a=e.extend("sap.f.FlexibleColumnLayoutData",{metadata:{library:"sap.f",aggregations:{desktopLayoutData:{type:"sap.f.FlexibleColumnLayoutDataForDesktop",multiple:false,singularName:"desktopLayoutData"},tabletLayoutData:{type:"sap.f.FlexibleColumnLayoutDataForTablet",multiple:false,singularName:"tabletLayoutData"}}}});a.prototype.init=function(){this._oObserver=new t(a.prototype._onAggregationChange.bind(this));this._oObserver.observe(this,{aggregations:["desktopLayoutData","tabletLayoutData"]})};a.prototype._onAggregationChange=function(e){if(e.mutation==="insert"){this._observeControlProperties(e.child)}else if(e.mutation==="remove"){this._unobserveControlProperties(e.child)}else if(e.type==="property"){this.fireEvent("_layoutDataPropertyChanged",{layout:e.name.charAt(0).toUpperCase()+e.name.slice(1),srcControl:e.object,oldValue:e.old,newValue:e.current})}};a.prototype._observeControlProperties=function(e){this._oObserver.observe(e,{properties:Object.keys(e.getMetadata().getAllProperties())})};a.prototype._unobserveControlProperties=function(e){this._oObserver.unobserve(e,{properties:Object.keys(e.getMetadata().getAllProperties())})};a.prototype.invalidate=function(){var e=this.getParent();if(e){var t=jQuery.Event("LayoutDataChange");t.srcControl=this;e._handleEvent?.(t)}};return a});
//# sourceMappingURL=FlexibleColumnLayoutData.js.map