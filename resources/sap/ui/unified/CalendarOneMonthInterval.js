/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CustomMonthPicker","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/Calendar","./library","sap/ui/unified/CalendarDateInterval","sap/ui/unified/calendar/OneMonthDatesRow","sap/ui/unified/DateRange","./CalendarOneMonthIntervalRenderer"],function(t,e,a,n,i,o,r,s,h){"use strict";var g=o.extend("sap.ui.unified.CalendarOneMonthInterval",{renderer:h});g.prototype.init=function(){o.prototype.init.apply(this,arguments);this._bShowOneMonth=true};g.prototype._getCalendar=function(){var n;if(!this._oCalendar){n=new t(this.getId()+"--Cal");n.attachEvent("select",function(){var t=this._getCalendar(),n=t._getFocusedDate(),i=e._getFirstDateOfMonth(new a(n,this.getPrimaryCalendarType()));var o=this.getAggregation("month")[0];this._setStartDate(i);if(o.getMode()<2){i=this._getStartDate()}this._adjustSelectedDate(i);this._oFocusDateOneMonth=i;this._closeCalendarPicker(true);this._focusDate(n,false,true)},this);n.attachEvent("cancel",function(t){var e=this._getCalendar(),a=e._getFocusedDate();this._closeCalendarPicker(true);this._oFocusDateOneMonth=a;this._focusDate(a,true);var n=this.getAggregation("header").getDomRef("B1");if(n){n.focus()}},this);this._oCalendar=n}return this._oCalendar};g.prototype._createMonth=function(t){return new r(t)};g.prototype._handleFocus=function(t){var n=!!t.getParameter("_outsideBorder"),i=t.getParameter("date"),r=a.fromLocalJSDate(i,this.getPrimaryCalendarType()),s=a.fromLocalJSDate(this.getStartDate()),h=!e._isSameMonthAndYear(r,s),g,l,u;if(n||h){if(e._isLastDateInMonth(r)){this._oFocusDateOneMonth=r}else{this._oFocusDateOneMonth=e._getFirstDateOfMonth(r)}g=r.isBefore(s)?-1:1;l=new a(this._getFocusedDate(),this.getPrimaryCalendarType());u=new a(this._getStartDate(),this.getPrimaryCalendarType());o.prototype._shiftStartFocusDates.call(this,l,u,g)}return o.prototype._handleFocus.apply(this,arguments)};g.prototype._focusDateExtend=function(t,e,a){var n,i;if(!this._oFocusDateOneMonth){return o.prototype._focusDateExtend.apply(this,arguments)}n=this.getAggregation("month")[0];i=this._oFocusDateOneMonth.toLocalJSDate();this._setFocusedDate(this._oFocusDateOneMonth);n._bNoRangeCheck=true;n.setDate(i);n._bNoRangeCheck=false;this._oFocusDateOneMonth=null;return!a};g.prototype._setDisplayMode=function(t){this.getAggregation("month")[0].setMode(t)};g.prototype._shiftStartFocusDates=function(t,e,n){var i=n,o=this.getAggregation("month")[0],r,s;if(i!==0){i=i>0?1:-1}t.setMonth(t.getMonth()+i);e.setYear(t.getYear());e.setMonth(t.getMonth(),t.getDate());this._setFocusedDate(e);this._setStartDate(t,true);r=this.getStartDate();s=a.fromLocalJSDate(r,this.getPrimaryCalendarType());if(this.getMinDate()&&this.getMinDate().getTime()>r.getTime()){s=a.fromLocalJSDate(this.getMinDate(),this.getPrimaryCalendarType())}if(this.getMaxDate()&&this.getMaxDate().getTime()<r.getTime()){s=a.fromLocalJSDate(this.getMaxDate(),this.getPrimaryCalendarType())}o.selectDate(s.toLocalJSDate());if(o.getMode()<2){this.fireSelect()}};g.prototype._adjustSelectedDate=function(t){var e=this.getAggregation("month")[0];if(e.getMode&&e.getMode()<2){this._selectDate(t)}};g.prototype._selectDate=function(t){var e=this.getAggregation("month")[0],a=t.toLocalJSDate();this.removeAllSelectedDates();this.addSelectedDate(new s({startDate:a}));e.selectDate(a);this._bDateRangeChanged=undefined};g.prototype._dateMatchesVisibleRange=function(t){return e._isSameMonthAndYear(a.fromLocalJSDate(this.getStartDate()),a.fromLocalJSDate(t))};g.prototype._togglePrevNext=function(t,n){var i=this.getAggregation("header");var o=this._oMaxDate.getYear();var r=this._oMinDate.getYear();var s=this._oMaxDate.getMonth();var h=this._oMinDate.getMonth();var g=e._getFirstDateOfMonth(new a(t,this.getPrimaryCalendarType()));var l=new a(g),u,d;l.setMonth(l.getMonth()+1);u=g.getYear();d=g.getMonth();if(u<r||u==r&&(!n||d<=h)){i.setEnabledPrevious(false)}else{i.setEnabledPrevious(true)}u=l.getYear();d=l.getMonth();if(u>o||u==o&&(!n||d>s)){i.setEnabledNext(false)}else{i.setEnabledNext(true)}};g.prototype._setMinMaxDateExtend=function(t){return n.prototype._setMinMaxDateExtend.apply(this,arguments)};return g});
//# sourceMappingURL=CalendarOneMonthInterval.js.map