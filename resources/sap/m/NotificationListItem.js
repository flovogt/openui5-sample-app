/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./NotificationListBase","sap/ui/core/InvisibleText","sap/ui/core/Lib","sap/ui/core/library","sap/m/Link","sap/m/Avatar","sap/ui/events/KeyCodes","./NotificationListItemRenderer"],function(t,e,i,r,o,a,s,n,p){"use strict";var u=r.getResourceBundleFor("sap.m"),h=u.getText("NOTIFICATION_LIST_ITEM_SHOW_MORE"),l=u.getText("NOTIFICATION_LIST_ITEM_SHOW_LESS"),g=u.getText("NOTIFICATION_LIST_ITEM_READ"),I=u.getText("NOTIFICATION_LIST_ITEM_UNREAD");var T=44;var _=t.AvatarSize;var c=t.AvatarColor;var f=t.LinkAccessibleRole;var A=o.Priority;var v=e.extend("sap.m.NotificationListItem",{metadata:{library:"sap.m",properties:{description:{type:"string",group:"Data",defaultValue:""},authorInitials:{type:"string",group:"Appearance",defaultValue:null},truncate:{type:"boolean",group:"Appearance",defaultValue:true},hideShowMoreButton:{type:"boolean",group:"Appearance",defaultValue:false},authorAvatarColor:{type:"sap.m.AvatarColor",group:"Appearance",defaultValue:c.Accent6},authorName:{type:"string",group:"Appearance",defaultValue:""},authorPicture:{type:"sap.ui.core.URI"},datetime:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{processingMessage:{type:"sap.m.MessageStrip",multiple:false},_showMoreButton:{type:"sap.m.Link",multiple:false,visibility:"hidden"}}},renderer:p});v.prototype.init=function(){this.setType("Active");this._footerIvisibleText=new i({id:this.getId()+"-invisibleFooterText"})};v.prototype._getAuthorAvatar=function(){if(this.getAuthorInitials()||this.getAuthorPicture()){if(!this._avatar){this._avatar=new s({displaySize:_.XS})}this._avatar.setInitials(this.getAuthorInitials());this._avatar.setSrc(this.getAuthorPicture());this._avatar.setBackgroundColor(this.getAuthorAvatarColor());return this._avatar}};v.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.call(this);if(this.getHideShowMoreButton()){return}this._updateShowMoreButtonVisibility()};v.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._footerIvisibleText){this._footerIvisibleText.destroy();this._footerIvisibleText=null}if(this._avatar){this._avatar.destroy();this._avatar=null}};v.prototype._onResize=function(){e.prototype._onResize.apply(this,arguments);this._updateShowMoreButtonVisibility()};v.prototype._updateShowMoreButtonVisibility=function(){var t=this.$(),e=t.find(".sapMNLITitleText")[0],i=t.find(".sapMNLIDescription")[0],r;if(t.length>0){r=e.scrollHeight>T||i.scrollHeight>T}this._getShowMoreButton().setVisible(r)};v.prototype._getShowMoreButton=function(){var t=this.getAggregation("_showMoreButton");if(!t){t=new a(this.getId()+"-showMoreButton",{accessibleRole:f.Button,text:this.getTruncate()?h:l,press:function(){var t=!this.getTruncate();this._getShowMoreButton().setText(t?h:l);this.setProperty("truncate",t,true);this.$().find(".sapMNLITitleText, .sapMNLIDescription").toggleClass("sapMNLIItemTextLineClamp",t)}.bind(this)});this.setAggregation("_showMoreButton",t,true)}return t};v.prototype._getFooterInvisibleText=function(){var t=this.getUnread()?I:g,e=this.getAuthorName(),i=this.getDatetime(),r=this.getPriority(),o=[t];if(e){e=u.getText("NOTIFICATION_LIST_ITEM_CREATED_BY");o.push(e);o.push(this.getAuthorName())}if(i){o.push(u.getText("NOTIFICATION_LIST_ITEM_DATETIME",[i]))}if(r!==A.None){o.push(u.getText("NOTIFICATION_LIST_ITEM_PRIORITY",[r]))}return this._footerIvisibleText.setText(o.join(" "))};return v});
//# sourceMappingURL=NotificationListItem.js.map