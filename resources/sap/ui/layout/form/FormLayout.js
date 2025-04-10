/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Control","sap/ui/core/Element","sap/ui/layout/library","./FormLayoutRenderer","./FormHelper","sap/ui/core/theming/Parameters","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(e,t,r,i,n,o,a,jQuery){"use strict";var l=i.BackgroundDesign;var s=t.extend("sap.ui.layout.form.FormLayout",{metadata:{library:"sap.ui.layout",properties:{backgroundDesign:{type:"sap.ui.layout.BackgroundDesign",group:"Appearance",defaultValue:l.Translucent}}},renderer:n});s.prototype.init=function(){this._oInitPromise=o.init();this._sFormTitleSize="H4";this._sFormSubTitleSize="H5"};s.prototype.onBeforeRendering=function(e){this.loadTitleSizes()};s.prototype.contentOnAfterRendering=function(e,t){if(o.isArrowKeySupported()){jQuery(t.getFocusDomRef()).data("sap.InNavArea",true)}if(this.renderControlsForSemanticElement()&&e.isA("sap.ui.layout.form.SemanticFormElement")&&!e._getEditable()){t.$().css("max-width","100%")}else if(t.getWidth&&(!t.getWidth()||t.getWidth()=="auto")&&(!t.getFormDoNotAdjustWidth||!t.getFormDoNotAdjustWidth())){t.$().css("width","100%")}};s.prototype.toggleContainerExpanded=function(e){var t=e.getExpanded();if(this.getDomRef()){if(t){e.$("content").css("display","")}else{e.$("content").css("display","none")}}};s.prototype.getLayoutDataForElement=function(e,t){var r=e.getLayoutData();if(!r){return undefined}else if(r.isA(t)){return r}else if(r.isA("sap.ui.core.VariantLayoutData")){var i=r.getMultipleLayoutData();for(var n=0;n<i.length;n++){var o=i[n];if(o.isA(t)){return o}}}};s.prototype.onsapright=function(t){if(o.isArrowKeySupported()){var r=e.getRTL();if(!r){this.navigateForward(t)}else{this.navigateBack(t)}}};s.prototype.onsapleft=function(t){if(o.isArrowKeySupported()){var r=e.getRTL();if(!r){this.navigateBack(t)}else{this.navigateForward(t)}}};s.prototype.onsapdown=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r;var i=this.findElement(t);var n=i.element;t=i.rootControl;if(n&&n.isA("sap.ui.layout.form.FormElement")){r=this.findFieldBelow(t,n)}else if(n&&n.isA("sap.ui.layout.form.FormContainer")){r=this.findFirstFieldOfNextElement(n,0)}if(r){r.focus();e.preventDefault()}}};s.prototype.onsapup=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r=0;var i;var n=this.findElement(t);var a=n.element;t=n.rootControl;if(a&&a.isA("sap.ui.layout.form.FormElement")){i=this.findFieldAbove(t,a)}else if(a&&a.isA("sap.ui.layout.form.FormContainer")){var l=a.getParent();r=l.indexOfFormContainer(a);i=this.findLastFieldOfLastElementInPrevContainer(l,r-1)}if(i){i.focus();e.preventDefault()}}};s.prototype.onsaphome=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r=0;var i;var n=this.findElement(t);var a=n.element;var l=a.getParent();var s=l.getParent();r=s.indexOfFormContainer(l);i=this.findFirstFieldOfFirstElementInNextContainer(s,r);if(i){i.focus();e.preventDefault()}}};s.prototype.onsaptop=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r=this.findElement(t);var i=r.element;var n;var a;if(i&&i.isA("sap.ui.layout.form.FormElement")){a=i.getParent()}else if(i&&i.isA("sap.ui.layout.form.FormContainer")){a=i}var l=a.getParent();n=this.findFirstFieldOfForm(l);if(n){n.focus();e.preventDefault()}}};s.prototype.onsapend=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r=0;var i;var n=this.findElement(t);var a=n.element;var l=a.getParent();var s=l.getParent();r=s.indexOfFormContainer(l);i=this.findLastFieldOfLastElementInPrevContainer(s,r);if(i){i.focus();e.preventDefault()}}};s.prototype.onsapbottom=function(e){if(o.isArrowKeySupported()){var t=e.srcControl;var r=this.findElement(t);var i=r.element;var n;var a;if(i&&i.isA("sap.ui.layout.form.FormElement")){a=i.getParent()}else if(i&&i.isA("sap.ui.layout.form.FormContainer")){a=i}var l=a.getParent();var s=l.getFormContainers();var f=s.length;n=this.findLastFieldOfLastElementInPrevContainer(l,f-1);if(n){n.focus();e.preventDefault()}}};s.prototype.onsapexpand=function(e){var t=e.srcControl;var r=this.findElement(t);var i=r.element;var n;if(i.isA("sap.ui.layout.form.FormContainer")){n=i}else{n=i.getParent()}if(n.getExpandable()&&t===n._oExpandButton){n.setExpanded(true)}};s.prototype.onsapcollapse=function(e){var t=e.srcControl;var r=this.findElement(t);var i=r.element;var n;if(i.isA("sap.ui.layout.form.FormContainer")){n=i}else{n=i.getParent()}if(n.getExpandable()&&t===n._oExpandButton){n.setExpanded(false)}};s.prototype.onsapskipforward=function(e){var t=e.srcControl;var r=this.findElement(t);var i=r.element;t=r.rootControl;var n;var o;if(i&&i.isA("sap.ui.layout.form.FormElement")){o=i.getParent()}else if(i&&i.isA("sap.ui.layout.form.FormContainer")){o=i}var a=o.getParent();var l=a.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(a,l+1);if(n){n.focus();e.preventDefault()}};s.prototype.onsapskipback=function(e){var t=e.srcControl;var r=this.findElement(t);var i=r.element;t=r.rootControl;var n;var o;if(i&&i.isA("sap.ui.layout.form.FormElement")){o=i.getParent()}else if(i&&i.isA("sap.ui.layout.form.FormContainer")){o=i}var a=o.getParent();var l=a.getFormContainers();var s=a.indexOfFormContainer(o);while(!n&&s>0){var f=l[s-1];if(!f.getExpandable()||f.getExpanded()){n=this.findFirstFieldOfFirstElementInPrevContainer(a,s-1)}s=s-1}if(n&&n!==t.getFocusDomRef()){n.focus();e.preventDefault()}};s.prototype.onBeforeFastNavigationFocus=function(e){if(jQuery.contains(this.getDomRef(),e.source)){e.srcControl=r.closestTo(e.source);if(e.forward){this.onsapskipforward(e)}else{this.onsapskipback(e)}}else{var t=e.forward?this.findFirstFieldOfForm(this.getParent()):this.findFirstFieldOfLastContainerOfForm(this.getParent());if(t){t.focus();e.preventDefault()}}};s.prototype.findElement=function(e){var t=e.getParent();var r=e;while(t&&!t.isA("sap.ui.layout.form.FormElement")&&!t.isA("sap.ui.layout.form.FormContainer")&&!t.isA("sap.ui.layout.form.Form")){r=t;t=t.getParent()}return{rootControl:r,element:t}};s.prototype.navigateForward=function(e){var t=e.srcControl;var r=0;var i;var n=this.findElement(t);var o=n.element;t=n.rootControl;if(o&&o.isA("sap.ui.layout.form.FormElement")){if(t==o.getLabelControl()){r=-1}else{r=o.indexOfField(t)}i=this.findNextFieldOfElement(o,r+1);if(!i){var a=o.getParent();r=a.indexOfFormElement(o);i=this.findFirstFieldOfNextElement(a,r+1);if(!i){var l=a.getParent();r=l.indexOfFormContainer(a);i=this.findFirstFieldOfFirstElementInNextContainer(l,r+1)}}}else if(o&&o.isA("sap.ui.layout.form.FormContainer")){i=this.findFirstFieldOfNextElement(o,0)}if(i){i.focus();e.preventDefault()}};s.prototype.tabForward=function(e){var t;var r=e.srcControl;var i=0;var n;var o=this.findElement(r);var a=o.element;r=o.rootControl;if(a&&a.isA("sap.ui.layout.form.FormElement")){if(r==a.getLabelControl()){i=-1}else{i=a.indexOfField(r)}n=this.findNextFieldOfElement(a,i+1,true);if(!n){var l=a.getParent();i=l.indexOfFormElement(a);n=this.findFirstFieldOfNextElement(l,i+1,true);if(!n){t=l.getParent();i=t.indexOfFormContainer(l);n=this.findFirstFieldOfFirstElementInNextContainer(t,i+1,true)}}}else if(a&&a.isA("sap.ui.layout.form.FormContainer")){n=this.findFirstFieldOfNextElement(a,0,true);if(!n){t=a.getParent();i=t.indexOfFormContainer(a);n=this.findFirstFieldOfFirstElementInNextContainer(t,i+1,true)}}if(n){n.focus();e.preventDefault()}};s.prototype.findNextFieldOfElement=function(e,t,r){var i=e.getFieldsForRendering();var n=i.length;var o;for(var a=t;a<n;a++){var l=i[a];var s=this._getDomRef(l);if(r==true){if((!l.getEditable||l.getEditable())&&(!l.getEnabled||l.getEnabled())&&s){o=s;break}}else{if((!l.getEnabled||l.getEnabled())&&s){o=s;break}}}return o};s.prototype.findFirstFieldOfNextElement=function(e,t,r){var i=e.getFormElements();var n=i.length;var o;var a=t;while(!o&&a<n){var l=i[a];if(r==true){o=this.findNextFieldOfElement(l,0,true)}else{o=this.findNextFieldOfElement(l,0)}a++}return o};s.prototype.findFirstFieldOfForm=function(e){var t=this.findFirstFieldOfFirstElementInNextContainer(e,0);return t};s.prototype.findFirstFieldOfLastContainerOfForm=function(e){var t;var r=e.getFormContainers();var i=r.length;while(!t&&i>0){var n=r[i-1];if(!n.getExpandable()||n.getExpanded()){t=this.findFirstFieldOfFirstElementInPrevContainer(e,i-1)}i=i-1}return t};s.prototype.findFirstFieldOfFirstElementInNextContainer=function(e,t,r){var i=e.getFormContainers();var n=i.length;var o;var a=t;while(!o&&a<n){var l=i[a];if(l.getExpandable()&&r){o=l._oExpandButton.getFocusDomRef();if(o){break}}if(!l.getExpandable()||l.getExpanded()){if(r==true){o=this.findFirstFieldOfNextElement(l,0,true)}else{o=this.findFirstFieldOfNextElement(l,0)}}a++}return o};s.prototype.findFirstFieldOfFirstElementInPrevContainer=function(e,t){var r=e.getFormContainers();var i=r.length;var n;var o=t;while(!n&&o<i&&o>=0){var a=r[o];if(!a.getExpandable()||a.getExpanded()){n=this.findFirstFieldOfNextElement(a,0)}o++}return n};s.prototype.navigateBack=function(e){var t;var r=e.srcControl;var i=0;var n;var o=this.findElement(r);var a=o.element;r=o.rootControl;if(a&&a.isA("sap.ui.layout.form.FormElement")){if(r==a.getLabelControl()){i=0}else{i=a.indexOfField(r)}n=this.findPrevFieldOfElement(a,i-1);if(!n){var l=a.getParent();i=l.indexOfFormElement(a);n=this.findLastFieldOfPrevElement(l,i-1);if(!n){t=l.getParent();i=t.indexOfFormContainer(l);n=this.findLastFieldOfLastElementInPrevContainer(t,i-1)}}}else if(a&&a.isA("sap.ui.layout.form.FormContainer")){t=a.getParent();i=t.indexOfFormContainer(a);n=this.findLastFieldOfLastElementInPrevContainer(t,i-1)}if(n){n.focus();e.preventDefault()}};s.prototype.tabBack=function(e){var t;var r=e.srcControl;var i=0;var n;var o=this.findElement(r);var a=o.element;r=o.rootControl;if(a&&a.isA("sap.ui.layout.form.FormElement")){if(r==a.getLabelControl()){i=0}else{i=a.indexOfField(r)}n=this.findPrevFieldOfElement(a,i-1,true);if(!n){var l=a.getParent();i=l.indexOfFormElement(a);n=this.findLastFieldOfPrevElement(l,i-1,true);if(!n){t=l.getParent();i=t.indexOfFormContainer(l);if(l.getExpandable()){n=l._oExpandButton.getFocusDomRef()}if(!n){n=this.findLastFieldOfLastElementInPrevContainer(t,i-1,true)}}}}else if(a&&a.isA("sap.ui.layout.form.FormContainer")){t=a.getParent();i=t.indexOfFormContainer(a);n=this.findLastFieldOfLastElementInPrevContainer(t,i-1,true)}if(n){n.focus();e.preventDefault()}};s.prototype.findPrevFieldOfElement=function(e,t,r){var i=e.getFieldsForRendering();var n;for(var o=t;o>=0;o--){var a=i[o];var l=this._getDomRef(a);if(r==true){if((!a.getEditable||a.getEditable())&&(!a.getEnabled||a.getEnabled())&&l){n=l;break}}else{if((!a.getEnabled||a.getEnabled())&&l){n=l;break}}}return n};s.prototype.findLastFieldOfPrevElement=function(e,t,r){var i=e.getFormElements();var n;var o=t;while(!n&&o>=0){var a=i[o];var l=a.getFieldsForRendering().length;if(r==true){n=this.findPrevFieldOfElement(a,l-1,true)}else{n=this.findPrevFieldOfElement(a,l-1)}o--}return n};s.prototype.findLastFieldOfLastElementInPrevContainer=function(e,t,r){var i=e.getFormContainers();var n;var o=t;while(!n&&o>=0){var a=i[o];if(a.getExpandable()&&!a.getExpanded()&&r){n=a._oExpandButton.getFocusDomRef();if(n){break}}if(!a.getExpandable()||a.getExpanded()){var l=a.getFormElements().length;if(r==true){n=this.findLastFieldOfPrevElement(a,l-1,true)}else{n=this.findLastFieldOfPrevElement(a,l-1,0)}}o--}return n};s.prototype.findFieldBelow=function(e,t){var r=t.getParent();var i=r.indexOfFormElement(t);var n=this.findFirstFieldOfNextElement(r,i+1);if(!n){var o=r.getParent();i=o.indexOfFormContainer(r);n=this.findFirstFieldOfFirstElementInNextContainer(o,i+1)}return n};s.prototype.findFieldAbove=function(e,t){var r=t.getParent();var i=r.indexOfFormElement(t);var n=r.getFormElements();var o;var a=i-1;while(!o&&a>=0){var l=n[a];o=this.findPrevFieldOfElement(l,0);a--}if(!o){var s=r.getParent();i=s.indexOfFormContainer(r);o=this.findLastFieldOfLastElementInPrevContainer(s,i-1)}return o};s.prototype._getDomRef=function(e){var t=e.getFocusDomRef();if(!jQuery(t).is(":sapFocusable")){t=undefined}return t};s.prototype.getContainerRenderedDomRef=function(e){if(this.getDomRef()){return e.getDomRef()}else{return null}};s.prototype.getElementRenderedDomRef=function(e){if(this.getDomRef()){return e.getDomRef()}else{return null}};s.prototype.getLayoutDataForDelimiter=function(){};s.prototype.getLayoutDataForSemanticField=function(e,t,r){};s.prototype.renderControlsForSemanticElement=function(){return false};s.prototype.loadTitleSizes=function(){var e=a.get({name:["sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize","sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormSubTitleSize"],callback:this.applyTitleSizes.bind(this)});if(e&&e.hasOwnProperty("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize")){this.applyTitleSizes(e,true)}};s.prototype.applyTitleSizes=function(e,t){if(e&&(this._sFormTitleSize!==e["sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize"]||this._sFormSubTitleSize!==e["sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormSubTitleSize"])){this._sFormTitleSize=e["sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize"];this._sFormSubTitleSize=e["sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormSubTitleSize"];if(!t){this.invalidate()}}};s.prototype.hasLabelledContainers=function(e){const t=e.getFormContainers();let r=false;for(let e=0;e<t.length;e++){if(this.isContainerLabelled(t[e])){r=true;break}}return r};s.prototype.isContainerLabelled=function(e){return!!e.getTitle()||!!e.getToolbar()||e.getAriaLabelledBy().length>0||e.getExpandable()};return s});
//# sourceMappingURL=FormLayout.js.map