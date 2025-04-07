/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Core"],function(t,e){"use strict";var o=t.aria.HasPopup;var i=function(t){if(t){this._oControl=t;this._oControl.addDelegate(this._controlDelegate,false,this)}this.oRb=e.getLibraryResourceBundle("sap.f")};i.AriaHasPopup={MENU:o.Menu,PRODUCTS:o.Menu,PROFILE:o.Menu,NOTIFICATIONS:o.Dialog};i.prototype._controlDelegate={onBeforeRendering:function(){this.attachDelegates()}};i.prototype.attachDelegates=function(){var t=this._oControl.getProfile();this._oDelegateSecondTitle={onAfterRendering:this.onAfterRenderingSecondTitle};this._oDelegateSearch={onAfterRendering:this.onAfterRenderingSearch};this._oDelegateAvatar={onAfterRendering:this.onAfterRenderingAvatar};this._oDelegateProducts={onAfterRendering:this.onAfterRenderingProducts};this._oDelegateNavButton={onAfterRendering:this.onAfterRenderingNavButton};this._oDelegateMenuButton={onAfterRendering:this.onAfterRenderingMenuButton};if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.addDelegate(this._oDelegateSecondTitle,false,this)}if(this._oControl._oSearch){this._oControl._oSearch.addDelegate(this._oDelegateSearch,false,this)}if(t){t.addDelegate(this._oDelegateAvatar,false,this)}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.addDelegate(this._oDelegateProducts,false,this)}if(this._oControl._oNavButton){this._oControl._oNavButton.addDelegate(this._oDelegateNavButton,false,this)}if(this._oControl._oMenuButton){this._oControl._oMenuButton.addDelegate(this._oDelegateMenuButton,false,this)}};i.prototype.getRootAttributes=function(){return{role:"banner",label:this.oRb.getText("SHELLBAR_CONTAINER_LABEL")}};i.prototype.getCoPilotAttributes=function(){return{role:"button",label:this.oRb.getText("SHELLBAR_COPILOT_TOOLTIP")}};i.prototype.getEntityTooltip=function(t){return this.oRb.getText("SHELLBAR_"+t+"_TOOLTIP")||""};i.prototype.updateNotificationsNumber=function(t){var e=this.getEntityTooltip("NOTIFICATIONS"),o=t?t+" "+e:e;this._oControl._oNotifications.setTooltip(o)};i.prototype.onAfterRenderingSecondTitle=function(){var t=this._oControl._oSecondTitle.$();t.attr("role","heading");t.attr("aria-level","2")};i.prototype.onAfterRenderingSearch=function(){this._oControl._oSearch.$().attr("aria-label",this.getEntityTooltip("SEARCH"))};i.prototype.onAfterRenderingAvatar=function(){var t=this._oControl.getProfile().$();t.attr("aria-label",this.getEntityTooltip("PROFILE"));t.attr("aria-haspopup","menu")};i.prototype.onAfterRenderingProducts=function(){var t=this._oControl._oProductSwitcher.$();t.attr("aria-label",this.getEntityTooltip("PRODUCTS"))};i.prototype.onAfterRenderingNavButton=function(){this._oControl._oNavButton.$().attr("aria-label",this.getEntityTooltip("BACK"))};i.prototype.onAfterRenderingMenuButton=function(){var t=this._oControl._oMenuButton.$();t.attr("aria-label",this.getEntityTooltip("MENU"))};i.prototype.exit=function(){var t=this._oControl.getProfile();if(this._oControl){this._oControl.removeDelegate(this._controlDelegate)}if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.removeDelegate(this._oDelegateSecondTitle)}if(this._oControl._oSearch){this._oControl._oSearch.removeDelegate(this._oDelegateSearch)}if(t){t.removeDelegate(this._oDelegateAvatar)}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.removeDelegate(this._oDelegateProducts)}if(this._oControl._oNavButton){this._oControl._oNavButton.removeDelegate(this._oDelegateNavButton)}if(this._oControl._oMenuButton){this._oControl._oMenuButton.removeDelegate(this._oDelegateMenuButton)}};return i});
//# sourceMappingURL=Accessibility.js.map