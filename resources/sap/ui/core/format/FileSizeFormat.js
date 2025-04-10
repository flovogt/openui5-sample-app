/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/format/NumberFormat","sap/ui/core/Configuration"],function(t,e,a,i,r){"use strict";var n=[{binaryFactor:1,decimalFactor:1,decimalUnit:"Byte",binaryUnit:"Byte"},{binaryFactor:1,decimalFactor:1,decimalUnit:"Bytes",binaryUnit:"Bytes"},{binaryFactor:Math.pow(2,10),decimalFactor:1e3,decimalUnit:"Kilobyte",binaryUnit:"Kibibyte"},{binaryFactor:Math.pow(2,20),decimalFactor:1e6,decimalUnit:"Megabyte",binaryUnit:"Mebibyte"},{binaryFactor:Math.pow(2,30),decimalFactor:1e9,decimalUnit:"Gigabyte",binaryUnit:"Gibibyte"},{binaryFactor:Math.pow(2,40),decimalFactor:1e12,decimalUnit:"Terabyte",binaryUnit:"Tebibyte"},{binaryFactor:Math.pow(2,50),decimalFactor:1e15,decimalUnit:"Petabyte",binaryUnit:"Pebibyte"},{binaryFactor:Math.pow(2,60),decimalFactor:1e18,decimalUnit:"Exabyte",binaryUnit:"Exbibyte"},{binaryFactor:Math.pow(2,70),decimalFactor:1e21,decimalUnit:"Zettabyte",binaryUnit:"Zebibyte"},{binaryFactor:Math.pow(2,80),decimalFactor:1e24,decimalUnit:"Yottabyte",binaryUnit:"Yobibyte"}];var o=t.extend("sap.ui.core.format.FileSizeFormat",{constructor:function(t){throw new Error}});o.getInstance=function(t,e){return this.createInstance(t,e)};o.createInstance=function(t,n){var o=Object.create(this.prototype);if(t instanceof e){n=t;t=undefined}if(!n){n=r.getFormatSettings().getFormatLocale()}o.oLocale=n;o.oLocaleData=a.getInstance(n);o.oNumberFormat=i.getFloatInstance(t,n);o.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core",n.toString());o.bBinary=t?!!t.binaryFilesize:false;return o};o.prototype.format=function(t){var e=null,a;if(typeof t=="string"){try{if(/^\s*[\+-]?0[xX]/.test(t)){e=parseInt(t,16)}else{e=parseFloat(t,10)}}catch(t){}}else if(typeof t=="number"){e=t}if(e===null){return"NaN"}a=e;var i=c(e,this.bBinary),r=this.oNumberFormat.format(e/i.factor);if(!i.noSecondRounding){e=this.oNumberFormat.parse(r);if(this.bBinary&&Math.abs(e)>=1024||!this.bBinary&&Math.abs(e)>=1e3){i=c(e*i.factor,this.bBinary);r=this.oNumberFormat.format(a/i.factor)}}return this.oBundle.getText("FileSize."+i.unit,[r])};o.prototype.parse=function(t){var e,a,i,r;if(!t){return NaN}for(var o=0;o<n.length;o++){e=n[o];a=s(this.oBundle,e.decimalUnit,t);if(a){r=false;break}else{a=s(this.oBundle,e.binaryUnit,t);if(a){r=true;break}}}if(!a){a=t;r=false;e=n[0]}i=this.oNumberFormat.parse(a);return i*(r?e.binaryFactor:e.decimalFactor)};function c(t,e){var a=Math.abs(t),i,r;for(var o=n.length-1;o>=2;o--){i=n[o];r=e?i.binaryFactor:i.decimalFactor;if(a>=r){return{factor:r,unit:e?i.binaryUnit:i.decimalUnit,noSecondRounding:o==n.length-1}}}return{factor:1,unit:n[a>=2?1:0].decimalUnit}}function s(t,e,a){var i=t.getText("FileSize."+e),r;if(i.startsWith("{0}")){r=i.substr(3,i.length);if(typeof r=="string"&&r!=""?a.toLowerCase().endsWith(r.toLowerCase()):false){return a.substr(0,a.length-r.length)}}else if(i.endsWith("{0}")){r=i.substr(0,i.length-3);if(typeof r=="string"&&r!=""?a.toLowerCase().startsWith(r.toLowerCase()):false){return a.substr(r.length,a.length)}}else{r=i.split("{0}");if(r.length==2&&(typeof r[0]=="string"&&r[0]!=""?a.toLowerCase().startsWith(r[0].toLowerCase()):false)&&(typeof r[1]=="string"&&r[1]!=""?a.toLowerCase().endsWith(r[1].toLowerCase()):false)){return a.substr(r[0].length,a.length-r[1].length)}}return null}return o});
//# sourceMappingURL=FileSizeFormat.js.map