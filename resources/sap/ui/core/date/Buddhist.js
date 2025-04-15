/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","./_Calendars","sap/base/i18n/date/CalendarType"],function(t,e,r){"use strict";var a=t.extend("sap.ui.core.date.Buddhist",{constructor:function(){var t=arguments;if(t.length>1){t=u(t)}this.oDate=this.createDate(Date,t);this.sCalendarType=r.Buddhist}});a.UTC=function(){var t=u(arguments);return Date.UTC.apply(Date,t)};a.now=function(){return Date.now()};function n(e){var a=t.getEraStartDate(r.Buddhist,0).year,n=e.year-a+1;if(e.year<1941&&e.month<3){n-=1}if(e.year===null){n=undefined}return{year:n,month:e.month,day:e.day}}function i(e){var a=t.getEraStartDate(r.Buddhist,0).year,n=e.year+a-1;if(n<1941&&e.month<3){n+=1}if(e.year===null){n=undefined}return{year:n,month:e.month,day:e.day}}function u(t){var e,r;e={year:t[0],month:t[1],day:t[2]!==undefined?t[2]:1};r=i(e);t[0]=r.year;return t}a.prototype._getBuddhist=function(){var t={year:this.oDate.getFullYear(),month:this.oDate.getMonth(),day:this.oDate.getDate()};return n(t)};a.prototype._setBuddhist=function(t){var e=i(t);return this.oDate.setFullYear(e.year,e.month,e.day)};a.prototype._getUTCBuddhist=function(){var t={year:this.oDate.getUTCFullYear(),month:this.oDate.getUTCMonth(),day:this.oDate.getUTCDate()};return n(t)};a.prototype._setUTCBuddhist=function(t){var e=i(t);return this.oDate.setUTCFullYear(e.year,e.month,e.day)};a.prototype.getYear=function(){return this._getBuddhist().year};a.prototype.getFullYear=function(){return this._getBuddhist().year};a.prototype.getUTCFullYear=function(){return this._getUTCBuddhist().year};a.prototype.setYear=function(t){var e=this._getBuddhist();e.year=t;return this._setBuddhist(e)};a.prototype.setFullYear=function(t,e,r){var a=this._getBuddhist();a.year=t;if(e!==undefined){a.month=e}if(r!==undefined){a.day=r}return this._setBuddhist(a)};a.prototype.setUTCFullYear=function(t,e,r){var a=this._getUTCBuddhist();a.year=t;if(e!==undefined){a.month=e}if(r!==undefined){a.day=r}return this._setUTCBuddhist(a)};e.set(r.Buddhist,a);return a});
//# sourceMappingURL=Buddhist.js.map