/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType","sap/ui/core/Core"],function(e,t,n,o,a){"use strict";function r(){return i("EnterYesOrNo",[u(true),u(false)])}function i(e,t){return sap.ui.getCore().getLibraryResourceBundle().getText(e,t)}function u(e){return i(e?"YES":"NO")}function l(t,n){var o;t.oConstraints=undefined;if(n){o=n.nullable;if(o===false||o==="false"){t.oConstraints={nullable:false}}else if(o!==undefined&&o!==true&&o!=="true"){e.warning("Illegal nullable: "+o,null,t.getName())}}}var s=a.extend("sap.ui.model.odata.type.Boolean",{constructor:function(e,t){a.apply(this,arguments);l(this,t)}});s.prototype.formatValue=function(e,n){if(e===null||e===undefined){return null}switch(this.getPrimitiveType(n)){case"any":case"boolean":return e;case"string":return u(e);default:throw new t("Don't know how to format "+this.getName()+" to "+n)}};s.prototype.parseValue=function(e,t){var o;if(e===null||e===""){return null}switch(this.getPrimitiveType(t)){case"boolean":return e;case"string":o=e.trim().toLowerCase();if(o===u(true).toLowerCase()){return true}if(o===u(false).toLowerCase()){return false}throw new n(r());default:throw new n("Don't know how to parse "+this.getName()+" from "+t)}};s.prototype.validateValue=function(e){if(e===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new o(r())}return}if(typeof e!=="boolean"){throw new o("Illegal "+this.getName()+" value: "+e)}};s.prototype.getName=function(){return"sap.ui.model.odata.type.Boolean"};return s});
//# sourceMappingURL=Boolean.js.map