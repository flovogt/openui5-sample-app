/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/Grid","./BasePanel","sap/ui/core/ListItem","sap/m/CustomListItem","sap/m/ComboBox","sap/m/List","sap/m/HBox","sap/m/library","sap/m/Button","sap/base/util/merge","sap/ui/core/library","sap/ui/core/InvisibleMessage"],(t,e,o,n,s,i,r,a,l,c,h,p)=>{"use strict";const u=h.ValueState;const g=e.extend("sap.m.p13n.QueryPanel",{metadata:{library:"sap.m",properties:{queryLimit:{type:"int",defaultValue:-1}}},renderer:{apiVersion:2}});const d=a.ListType;const _=a.FlexJustifyContent;const m=a.ListKeyboardMode;const y=a.ButtonType;g.prototype.init=function(){e.prototype.init.apply(this,arguments);this._bFocusOnRearrange=false;this.setEnableReorder(true);this.addStyleClass("sapMP13nQueryPanel");this.getModel(this.LOCALIZATION_MODEL).setProperty("/placeholderText",this._getPlaceholderText())};g.prototype.setP13nData=function(t){e.prototype.setP13nData.apply(this,arguments);this._oListControl.removeAllItems();if(t instanceof Array){t.forEach(t=>{if(t[this.PRESENCE_ATTRIBUTE]){this._addQueryRow(t)}});this._addQueryRow()}return this};g.prototype.getP13nData=function(t){const e=[];this._oListControl.getItems().forEach(t=>{const o=this._getControlFromRow(t)._key;if(o){const t=this._getP13nModel().getProperty("/items")?.find(t=>t.name==o);if(t){e.push(t)}}});if(!t){this._getP13nModel().getProperty("/items")?.forEach(t=>{if(e.indexOf(t)===-1){e.push(t)}})}return c([],e)};g.prototype._allEntriesUsed=function(){return this.getP13nData().length===this.getP13nData(true).length};g.prototype._moveTableItem=function(t,e){const o=this._oListControl.getItems().indexOf(t);const n=this._oListControl.getItems().length-1;const s=this.getQueryLimit();if((o!==n||this._allEntriesUsed())&&(s===-1||e<s)){this._oListControl.removeItem(t);this._oListControl.insertItem(t,e);this._updateEnableOfMoveButtons(t,false);this._getP13nModel().checkUpdate(true);this.fireChange({reason:this.CHANGE_REASON_MOVE,item:this._getModelEntry(t)})}};g.prototype._updateEnableOfMoveButtons=function(t,o){e.prototype._updateEnableOfMoveButtons.apply(this,arguments);if(this._oListControl.getItems().indexOf(t)===this._oListControl.getItems().length-2&&!this._allEntriesUsed()){this._getMoveDownButton().setEnabled(false)}};g.prototype._createInnerListControl=function(){const t=new i(this.getId()+"-innerP13nList",{itemPress:[this._onItemPressed,this],dragDropConfig:this._getDragDropConfig()});t.setKeyboardMode(m.Edit);return t};g.prototype._getModelEntry=function(t){const e=this._getControlFromRow(t)._key;const o=this._getP13nModel().getProperty("/items").find(t=>t.name==e);return o};g.prototype._getAvailableItems=function(t){const e=this._getP13nModel().getProperty("/items");const n=[];e.forEach((t,e)=>{n.push(new o({key:t.name,text:t.label,enabled:{path:this.P13N_MODEL+">/items/"+e+"/"+this.PRESENCE_ATTRIBUTE,formatter:function(t){const e=this.getParent();const o=e.getSelectedItem();const n=o&&e.getItems().indexOf(o);const s=this.getBindingPath("enabled");const i=parseInt(s.split("/")[2]);return!t||n===i}}}))});return n};g.prototype._addQueryRow=function(t){const e=this.getQueryLimit()>-1;const o=this.getQueryLimit()<=this._oListControl.getItems().length;if(e&&o&&!t||this._allEntriesUsed()){return}t=t?t:{name:null};const s=this._createQueryRowGrid(t);const i=new n({type:d.Active,content:[s]});if(this.getEnableReorder()&&(this.getQueryLimit()===-1||this.getQueryLimit()>1&&this._oListControl.getItems().length<this.getQueryLimit())){this._addHover(i)}this._getControlFromRow(i)._key=t.name;this._oListControl.addItem(i);const r=!!t.name;const a=this._createRemoveButton(r);i.getContent()[0].addContent(a);return i};g.prototype._createQueryRowGrid=function(e){const o=this._createKeySelect(e.name);return new t({containerQuery:true,defaultSpan:"XL6 L6 M6 S6",content:[o]}).addStyleClass("sapUiTinyMargin")};g.prototype._handleActivated=function(t){const e=t.getContent()[0];if(e){const e=this._getControlFromRow(t,-1);if(t&&e.getItems().length<2){e.insertItem(this._getMoveUpButton(),0);e.insertItem(this._getMoveDownButton(),1);this._updateEnableOfMoveButtons(t,false)}}};g.prototype._getPlaceholderText=()=>"";g.prototype._getRemoveButtonTooltipText=()=>"";g.prototype._getRemoveButtonAnnouncementText=()=>"";g.prototype._announce=t=>{const e=h.InvisibleMessageMode;const o=p.getInstance();o.announce(t,e.Assertive)};g.prototype._createKeySelect=function(t){const e=this;const o=new s({width:"14rem",enabled:{path:this.P13N_MODEL+">/items/",formatter:function(t){if(e.getQueryLimit()<0){return true}const o=e.getP13nData(true).map(t=>t.name);const n=this._key;const s=o.indexOf(n)+1;return s<=e.getQueryLimit()}},items:this._getAvailableItems(t),selectedKey:t,placeholder:`{${this.LOCALIZATION_MODEL}>/placeholderText}`,selectionChange:t=>{const e=t.getSource();const o=e.getSelectedItem();if(!o){this._selectKey(e)}},change:t=>{const e=t.getSource();const o=t.getParameter("newValue");this._selectKey(e);e.setValueState(o&&!e.getSelectedItem()?u.Error:u.None)}});return o};g.prototype._selectKey=function(t){const e=t.getSelectedKey();const o=t._key;const n=t.getParent().getParent();const s=this._oListControl.getItems().length-1==this._oListControl.getItems().indexOf(n);const i=this._getControlFromRow(n,-1);i.setVisible(!(s&&e==""));if(o){this._updatePresence(o,false,undefined)}t._key=e;this._updatePresence(e,true,this._oListControl.getItems().indexOf(n));if(e!==""&&s){this._addQueryRow()}};g.prototype._createRemoveButton=function(t){const e=new r({justifyContent:_.End,width:"100%",visible:t,items:[new l({type:y.Transparent,icon:"sap-icon://decline",press:t=>{const e=t.getSource().getParent().getParent().getParent();const o=this._oListControl.getItems().length;const n=o===1||o==this.getP13nData(true).length;this._oListControl.removeItem(e);this._updatePresence(this._getControlFromRow(e)._key,false,undefined);if(n){this._addQueryRow()}this._announce(this._getRemoveButtonAnnouncementText());setTimeout(()=>{if(!this.bIsDestroyed){this.getInitialFocusedControl().focus()}},0);this._getP13nModel().checkUpdate(true)}})]});if(this._getRemoveButtonTooltipText()){e.getItems()[0].setTooltip(this._getRemoveButtonTooltipText())}return e};g.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveUpButton().getParent().getParent().getParent();e.prototype._moveSelectedItem.apply(this,arguments)};g.prototype._updatePresence=function(t,e,o){const n=c([],this._getP13nModel().getProperty("/items"));const s=n.filter(e=>e.name===t);if(s[0]){s[0][this.PRESENCE_ATTRIBUTE]=e}this._getP13nModel().setProperty("/items",n);this.fireChange({reason:e?this.CHANGE_REASON_ADD:this.CHANGE_REASON_REMOVE,item:s[0]})};g.prototype.getInitialFocusedControl=function(){const t=this._getRow(-1);return this._getControlFromRow(t)};g.prototype._getRow=function(t){const e=this._oListControl.getItems();if(t<0){t=e.length+t}return e[t]};g.prototype._getControlFromRow=(t,e)=>{const o=t.getContent()[0].getContent();if(e===undefined){e=0}if(e<0){e=o.length+e}return o[e]};g.prototype._updateLocalizationTexts=function(){this.getModel(this.LOCALIZATION_MODEL).setProperty("/placeholderText",this._getPlaceholderText())};return g});
//# sourceMappingURL=QueryPanel.js.map