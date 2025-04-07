/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./Text","sap/ui/core/ResizeHandler","./library","sap/ui/core/library","sap/ui/core/Core","sap/ui/events/KeyCodes","sap/ui/Device","sap/base/security/encodeXML","./TextAreaRenderer","sap/ui/thirdparty/jquery"],function(e,t,i,o,r,s,a,n,h,g,jQuery){"use strict";var u=r.Wrapping;var p=e.extend("sap.m.TextArea",{metadata:{library:"sap.m",designtime:"sap/m/designtime/TextArea.designtime",properties:{rows:{type:"int",group:"Appearance",defaultValue:2},cols:{type:"int",group:"Appearance",defaultValue:20},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},wrapping:{type:"sap.ui.core.Wrapping",group:"Behavior",defaultValue:u.None},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{_counter:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{liveChange:{parameters:{value:{type:"string"}}}},dnd:{draggable:false,droppable:true}},renderer:g});p.prototype.init=function(){var i;e.prototype.init.call(this);this.sResizeListenerId=null;this._bPasteIsTriggered=false;i=new t(this.getId()+"-counter",{}).addStyleClass("sapMTextAreaCounter").setVisible(false);this.setAggregation("_counter",i)};p.prototype.setShowExceededText=function(e){var t=this.getAggregation("_counter"),i;if(e){if(this.getAriaLabelledBy().indexOf(t.getId())<0){this.addAriaLabelledBy(t.getId())}}else{t=this.getAggregation("_counter");t&&this.removeAriaLabelledBy(t.getId());i=this.getValue();if(this.getMaxLength()){i=i.substring(0,this.getMaxLength());this.setValue(i)}}t.setVisible(e);this.setProperty("showExceededText",e);this._updateMaxLengthAttribute();return this};p.prototype.exit=function(){e.prototype.exit.call(this);jQuery(window).off("resize.sapMTextAreaGrowing");this._detachResizeHandler();this._deregisterEvents()};p.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.call(this);var t=this.getAggregation("_counter");if((this.getMaxLength()<=0||!this.getShowExceededText())&&t.getVisible()){t.setVisible(false)}this._detachResizeHandler();if(this.getGrowing()){jQuery(window).on("resize.sapMTextAreaGrowing",this._updateOverflow.bind(this))}else{jQuery(window).off("resize.sapMTextAreaGrowing")}};p.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.call(this);if(this.getGrowing()){this._sResizeListenerId=i.register(this,this._resizeHandler.bind(this));if(this.getGrowingMaxLines()>0){this._setGrowingMaxHeight()}this._adjustContainerDimensions()}this._updateMaxLengthAttribute();if(!n.support.touch){return}var t=this.$("inner");if(this._behaviour.INSIDE_SCROLLABLE_WITHOUT_FOCUS){t.on("touchstart",jQuery.proxy(this._onTouchStart,this));t.on("touchmove",jQuery.proxy(this._onTouchMove,this))}else if(this._behaviour.PAGE_NON_SCROLLABLE_AFTER_FOCUS){t.on("touchmove",function(e){if(t.is(":focus")){e.stopPropagation()}})}};p.prototype._deregisterEvents=function(){this.$("inner").off("touchstart").off("touchmove")};p.prototype._setGrowingMaxHeight=function(){var e=this.getDomRef("hidden"),t=s.getLoadedLibraries(),i,o,r;if(!t||!t["sap.m"]){s.attachThemeChanged(this._setGrowingMaxHeight.bind(this));return}s.detachThemeChanged(this._setGrowingMaxHeight);r=window.getComputedStyle(e);i=this._getLineHeight();o=i*this.getGrowingMaxLines()+parseFloat(r.getPropertyValue("padding-top"))+parseFloat(r.getPropertyValue("border-top-width"))+parseFloat(r.getPropertyValue("border-bottom-width"));if(n.browser.firefox){o+=parseFloat(r.getPropertyValue("padding-bottom"))}e.style.maxHeight=o+"px"};p.prototype._getLineHeight=function(){var e=this.getFocusDomRef(),t;if(!e){return}t=window.getComputedStyle(e);return isNaN(parseFloat(t.getPropertyValue("line-height")))?1.4*parseFloat(t.getPropertyValue("font-size")):parseFloat(t.getPropertyValue("line-height"))};p.prototype._resizeHandler=function(e){this._adjustContainerDimensions()};p.prototype._detachResizeHandler=function(){if(this._sResizeListenerId){i.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};p.prototype.onsapenter=function(e){e.setMarked()};p.prototype.onValueRevertedByEscape=function(e){if(this.getValueLiveUpdate()){this.setProperty("value",e,true);e=this.getValue()}this.fireLiveChange({value:e,newValue:e})};p.prototype.getValue=function(){var e=this.getFocusDomRef();return e?e.value:this.getProperty("value")};p.prototype.setValue=function(t){e.prototype.setValue.call(this,t);this._handleShowExceededText();if(this.getGrowing()){this._adjustContainerDimensions()}return this};p.prototype.onsapnext=function(e){e.setMarked()};p.prototype.onsapprevious=function(e){e.setMarked()};p.prototype.oninput=function(t){e.prototype.oninput.call(this,t);if(this._bPasteIsTriggered){this._bPasteIsTriggered=false;this._selectExceededText()}if(t.isMarked("invalid")){return}var i=this.getFocusDomRef(),o=i.value,r=this.getShowExceededText(),s=this.getMaxLength();if(!r&&s&&o.length>s){o=o.substring(0,s);i.value=o}if(this.getValueLiveUpdate()){this.setProperty("value",o,true);o=this.getValue()}this._handleShowExceededText();if(this.getGrowing()){this._adjustContainerDimensions()}this.fireLiveChange({value:o,newValue:o})};p.prototype.onpaste=function(e){if(this.getShowExceededText()){this._bPasteIsTriggered=true}};p.prototype._adjustContainerDimensions=function(){var e=this.getFocusDomRef(),t=this.getDomRef("hidden"),i,o;if(!e||!t){return}t.style.width="";if(this.getGrowing()&&!this.getWidth()&&this.getCols()!==20){t.style.width=this.getCols()*.5+"rem"}i=t.style["min-height"];o=this.getRows()*this._getLineHeight()+"px";if(!i||o!==i){t.style["min-height"]=o}t.innerHTML=h(e.value)+"&nbsp;";this._updateOverflow()};p.prototype._updateOverflow=function(){var e=this.getFocusDomRef(),t=this.getDomRef("hidden"),i;if(e){i=parseFloat(window.getComputedStyle(t)["max-height"]);e.style.overflowY=t.scrollHeight>i?"auto":""}};p.prototype._getInputValue=function(e){e=e===undefined?this.$("inner").val()||"":e.toString();if(this.getMaxLength()>0&&!this.getShowExceededText()){e=e.substring(0,this.getMaxLength())}return e.replace(/\r\n/g,"\n")};p.prototype._selectExceededText=function(){var e=this.getValue().length;if(e>this.getMaxLength()){this.selectText(this.getMaxLength(),e)}};p.prototype._updateMaxLengthAttribute=function(){var e=this.getFocusDomRef();if(!e){return}if(this.getShowExceededText()){e.removeAttribute("maxlength");this._handleShowExceededText()}else{this.getMaxLength()&&e.setAttribute("maxlength",this.getMaxLength())}};p.prototype._handleShowExceededText=function(){var e=this.getAggregation("_counter"),t=this.getMaxLength(),i;if(!this.getDomRef()||!this.getShowExceededText()||!t){return}i=this._getCounterValue();e.setText(i)};p.prototype._maxLengthIsExceeded=function(e){var t=false;if(this.getMaxLength()>0&&this.getShowExceededText()&&this.getValue().length>this.getMaxLength()){t=true}return t};p.prototype._getCounterValue=function(){var e=s.getLibraryResourceBundle("sap.m"),t=this.getMaxLength()-this.getValue().length,i=t<0?true:false,o="TEXTAREA_CHARACTER"+(Math.abs(t)===1?"":"S")+"_"+(i?"EXCEEDED":"LEFT");return e.getText(o,[Math.abs(t)])};p.prototype._behaviour=function(e){return{INSIDE_SCROLLABLE_WITHOUT_FOCUS:e.os.ios||e.browser.chrome,PAGE_NON_SCROLLABLE_AFTER_FOCUS:e.os.android}}(n);p.prototype._onTouchStart=function(e){var t=e.touches[0];this._iStartY=t.pageY;this._iStartX=t.pageX;this._bHorizontalScroll=undefined;e.setMarked("swipestartHandled")};p.prototype._onTouchMove=function(e){var t=this.getFocusDomRef(),i=e.touches[0].pageY,o=t.scrollTop,r=o<=0,s=o+t.clientHeight>=t.scrollHeight,a=this._iStartY>i,n=this._iStartY<i,h=r&&n||s&&a;if(this._bHorizontalScroll===undefined){this._bHorizontalScroll=Math.abs(this._iStartY-i)<Math.abs(this._iStartX-e.touches[0].pageX)}if(this._bHorizontalScroll||!h){e.setMarked()}};p.prototype.onkeyup=function(e){if(e.keyCode===a.ENTER){e.setMarked("enterKeyConsumedAsContent")}};return p});
//# sourceMappingURL=TextArea.js.map