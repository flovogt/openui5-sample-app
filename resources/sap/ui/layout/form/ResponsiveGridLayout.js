/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/layout/library","sap/ui/layout/Grid","sap/ui/layout/GridData","./Form","./FormContainer","./FormElement","./FormLayout","./ResponsiveGridLayoutRenderer","sap/ui/thirdparty/jquery"],function(e,t,a,i,n,r,s,o,l,u,jQuery){"use strict";var f=l.extend("sap.ui.layout.form.ResponsiveGridLayout",{metadata:{library:"sap.ui.layout",properties:{labelSpanXL:{type:"int",group:"Misc",defaultValue:-1},labelSpanL:{type:"int",group:"Misc",defaultValue:4},labelSpanM:{type:"int",group:"Misc",defaultValue:2},labelSpanS:{type:"int",group:"Misc",defaultValue:12},adjustLabelSpan:{type:"boolean",group:"Misc",defaultValue:true},emptySpanXL:{type:"int",group:"Misc",defaultValue:-1},emptySpanL:{type:"int",group:"Misc",defaultValue:0},emptySpanM:{type:"int",group:"Misc",defaultValue:0},emptySpanS:{type:"int",group:"Misc",defaultValue:0},columnsXL:{type:"int",group:"Misc",defaultValue:-1},columnsL:{type:"int",group:"Misc",defaultValue:2},columnsM:{type:"int",group:"Misc",defaultValue:1},singleContainerFullSize:{type:"boolean",group:"Misc",defaultValue:true},breakpointXL:{type:"int",group:"Misc",defaultValue:1440},breakpointL:{type:"int",group:"Misc",defaultValue:1024},breakpointM:{type:"int",group:"Misc",defaultValue:600}}},renderer:u});var p=e.extend("sap.ui.layout.form.ResponsiveGridLayoutPanel",{metadata:{library:"sap.ui.layout",aggregations:{content:{type:"sap.ui.layout.Grid",multiple:false}},associations:{container:{type:"sap.ui.layout.form.FormContainer",multiple:false},layout:{type:"sap.ui.layout.form.ResponsiveGridLayout",multiple:false}}},getLayoutData:function(){var e=sap.ui.getCore().byId(this.getContainer());var t=sap.ui.getCore().byId(this.getLayout());var a;if(t&&e){a=t.getLayoutDataForElement(e,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}},getCustomData:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){return e.getCustomData()}},refreshExpanded:function(){var e=sap.ui.getCore().byId(this.getContainer());if(e){if(e.getExpanded()){this.$().removeClass("sapUiRGLContainerColl")}else{this.$().addClass("sapUiRGLContainerColl")}}},renderer:{apiVersion:2,render:function(e,t){var a=sap.ui.getCore().byId(t.getContainer());var i=sap.ui.getCore().byId(t.getLayout());var n=t.getContent();var r=a.getExpandable();var s=a.getTooltip_AsString();var o=a.getToolbar();var l=a.getTitle();e.openStart("div",t);e.class("sapUiRGLContainer");if(r&&!a.getExpanded()){e.class("sapUiRGLContainerColl")}if(o){e.class("sapUiFormContainerToolbar")}else if(l){e.class("sapUiFormContainerTitle")}if(s){e.attr("title",s)}i.getRenderer().writeAccessibilityStateContainer(e,a);e.openEnd();i.getRenderer().renderHeader(e,o,l,a._oExpandButton,r,i._sFormSubTitleSize,a.getId());if(n){e.openStart("div");e.class("sapUiRGLContainerCont");e.openEnd();e.renderControl(n);e.close("div")}e.close("div")}}});f.prototype.init=function(){l.prototype.init.apply(this,arguments);this.mContainers={};this.oDummyLayoutData=new n(this.getId()+"--Dummy")};f.prototype.exit=function(){for(var e in this.mContainers){C.call(this,e,true)}if(this._mainGrid){this._mainGrid.destroy();delete this._mainGrid}this.oDummyLayoutData.destroy();this.oDummyLayoutData=undefined};f.prototype.onBeforeRendering=function(e){l.prototype.onBeforeRendering.apply(this,arguments);var t=this.getParent();if(!t||!(t instanceof r)){return}t._bNoInvalidate=true;d.call(this,t);_.call(this,t);t._bNoInvalidate=false};f.prototype.onAfterRendering=function(e){if(this._mainGrid&&this._mainGrid.__bIsUsed){for(var a in this.mContainers){if(this.mContainers[a][1]._sContainerResizeListener){t.deregister(this.mContainers[a][1]._sContainerResizeListener);this.mContainers[a][1]._sContainerResizeListener=null}}}};f.prototype.toggleContainerExpanded=function(e){var t=e.getId();if(this.mContainers[t]&&this.mContainers[t][0]){var a=this.mContainers[t][0];a.refreshExpanded()}};f.prototype.onLayoutDataChange=function(e){var t=e.srcControl;if(t instanceof s){if(this._mainGrid){this._mainGrid.onLayoutDataChange(e);this.invalidate()}}else if(!(t instanceof o)){var a=t.getParent();if(a instanceof o){var i=a.getParent();var n=i.getId();if(this.mContainers[n]&&this.mContainers[n][1]){this.mContainers[n][1].onLayoutDataChange(e)}}}};f.prototype.onsapup=function(e){this.onsapleft(e)};f.prototype.onsapdown=function(e){this.onsapright(e)};f.prototype.getContainerRenderedDomRef=function(e){if(this.getDomRef()){var t=e.getId();if(this.mContainers[t]){if(this.mContainers[t][0]){var a=this.mContainers[t][0];return a.getDomRef()}else if(this.mContainers[t][1]){var i=this.mContainers[t][1];return i.getDomRef()}}}return null};f.prototype.getElementRenderedDomRef=function(e){return null};function d(e){var t=e.getVisibleFormContainers();var a=t.length;var i=0;var n;var r;var s;var o;var l=0;for(l=0;l<a;l++){s=t[l];s._checkProperties();if(s.isVisible()){i++;o=s.getId();n=undefined;r=undefined;var u=t[l+1];if(this.mContainers[o]&&this.mContainers[o][1]){r=this.mContainers[o][1]}else{r=y.call(this,s)}var f=s.getTitle();var p=s.getToolbar();if(p||f||s.getExpandable()){if(this.mContainers[o]&&this.mContainers[o][0]){n=this.mContainers[o][0]}else{n=g.call(this,s,r);L(r,true)}v(n,s,i,u,a)}else{if(this.mContainers[o]&&this.mContainers[o][0]){m(this.mContainers[o][0])}L(r,false);v(r,s,i,u,a)}this.mContainers[o]=[n,r]}}var d=Object.keys(this.mContainers).length;if(a<d){for(o in this.mContainers){var h=false;for(l=0;l<a;l++){s=t[l];if(o==s.getId()){h=true;break}}if(!h){C.call(this,o)}}}}function g(e,t){var a=e.getId();var i=new p(a+"---Panel",{container:e,layout:this,content:t});return i}function m(e,t){e.setLayout(null);e.setContainer(null);if(!t||!e.getParent()){e.setContent(null);e.destroy()}}function y(e){var t=e.getId()+"--Grid";var a=new i(t,{vSpacing:0,hSpacing:0,containerQuery:true});a.__myParentLayout=this;a.__myParentContainerId=e.getId();a.addStyleClass("sapUiFormResGridCont").addStyleClass("sapUiRespGridOverflowHidden");a.getContent=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e){var t=[];var a=e.getVisibleFormElements();var i;var n;for(var r=0;r<a.length;r++){var s=a[r];n=s.getLabelControl();if(n){t.push(n)}i=s.getFieldsForRendering();for(var o=0;o<i.length;o++){t.push(i[o])}}return t}else{return false}};a.getAriaLabelledBy=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);if(e&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()){return e.getAriaLabelledBy()}return[]};var n={labelSpan:0,span:0,firstField:false,defaultFields:0,row:0,myRow:false,freeFields:0,finished:false};var r={id:"XL",getEffectiveSpan:function(e){var t=e._getEffectiveSpanXLarge();if(!t){t=e._getEffectiveSpanLarge()}return t},getEmptySpan:function(e){var t=e.getEmptySpanXL();if(t<0){t=e.getEmptySpanL()}return t},getLabelSpan:function(e){return e.getLabelSpanXL()},setIndent:function(e,t){e.setIndentXL(t)},setLinebreak:function(e,t){e.setLinebreakXL(t)}};jQuery.extend(r,n);var s={id:"L",getEffectiveSpan:function(e){return e._getEffectiveSpanLarge()},getEmptySpan:function(e){return e.getEmptySpanL()},getLabelSpan:function(e){return e.getLabelSpanL()},setIndent:function(e,t){e.setIndentL(t)},setLinebreak:function(e,t){e.setLinebreakL(t)}};jQuery.extend(s,n);var o={id:"M",getEffectiveSpan:function(e){return e._getEffectiveSpanMedium()},getEmptySpan:function(e){return e.getEmptySpanM()},getLabelSpan:function(e){return e.getLabelSpanM()},setIndent:function(e,t){e.setIndentM(t)},setLinebreak:function(e,t){e.setLinebreakM(t)}};jQuery.extend(o,n);var l={id:"S",getEffectiveSpan:function(e){return e._getEffectiveSpanSmall()},getEmptySpan:function(e){return e.getEmptySpanS()},getLabelSpan:function(e){return e.getLabelSpanS()},setIndent:function(e,t){e.setIndentS(t)},setLinebreak:function(e,t){e.setLinebreakS(t)}};jQuery.extend(l,n);var u=[r,s,o,l];a._getLayoutDataForControl=function(e){var t=this.__myParentLayout;var a=t.getLayoutDataForElement(e,"sap.ui.layout.GridData");var i=e.getParent();var f=i.getLabelControl();if(a){if(f==e){a._setStylesInternal("sapUiFormElementLbl")}return a}else{var p=sap.ui.getCore().byId(this.__myParentContainerId);var d=t.getLayoutDataForElement(p,"sap.ui.layout.GridData");var g=p.getParent();var m;var y=0;for(y=0;y<u.length;y++){m=u[y];jQuery.extend(m,n);m.labelSpan=m.getLabelSpan(t)}if(t.getAdjustLabelSpan()){if(g.getVisibleFormContainers().length>=1&&t.getColumnsM()>1){o.labelSpan=t.getLabelSpanL()}if(d){if(d._getEffectiveSpanLarge()==12){s.labelSpan=t.getLabelSpanM();o.labelSpan=t.getLabelSpanM()}}if(g.getVisibleFormContainers().length==1||t.getColumnsL()==1){s.labelSpan=t.getLabelSpanM();o.labelSpan=t.getLabelSpanM()}}if(r.labelSpan<0){r.labelSpan=s.labelSpan}if(f==e){t.oDummyLayoutData.setSpan("XL"+r.labelSpan+" L"+s.labelSpan+" M"+o.labelSpan+" S"+l.labelSpan);t.oDummyLayoutData.setLinebreak(true);t.oDummyLayoutData.setIndentXL(0).setIndentL(0).setIndentM(0).setIndentS(0);t.oDummyLayoutData._setStylesInternal("sapUiFormElementLbl");return t.oDummyLayoutData}else{var h;if(f){h=t.getLayoutDataForElement(f,"sap.ui.layout.GridData")}var L=i.getFieldsForRendering();var v=L.length;var C;var _;var c=1;var b=false;var S;var D=0;for(y=0;y<u.length;y++){m=u[y];m.span=12-m.getEmptySpan(t);if(f){if(h){S=m.getEffectiveSpan(h);if(S){m.labelSpan=S}}if(m.labelSpan<12){m.span=m.span-m.labelSpan}}m.spanFields=m.span}for(D=0;D<v;D++){C=L[D];if(C!=e){_=t.getLayoutDataForElement(C,"sap.ui.layout.GridData");if(_){for(y=0;y<u.length;y++){m=u[y];S=m.getEffectiveSpan(_);if(S&&S<m.span){m.span=m.span-S}}}else{c++}}else{if(c==1){b=true}}}var F=[];for(y=0;y<u.length;y++){m=u[y];m.firstField=b;m.defaultFields=c;if(m.span<c){m.defaultFields=0;m.row=0;m.myRow=false;m.freeFields=m.spanFields;m.span=m.spanFields;m.finished=false;F.push(m)}}if(F.length>0){for(D=0;D<v;D++){C=L[D];_=undefined;if(C!=e){_=t.getLayoutDataForElement(C,"sap.ui.layout.GridData")}for(y=0;y<F.length;y++){m=F[y];if(m.finished){continue}if(_){S=m.getEffectiveSpan(_);m.span=m.span-S}else{S=1}if(m.freeFields>=S){m.freeFields=m.freeFields-S;if(!_){m.defaultFields++}}else{if(m.myRow){m.finished=true}else{m.freeFields=m.spanFields-S;m.row++;if(_){m.defaultFields=0;m.span=m.spanFields-S}else{m.defaultFields=1;m.span=m.spanFields}if(C==e){m.firstField=true}}}if(C==e){m.myRow=true}}}}var G=0;var I="";var R;for(y=0;y<u.length;y++){m=u[y];if(m.id!="S"||m.labelSpan<12){if(m.firstField){G=m.span-Math.floor(m.span/m.defaultFields)*m.defaultFields;R=Math.floor(m.span/m.defaultFields)+G}else{R=Math.floor(m.span/m.defaultFields)}}else{R=12}if(I){I=I+" "}I=I+m.id+R;m.setLinebreak(t.oDummyLayoutData,m.firstField&&m.row>0);m.setIndent(t.oDummyLayoutData,m.firstField&&m.row>0?m.labelSpan:0)}t.oDummyLayoutData.setSpan(I);t.oDummyLayoutData.setLinebreak(b&&!f);t.oDummyLayoutData._setStylesInternal(undefined);return t.oDummyLayoutData}}};a._onParentResizeOrig=a._onParentResize;a._onParentResize=function(){if(!this.getDomRef()){this._cleanup();return}if(!jQuery(this.getDomRef()).is(":visible")){return}var e=this.__myParentLayout;if(!e._mainGrid||!e._mainGrid.__bIsUsed){var t=e.getParent().getVisibleFormContainers()[0];if(!t||!e.mContainers[t.getId()]||t.getId()!=this.__myParentContainerId){return}if(e.mContainers[this.__myParentContainerId][0]){var a=e.mContainers[this.__myParentContainerId][0].getDomRef();var i=a.clientWidth;if(i<=e.getBreakpointM()){this._toggleClass("Phone")}else if(i>e.getBreakpointM()&&i<=e.getBreakpointL()){this._toggleClass("Tablet")}else if(i>e.getBreakpointL()&&i<=e.getBreakpointXL()){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}else{this._setBreakPointTablet(e.getBreakpointM());this._setBreakPointDesktop(e.getBreakpointL());this._setBreakPointLargeDesktop(e.getBreakpointXL());this._onParentResizeOrig()}}else{var n=e._mainGrid.$();if(n.hasClass("sapUiRespGridMedia-Std-Phone")){this._toggleClass("Phone")}else if(n.hasClass("sapUiRespGridMedia-Std-Tablet")){this._toggleClass("Tablet")}else if(n.hasClass("sapUiRespGridMedia-Std-Desktop")){this._toggleClass("Desktop")}else{this._toggleClass("LargeDesktop")}}};a._getAccessibleRole=function(){var e=sap.ui.getCore().byId(this.__myParentContainerId);var t=this.__myParentLayout;if(t._mainGrid&&t._mainGrid.__bIsUsed&&!e.getToolbar()&&!e.getTitle()&&!e.getExpandable()&&e.getAriaLabelledBy().length>0){return"form"}};a.getUIArea=function(){var e=this.__myParentLayout;if(e){return e.getUIArea()}else{return null}};return a}function h(e,t){if(e.__myParentContainerId){e.__myParentContainerId=undefined}e.__myParentLayout=undefined;if(!t||!e.getParent()){e.destroy()}}function L(e,t){if(t){if(e.__originalGetLayoutData){e.getLayoutData=e.__originalGetLayoutData;delete e.__originalGetLayoutData}}else if(!e.__originalGetLayoutData){e.__originalGetLayoutData=e.getLayoutData;e.getLayoutData=function(){var e=this.__myParentLayout;var t=sap.ui.getCore().byId(this.__myParentContainerId);var a;if(t){a=e.getLayoutDataForElement(t,"sap.ui.layout.GridData")}if(a){return a}else{return this.getAggregation("layoutData")}}}}function v(e,t,a,i,r){var s;if(e instanceof p){s=sap.ui.getCore().byId(e.getLayout())}else{s=e.__myParentLayout}var o=s.getLayoutDataForElement(t,"sap.ui.layout.GridData");if(!o){var l=s.getColumnsM();var u=s.getColumnsL();var f=s.getColumnsXL();var d=a%u==1;var g=a%u==0;var m=a>u*(Math.ceil(r/u)-1);var y=a<=u;var h=a%l==1;var L=a%l==0;var v=a>l*(Math.ceil(r/l)-1);var C=a<=l;var _=false;var c=g;var b=m;var S=y;if(f>0){_=a%f==1;c=a%f==0;b=a>f*(Math.ceil(r/f)-1);S=a<=f}if(i){var D=s.getLayoutDataForElement(i,"sap.ui.layout.GridData");if(D&&(D.getLinebreak()||D.getLinebreakXL())){c=true;b=false}if(D&&(D.getLinebreak()||D.getLinebreakL())){g=true;m=false}if(D&&(D.getLinebreak()||D.getLinebreakM())){L=true;v=false}}var F="";if(c){F="sapUiFormResGridLastContXL"}if(g){if(F){F=F+" "}F=F+"sapUiFormResGridLastContL"}if(L){if(F){F=F+" "}F=F+"sapUiFormResGridLastContM"}if(b){if(F){F=F+" "}F=F+"sapUiFormResGridLastRowXL"}if(m){if(F){F=F+" "}F=F+"sapUiFormResGridLastRowL"}if(v){if(F){F=F+" "}F=F+"sapUiFormResGridLastRowM"}if(S){if(F){F=F+" "}F=F+"sapUiFormResGridFirstRowXL"}if(y){if(F){F=F+" "}F=F+"sapUiFormResGridFirstRowL"}if(C){if(F){F=F+" "}F=F+"sapUiFormResGridFirstRowM"}o=e.getLayoutData();if(!o){o=new n(e.getId()+"--LD",{linebreakL:d,linebreakM:h});e.setLayoutData(o)}else{o.setLinebreakL(d);o.setLinebreakM(h)}if(f>0){o.setLinebreakXL(_)}o._setStylesInternal(F)}}function C(e,t){var a=this.mContainers[e];var i=a[1];if(i){h(i,t)}var n=a[0];if(n){m(n,t)}delete this.mContainers[e]}function _(e){var t=e.getVisibleFormContainers();var a;var n;var r=t.length;var s=0;var o=0;var l=0;if(r>1||!this.getSingleContainerFullSize()){var u=Math.floor(12/this.getColumnsM());var f=Math.floor(12/this.getColumnsL());var p;var d="";var g=this.getColumnsXL();if(g>=0){p=Math.floor(12/g);d=d+"XL"+p+" "}d=d+"L"+f+" M"+u+" S12";if(!this._mainGrid){this._mainGrid=new i(e.getId()+"--Grid",{defaultSpan:d,hSpacing:0,vSpacing:0,containerQuery:true}).setParent(this);this._mainGrid.addStyleClass("sapUiFormResGridMain").addStyleClass("sapUiRespGridOverflowHidden");this._mainGrid._onParentResizeOrig=this._mainGrid._onParentResize;this._mainGrid._onParentResize=function(){this._onParentResizeOrig();var e=this.getParent();for(var t in e.mContainers){e.mContainers[t][1]._onParentResize()}}}else{this._mainGrid.setDefaultSpan(d);var m=this._mainGrid.getContent();s=m.length;var y=false;for(o=0;o<s;o++){var h=m[o];a=undefined;if(h.getContainer){a=sap.ui.getCore().byId(h.getContainer())}else{a=sap.ui.getCore().byId(h.__myParentContainerId)}if(a&&a.isVisible()){var L=t[l];if(a!=L){y=true;break}var v=this.mContainers[a.getId()];if(v[0]&&v[0]!=h){y=true;break}if(!v[0]&&v[1]&&v[1]!=h){y=true;break}l++}else{this._mainGrid.removeContent(h)}}if(y){this._mainGrid.removeAllContent();s=0}}this._mainGrid._setBreakPointTablet(this.getBreakpointM());this._mainGrid._setBreakPointDesktop(this.getBreakpointL());this._mainGrid._setBreakPointLargeDesktop(this.getBreakpointXL());this._mainGrid.__bIsUsed=true;if(s<r){var C=0;if(s>0){C=s--}for(o=C;o<r;o++){a=t[o];n=a.getId();if(this.mContainers[n]){if(this.mContainers[n][0]){this._mainGrid.addContent(this.mContainers[n][0])}else if(this.mContainers[n][1]){this._mainGrid.addContent(this.mContainers[n][1])}}}}}else{if(this._mainGrid){this._mainGrid.__bIsUsed=false}for(o=0;o<r;o++){a=t[o];n=a.getId();if(this.mContainers[n]){if(this.mContainers[n][0]){if(this.mContainers[n][0].getParent()!==this){this.addDependent(this.mContainers[n][0])}}else if(this.mContainers[n][1]){if(this.mContainers[n][1].getParent()!==this){this.addDependent(this.mContainers[n][1])}}}}}}f.prototype.getLayoutDataForDelimiter=function(){return new n({spanS:1,spanM:1,spanL:1,spanXL:1})};f.prototype.getLayoutDataForSemanticField=function(e,t,a){var i=8-(e-1);i=Math.floor(i/e);if(e===t){i=i+8-(e-1+e*i)}if(a){if(a.isA("sap.ui.layout.GridData")){a.setSpanS(11).setSpanM(i).setSpanL(i).setSpanXL(i);return a}else{a.destroy()}}return new n({spanS:11,spanM:i,spanL:i,spanXL:i})};return f});
//# sourceMappingURL=ResponsiveGridLayout.js.map