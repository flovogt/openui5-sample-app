/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/m/Text","sap/m/Title","sap/m/FormattedText","sap/m/Illustration","sap/base/Log","sap/ui/core/Control","sap/ui/core/EventBus","sap/ui/core/Lib","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/ui/dom/getScrollbarSize","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI","./IllustratedMessageRenderer"],function(e,t,i,s,a,r,l,o,n,u,p,d,jQuery,T,h){"use strict";var c=e.IllustratedMessageSize;var g=e.IllustratedMessageType;var I=u.TextAlign;var _=u.TitleLevel;var f=l.extend("sap.m.IllustratedMessage",{metadata:{library:"sap.m",properties:{description:{type:"string",group:"Misc",defaultValue:""},enableDefaultTitleAndDescription:{type:"boolean",group:"Appearance",defaultValue:true},enableFormattedText:{type:"boolean",group:"Appearance",defaultValue:false},enableVerticalResponsiveness:{type:"boolean",group:"Appearance",defaultValue:false},illustrationSize:{type:"sap.m.IllustratedMessageSize",group:"Appearance",defaultValue:c.Auto},illustrationType:{type:"string",group:"Appearance",defaultValue:g.NoSearchResults},src:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},ariaTitleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:_.Auto}},aggregations:{additionalContent:{type:"sap.ui.core.Control",multiple:true},_formattedText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_illustration:{type:"sap.m.Illustration",visibility:"hidden",multiple:false},_text:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_title:{type:"sap.m.Title",multiple:false,visibility:"hidden"}},associations:{illustrationAriaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"illustrationAriaLabelledBy"},illustrationAriaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"illustrationAriaDescribedBy"}},dnd:{draggable:false,droppable:true}},renderer:h});f.ORIGINAL_TEXTS={UnableToLoad:"UnableToLoad",UnableToUpload:"UnableToUpload",NoActivities:"NoActivities",BeforeSearch:"BeforeSearch",NoSearchResults:"NoSearchResults",NoEntries:"NoEntries",NoData:"NoData",NoNotifications:"NoNotifications",BalloonSky:"BalloonSky",SuccessScreen:"SuccessScreen",NoMail:"NoMail",NoSavedItems:"NoSavedItems",NoTasks:"NoTasks",UploadToCloud:"UploadToCloud",NoDimensionsSet:"NoDimensionsSet",AddDimensions:"AddDimensions"};f.FALLBACK_TEXTS={ReloadScreen:f.ORIGINAL_TEXTS.UnableToLoad,Connection:f.ORIGINAL_TEXTS.UnableToLoad,ErrorScreen:f.ORIGINAL_TEXTS.UnableToUpload,EmptyCalendar:f.ORIGINAL_TEXTS.NoActivities,SearchEarth:f.ORIGINAL_TEXTS.BeforeSearch,SearchFolder:f.ORIGINAL_TEXTS.NoSearchResults,EmptyList:f.ORIGINAL_TEXTS.NoEntries,Tent:f.ORIGINAL_TEXTS.NoData,SleepingBell:f.ORIGINAL_TEXTS.NoNotifications,SimpleBalloon:f.ORIGINAL_TEXTS.BalloonSky,SimpleBell:f.ORIGINAL_TEXTS.NoNotifications,SimpleCalendar:f.ORIGINAL_TEXTS.NoActivities,SimpleCheckMark:f.ORIGINAL_TEXTS.SuccessScreen,SimpleConnection:f.ORIGINAL_TEXTS.UnableToLoad,SimpleEmptyDoc:f.ORIGINAL_TEXTS.NoData,SimpleEmptyList:f.ORIGINAL_TEXTS.NoEntries,SimpleError:f.ORIGINAL_TEXTS.UnableToUpload,SimpleMagnifier:f.ORIGINAL_TEXTS.BeforeSearch,SimpleMail:f.ORIGINAL_TEXTS.NoMail,SimpleNoSavedItems:f.ORIGINAL_TEXTS.NoSavedItems,SimpleNotFoundMagnifier:f.ORIGINAL_TEXTS.NoSearchResults,SimpleReload:f.ORIGINAL_TEXTS.UnableToLoad,SimpleTask:f.ORIGINAL_TEXTS.NoTasks,SuccessBalloon:f.ORIGINAL_TEXTS.BalloonSky,SuccessCheckMark:f.ORIGINAL_TEXTS.SuccessScreen,SuccessHighFive:f.ORIGINAL_TEXTS.BalloonSky};f.PREPENDS={DESCRIPTION:"IllustratedMessage_DESCRIPTION_",TITLE:"IllustratedMessage_TITLE_"};f.BREAK_POINTS={DIALOG:679,SPOT:319,DOT:259,BASE:159};f.BREAK_POINTS_HEIGHT={DIALOG:451,SPOT:296,DOT:154,BASE:87};f.MEDIA={BASE:"sapMIllustratedMessage-Base",DOT:"sapMIllustratedMessage-Dot",SPOT:"sapMIllustratedMessage-Spot",DIALOG:"sapMIllustratedMessage-Dialog",SCENE:"sapMIllustratedMessage-Scene"};f.RESIZE_HANDLER_ID={CONTENT:"_sContentResizeHandlerId"};f.prototype.init=function(){this._sLastKnownMedia=null;this._updateInternalIllustrationSetAndType();o.getInstance().subscribe("sapMIllusPool-assetLdgFailed",this._handleMissingAsset.bind(this))};f.prototype.onBeforeRendering=function(){this._detachResizeHandlers()};f.prototype.onAfterRendering=function(){this._updateDomSize();this._attachResizeHandlers();this._preventWidowWords(this._getTitle().getDomRef());this._preventWidowWords(this._getDescription().getDomRef());this._setDefaultIllustrationLabel()};f.prototype.exit=function(){this._detachResizeHandlers()};f.prototype.setIllustrationType=function(e){this.setProperty("illustrationType",e);if(typeof e==="string"){this._updateInternalIllustrationSetAndType()}return this};f.prototype.setSrc=function(e){this.setProperty("src",e);if(typeof e==="string"){this._updateInternalIllustrationSetAndType()}return this};f.prototype._setDefaultIllustrationLabel=function(e){var t=this.getAssociation("ariaLabelledBy"),i=this._getTitle().sId;if(!t||!t.length){this.addIllustrationAriaLabelledBy(i)}};f.prototype._getDefaultDescription=function(){return this._findDefaultText(f.PREPENDS.DESCRIPTION)};f.prototype._getDefaultTitle=function(){return this._findDefaultText(f.PREPENDS.TITLE)};f.prototype._findDefaultText=function(e){var t=this._getResourceBundle();return t.getText(e+this._sIllustrationType,undefined,true)||t.getText(e+this._sIllustrationType.substr(0,this._sIllustrationType.indexOf("_v")),undefined,true)||t.getText(e+f.FALLBACK_TEXTS[this._sIllustrationType],undefined,true)};f.prototype._shouldRenderTitle=function(){return this._getTitle().getText().length!==0};f.prototype._shouldRenderDescription=function(){var e=this._getDescription();if(this.getEnableFormattedText()){return e.getHtmlText().length!==0}else{return e.getText().length!==0}};f.prototype._getDescription=function(){return this.getEnableFormattedText()?this._getFormattedText():this._getText()};f.prototype._getFormattedText=function(){var e=this.getDescription(),t=this.getAggregation("_formattedText");if(!t){t=new s({textAlign:I.Center});this.setAggregation("_formattedText",t)}if(!e&&this.getEnableDefaultTitleAndDescription()){t.setHtmlText(this._getDefaultDescription())}else{t.setHtmlText(e)}return t};f.prototype._getIllustration=function(){var e=this.getAggregation("_illustration");if(!e){e=new a;this.setAggregation("_illustration",e)}return e};f.prototype._getResourceBundle=function(){return n.getResourceBundleFor("sap.m")};f.prototype._getText=function(){var e=this.getDescription(),i=this.getAggregation("_text");if(!i){i=new t({textAlign:I.Center});this.setAggregation("_text",i)}if(!e&&this.getEnableDefaultTitleAndDescription()){i.setText(this._getDefaultDescription())}else{i.setText(e)}return i};f.prototype._getTitle=function(){var e=this.getTitle(),t=this.getAggregation("_title");if(!t){t=new i({wrapping:true});this.setAggregation("_title",t)}if(!e&&this.getEnableDefaultTitleAndDescription()){t.setText(this._getDefaultTitle())}else{t.setText(e)}return t};f.prototype._preventWidowWords=function(e){var t,i,s=window.HTMLElement;if(!(s&&e instanceof s)){return}t=jQuery(e);i=t.html();i=i.replace(/ ([^ ]*)$/,"&nbsp;$1");t.html(i)};f.prototype._updateDomSize=function(){var e=this.getDomRef(),t,i;if(e){t=this.getIllustrationSize();if(t===c.Auto){this._updateMedia(e.getBoundingClientRect().width,e.getBoundingClientRect().height)}else{i=f.MEDIA[t.toUpperCase()];this._updateSymbol(i);this._updateMediaStyle(i)}}};f.prototype._updateInternalIllustrationSetAndType=function(){var e=this.getSrc(),t,i;if(e){i=T.parse(e);if(i.protocol==="sap-illustration"){if(i.path!=="/"){this._sIllustrationSet=i.hostname;this._sIllustrationType=i.path.substring(1)}else{this._sIllustrationSet="sapIllus";this._sIllustrationType=i.hostname}}else{r.warning("Invalid pattern. Use sap-illustration://name syntax for the default illustration set. Use sap-illustration://setname/name syntax for custom set, you also have to register it in the IllustrationPool.")}}else{t=this.getIllustrationType().split("-");this._sIllustrationSet=t[0];this._sIllustrationType=t[1]}};f.prototype._onResize=function(e){var t=e.size.width,i=e.size.height,s=e.target&&e.target.parentNode;if(!this.getEnableVerticalResponsiveness()&&s&&s.scrollHeight>s.clientHeight){t+=d().width}this._updateMedia(t,i)};f.prototype._updateMedia=function(e,t){var i=this.getEnableVerticalResponsiveness(),s;if(!e&&!t){return}if(e<=f.BREAK_POINTS.BASE||t<=f.BREAK_POINTS_HEIGHT.BASE&&i){s=f.MEDIA.BASE}else if(e<=f.BREAK_POINTS.DOT||t<=f.BREAK_POINTS_HEIGHT.DOT&&i){s=f.MEDIA.DOT}else if(e<=f.BREAK_POINTS.SPOT||t<=f.BREAK_POINTS_HEIGHT.SPOT&&i){s=f.MEDIA.SPOT}else if(e<=f.BREAK_POINTS.DIALOG||t<=f.BREAK_POINTS_HEIGHT.DIALOG&&i){s=f.MEDIA.DIALOG}else{s=f.MEDIA.SCENE}this._updateSymbol(s);this._updateMediaStyle(s)};f.prototype._updateMediaStyle=function(e){if(this._sLastKnownMedia!==e){this._sLastKnownMedia=e}else{return}Object.keys(f.MEDIA).forEach(function(t){var i=e===f.MEDIA[t];this.toggleStyleClass(f.MEDIA[t],i)},this)};f.prototype._updateSymbol=function(e){if(e===f.MEDIA.BASE){return}var t=e.substring(e.indexOf("-")+1);this._getIllustration().setSet(this._sIllustrationSet,true).setMedia(t,true).setType(this._sIllustrationType)};f.prototype._getFallbackMedia=function(){var e=this._sLastKnownMedia,t=Object.values(f.MEDIA),i=t.indexOf(e);if(i>-1&&i<t.length-1){return t[i+1]}else{return t[t.length-1]}};f.prototype._handleMissingAsset=function(){var e,t=Object.values(f.MEDIA),i="";if(this._sLastKnownMedia!==t[t.length-1]){e=this._getIllustration();i=this._getFallbackMedia();e.setMedia(i.substring(i.indexOf("-")+1));r.warning(this._sLastKnownMedia+" is unavailable, retrying with larger size...",this)}else{r.warning("No larger fallback asset available, no SVG will be displayed.",this)}};f.prototype._attachResizeHandlers=function(){var e=this.getIllustrationSize();if(this.getDomRef()&&e===c.Auto){this._registerResizeHandler(f.RESIZE_HANDLER_ID.CONTENT,this,this._onResize.bind(this))}};f.prototype._detachResizeHandlers=function(){this._deRegisterResizeHandler(f.RESIZE_HANDLER_ID.CONTENT)};f.prototype._registerResizeHandler=function(e,t,i){if(!this[e]){this[e]=p.register(t,i)}};f.prototype._deRegisterResizeHandler=function(e){if(this[e]){p.deregister(this[e]);this[e]=null}};f.prototype.getAccessibilityReferences=function(){return{title:this._getTitle().getId(),description:this._getDescription().getId()}};f.prototype.getAccessibilityInfo=function(){var e=this._getTitle().getText(),t=this._getDescription().getText(),i=this.getAdditionalContent();return{type:this._getResourceBundle().getText("ACC_CTR_ILLUSTRATED_MESSAGE"),description:e+". "+t,focusable:!!i.length,children:i}};f.prototype.addIllustrationAriaLabelledBy=function(e){var t=this.getAssociation("ariaLabelledBy"),i=this._getTitle().sId,s=this._getIllustration();this.addAssociation("ariaLabelledBy",e,true);if(t&&t.includes(i)){this.removeIllustrationAriaLabelledBy(i)}s.addAriaLabelledBy(e);return this};f.prototype.removeIllustrationAriaLabelledBy=function(e){this.removeAssociation("ariaLabelledBy",e,true);var t=this._getIllustration();t.removeAriaLabelledBy(e);this._setDefaultIllustrationLabel();return this};f.prototype.removeAllAriaLabelledBy=function(e){this.removeAssociation("ariaLabelledBy",e,true);var t=this._getIllustration();t.removeAllAriaLabelledBy(e);this._setDefaultIllustrationLabel();return this};f.prototype.addIllustrationAriaDescribedBy=function(e){this.addAssociation("ariaDescribedBy",e,true);var t=this._getIllustration();t.addAriaDescribedBy(e);return this};f.prototype.removeIllustrationAriaDescribedBy=function(e){this.removeAssociation("ariaDescribedBy",e,true);var t=this._getIllustration();t.removeAriaDescribedBy(e);return this};f.prototype.removeAllAriaDescribedBy=function(e){this.removeAssociation("ariaDescribedBy",e,true);var t=this._getIllustration();t.removeAllAriaDescribedBy(e);return this};f.prototype.setAriaTitleLevel=function(e){this.setProperty("ariaTitleLevel",e,true);this._getTitle().setLevel(e);return this};return f});
//# sourceMappingURL=IllustratedMessage.js.map