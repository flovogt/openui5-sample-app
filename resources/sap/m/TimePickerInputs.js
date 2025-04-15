/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","./TimePickerInternals","./Input","./InputRenderer","sap/ui/core/Renderer","./SegmentedButton","./SegmentedButtonItem","sap/ui/core/InvisibleText","sap/ui/events/KeyCodes","./TimePickerInputsRenderer","sap/ui/thirdparty/jquery","sap/ui/core/date/UI5Date"],function(t,e,i,s,n,r,u,o,a,p,h,jQuery,_){"use strict";var l=t.InputType,g=e.TextAlign,d=1e3;var f=i.extend("sap.m.TimePickerInputs",{metadata:{aggregations:{_inputs:{type:"sap.m.Input",multiple:true,visibility:"hidden"},_texts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}}},renderer:h});f.prototype.onAfterRendering=function(){if(!this._clickAttached){this._attachClickEvent()}};f.prototype._attachClickEvent=function(){var t=this.getDomRef();t.addEventListener("click",jQuery.proxy(this._clickHandler,this),false);this._clickAttached=true};f.prototype._clickHandler=function(t){var e=this.getAggregation("_inputs"),i=this._getActiveInput();if(i===-1){i=this._lastActiveInput}!document.activeElement.classList.contains("sapMSegBBtn")&&e&&e[i]&&e[i].focus()};f.prototype.onkeydown=function(t){var e=t.which||t.keyCode,i=t.key,s,n=this.getAggregation("_inputs"),r=this._getActiveInput(),u=r>-1&&n[r]?n[r].getId().slice(-1):"",o=["0","1","2","3","4","5","6","7","8","9"],a,h="",_,l=false,g,d;if(i===":"){t.preventDefault();this._kbdBuffer="";this._resetCooldown(true);this._switchNextInput(true)}else if(e===p.ENTER){s=this.getParent().getParent();s&&s._handleNumericOkPress()}else if(e===p.P||e===p.A){t.preventDefault();d=this._getFormatButton();d&&d.setSelectedKey(e===p.P?"pm":"am")}else if((e===p.ARROW_UP||e===p.ARROW_DOWN)&&!t.altKey&&!t.metaKey){t.preventDefault();g=this._getActiveInputObject();g&&g.getEnabled()&&this._keyboardUpdateInput(g,e===p.ARROW_UP?1:-1);if(u==="H"){this._handleHoursChange(g.getValue())}}else if(u!==""&&o.indexOf(i)!==-1){t.preventDefault();h=this._kbdBuffer+i;_=parseInt(h);this._resetCooldown(true);if(_>this._inputsProperties[u].max){a=this._formatNumberToString(parseInt(this._kbdBuffer),this._inputsProperties[u].prependZero,this._inputsProperties[u].max,"");n[r].setValue(a);this._handleHoursChange(a);this._inputsProperties[u].value=a;setTimeout(function(){this._switchNextInput();this._kbdBuffer=i;r=this._getActiveInput();u=n[r].getId().slice(-1);a=this._formatNumberToString(parseInt(i),this._inputsProperties[u].prependZero,this._inputsProperties[u].max,"");n[r].setValue(a);this._inputsProperties[u].value=a;this._resetCooldown(true)}.bind(this),0)}else{this._kbdBuffer=h;a=this._formatNumberToString(parseInt(this._kbdBuffer),this._inputsProperties[u].prependZero,this._inputsProperties[u].max,"");n[r].setValue(a);this._inputsProperties[u].value=a;if(this._kbdBuffer.length===2||parseInt(this._kbdBuffer+"0")>this._inputsProperties[u].max){this._resetCooldown(this._kbdBuffer.length===2?false:true);if(u==="H"){l=this._handleHoursChange(this._kbdBuffer)}this._kbdBuffer="";if(!l||u!=="H"){setTimeout(function(){this._switchNextInput()}.bind(this),0)}}}}else if(e!==p.ARROW_LEFT&&e!==p.ARROW_RIGHT&&e!==p.BACKSPACE&&e!==p.DELETE&&e!==p.TAB){t.preventDefault()}};f.prototype._keyboardUpdateInput=function(t,e){var i=parseInt(t.getValue()),s=t.getId().slice(-1),n=this._inputsProperties[s].min,r=this._inputsProperties[s].max,u=this._inputsProperties[s].step;i+=e*u;if(i>r){i=r}else if(i<n){i=n}t.setValue(this._formatNumberToString(i,this._inputsProperties[s].prependZero,this._inputsProperties[s].max,""))};f.prototype._resetCooldown=function(t){if(this._typeCooldownId){clearTimeout(this._typeCooldownId)}if(t){this._startCooldown()}};f.prototype._startCooldown=function(){this._typeCooldownId=setTimeout(function(){var t=this.getAggregation("_inputs");this._kbdBuffer="";this._typeCooldownId=null;t&&t[this._activeInput]&&t[this._activeInput].getDomRef("inner").select()}.bind(this),d)};f.prototype.setValue=function(t){var e=this._getHoursInput(),s=this._getValueFormatPattern(),n=s.indexOf("HH"),r=s.indexOf("H"),u=e&&e.getValue()==="24",o=i._isHoursValue24(t,n,r),a;if(u&&this._isFormatSupport24()&&!o){t=i._replaceZeroHoursWith24(t,n,r)}t=this.validateProperty("value",t);this.setProperty("value",t,true);if(t){a=this._parseValue(o?i._replace24HoursWithZero(t,n,r):t)}if(a){this._setTimeValues(a,o)}return this};f.prototype._switchNextInput=function(t){var e=this._getActiveInput(),i=this.getAggregation("_inputs"),s=i.length,n=e;if(!i){return}do{e++;if(e>=i.length){e=t?0:s-1}}while(!i[e].getEnabled()&&e!==n&&(t||e<s-1));if(e!==n&&i[e].getEnabled()){this._switchInput(e)}};f.prototype.getTimeValues=function(){var t=this._getHoursInput(),e=this._getMinutesInput(),i=this._getSecondsInput(),s=this._getFormatButton(),n=null,r=null,u=_.getInstance();if(t){n=parseInt(t.getValue())}if(s){r=s.getSelectedKey()}if(r==="am"&&n===12){n=0}else if(r==="pm"&&n!==12){n+=12}if(n!==null){u.setHours(n.toString())}if(e){u.setMinutes(e.getValue())}if(i){u.setSeconds(i.getValue())}return u};f.prototype._getActiveInput=function(){return this._activeInput};f.prototype._getActiveInputObject=function(){var t=this._getActiveInput(),e=this.getAggregation("_inputs");return e&&e[t]?e[t]:null};f.prototype._setTimeValues=function(t,e){var i=this._getHoursInput(),s=this._getMinutesInput(),n=this._getSecondsInput(),r=this._getFormatButton(),u=this.getValueFormat(),o,a=null;t=t||_.getInstance();if(Object.prototype.toString.call(t)!=="[object Date]"||isNaN(t)){throw new Error("Date must be a JavaScript or UI5Date date object; "+this)}if(!e){var p=this._formatValue(t,true);this.setProperty("value",p,true);o=t.getHours()}else{o=24}if((u.indexOf("a")!==-1||u==="")&&r){a=o>=12?"pm":"am";o=o>12?o-12:o;o=o===0?12:o}i&&i.setValue(this._formatNumberToString(o,this._inputsProperties.H.prependZero,this._inputsProperties.H.max,""));s&&s.setValue(this._formatNumberToString(t.getMinutes(),this._inputsProperties.M.prependZero,this._inputsProperties.M.max,""));n&&n.setValue(this._formatNumberToString(t.getSeconds(),this._inputsProperties.S.prependZero,this._inputsProperties.S.max,""));r&&r.setSelectedKey(a);if(e){s&&s.setValue("00").setEnabled(false);n&&n.setValue("00").setEnabled(false)}else{s&&s.setEnabled(true);n&&n.setEnabled(true)}if(i){this._inputsProperties.H.value=o}if(s){this._inputsProperties.M.value=s.getValue()}if(n){this._inputsProperties.S.value=n.getValue()}};f.prototype._getHoursInput=function(){var t=this.getAggregation("_inputs");return t&&this._inputIndexes&&t[this._inputIndexes.H]?t[this._inputIndexes.H]:null};f.prototype._getMinutesInput=function(){var t=this.getAggregation("_inputs");return t&&this._inputIndexes&&t[this._inputIndexes.M]?t[this._inputIndexes.M]:null};f.prototype._getSecondsInput=function(){var t=this.getAggregation("_inputs");return t&&this._inputIndexes&&t[this._inputIndexes.S]?t[this._inputIndexes.S]:null};f.prototype._destroyControls=function(){this.destroyAggregation("_inputs");this.destroyAggregation("_buttonAmPm")};f.prototype._createControls=function(){var t=this._getDisplayFormatPattern(),e=this.getId(),s=this._isFormatSupport24(),n=this.getSupport2400(),r=0,p=0,h=0,_="",d=this.getAggregation("_texts"),f=0,c,m,v=0,x,P=false,b,y,S,T,E;this._inputIndexes={};this._inputsProperties={};if(t===undefined){return}b=t.indexOf("HH");y=t.indexOf("H");if(!d){this.addAggregation("_texts",new a(e+"-textH",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_HOURS")}).toStatic());this.addAggregation("_texts",new a(e+"-textM",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_MINUTES")}).toStatic());this.addAggregation("_texts",new a(e+"-textS",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_SECONDS")}).toStatic())}if(b!==-1){x=true;P=true;c=n?24:23}else if(y!==-1){x=true;c=n?24:23}else if(t.indexOf("hh")!==-1){x=true;P=true;f=1;c=12}else if(t.indexOf("h")!==-1){x=true;f=1;c=12}if(x){this.addAggregation("_inputs",new I(e+"-inputH",{type:l.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_HOURS"),textAlign:g.Center,width:"2.875rem",value:r,ariaLabelledBy:e+"-textH"}));this._inputsProperties.H={min:f,max:c,prependZero:P,step:1,value:r,format24:s};this._inputIndexes.H=v++}if(t.indexOf("m")!==-1){P=t.indexOf("mm")!==-1;c=59;this.addAggregation("_inputs",new I(e+"-inputM",{type:l.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_MINUTES"),textAlign:g.Center,width:"2.875rem",value:p,ariaLabelledBy:e+"-textM"}));this._inputsProperties.M={min:0,max:c,prependZero:P,step:this.getMinutesStep(),value:p};this._inputIndexes.M=v++}if(t.indexOf("s")!==-1){P=t.indexOf("ss")!==-1;c=59;this.addAggregation("_inputs",new I(e+"-inputS",{type:l.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_SECONDS"),textAlign:g.Center,width:"2.875rem",value:h,ariaLabelledBy:e+"-textS"}));this._inputsProperties.S={min:0,max:c,prependZero:P,step:this.getSecondsStep(),value:h};this._inputIndexes.S=v++}if(t.indexOf("a")!==-1){this.setAggregation("_buttonAmPm",new u(e+"-format",{items:[new o({text:this._sAM,key:"am"}),new o({text:this._sPM,key:"pm"})],selectedKey:_,tooltip:this._oResourceBundle.getText("TIMEPICKER_AMPM_BUTTON_TOOLTIP")}))}if(!this.getAggregation("_nowButton")){this.setAggregation("_nowButton",this._getCurrentTimeButton())}m=this.getAggregation("_inputs");this._inputCount=m.length;this._switchInput(0);for(v=0;v<this._inputCount;v++){this._attachEvents(m[v])}T=this.getValue();if(T){S=i._isHoursValue24(T,b,y);E=this._parseValue(S?i._replace24HoursWithZero(T,b,y):T);if(E){this._setTimeValues(E,S)}}};f.prototype._attachEvents=function(t){t.onfocusin=function(t){var e=t.currentTarget.id.slice(-1),i=this.getAggregation("_inputs");this._activeInput=this._inputIndexes[e];i[this._activeInput].addStyleClass("sapMFocus");i[this._activeInput].getDomRef("inner").select()}.bind(this);t.onfocusout=function(t){var e=t.currentTarget.id.slice(-1),i=this.getAggregation("_inputs");if(this._inputsProperties[e].value===""){this._inputsProperties[e].value="00";i[this._activeInput].setValue("00")}else if(e!=="H"){i[this._activeInput].setValue(i[this._activeInput].getValue())}if(e==="H"&&!this._inputsProperties[e].format24&&parseInt(this._inputsProperties[e].value)===0){this._inputsProperties[e].value="12";i[this._activeInput].setValue("12")}i[this._activeInput].removeStyleClass("sapMFocus");this._lastActiveInput=this._activeInput;this._activeInput=-1}.bind(this);t.attachLiveChange(function(t){var e=t.getParameter("id").slice(-1),i=t.getParameter("value");if(i!==this._inputsProperties[e].value.toString()){this._inputsProperties[e].value=i;this._kbdBuffer=i}}.bind(this))};f.prototype._switchInput=function(t){var e=this.getAggregation("_inputs");if(t>=this._inputCount){t=0}e[t].focus();this._activeInput=t};f.prototype._handleHoursChange=function(t){var e=this._getMinutesInput(),i=this._getSecondsInput();if(!this.getSupport2400()){return}if(t==="24"){if(e&&e.getEnabled()){this._sMinutes=e.getValue();e.setEnabled(false).setValue("00")}if(i&&i.getEnabled()){this._sSeconds=i.getValue();i.setEnabled(false).setValue("00")}this._getHoursInput().focus();return true}else{if(e&&!e.getEnabled()){e.setEnabled(true).setValue(this._sMinutes)}if(i&&!i.getEnabled()){i.setEnabled(true).setValue(this._sSeconds)}this._getHoursInput().focus();return false}};var c=r.extend(n);c.apiVersion=2;c.writeInnerAttributes=function(t,e){n.writeInnerAttributes.call(this,t,e);t.attr("pattern","[0-9]*");t.attr("inputmode","numeric")};var I=s.extend("sap.m.internal.CustomNumericInput",{renderer:c});return f});
//# sourceMappingURL=TimePickerInputs.js.map