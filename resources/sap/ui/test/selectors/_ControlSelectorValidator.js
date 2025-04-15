/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepExtend","sap/ui/base/ManagedObject","sap/ui/test/_OpaLogger","sap/ui/test/_ControlFinder"],function(t,e,o,i){"use strict";var r=e.extend("sap.ui.test.selectors._ControlSelectorValidator",{constructor:function(t,e){this.oValidationRoot=t;this.bMultiple=e;this._oLogger=o.getLogger("sap.ui.test.selectors._ControlSelectorValidator")},_validate:function(e){if(e){var o=i._findControls(t({},e));if(this.oValidationRoot&&o.length>1){o=o.filter(function(t){return this._hasAncestor(t,this.oValidationRoot)}.bind(this))}if(o.length){if(o.length===1){this._oLogger.debug("Selector matched a single control: "+JSON.stringify(e));return true}else if(this.bMultiple){this._oLogger.debug("Selector matched multiple controls: "+JSON.stringify(e));return true}else{this._oLogger.debug("Selector matched multiple controls: "+JSON.stringify(e));return false}}else{this._oLogger.debug("Selector did not match any controls: "+JSON.stringify(e));return false}}},_hasAncestor:function(t,e){var o=t.getParent();return!!o&&(o===e||this._hasAncestor(o,e))}});return r});
//# sourceMappingURL=_ControlSelectorValidator.js.map