/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/dnd/DragInfo","sap/ui/core/dnd/DropInfo","sap/ui/events/KeyCodes","sap/ui/core/library","sap/ui/core/Configuration"],function(e,t,r,i,a){"use strict";var n=i.dnd.DropPosition;var s="Before",o="insertBefore",g="insertAfter",f,l="IconTabReorder",c="Forward",u="Backward";var d={_insertControl:function(e,t,r,i){var a=t.$(),n=r.$(),s=[],o=[];if(t._getNestedLevel()>1&&r._getNestedLevel()>1){s=t._getRootTab()._getSelectList().getItems().filter(function(e){return t._getRealTab()._isParentOf(e._getRealTab())});o=r._getRootTab()._getSelectList().getItems().filter(function(e){return r._getRealTab()._isParentOf(e._getRealTab())})}if(i){var f=t._getRootTab().getParent()._getOverflow()._getSelectList().getItems();s=f.filter(function(e){return t._getRealTab()._isParentOf(e._getRealTab())});o=f.filter(function(e){return r._getRealTab()._isParentOf(e._getRealTab())})}if(e===g){a.insertAfter(n)}else{a.insertBefore(n)}s.reverse().forEach(function(e){e.$().insertAfter(a)});o.reverse().forEach(function(e){e.$().insertAfter(n)})},handleDrop:function(e,t,r,i,l,c){var u=e.indexOfItem(r),_=e.indexOfItem(i),b=0,p=a.getRTL(),h=t===s,I=i._getNestedLevel()-1;if(r._isParentOf(i)){return}if(I===c&&t===n.On){return}if(p&&!l){if(h){b=u<_?_:_+1;f=g}else{b=u<_?_-1:_;f=o}}else{if(h){b=u<_?_-1:_;f=o}else{b=u<_?_:_+1;f=g}}if(e.isA("sap.m.IconTabFilter")||!r.getParent().isA("sap.m.IconTabHeader")){if(h){b=_}else{b=_+1}}d._insertControl(f,r,i);if(t===n.On){if(i===r){return}b=e.getAggregation("items").length}d._handleConfigurationAfterDragAndDrop.call(e,r,b)},_updateAccessibilityInfo:function(){var e=this.getItems(),t=1,r;e.forEach(function(e){r=e.getDomRef();if(r&&r.getAttribute("aria-posinset")!==null){r.setAttribute("aria-posinset",t++)}})},_handleConfigurationAfterDragAndDrop:function(e,t){var r=[],i=this.isA("sap.m.IconTabHeader")?this:this._getIconTabHeader();if(this.isA("sap.m.IconTabBarSelectList")){r=this.getItems().filter(function(t){return e._getRealTab()._isParentOf(t._getRealTab())})}i._setPreserveSelection(true);this.removeAggregation("items",e,true);this.insertAggregation("items",e,t,true);r.forEach(function(e){this.removeAggregation("items",e,true)}.bind(this));var a=1+this.indexOfAggregation("items",e);r.reverse().forEach(function(e){this.insertAggregation("items",e,a,true)}.bind(this));i._setPreserveSelection(false);d._updateAccessibilityInfo.call(this)},_decreaseDropIndex:function(e,t){var r=e-1;while(r>=0&&(t[e]._getRealTab()._getNestedLevel()!==t[r]._getRealTab()._getNestedLevel()||!t[r].getVisible()||!t[e].$().hasClass("sapMITBFilterHidden")&&t[r].$().hasClass("sapMITBFilterHidden"))){r--}if(r<0){f=g;return e}f=o;return r},_increaseDropIndex:function(e,t,r){var i=e+1;while(i<t.length&&(t[e]._getRealTab()._getNestedLevel()!==t[i]._getRealTab()._getNestedLevel()||!t[i].getVisible())){i++}if(i>r){f=o;return e}f=g;return i},moveItem:function(e,t,i){var n=this.getItems(),s=this.indexOfItem(e),l=a.getRTL(),_,b;if(this.isA("sap.m.IconTabFilter")){n=this._getRealTab().getItems()}switch(t){case r.HOME:_=0;f=o;break;case r.END:_=n.length-1;f=g;break;case r.ARROW_LEFT:if(l){b=d.preventDragBetweenSubItems(e,c,this);_=d._increaseDropIndex(s,n,i)}else{b=d.preventDragBetweenSubItems(e,u,this);_=d._decreaseDropIndex(s,n)}break;case r.ARROW_RIGHT:if(l){b=d.preventDragBetweenSubItems(e,u,this);_=d._decreaseDropIndex(s,n)}else{b=d.preventDragBetweenSubItems(e,c,this);_=d._increaseDropIndex(s,n,i)}break;case r.ARROW_DOWN:b=d.preventDragBetweenSubItems(e,c,this);_=d._increaseDropIndex(s,n,i);break;case r.ARROW_UP:b=d.preventDragBetweenSubItems(e,u,this);_=d._decreaseDropIndex(s,n);break;default:return false}if(b){return false}if(!this.isA("sap.m.IconTabFilter")){var p=n[_];d._insertControl(f,e,p,this._oTabFilter&&this._oTabFilter._bIsOverflow)}d._handleConfigurationAfterDragAndDrop.call(this,e,_);return true},setDragDropAggregations:function(r,i,a){var n=r._oIconTabHeader?r._oIconTabHeader:r;var s=n.getId();r.addDragDropConfig(new e({sourceAggregation:"items",groupName:l+s}));r.addDragDropConfig(new t({targetAggregation:"items",dropPosition:a,dropLayout:i,drop:r._handleDragAndDrop.bind(r),groupName:l+s}))},preventDragBetweenSubItems:function(e,t,r){var i=false;if(r.isA("sap.m.IconTabBarSelectList")){var a=e._getRealTab(),n=a.getParent(),s=n.getItems();if(s.indexOf(a)===0&&t===u||s.indexOf(a)+1===s.length&&t===c||s.length===1){i=true}}return i}};return d});
//# sourceMappingURL=IconTabBarDragAndDropUtil.js.map