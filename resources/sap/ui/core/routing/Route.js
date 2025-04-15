/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/core/routing/Target","sap/ui/core/routing/async/Route","sap/ui/core/routing/sync/Route","sap/ui/core/Component","sap/base/Log","sap/base/assert","sap/base/util/deepExtend"],function(t,e,r,n,o,a,i,s){"use strict";var u=t.extend("sap.ui.core.routing.Route",{metadata:{publicMethods:["getURL","getPattern"]},constructor:function(o,i,s){t.apply(this,arguments);this._validateConfig(i);this._aPattern=[];this._aRoutes=[];this._oParent=s;this._oConfig=i;this._oRouter=o;var u=this,h=i.pattern,c,f,g,d,_=o._isAsync();d=_?r:n;for(var p in d){this[p]=d[p]}if(!Array.isArray(h)){h=[h]}if(i.parent){var m=this._getParentRoute(i.parent);if(!m){a.error("[FUTURE FATAL] No parent route with '"+i.parent+"' could be found",this)}else if(m._aPattern.length>1){a.error("[FUTURE FATAL] Routes with multiple patterns cannot be used as parent for nested routes",this);return}else{this._oNestingParent=m;h.forEach(function(t,e){var r=m._aPattern[0];r=r.charAt(r.length)==="/"?r:r+"/";h[e]=r+t})}}if(Array.isArray(i.subroutes)){c=i.subroutes;i.subroutes={};c.forEach(function(t){i.subroutes[t.name]=t})}if(!i.target){var l=this._convertToTargetOptions(i);l._async=_;this._oTarget=new e(l,o._oViews,s&&s._oTarget);this._oTarget._bUseRawViewId=true}if(i.subroutes){for(f in i.subroutes){g=i.subroutes[f];if(g.name===undefined){g.name=f}o.addRoute(g,u)}}if(i.pattern===undefined){return}h.forEach(function(t,e){u._aPattern[e]=t;u._aRoutes[e]=o._oRouter.addRoute(t);u._checkRoute(u._aRoutes[e]);u._aRoutes[e].greedy=i.greedy;u._aRoutes[e].matched.add(function(){var t={};Array.from(arguments).forEach(function(r,n){t[u._aRoutes[e]._paramsIds[n]]=r});u._routeMatched(t,true)});u._aRoutes[e].switched.add(function(){u._routeSwitched()})})},_checkRoute:function(t){var e=t._paramsIds;if(Array.isArray(e)){var r=e.filter(function(t){return t.charAt(0)==="?"}).filter(function(t){return e.indexOf(t.substring(1))>-1}).map(function(t){return t.substring(1)});if(r.length>0){throw Error("The config of route '"+this._oConfig.name+"' contains standard parameter and query parameter with the same name: '"+r+"'. The name of the routing parameters and query parameter have to differentiate.")}}},_routeSwitched:function(){this._suspend();this.fireEvent("switched",{name:this._oConfig.name})},_suspend:function(){if(this._oRouter._oTargets){this._oRouter._oTargets.suspend(this._oConfig.target);if(this._oConfig.dynamicTarget){this._oRouter._oTargets.suspend(this._oConfig.dynamicTarget)}}},_resume:function(){if(this._oRouter._oTargets){this._oRouter._oTargets.resume(this._oConfig.target);if(this._oConfig.dynamicTarget){this._oRouter._oTargets.resume(this._oConfig.dynamicTarget)}}},destroy:function(){t.prototype.destroy.apply(this);this._aPattern=null;this._aRoutes=null;this._oParent=null;this._oConfig=null;this.bIsDestroyed=true;return this},getURL:function(t){return this._aRoutes[0].interpolate(t||{})},_alignTargetsConfig:function(t){if(!t){return[]}if(!Array.isArray(t)){return typeof t==="string"?[{name:t}]:[t]}return t.map(function(t){if(typeof t==="string"){t={name:t}}return t})},_changeHashWithComponentTargets:function(t,e){var r=this._alignTargetsConfig(this._oConfig.target),n=this._oRouter._oTargets,o,i;if(r&&r.length>0&&n){o=n.getTarget(r);if(!Array.isArray(o)){o=[o]}}else{o=[]}var s=this;i=o.map(function(n,o){if(n._oOptions.type==="Component"){var i=n._load({prefix:r[o].prefix,propagateTitle:r[o].hasOwnProperty("propagateTitle")?r[o].propagateTitle:s._oRouter._oConfig.propagateTitle});return i.then(function(n){var i=n.getRouter(),s=i&&i.getHashChanger(),u=t&&t[r[o].name],h=u&&u.route,c=i&&i.getRoute(h),f;if(u){if(c){f=i._getLastMatchedRouteName()!==h;s.setHash(c.getURL(u.parameters),e||!f);return c._changeHashWithComponentTargets(u.componentTargetInfo,e||f)}else{a.error("[FUTURE FATAL] Can not navigate to route with name '"+h+"' because the route does not exist in component with id '"+n.getId()+"'")}}})}return});return Promise.all(i)},getPattern:function(){return this._aPattern[0]},match:function(t){return this._aRoutes.some(function(e){return e.match(t)})},attachMatched:function(t,e,r){return this.attachEvent("matched",t,e,r)},detachMatched:function(t,e){return this.detachEvent("matched",t,e)},attachBeforeMatched:function(t,e,r){return this.attachEvent("beforeMatched",t,e,r)},detachBeforeMatched:function(t,e){return this.detachEvent("beforeMatched",t,e)},fireBeforeMatched:function(t){this.fireEvent("beforeMatched",t);return this},attachPatternMatched:function(t,e,r){return this.attachEvent("patternMatched",t,e,r)},detachPatternMatched:function(t,e){return this.detachEvent("patternMatched",t,e)},_validateConfig:function(t){if(!t.name){a.error("[FUTURE FATAL] A name has to be specified for every route",this)}if(t.viewName){a.error("[FUTURE FATAL] The 'viewName' option shouldn't be used in Route. please use 'view' instead",this)}},_convertToTargetOptions:function(t){return s({},t,{rootView:t.targetParent,controlId:t.targetControl,controlAggregation:t.targetAggregation,clearControlAggregation:t.clearTarget,viewName:t.view,viewType:t.viewType,viewId:t.viewId})},_getParentRoute:function(t){var e=t.split(":");if(e.length===1||e.length===2&&!e[0]){return this._oRouter.getRoute(e[e.length-1])}else{i(this._oRouter._oOwner,"No owner component for "+this._oRouter._oOwner.getId());var r=o.getOwnerComponentFor(this._oRouter._oOwner);while(r){if(r.isA(e[0])){var n=r.getRouter();return n.getRoute(e[1])}r=o.getOwnerComponentFor(r)}return null}},getPatternArguments:function(t){return this._aRoutes[0].extrapolate(t)}});u.M_EVENTS={BeforeMatched:"beforeMatched",Matched:"matched",PatternMatched:"patternMatched"};return u});
//# sourceMappingURL=Route.js.map