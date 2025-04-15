/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/TreeBinding","./v2/ODataTreeBinding","sap/ui/model/TreeBindingAdapter","sap/ui/model/TreeAutoExpandMode","sap/ui/model/ChangeReason","./OperationMode","sap/base/assert","sap/ui/model/Filter","sap/ui/model/odata/ODataUtils"],function(e,t,r,i,o,s,a,n,h){"use strict";var p=function(){if(!(this instanceof e)||this._bIsAdapted){return}r.apply(this);for(var t in p.prototype){if(p.prototype.hasOwnProperty(t)){this[t]=p.prototype[t]}}this.mParameters=this.mParameters||{};this._aRowIndexMap=[];this._iThreshold=0;this._iPageSize=0;this.setAutoExpandMode(this.mParameters.autoExpandMode||i.Sequential);if(this.mParameters.collapseRecursive===undefined){this.bCollapseRecursive=true}else{this.bCollapseRecursive=!!this.mParameters.collapseRecursive}this._createTreeState();if(this.mParameters.treeState&&this.sOperationMode==s.Client){this.setTreeState(this.mParameters.treeState)}};p.prototype.nodeHasChildren=function(e){a(e,"ODataTreeBindingAdapter.nodeHasChildren: No node given!");if(!e){return false}else if(e.isArtificial){return true}else{return t.prototype.hasChildren.call(this,e.context)}};p.prototype._calculateGroupID=function(e){var t="";var r="";var i;if(e.context===null){return"/"}if(e.parent){t=e.parent.groupID;t=t[t.length-1]!=="/"?t+"/":t;if(this.bHasTreeAnnotations){i=(e.context.getProperty(this.oTreeProperties["hierarchy-node-for"])+"").replace(/\//g,"%2F");r=i+"/"}else{r=e.context.sPath.substring(1)+"/"}}else if(this.bHasTreeAnnotations){t="/";i=(e.context.getProperty(this.oTreeProperties["hierarchy-node-for"])+"").replace(/\//g,"%2F");r=i+"/"}else{t="/";r=e.context.sPath[0]==="/"?e.context.sPath.substring(1):e.context.sPath}var o=t+r;return o};p.prototype.resetData=function(e,r){t.prototype.resetData.call(this,e,r);this._aRowIndexMap=[];this._oRootNode=undefined;this._iPageSize=0;this._iThreshold=0;if(!r||r.reason!==o.Sort){this.clearSelection();this._createTreeState(true)}};p.prototype.expandNodeToLevel=function(e,t,r){var i=this;if(this.sOperationMode!=="Server"){return Promise.reject(new Error("expandNodeToLevel() does not support binding operation modes other than OperationMode.Server"))}var s=this.findNode(e),a=[],p="";if(this.sOperationMode=="Server"||this.bUseServersideApplicationFilters){p=this.getFilterParams()}var d=s.context.getProperty(this.oTreeProperties["hierarchy-node-for"]);var l=this._getEntityType();var u=h._createFilterParams(new n(this.oTreeProperties["hierarchy-node-for"],"EQ",d),this.oModel.oMetadata,l);var c=this._getLevelFilterParams("LE",t);a.push("$filter="+u+"%20and%20"+c+(p?"%20and%20"+p:""));if(this.sCustomParams){a.push(this.sCustomParams)}return this._loadSubTree(s,a).then(function(e){var a=e.results.filter(function(e){return e[i.oTreeProperties["hierarchy-level-for"]]<t});this._expandSubTree(s,a);if(!r){this._fireChange({reason:o.Expand})}}.bind(this))};p.prototype._expandSubTree=function(e,t){this._updateTreeState({groupID:e.groupID,expanded:true});var r,i,o,s={},a;o=e.context.getProperty(this.oTreeProperties["hierarchy-node-for"]);s[o]=e.groupID;for(a=1;a<t.length;a++){var n,h,p,d,l;d=t[a];n=d[this.oTreeProperties["hierarchy-node-for"]];r=d[this.oTreeProperties["hierarchy-parent-node-for"]];if(d[this.oTreeProperties["hierarchy-drill-state-for"]]==="leaf"){continue}h=this.oModel._getKey(d);l=this.oModel.getContext("/"+h);i=s[r];p=this._calculateGroupID({parent:{groupID:i},context:l});s[n]=p;this._updateTreeState({groupID:p,expanded:true})}};p.prototype.getLength=function(){if((!this._oRootNode||!this._oRootNode.magnitude)&&this.oFinalLengths[null]){return this.oLengths[null]}return r.prototype.getLength.apply(this)};return p},true);
//# sourceMappingURL=ODataTreeBindingAdapter.js.map