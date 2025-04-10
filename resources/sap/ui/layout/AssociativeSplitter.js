/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Splitter","./SplitterRenderer","sap/base/Log","sap/ui/core/Element"],function(e,t,i,s){"use strict";var n=e.extend("sap.ui.layout.AssociativeSplitter",{metadata:{associations:{associatedContentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"associatedContentArea"}}},renderer:t});n.prototype.init=function(){e.prototype.init.call(this);this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",1),decrease:this._onKeyboardResize.bind(this,"dec",1),increaseMore:this._onKeyboardResize.bind(this,"incMore",2),decreaseMore:this._onKeyboardResize.bind(this,"decMore",2),max:this._onKeyboardResize.bind(this,"max",1),min:this._onKeyboardResize.bind(this,"min",1)};this._enableKeyboardListeners()};n.prototype.addAssociatedContentArea=function(e){this._ensureLayoutData(e);return this.addAssociation("associatedContentAreas",e)};n.prototype._enableKeyboardListeners=function(){e.prototype._enableKeyboardListeners.call(this);this.onsaprightmodifiers=this._keyListeners.increase;this.onsapleftmodifiers=this._keyListeners.decrease;this.onsapupmodifiers=this._keyListeners.decrease;this.onsapdownmodifiers=this._keyListeners.increase;this.onsapright=this._keyListeners.increaseMore;this.onsapdown=this._keyListeners.increaseMore;this.onsapleft=this._keyListeners.decreaseMore;this.onsapup=this._keyListeners.decreaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true};n.prototype._getContentAreas=function(){var e=this.getAssociatedContentAreas()||[];var t=this.getContentAreas();var i=e.map(function(e){return s.getElementById(e)}).filter(function(e){return e});return t.concat(i)};n.prototype.ondblclick=function(e){var t=this.getId(),i,s;if(!(e.target.contains(this._oLastDOMclicked)&&this._oLastDOMclicked.id.indexOf(t+"-splitbar")>-1)){return}i=parseInt(this._oLastDOMclicked.id.substr((t+"-splitbar-").length));s=this._getContentAreas()[i];s._currentPosition=this._calculatedSizes[i];s._lastPosition=s._lastPosition||s._currentPosition;if(s._currentPosition===s._lastPosition){this._resizeContents(i,this._calculatedSizes[i]*-1,true)}else{this._resizeContents(i,s._lastPosition,true);s._lastPosition=null}};n.prototype._calcPercentBasedSizes=function(t,i){var s=this._getContentAreas(),n=this._calcAvailableContentSize();if(t.length===1&&s.length===1){this._calculatedSizes[t[0]]=n;i-=n}else{i=e.prototype._calcPercentBasedSizes.apply(this,arguments)}return i};n.prototype._logConstraintsViolated=function(){i.warning("The set sizes and minimal sizes of the splitter contents are bigger than the available space in the UI. "+"Consider enabling the pagination mechanism by setting the 'requiredParentWidth' property of the panes",null,"sap.ui.layout.ResponsiveSplitter")};n.prototype.containsControl=function(e){var t=this._getContentAreas(),i,s;for(s=0;s<t.length;s++){i=t[s];if(i.isA("sap.ui.layout.AssociativeSplitter")){if(i.containsControl(e)){return true}}else{if(i.getId()===e){return true}}}};return n});
//# sourceMappingURL=AssociativeSplitter.js.map