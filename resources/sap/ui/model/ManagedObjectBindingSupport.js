/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BindingMode","./StaticBinding","./CompositeBinding","./FormatException","./ParseException","./ValidateException","./Context","sap/base/Log","sap/base/assert","sap/ui/base/Object","sap/base/util/ObjectPath","sap/ui/base/SyncPromise","sap/ui/base/ManagedObjectMetadata"],function(e,t,n,i,a,r,s,o,d,g,f,h,l){"use strict";var u={_bindObject:function(e){var t,n,i,a,r=this;var s=function(e){r.setElementBindingContext(t.getBoundContext(),i)};var o=function(e){var n=t.getDataState();if(!n){return}if(r.refreshDataState){r.refreshDataState("",n)}};i=e.model;a=this.getModel(i);n=this.getBindingContext(i);t=a.bindContext(e.path,n,e.parameters);if(e.suspended){t.suspend(true)}t.attachChange(s);e.binding=t;e.modelChangeHandler=s;e.dataStateChangeHandler=o;t.attachEvents(e.events);if(this.refreshDataState){t.attachAggregatedDataStateChange(o)}t.initialize()},_unbindObject:function(e,t,n){if(e.binding){if(!this._bIsBeingDestroyed){this._detachObjectBindingHandlers(e)}e.binding.destroy()}delete this.mElementBindingContexts[t];if(!n){this.updateBindingContext(false,t);this.propagateProperties(t);this.fireModelContextChange()}},_detachObjectBindingHandlers:function(e){if(e.binding){e.binding.detachChange(e.modelChangeHandler);e.binding.detachEvents(e.events);if(this.refreshDataState){e.binding.detachAggregatedDataStateChange(e.dataStateChangeHandler)}}},updateBindings:function(e,t){var n=this,i,a,r;function s(i){var a=i.parts,r;if(a){if(a.length==1){return(e||a[0].model==t)&&!i.binding.updateRequired(n.getModel(a[0].model))}else{for(r=0;r<a.length;r++){if((e||a[r].model==t)&&!i.binding.aBindings[r].updateRequired(n.getModel(a[r].model))){return true}}}}else{return(e||i.model==t)&&!i.binding.updateRequired(n.getModel(i.model))}}function o(e){var t=e.parts,i;if(t){for(i=0;i<t.length;i++){if(!n.getModel(t[i].model)&&t[i].value===undefined){return false}}return true}else{return!!n.getModel(e.model)}}function d(e){var t=e.binding;if(n.refreshDataState){n.refreshDataState(i,t.getDataState())}t.detachChange(e.modelChangeHandler);if(e.modelRefreshHandler){t.detachRefresh(e.modelRefreshHandler)}t.detachEvents(e.events);t.destroy();delete e.binding;delete e.modelChangeHandler;delete e.dataStateChangeHandler;delete e.modelRefreshHandler}for(i in this.mObjectBindingInfos){r=this.mObjectBindingInfos[i];a=o(r);if(r.binding&&s(r)){d(r);if(!a){delete this.mElementBindingContexts[i]}}if(!r.binding&&a){this._bindObject(r)}}for(i in this.mBindingInfos){r=this.mBindingInfos[i];if(r.binding&&s(r)){if(this._observer){var g=r.factory?"aggregation":"property";this._observer.bindingChange(this,i,"remove",r,g)}d(r)}if(!r.binding&&o(r)){if(r.factory){this._bindAggregation(i,r)}else{this._bindProperty(i,r)}}}},updateProperty:function(e){var t=this.mBindingInfos[e],n=t.binding,a=this.getMetadata().getPropertyLikeSetting(e),r=this;function s(s){if(s instanceof i){r.fireFormatError({element:r,property:e,type:n.getType(),newValue:n.getValue(),oldValue:r[a._sGetter](),exception:s,message:s.message},false,true);o.error("FormatException in property '"+e+"' of '"+r+"': "+s.message+"\nHint: single properties referenced in composite bindings and within binding expressions are automatically converted "+"into the type of the bound control property, unless a different 'targetType' is specified. targetType:'any' may avoid "+"the conversion and lead to the expected behavior.");t.skipModelUpdate++;r.resetProperty(e);t.skipModelUpdate--}else{throw s}}if(t.skipPropertyUpdate){return}h.resolve().then(function(){return n.getExternalValue()}).then(function(e){t.skipModelUpdate++;r[a._sMutator](e);t.skipModelUpdate--}).catch(function(e){s(e)}).unwrap()},updateModelProperty:function(t,n,i){var s,o,d=this;function g(e){var s={element:d,property:t,type:o.getType(),newValue:n,oldValue:i,exception:e,message:e.message};if(e instanceof a){d.fireParseError(s,false,true)}else if(e instanceof r){d.fireValidationError(s,false,true)}else{throw e}}function f(){var e={element:d,property:t,type:o.getType(),newValue:n,oldValue:i};if(o.hasValidation()){d.fireValidationSuccess(e,false,true)}}if(this.isBound(t)){s=this.mBindingInfos[t];o=s.binding;if(s.skipModelUpdate||o&&o.isSuspended()){return}if(o&&o.getBindingMode()==e.TwoWay){s.skipPropertyUpdate++;h.resolve(n).then(function(e){return o.setExternalValue(e)}).then(function(){s.skipPropertyUpdate--;return o.getExternalValue()}).then(function(e){if(n!=e){d.updateProperty(t)}f()}).catch(function(e){s.skipPropertyUpdate--;g(e)}).unwrap()}}},updateAggregation:function(e,t,n){var i=this.mBindingInfos[e],a=i.binding,r=i.factory,s=this.getMetadata().getAggregation(e),d,f,h,u=s._sMutator+"Group",p=this;function c(e,t){if(p.bUseExtendedChangeDetection){return l.uid("clone")}else{return e.getId()+"-"+t}}function m(e,t,n,a){var o=e[s._sGetter]()||[],d,g;if(o.length>t.length){for(var f=t.length;f<o.length;f++){g=o[f];e[s._sRemoveMutator](g);g.destroy("KeepDom")}}for(var f=0;f<t.length;f++){d=t[f];g=o[f];if(n){n(d)}if(g){g.setBindingContext(d,i.model)}else{g=r(c(e,f),d);g.setBindingContext(d,i.model);e[s._sMutator](g)}if(a){a(d,g)}}}function b(e,t){var n=t.diff,a=e[s._sGetter]()||[],d,g,f,h;if(!n||a.length===0){m(e,t);return}for(h=0;h<n.length;h++){d=n[h];switch(d.type){case"insert":f=t[d.index];g=r(c(e,d.index),f);g.setBindingContext(f,i.model);e[s._sInsertMutator](g,d.index);break;case"delete":g=e[s._sRemoveMutator](d.index);g.destroy("KeepDom");break;default:o.error('[FUTURE FATAL] Unknown diff type "'+d.type+'"')}}a=e[s._sGetter]()||[];for(h=0;h<a.length;h++){a[h].setBindingContext(t[h],i.model)}}function y(e){var t=a.getGroup(e);if(t.key!==d){var n;if(i.groupHeaderFactory){n=i.groupHeaderFactory(t)}p[u](t,n);d=t.key}}function C(e,t){m(e,t,null,function(e,t){C(t,a.getNodeContexts(e))})}if(g.isObjectA(a,"sap.ui.model.ListBinding")){h=a.getContexts(i.startIndex,i.length);f=a.isGrouped()&&p[u];if(f||a.bWasGrouped){this[s._sDestructor]();m(this,h,f?y:undefined)}else if(this.bUseExtendedChangeDetection){b(this,h)}else{if(!i.template){this[s._sDestructor]()}m(this,h)}a.bWasGrouped=f}else if(g.isObjectA(a,"sap.ui.model.TreeBinding")){if(!i.template){this[s._sDestructor]()}C(this,a.getRootContexts())}},updateBindingContext:function(e,t,i){var a,r={},o,d,g,f,h;function l(e){return h[e].model==o&&h[e].value===undefined}if(i){for(o in this.oModels){if(this.oModels.hasOwnProperty(o)){r[o]=o}}for(o in this.oPropagatedProperties.oModels){if(this.oPropagatedProperties.oModels.hasOwnProperty(o)){r[o]=o}}}else{r[t]=t}for(o in r){if(r.hasOwnProperty(o)){o=o==="undefined"?undefined:o;a=this.getModel(o);f=this.mObjectBindingInfos[o];if(a&&f&&!e){if(!f.binding){this._bindObject(f)}else{d=this._getBindingContext(o);var u=f.binding.getContext();if(s.hasChanged(u,d)){f.binding.setContext(d)}}continue}d=this.getBindingContext(o);for(g in this.mBindingInfos){var f=this.mBindingInfos[g],p=f.binding;h=f.parts;if(!p){continue}if(p instanceof n){p.setContext(d,{fnIsBindingRelevant:l})}else if(f.factory){if(f.model==o){p.setContext(d)}}else if(l(0)){p.setContext(d)}}}}},refreshAggregation:function(e){var t=this.mBindingInfos[e],n=t.binding;n.getContexts(t.startIndex,t.length)},setElementBindingContext:function(e,t){d(t===undefined||typeof t==="string"&&!/^(undefined|null)?$/.test(t),"sModelName must be a string or omitted");var n=this.mElementBindingContexts[t];if(s.hasChanged(n,e)){if(e===undefined){delete this.mElementBindingContexts[t]}else{this.mElementBindingContexts[t]=e}this.updateBindingContext(true,t);this.propagateProperties(t);this.fireModelContextChange()}return this},_bindProperty:function(i,a){var r,s,d,g,h=e.TwoWay,l,u,p=this.getMetadata().getPropertyLikeSetting(i),c=p._iKind===0?p.type:p.altTypes[0],m=this,b=[],y=function(t){m.updateProperty(i);var n=d.getDataState();if(n){var r=n.getControlMessages();if(r&&r.length>0){n.setControlMessages([]);var s=sap.ui.require("sap/ui/core/Messaging");if(s){s.removeMessages(r)}}n.setInvalidValue(undefined)}if(d.getBindingMode()===e.OneTime&&d.isResolved()){d.detachChange(y);if(this.refreshDataState){d.detachAggregatedDataStateChange(C)}d.detachEvents(a.events)}},C=function(){var e=d.getDataState();if(!e){return}if(m.refreshDataState){m.refreshDataState(i,e)}},v=function(e){var t=e.replace(/\./g,"/");var n=sap.ui.require(t);if(!n){n=f.get(e);if(typeof n==="function"&&!n._sapUiLazyLoader){o.error("[FUTURE FATAL] The type class '"+e+"' is exported to the global namespace without being set as an export value of a UI5 module. "+"This scenario will not be supported in the future and a separate UI5 module needs to be created which exports this type class.")}else{n=sap.ui.requireSync(t)}}return n};a.parts.forEach(function(n){s=m.getBindingContext(n.model);r=m.getModel(n.model);l=n.type;if(typeof l=="string"){u=v(l);if(typeof u!=="function"){throw new Error('Cannot find type "'+l+'" used in control "'+m.getId()+'"!')}l=new u(n.formatOptions,n.constraints)}if(n.value!==undefined){d=new t(n.value)}else{d=r.bindProperty(n.path,s,n.parameters||a.parameters)}d.setType(l,n.targetType||c);d.setFormatter(n.formatter);if(n.suspended){d.suspend(true)}g=n.mode||r&&r.getDefaultBindingMode()||e.TwoWay;d.setBindingMode(g);if(g!==e.TwoWay){h=e.OneWay}b.push(d)});if(b.length>1||a.formatter&&a.formatter.textFragments){l=a.type;if(typeof l=="string"){u=v(l);l=new u(a.formatOptions,a.constraints)}d=new n(b,a.useRawValues,a.useInternalValues);d.setType(l,a.targetType||c);d.setBindingMode(a.mode||h)}else{d=b[0]}d.attachChange(y);if(this.refreshDataState){d.attachAggregatedDataStateChange(C)}if(typeof a.formatter==="function"){d.setFormatter(a.formatter.bind(this))}a.binding=d;a.modelChangeHandler=y;a.dataStateChangeHandler=C;d.attachEvents(a.events);d.initialize();if(this._observer){this._observer.bindingChange(this,i,"ready",a,"property")}},_unbindProperty:function(e,t){var n;n=e.binding;if(n){if(!this._bIsBeingDestroyed){this._detachPropertyBindingHandlers(t)}n.destroy();if(this.refreshDataState&&!this._bIsBeingDestroyed){n.detachAggregatedDataStateChange(e.dataStateChangeHandler)}}},_detachPropertyBindingHandlers:function(e){var t=this.mBindingInfos[e],n;if(t){n=t.binding;if(n){n.detachChange(t.modelChangeHandler);n.detachEvents(t.events);if(this.refreshDataState&&this._bIsBeingDestroyed){n.detachAggregatedDataStateChange(t.dataStateChangeHandler)}}}},_bindAggregation:function(e,t){var n=this,i,a=this.getMetadata().getAggregation(e),r=function(e){a.update(n,e.getParameter("reason"),{detailedReason:e.getParameter("detailedReason")})},s=function(e){a.refresh(n,e.getParameter("reason"))},o=function(t){var a=i.getDataState();if(!a){return}if(n.refreshDataState){n.refreshDataState(e,a)}};var g=this.getModel(t.model);if(this.isTreeBinding(e)){i=g.bindTree(t.path,this.getBindingContext(t.model),t.filters,t.parameters,t.sorter)}else{i=g.bindList(t.path,this.getBindingContext(t.model),t.sorter,t.filters,t.parameters);if(this.bUseExtendedChangeDetection){d(!this.oExtendedChangeDetectionConfig||!this.oExtendedChangeDetectionConfig.symbol,"symbol function must not be set by controls");i.enableExtendedChangeDetection(!t.template,t.key,this.oExtendedChangeDetectionConfig)}}if(t.suspended){i.suspend(true)}t.binding=i;t.modelChangeHandler=r;t.modelRefreshHandler=s;t.dataStateChangeHandler=o;i.attachChange(r);i.attachRefresh(s);i.attachEvents(t.events);if(this.refreshDataState){i.attachAggregatedDataStateChange(o)}i.initialize();if(this._observer){this._observer.bindingChange(this,e,"ready",t,"aggregation")}},_unbindAggregation:function(e,t){if(e.binding){if(!this._bIsBeingDestroyed){this._detachAggregationBindingHandlers(t)}e.binding.destroy()}},_detachAggregationBindingHandlers:function(e){var t=this.mBindingInfos[e];if(t){if(t.binding){t.binding.detachChange(t.modelChangeHandler);t.binding.detachRefresh(t.modelRefreshHandler);t.binding.detachEvents(t.events);if(this.refreshDataState){t.binding.detachAggregatedDataStateChange(t.dataStateChangeHandler)}}}}};return u});
//# sourceMappingURL=ManagedObjectBindingSupport.js.map