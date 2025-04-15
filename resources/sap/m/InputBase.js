/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/InvisibleMessage","sap/ui/core/library","sap/ui/Device","./InputBaseRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/core/Lib","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(e,t,a,n,s,i,o,r,u,l,p,c,h,jQuery,g){"use strict";var f=u.TextDirection;var d=u.TextAlign;var y=u.ValueState;var m=t.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.ui.core.ISemanticFormContent","sap.m.IToolbarInteractiveControl","sap.ui.core.ILabelable"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:y.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:d.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:f.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{formattedValueStateText:{type:"sap.m.FormattedText",multiple:false},_invisibleFormattedValueStateText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"},renderer:p});n.call(m.prototype);s.insertFontFaceStyle();o.call(m.prototype);m.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";m.ICON_CSS_CLASS="sapMInputBaseIcon";m.prototype.bShowLabelAsPlaceholder=!l.support.input.placeholder;m.prototype._getPlaceholder=function(){return this.getPlaceholder()||""};m.prototype._getInputValue=function(e){return e===undefined?this.$("inner").val()||"":e.toString()};m.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName}return this._sInputTagElementName};m.prototype.init=function(){this.setLastValue("");this.bRenderingPhase=false;this._oValueStateMessage=new i(this);this._aValueStateLinks=[];this._bIsComposingCharacter=false;this.setLastValueStateText("");this.setErrorMessageAnnouncementState(false);this.fnCloseValueStateOnClick=function(){this.closeValueStateMessage()}};m.prototype.oncompositionstart=function(){this._bIsComposingCharacter=true};m.prototype.oncompositionend=function(e){this._bIsComposingCharacter=false;if(!l.browser.firefox){this._bCheckDomValue=true}};m.prototype.isComposingCharacter=function(){return this._bIsComposingCharacter};m.prototype.onBeforeRendering=function(){var e=this.getFocusDomRef();var t=this.getFormattedValueStateText();var a;if(!this._oInvisibleMessage){this._oInvisibleMessage=r.getInstance()}if(this._bCheckDomValue&&!this.bRenderingPhase){if(this.isActive()){this._sDomValue=this._getInputValue()}else{this._bCheckDomValue=false}}if(!t){a=false}else{var n=this.getAggregation("_invisibleFormattedValueStateText");a=t.getHtmlText()!==(n&&n.getHtmlText())}if(this.getValueState()===y.Error&&e){var s=a||this.getValueStateText()!==this.getLastValueStateText();this.setErrorMessageAnnouncementState(!e.hasAttribute("aria-invalid")||s)}if(a){n&&n.destroy();this.setAggregation("_invisibleFormattedValueStateText",t.clone())}this.bRenderingPhase=true};m.prototype.onAfterRendering=function(){var e=this.getValueState();var t=this.getFocusDomRef()===document.activeElement;var a=e===y.None;var n=document.getElementById(this.getValueStateMessageId()+"-sr");if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue)}if(this.getErrorMessageAnnouncementState()&&this.hasStyleClass("sapMFocus")){n&&this._oInvisibleMessage.announce(n.textContent);this.setErrorMessageAnnouncementState(false)}this._bCheckDomValue=false;this.bRenderingPhase=false;if(t){this[a?"closeValueStateMessage":"openValueStateMessage"]()}if(this.getAggregation("_invisibleFormattedValueStateText")){this.getAggregation("_invisibleFormattedValueStateText").getControls().forEach(function(e){e.getDomRef()&&e.getDomRef().setAttribute("tabindex",-1)})}this.setLastValueStateText(this.getValueStateText())};m.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy()}if(this._oInvisibleMessage){this._oInvisibleMessage.destroy();this._oInvisibleMessage=null}this._oValueStateMessage=null};m.prototype.ontouchstart=function(e){e.setMarked()};m.prototype.onfocusin=function(e){this.addStyleClass("sapMFocus");this.openValueStateMessage()};m.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");if(!this._bClickOnValueStateLink(e)){this.closeValueStateMessage()}};m.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e)}};m.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering};m.prototype.getChangeEventParams=function(){return{}};m.prototype.ontap=function(e){if(!this.isMobileDevice()){this.openValueStateMessage()}return};m.prototype.onChange=function(e,t,a){t=t||this.getChangeEventParams();if(this.getDomRef()&&(!this.getEditable()||!this.getEnabled())){return}var n=this._getInputValue(a);if(n!==this.getLastValue()){this.setValue(n);n=this.getValue();this.setLastValue(n);this.fireChangeEvent(n,t);return true}else{this._bCheckDomValue=false}};m.prototype.fireChangeEvent=function(e,t){var a=jQuery.extend({value:e,newValue:e},t);this.fireChange(a)};m.prototype.onValueRevertedByEscape=function(e,t){this.fireEvent("liveChange",{value:e,escPressed:true,previousValue:t,newValue:e})};m.prototype.isMobileDevice=function(){return l.system.phone};m.prototype.onsapenter=function(e){if(l.browser.safari&&this.isComposingCharacter()){e.setMarked("invalid");return}this.onChange(e)};m.prototype.onsapescape=function(e){var t=this._getInputValue();if(t!==this.getLastValue()){e.setMarked();e.preventDefault();this.updateDomValue(this.getLastValue());this.onValueRevertedByEscape(this.getLastValue(),t)}};m.prototype.oninput=function(e){this._bCheckDomValue=true};m.prototype.onkeydown=function(e){if(this.getDomRef("inner")&&this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==h.BACKSPACE){e.preventDefault()}};m.prototype.oncut=function(e){};m.prototype.selectText=function(e,t){this.$("inner").selectText(e,t);return this};m.prototype.getSelectedText=function(){return this.$("inner").getSelectedText()};m.prototype.setProperty=function(e,a,n){if(e=="value"){this._bCheckDomValue=false}return t.prototype.setProperty.apply(this,arguments)};m.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),a=this.getFocusDomRef();jQuery.extend(e,{cursorPos:0,selectionStart:0,selectionEnd:0});if(a){e.cursorPos=jQuery(a).cursorPos();try{e.selectionStart=a.selectionStart;e.selectionEnd=a.selectionEnd}catch(e){}}return e};m.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);this.$("inner").cursorPos(e.cursorPos);this.selectText(e.selectionStart,e.selectionEnd);return this};m.prototype.updateDomValue=function(e){var t=this.getFocusDomRef();if(!this.isActive()){return this}e=this._getInputValue(e);if(this._getInputValue()===e){return this}this._bCheckDomValue=true;if(this._getPreferUserInteraction()){this.handleInputValueConcurrency(e)}else{t.value=e}return this};m.prototype._setValueStateLinks=function(e){if(this.getFormattedValueStateText()&&this.getFormattedValueStateText().getHtmlText()&&this.getFormattedValueStateText().getControls().length){this._aValueStateLinks=this.getFormattedValueStateText().getControls();return}this._aValueStateLinks=e};m.prototype._getValueStateLinks=function(){return this._aValueStateLinks};m.prototype._bClickOnValueStateLink=function(e){const t=this._getValueStateLinks();const a=e&&e.relatedTarget;if(t.length){return t.some(function(e){return!!e.getDomRef&&a===e.getDomRef()})}if(a&&a.tagName==="A"&&a.parentElement.classList.contains("sapMFT")){this._setValueStateLinks([a]);this._attachValueStateLinkPress();return true}return false};m.prototype._attachValueStateLinkPress=function(){this._getValueStateLinks().forEach(function(e){if(e.attachPress){e.attachPress(this.fnCloseValueStateOnClick,this)}else{e.addEventListener("click",this.fnCloseValueStateOnClick.bind(this))}},this)};m.prototype._detachValueStateLinkPress=function(){this._getValueStateLinks().forEach(function(e){if(e.detachPress){e.detachPress(this.fnCloseValueStateOnClick,this)}},this)};m.prototype.handleInputValueConcurrency=function(e){var t=this.getFocusDomRef(),a=t&&this._getInputValue(),n=this.getProperty("value"),s=document.activeElement===t,i=this.isBound("value")&&this.isPropertyBeingUpdated("value");if(s&&i&&a&&n!==a){return this}t.value=e;if(s&&i&&!a){t.select()}};m.prototype.setPreferUserInteraction=function(e){this._setPreferUserInteraction(e)};m.prototype._setPreferUserInteraction=function(e){this._bPreferUserInteraction=e};m.prototype._getPreferUserInteraction=function(){return this._bPreferUserInteraction};m.prototype.closeValueStateMessage=function(){if(this._oValueStateMessage){this._detachValueStateLinkPress();this._oValueStateMessage.close()}};m.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content")};m.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};m.prototype.iOpenMessagePopupDuration=0;m.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};m.prototype.getErrorMessageAnnouncementState=function(){return this._bErrorStateShouldBeAnnounced};m.prototype.setErrorMessageAnnouncementState=function(e){this._bErrorStateShouldBeAnnounced=e};m.prototype.setLastValueStateText=function(e){this._sLastValueStateText=e};m.prototype.getLastValueStateText=function(){return this._sLastValueStateText};m.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return a.getElementById(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return a.getElementById(e)}))}return e};m.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){setTimeout(function(){if(!this.bIsDestroyed){this._setValueStateLinks([]);this._attachValueStateLinkPress();this._oValueStateMessage.open()}}.bind(this),0)}};m.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==y.None&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage()};m.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],t=this.getAggregation("_beginIcon")||[],a=e.concat(t),n,s;return a.reduce(function(e,t){n=t&&t.getDomRef()?parseFloat(getComputedStyle(t.getDomRef()).marginRight):0;s=t&&t.getDomRef()?t.getDomRef().offsetWidth:0;return e+s+n},0)};m.prototype.setValue=function(e){e=this.validateProperty("value",e);e=this._getInputValue(e);this.updateDomValue(e);if(e!==this.getProperty("value")){this.setLastValue(e)}this.setProperty("value",e,true);return this};m.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};m.prototype.getIdForLabel=function(){return this.getId()+"-inner"};m.prototype.hasLabelableHTMLElement=function(){return true};m.prototype.getAccessibilityInfo=function(){var e=g.getResourceBundleFor("sap.m"),t=this.getRequired()?e.getText("ELEMENT_REQUIRED"):"",a=this.getRenderer();return{role:a.getAriaRole(this),type:e.getText("ACC_CTR_TYPE_INPUT"),description:[this.getValueDescriptionInfo(),a.getLabelledByAnnouncement(this),a.getDescribedByAnnouncement(this),t].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};m.prototype.getValueDescriptionInfo=function(){return this.getValue()||g.getResourceBundleFor("sap.m").getText("INPUTBASE_VALUE_EMPTY")};m.prototype._addIcon=function(e,t,a){if(["begin","end"].indexOf(e)===-1){c.error('icon position is not "begin", neither "end", please check again the passed setting');return null}var n=s.createControlByURI(t).addStyleClass(m.ICON_CSS_CLASS);if(a!==undefined){this.insertAggregation("_"+e+"Icon",n,a)}else{this.addAggregation("_"+e+"Icon",n)}return n};m.prototype.addBeginIcon=function(e){return this._addIcon("begin",e)};m.prototype.addEndIcon=function(e,t){return this._addIcon("end",e,t)};Object.defineProperty(m.prototype,"_$input",{get:function(){return this.$("inner")}});m.prototype.setLastValue=function(e){this._lastValue=e;return this};m.prototype.getLastValue=function(){return this._lastValue};m.prototype.getFormFormattedValue=function(){return this.getValue()};m.prototype.getFormValueProperty=function(){return"value"};m.prototype.getFormObservingProperties=function(){return["value"]};m.prototype.getFormRenderAsControl=function(){return false};m.prototype._getToolbarInteractive=function(){return true};return m});
//# sourceMappingURL=InputBase.js.map