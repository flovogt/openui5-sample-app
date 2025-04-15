/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ControlBehavior","sap/ui/core/library","sap/ui/core/ValueStateSupport","sap/ui/Device"],function(e,t,a,i){"use strict";var s=t.ValueState;var l={apiVersion:2};l.render=function(t,a){var l=a.getId(),r=a.getEnabled(),d=a.getDisplayOnly(),n=a.getEditable(),c=a.getRequired(),o=r&&!d,p=r&&d,g=a.getAggregation("_label"),b=a.getValueState(),u=s.Error===b,f=s.Warning===b,y=s.Success===b,C=s.Information===b,M=a.getUseEntireWidth(),v=n&&r;t.openStart("div",a);t.class("sapMCb");t.attr("data-ui5-accesskey",a.getProperty("accesskey"));if(!n){t.class("sapMCbRo")}if(p){t.class("sapMCbDisplayOnly")}if(!r){t.class("sapMCbBgDis")}if(a.getText()){t.class("sapMCbHasLabel")}if(a.getWrapping()){t.class("sapMCbWrapped")}if(v){if(u){t.class("sapMCbErr")}else if(f){t.class("sapMCbWarn")}else if(y){t.class("sapMCbSucc")}else if(C){t.class("sapMCbInfo")}}if(M){t.style("width",a.getWidth())}var S=this.getTooltipText(a);if(S){t.attr("title",S)}if(a._getVisualOnlyMode()){t.accessibilityState(a,{role:"presentation",selected:null,required:null,labelledby:null})}else{if(o){t.attr("tabindex",a.getTabIndex())}t.accessibilityState(a,{role:"checkbox",selected:null,required:a._isRequired()||undefined,checked:a._getAriaChecked(),describedby:S&&v?l+"-Descr":undefined,labelledby:{value:g?g.getId():undefined,append:true}});if(p){t.attr("aria-readonly",true)}}t.openEnd();t.openStart("div",a.getId()+"-CbBg");t.class("sapMCbBg");if(o&&n&&i.system.desktop){t.class("sapMCbHoverable")}if(!a.getActiveHandling()){t.class("sapMCbActiveStateOff")}t.class("sapMCbMark");if(a.getSelected()){t.class("sapMCbMarkChecked")}if(a.getPartiallySelected()){t.class("sapMCbMarkPartiallyChecked")}t.openEnd();if(!a._getVisualOnlyMode()){t.voidStart("input",a.getId()+"-CB");t.attr("type","CheckBox");if(a.getSelected()){t.attr("checked","checked")}if(a.getName()){t.attr("name",a.getName())}if(!r){t.attr("disabled","disabled")}if(!n){t.attr("readonly","readonly")}t.voidEnd()}t.close("div");if(g){g.setRequired(c)}t.renderControl(g);if(S&&e.isAccessibilityEnabled()&&v){t.openStart("span",l+"-Descr");t.class("sapUiHidden");t.openEnd();t.text(S);t.close("span")}t.close("div")};l.getTooltipText=function(e){var t=e.getProperty("valueStateText"),i=e.getTooltip_AsString(),s=e.getEnabled(),l=e.getEditable();if(t){return(i?i+" - ":"")+t}else if(l&&s){return a.enrichTooltip(e,i)}return i};return l},true);
//# sourceMappingURL=CheckBoxRenderer.js.map