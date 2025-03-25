/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnnotationHelper","./ValueListType","./lib/_Helper","sap/base/assert","sap/base/Log","sap/base/util/JSTokenizer","sap/base/util/ObjectPath","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding","sap/ui/model/Context","sap/ui/model/ContextBinding","sap/ui/model/MetaModel","sap/ui/model/PropertyBinding","sap/ui/model/odata/OperationMode","sap/ui/model/odata/type/Boolean","sap/ui/model/odata/type/Byte","sap/ui/model/odata/type/Date","sap/ui/model/odata/type/DateTimeOffset","sap/ui/model/odata/type/Decimal","sap/ui/model/odata/type/Double","sap/ui/model/odata/type/Guid","sap/ui/model/odata/type/Int16","sap/ui/model/odata/type/Int32","sap/ui/model/odata/type/Int64","sap/ui/model/odata/type/Raw","sap/ui/model/odata/type/SByte","sap/ui/model/odata/type/Single","sap/ui/model/odata/type/Stream","sap/ui/model/odata/type/String","sap/ui/model/odata/type/TimeOfDay","sap/ui/thirdparty/URI"],function(e,t,n,i,r,o,a,s,u,l,f,c,d,p,h,g,y,m,$,v,M,O,C,b,P,E,w,A,U,x,S,T,j,L){"use strict";var R=s.extend("sap.ui.model.odata.v4._any",{metadata:{properties:{any:"any"}}}),D,I={},V=r.Level.DEBUG,q=["$count","@$ui5.node.groupLevelCount","@$ui5.node.level"],B,_=/\$\(/g,k=/^-?\d+$/,N="sap.ui.model.odata.v4.ODataMetaModel",F=/\(.*\)$/,W=new A,G=/\$\)/g,K={messageChange:true},H={"Edm.Boolean":{Type:m},"Edm.Byte":{Type:$},"Edm.Date":{Type:v},"Edm.DateTimeOffset":{constraints:{$Precision:"precision"},Type:M},"Edm.Decimal":{constraints:{"@Org.OData.Validation.V1.Minimum/$Decimal":"minimum","@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive":"minimumExclusive","@Org.OData.Validation.V1.Maximum/$Decimal":"maximum","@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive":"maximumExclusive",$Precision:"precision",$Scale:"scale"},Type:O},"Edm.Double":{Type:C},"Edm.Guid":{Type:b},"Edm.Int16":{Type:P},"Edm.Int32":{Type:E},"Edm.Int64":{Type:w},"Edm.SByte":{Type:U},"Edm.Single":{Type:x},"Edm.Stream":{Type:S},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence",$MaxLength:"maxLength"},Type:T},"Edm.TimeOfDay":{constraints:{$Precision:"precision"},Type:j}},z={},Q="@com.sap.vocabularies.Common.v1.ValueList",J="@com.sap.vocabularies.Common.v1.ValueListMapping",X="@com.sap.vocabularies.Common.v1.ValueListReferences",Y="@com.sap.vocabularies.Common.v1.ValueListRelevantQualifiers",Z="@com.sap.vocabularies.Common.v1.ValueListWithFixedValues",ee=r.Level.WARNING,te,ne=h.extend("sap.ui.model.odata.v4.ODataMetaModel",{constructor:le}),ie,re;function oe(e,t){if(e===t){return""}if(e.startsWith(t)&&e[t.length]==="#"&&!e.includes("@",t.length)){return e.slice(t.length+1)}}function ae(e){var t=oe(e,J);return t!==undefined?t:oe(e,Q)}function se(e,t){return t.some(function(t){return e==="$ReturnType"?t.$ReturnType:t.$Parameter&&t.$Parameter.some(function(t){return t.$Name===e})})}function ue(e){return e.slice(0,e.lastIndexOf(".")+1)}te=p.extend("sap.ui.model.odata.v4.ODataMetaContextBinding",{constructor:function(e,t,n){i(!n||n.getModel()===e,"oContext must belong to this model");p.call(this,e,t,n)},initialize:function(){var e=this.oModel.createBindingContext(this.sPath,this.oContext);this.bInitial=false;if(e!==this.oElementContext){this.oElementContext=e;this._fireChange()}},setContext:function(e){i(!e||e.getModel()===this.oModel,"oContext must belong to this model");if(e!==this.oContext){this.oContext=e;if(!this.bInitial){this.initialize()}}}});ie=c.extend("sap.ui.model.odata.v4.ODataMetaListBinding",{constructor:function(){c.apply(this,arguments)},_fireFilter:function(){},_fireSort:function(){},checkUpdate:function(e){var t=this.oList.length;this.update();if(e||this.oList.length!==t){this._fireChange({reason:f.Change})}},fetchContexts:function(){var e,t=this.getResolvedPath(),n=this;if(!t){return u.resolve([])}e=t.endsWith("@");if(!e&&!t.endsWith("/")){t+="/"}return this.oModel.fetchObject(t).then(function(i){if(!i){return[]}if(e){t=t.slice(0,-1)}return Object.keys(i).filter(function(t){return t[0]!=="$"&&e!==(t[0]!=="@")}).map(function(e){return new d(n.oModel,t+e)})})},getContexts:function(e,t){this.iCurrentStart=e||0;this.iCurrentLength=Math.min(t||Infinity,this.iLength-this.iCurrentStart);return this.getCurrentContexts()},getCurrentContexts:function(){var e=[],t,n=this.iCurrentStart+this.iCurrentLength;for(t=this.iCurrentStart;t<n;t+=1){e.push(this.oList[this.aIndices[t]])}if(this.oList.dataRequested){e.dataRequested=true}return e},setContexts:function(e){this.oList=e;this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()},update:function(){var e=[],t=this.fetchContexts(),n=this;if(t.isFulfilled()){e=t.getResult()}else{t.then(function(e){n.setContexts(e);n._fireChange({reason:f.Change})});e.dataRequested=true}this.setContexts(e)}});re=g.extend("sap.ui.model.odata.v4.ODataMetaPropertyBinding",{constructor:function(){g.apply(this,arguments);this.vValue=undefined},checkUpdate:function(e,t){var n,i=this;function r(n){if(e||n!==i.vValue){i.vValue=n;i._fireChange({reason:t||f.Change})}return n}n=this.oModel.fetchObject(this.sPath,this.oContext,this.mParameters).then(r);if(this.mParameters&&this.mParameters.$$valueAsPromise&&n.isPending()){r(n.unwrap())}else if(n.isRejected()){n.unwrap()}},getValue:function(){return this.vValue},setContext:function(e){if(this.oContext!==e){this.oContext=e;if(this.bRelative){this.checkUpdate(false,f.Context)}}},setValue:function(){throw new Error("Unsupported operation: ODataMetaPropertyBinding#setValue")}});function le(e,t,n,i,r,o){h.call(this);this.aAnnotationUris=n&&!Array.isArray(n)?[n]:n;this.sDefaultBindingMode=l.OneTime;this.mETags={};this.sLanguage=o;this.oLastModified=new Date(0);this.oMetadataPromise=null;this.oMetaModelForAnnotations=null;this.oModel=i;this.mMetadataUrl2Promise={};this.oRequestor=e;this.mSchema2MetadataUrl={};this.mSharedModelByUrl={};this.mSupportedBindingModes={OneTime:true,OneWay:true};this.bSupportReferences=r!==false;this.mUnsupportedFilterOperators={All:true,Any:true};this.sUrl=t}ne.prototype.$$valueAsPromise=true;ne.prototype._addUrlForSchema=function(e,t,n){var i,r=this.mSchema2MetadataUrl[e];if(!r){r=this.mSchema2MetadataUrl[e]={};r[t]=false}else if(!(t in r)){i=Object.keys(r)[0];if(r[i]){this._reportAndThrowError("A schema cannot span more than one document: "+e+" - expected reference URI "+i+" but instead saw "+t,n)}r[t]=false}};ne.prototype._changeAnnotations=function(e){if(this.oMetaModelForAnnotations){Object.keys(e).forEach(t=>{if(e[t].$kind==="Schema"){this._doMergeAnnotations({$Annotations:this.oMetaModelForAnnotations._getAnnotationsForSchema(t)},e.$Annotations,true)}})}this.aAnnotationChanges?.forEach(({path:t,value:n})=>{const i=t.indexOf("@");const r=this.getObject(t.slice(0,i)+"@$ui5.target");if(r){e.$Annotations[r]??={};e.$Annotations[r][t.slice(i)]=n}})};ne.prototype._copyAnnotations=function(e){if(this.aAnnotationUris){throw new Error("Must not copy annotations when there are local annotation files")}this.oMetaModelForAnnotations=e};ne.prototype._doMergeAnnotations=function(e,t,n){let i=false;function r(e,t){for(const r in t){if(n||!(r in e)){e[r]=t[r];i=true}}}for(const n in e.$Annotations){t[n]??={};r(t[n],e.$Annotations[n])}delete e.$Annotations;return i};ne.prototype._getAnnotationsForSchema=function(e){const t={};const n=this.fetchEntityContainer().getResult();Object.keys(n.$Annotations).forEach(i=>{if(i.startsWith(e)){t[i]=n.$Annotations[i]}});return t};ne.prototype._getOrFetchSchema=function(e,t,n){var i,r,o,a,s=this;function l(i){if(!(t in i)){n(ee,r," does not contain ",t);return}n(V,"Including ",t," from ",r);let o=false;for(const n in i){if(n[0]!=="$"&&ue(n)===t){e[n]=i[n];if(s._doMergeAnnotations(e[n],e.$Annotations)){o=true}}}if(o){s._changeAnnotations(e)}}if(t in e){return e[t]}a=this.mSchema2MetadataUrl[t];if(a){o=Object.keys(a);if(o.length>1){this._reportAndThrowError("A schema cannot span more than one document: "+"schema is referenced by following URLs: "+o.join(", "),t)}r=o[0];a[r]=true;n(V,"Namespace ",t," found in $Include of ",r);i=this.mMetadataUrl2Promise[r];if(!i){n(V,"Reading ",r);i=this.mMetadataUrl2Promise[r]=u.resolve(this.oRequestor.read(r)).then(this.validate.bind(this,r))}i=i.then(l);if(t in e){return e[t]}e[t]=i;return i}};ne.prototype._mergeAnnotations=function(e,t){var n=this;this.validate(this.sUrl,e);e.$Annotations={};Object.keys(e).forEach(function(t){if(e[t].$kind==="Schema"){n._addUrlForSchema(t,n.sUrl);n._doMergeAnnotations(e[t],e.$Annotations)}});t.forEach(function(t,i){var r,o;n.validate(n.aAnnotationUris[i],t);for(o in t){if(o[0]!=="$"){if(o in e){n._reportAndThrowError("A schema cannot span more than one document: "+o,n.aAnnotationUris[i])}r=t[o];e[o]=r;if(r.$kind==="Schema"){n._addUrlForSchema(o,n.aAnnotationUris[i]);n._doMergeAnnotations(r,e.$Annotations,true)}}}})};ne.prototype._reportAndThrowError=function(e,t){var n=new Error(t+": "+e);this.oModel.reportError(e,N,n);throw n};ne.prototype.attachEvent=function(e,t,n,i){if(!(e in K)){throw new Error("Unsupported event '"+e+"': v4.ODataMetaModel#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};ne.prototype.bindContext=function(e,t){return new te(this,e,t)};ne.prototype.bindList=function(e,t,n,i){return new ie(this,e,t,n,i)};ne.prototype.bindProperty=function(e,t,n){return new re(this,e,t,n)};ne.prototype.bindTree=function(e,t,n,i,r){throw new Error("Unsupported operation: v4.ODataMetaModel#bindTree")};ne.prototype.destroy=function(){this.oMetaModelForAnnotations=undefined;Object.values(this.mSharedModelByUrl).forEach(e=>e.destroy());this.mSharedModelByUrl=undefined;h.prototype.destroy.apply(this)};ne.prototype.fetchCanonicalPath=function(e){return this.fetchUpdateData("",e).then(function(t){if(!t.editUrl){throw new Error(e.getPath()+": No canonical path for transient entity")}if(t.propertyPath){throw new Error("Context "+e.getPath()+" does not point to an entity. It should be "+t.entityPath)}return"/"+t.editUrl})};ne.prototype.fetchData=function(){return this.fetchEntityContainer().then(function(e){return JSON.parse(JSON.stringify(e))})};ne.prototype.fetchEntityContainer=function(e){var t,n=this;if(!this.oMetadataPromise){t=[u.resolve(this.oRequestor.read(this.sUrl,false,e))];if(this.aAnnotationUris){this.aAnnotationUris.forEach(function(i){t.push(u.resolve(n.oRequestor.read(i,true,e)))})}if(!e){t.push(this.oModel._requestAnnotationChanges());this.oMetadataPromise=u.all(t).then(function(e){var t=e[0];n.aAnnotationChanges=e.pop();n._mergeAnnotations(t,e.slice(1));return t});this.oMetadataPromise.then(e=>this._changeAnnotations(e),()=>{})}}return this.oMetadataPromise};ne.prototype.fetchObject=function(e,t,n){var i=this.resolve(e,t),s=this;if(!i){r.error("Invalid relative path w/o context",e,N);return u.resolve(null)}return this.fetchEntityContainer().then(function(l){var f,c,p,h,g,y,m,$,v,M;function O(e,t,n=""){var i,r,o,a,s="";if(t){r=t.indexOf("@@");if(r>0){t=t.slice(0,r)}}else{t=e}if(f){m=a=M.filter(P);if(a.length!==1){return E(ee,"Expected a single overload, but found "+a.length)}if(f!==z){s=a[0].$Parameter[0].$isCollection?"Collection("+f+")":f}o=v+"("+s+")"+n;if(l.$Annotations[o]){if(t==="@"){M=l.$Annotations[o];i=l.$Annotations[v+n];if(i){M=Object.assign({},i,M)}return false}if(t in l.$Annotations[o]){v=o;M=l;return true}}}v+=n;M=l;return true}function C(e,t){var i,r,u,l=e.indexOf("@",2);if(l>-1){return E(ee,"Unsupported path after ",e.slice(0,l))}e=e.slice(2);u=e.indexOf("(");if(u>0){if(!e.endsWith(")")){return E(ee,"Expected ')' instead of '",e.slice(-1),"'")}try{r=o.parseJS("["+e.slice(u+1,-1).replace(_,"{").replace(G,"}")+"]")}catch(e){return E(ee,e.message,": ",e.text.slice(1,e.at),"<--",e.text.slice(e.at,-1))}e=e.slice(0,u)}i=e[0]==="."?a.get(e.slice(1),n.scope):n&&a.get(e,n.scope)||(e==="requestCurrencyCodes"||e==="requestUnitsOfMeasure"?s[e].bind(s):a.get(e));if(typeof i!=="function"){return E(ee,e," is not a function but: "+i)}try{M=i(M,{$$valueAsPromise:n&&n.$$valueAsPromise,arguments:r,context:new d(s,t),schemaChildName:$,overload:m.length===1?m[0]:undefined})}catch(t){E(ee,"Error calling ",e,": ",t)}return true}function b(e,t){var n;if(e==="$ReturnType"){if(t.$ReturnType){M=t.$ReturnType;return true}}else if(e&&t.$Parameter){n=t.$Parameter.filter(function(t){return t.$Name===e});if(n.length){M=n[0];return true}}return false}function P(e){return!e.$IsBound&&f===z||e.$IsBound&&f===e.$Parameter[0].$Type}function E(e){var t;if(r.isLoggable(e,N)){t=Array.isArray(h)?h.join("/"):h;r[e===V?"debug":"warning"](Array.prototype.slice.call(arguments,1).join("")+(t?" at /"+t:""),i,N)}if(e===ee){M=undefined}return false}function w(e,t){var n;function r(){h??=v&&t&&v+"/"+t;return E.apply(this,arguments)}f=M&&M.$Type||f;if(s.bSupportReferences&&!(e in l)){if(i.endsWith("@$ui5.target")){M=undefined;return false}n=ue(e);M=s._getOrFetchSchema(l,n,r)}if(e in l){v=g=$=e;M=m=l[$];if(!u.isThenable(M)){return true}}if(u.isThenable(M)&&M.isPending()){return r(V,"Waiting for ",n)}return r(ee,"Unknown qualified name ",e)}function A(e,t,n){var i,r,o;if(e==="$Annotations"){return E(ee,"Invalid segment: $Annotations")}e=e.replaceAll("%2F","/");if(t&&typeof M==="object"&&e in M){if(e[0]==="$"||k.test(e)){y=false}}else{i=e.indexOf("@@");if(i<0){if(e.endsWith("@sapui.name")){i=e.length-11}else{i=e.indexOf("@")}}if(i>0){if(!A(e.slice(0,i),t,n)){return false}e=e.slice(i);o=true;if(M&&(M.$kind==="EntitySet"||M.$kind==="Singleton")){c=M}}if(typeof M==="string"&&!(o&&(e==="@sapui.name"||e[1]==="@"))&&!(y&&m&&m.$kind==="EnumType")&&!U(M,n.slice(0,t))){return false}if(y){if(e[0]==="$"&&e!=="$Parameter"&&e!=="$ReturnType"||k.test(e)){y=false}else{r=typeof M==="object";if(o){}else if(e[0]!=="@"&&e.includes(".",1)){return w(e)}else if(r&&"$Type"in M){if(!w(M.$Type,"$Type")){return false}}else if(r&&"$Action"in M){if(!w(M.$Action,"$Action")){return false}f=z}else if(r&&"$Function"in M){if(!w(M.$Function,"$Function")){return false}f=z}else if(!t){v=g=$??=l.$EntityContainer;M=m??=l[$];if(Array.isArray(M)){if(f){M=M.filter(P)}if(b(e,M[0])){return true}}if(e&&e[0]!=="@"&&!(e in m)){return E(ee,"Unknown child ",e," of ",$)}}if(Array.isArray(M)){if(e==="$Parameter"){return true}if(e.startsWith("@$ui5.overload@")){e=e.slice(14);o=true}if(o){if(e[1]!=="@"&&!O(e)){return false}}else{if(e!==n[t]&&n[t][e.length+1]!=="@"&&se(e,M)){g=e;return O(e,n[t].slice(e.length),"/"+g)}if(f){M=M.filter(P)}if(e==="@$ui5.overload"){return true}if(M.length!==1){return E(ee,"Expected a single overload, but found "+M.length)}if(b(e,M[0])){return true}M=M[0].$ReturnType;v+="/0/$ReturnType";if(M){if(e==="value"&&!(l[M.$Type]&&l[M.$Type].value)){g=undefined;return true}if(!w(M.$Type,"$Type")){return false}}if(!e){return true}}}}}if(!e){return t+1>=n.length||E(ee,"Invalid empty segment")}if(e[0]==="@"){function a(i){M=i;if(M===undefined){E(ee,"Unsupported path before "+e)}else if(t+1<n.length){E(ee,"Unsupported path after "+e)}return false}if(e==="@sapui.name"){if(g===undefined&&o&&t&&n[t-1]==="$NavigationPropertyBinding"){g=M}return a(g)}if(e==="@$ui5.target"){return a(v)}if(e[1]==="@"){if(t+1<n.length){return E(ee,"Unsupported path after ",e)}return C(e,[""].concat(n.slice(0,t),n[t].slice(0,i)).join("/"))}}if(y&&e[0]==="@"){f=M&&M.$Type||f;M=l.$Annotations[v]||{};y=false}else if(e==="$"&&t+1<n.length){return E(ee,"Unsupported path after $")}else if(!M||typeof M!=="object"){M=undefined;return!p&&E(V,"Invalid segment: ",e)}}if(e!=="@"&&e!=="$"){if(e[0]==="@"){p=true}g=y||e[0]==="@"?e:undefined;v=y?v+"/"+e:undefined;M=M[e]}return true}function U(e,t){var n;if(h){return E(ee,"Invalid recursion")}h=t;p=false;y=true;M=l;if(c){if(!e){M=c;c=h=undefined;return true}$=c.$Type;c=m=undefined}n=e.split("/").every(A);h=undefined;return n}if(!U(i.slice(1))&&u.isThenable(M)){M=M.then(function(){return s.fetchObject(e,t,n)})}return M})};ne.prototype.fetchUI5Type=function(e,t){const i=e.slice(e.lastIndexOf("/")+1);if(i[0]==="$"||i[0]==="@"){if(q.includes(i)){B??=new w;return u.resolve(B)}if(i.startsWith("@$ui5.context.is")||i.startsWith("@$ui5.node.is")){D??=new m;return u.resolve(D)}}const o=this.getMetaContext(e);return this.fetchObject(undefined,o).catch(this.oModel.getReporter()).then(i=>{var a=W,s;if(!i){r.warning("No metadata for path '"+e+"', using "+a.getName(),undefined,N);return a}if(t){if(n.isEmptyObject(t)){t=undefined}else if("parseKeepsEmptyString"in t&&i.$Type!=="Edm.String"){if(Object.keys(t).length===1){t=undefined}else{t=Object.assign({},t);delete t.parseKeepsEmptyString}}}if(!t&&i["$ui5.type"]){return i["$ui5.type"]}if(i.$isCollection){r.warning("Unsupported collection type, using "+a.getName(),e,N)}else{s=H[i.$Type];if(s){a=new s.Type(t,this.getConstraints(i,o.getPath()))}else{r.warning("Unsupported type '"+i.$Type+"', using "+a.getName(),e,N)}}if(!t){i["$ui5.type"]=a}return a})};ne.prototype.fetchUpdateData=function(e,t,i){var r=t.getModel(),o=r.resolve(e,t),a=this;function s(e){var t=new Error(o+": "+e);if(i!==undefined){r.reportError(e,N,t)}throw t}return this.fetchObject(n.getMetaPath(o)).then(function(){return a.fetchEntityContainer()}).then(function(r){var a,l=r[r.$EntityContainer],f,c,d,p,h=false,g,y,m,$=false,v,M=false;function O(e){var t=e.indexOf("(");return t>=0?e.slice(t):""}function C(e){a.push({path:g,prefix:e})}function b(e){var t=e.indexOf("(");return t>=0?e.slice(0,t):e}m=o.slice(1).split("/");p=m.shift();g="/"+p;f=g;d=decodeURIComponent(b(p));c=l[d];if(!c){s("Not an entity set: "+d)}v=r[c.$Type];e="";y="";a=[p];$=p.includes("($uid=");m.forEach(function(t){var i,o;g+="/"+t;if(k.test(t)){C(a.pop());f+="/"+t}else{o=decodeURIComponent(b(t));y=n.buildPath(y,o);i=h?{}:v[o];if(!i){if(o.includes("@")){if(o.includes("@$ui5.")&&o!=="@$ui5.context.isSelected"){s("Read-only path must not be updated")}h=true;i={}}else{s("Not a (navigation) property: "+o)}}v=r[i.$Type];if(t.includes("($uid=")){f=g;e="";$=true}else if(!$&&i.$kind==="NavigationProperty"){if(c.$NavigationPropertyBinding&&y in c.$NavigationPropertyBinding){d=c.$NavigationPropertyBinding[y];c=l[d];y="";a=[encodeURIComponent(d)+O(t)];if(!i.$isCollection){C(a.pop())}}else{a.push(t)}f=g;e=""}else{e=n.buildPath(e,t)}}});if($||i){return u.resolve({editUrl:undefined,entityPath:f,propertyPath:e})}return u.all(a.map(function(e,r){if(typeof e==="string"){return e}return t.fetchValue(e.path).then(function(t){var o;if(i!==undefined&&r===a.length-1&&(t===null||t&&n.hasPrivateAnnotation(t,"upsert"))){M=true;return undefined}if(!t){s("No instance to calculate key predicate at "+e.path)}o=n.getPrivateAnnotation(t,"predicate");if(!o){s("No key predicate known at "+e.path)}return e.prefix+o},function(t){s(t.message+" at "+e.path)})})).then(function(t){return{editUrl:M?f.slice(1):t.join("/"),entityPath:f,propertyPath:e}})})};ne.prototype.fetchValueListMappings=function(e,t,i,r){var o=this,a=e.getMetaModel();function s(){var e=r[0],n="";if(r.length!==1){throw new Error("Expected a single overload, but found "+r.length)}if(e.$IsBound){n=e.$Parameter[0].$isCollection?"Collection("+e.$Parameter[0].$Type+")":e.$Parameter[0].$Type}return t+"("+n+")"}return a.fetchEntityContainer().then(function(r){var u,l=r.$Annotations,f,c=n.namespace(t),d={},p=o===a,h,g;if(i.$Name){f=s()+"/"+i.$Name;g=t+"/"+i.$Name}h=Object.keys(l).filter(function(t){if(n.namespace(t)===c){if(f?t===f||t===g:o.getObject("/"+t)===i){return true}if(p||g&&n.getMetaPath(t)===g){return false}throw new Error("Unexpected annotation target '"+t+"' with namespace of data service in "+e.sServiceUrl)}return false});if(!h.length){throw new Error("No annotation '"+Q.slice(1)+"' in "+e.sServiceUrl)}if(h.length===1){u=l[h[0]]}else{u=Object.assign({},l[g],l[f])}Object.keys(u).forEach(function(t){var n=ae(t);if(n!==undefined){d[n]=u[t];["CollectionRoot","SearchSupported"].forEach(function(n){if(n in u[t]){throw new Error("Property '"+n+"' is not allowed in annotation '"+t.slice(1)+"' for target '"+h[0]+"' in "+e.sServiceUrl)}})}else if(!p){throw new Error("Unexpected annotation '"+t.slice(1)+"' for target '"+h[0]+"' with namespace of data service in "+e.sServiceUrl)}});return d})};ne.prototype.fetchValueListType=function(e){var n=this.getMetaContext(e),i=this;return this.fetchObject(undefined,n).then(function(r){var o,a;if(!r){throw new Error("No metadata for "+e)}o=i.getObject("@",n);if(o[Z]){return t.Fixed}for(a in o){if(oe(a,X)!==undefined||oe(a,J)!==undefined){return t.Standard}if(oe(a,Q)!==undefined){return o[a].SearchSupported===false?t.Fixed:t.Standard}}return t.None})};ne.prototype.filterValueListRelevantQualifiers=function(e,t,n,i){return this.requestValue4Annotation(t,n,i).then(function(t){var n={};t.forEach(function(t){if(t in e){n[t]=e[t]}});return n})};ne.prototype.getAbsoluteServiceUrl=function(e){var t=new L(this.sUrl).absoluteTo(document.baseURI).pathname().toString();return new L(e).absoluteTo(t).filename("").toString()};ne.prototype.getAllPathReductions=function(e,t,i,r){var o=t.split("/").length,a,s={},u=e.split("/"),l=this;function f(e,t,a,u){var c,d,p;function h(n){if(!i){f(e,t,p-1,true)}if(u){t=t.slice();e=e.slice()}t.splice(p,n);e.splice(p,n);if(!i){s[e.join("/")]=true}}for(p=a;p>=o;p-=1){c=k.test(e[p+1])?p+2:p+1;if(c<e.length&&t[p].$Partner===e[c]&&!t[c].$isCollection&&t[c].$Partner===e[p].replace(F,"")){h(c-p+1)}else if(Array.isArray(t[p])&&e[p+1]==="$Parameter"){d=l.getObject(n.getMetaPath(e.slice(0,p+1).join("/")+"/@$ui5.overload"));if(d.length===1&&d[0].$Parameter[0].$Name===e[p+2]){h(3)}}else if(r&&t[p].$isCollection){break}}}a=u.map(function(e,t){return t<o||e[0]==="#"||e[0]==="@"||k.test(e)||e==="$Parameter"?{}:l.getObject(n.getMetaPath(u.slice(0,t+1).join("/")))||{}});s[e]=true;if(!(r&&a[u.length-1].$isCollection)){f(u,a,u.length-2)}return i?u.join("/"):Object.keys(s)};ne.prototype.getConstraints=function(e,t){var n,i,r,o=H[e.$Type];function a(e,t){if(t!==undefined){i??={};i[e]=t}}if(o){r=o.constraints;for(n in r){a(r[n],n[0]==="@"?this.getObject(t+n):e[n])}if(e.$Nullable===false){a("nullable",false)}if(e.$Type==="Edm.DateTimeOffset"){a("V4",true)}}return i};ne.prototype.getData=n.createGetMethod("fetchData");ne.prototype.getETags=function(){return this.mETags};ne.prototype.getLastModified=function(){return this.oLastModified};ne.prototype.getMetaContext=function(e){return new d(this,n.getMetaPath(e))};ne.prototype.getMetaPath=function(e){return n.getMetaPath(e)};ne.prototype.getObject=n.createGetMethod("fetchObject");ne.prototype.getOrCreateSharedModel=function(e,t,n){e=this.getAbsoluteServiceUrl(e);const i=!!n+e;let r=this.mSharedModelByUrl;if(!t){r??={}}let o=r[i];if(!o){o=new this.oModel.constructor({autoExpandSelect:n,groupId:t?undefined:"$direct",httpHeaders:this.oModel.getHttpHeaders(),metadataUrlParams:this.sLanguage&&{"sap-language":this.sLanguage},operationMode:y.Server,serviceUrl:e,sharedRequests:true});if(t){o.getMetaModel()._copyAnnotations(this.oMetaModelForAnnotations??this)}o.setRetryAfterHandler(e=>this.oModel.getOrCreateRetryAfterPromise(e));r[i]=o}return o};ne.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#getOriginalProperty")};ne.prototype.getProperty=ne.prototype.getObject;ne.prototype.getReducedPath=function(e,t){return this.getAllPathReductions(e,t,true,true)};ne.prototype.getUI5Type=n.createGetMethod("fetchUI5Type",true);ne.prototype.getUnitOrCurrencyPath=function(e){var t=this.getObject("@",this.getMetaContext(e)),n=t&&(t["@Org.OData.Measures.V1.Unit"]||t["@Org.OData.Measures.V1.ISOCurrency"]);return n&&n.$Path};ne.prototype.getValueListType=n.createGetMethod("fetchValueListType",true);ne.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#isList")};ne.prototype.refresh=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#refresh")};ne.prototype.requestCodeList=function(e,t,i){var o=this.fetchEntityContainer().getResult(),a=o[o.$EntityContainer],s=this;if(i&&i.context){if(i.context.getModel()!==this||i.context.getPath()!=="/"){throw new Error("Unsupported context: "+i.context)}}if(t!==undefined&&t!==a){throw new Error("Unsupported raw value: "+t)}return this.requestObject("/@com.sap.vocabularies.CodeList.v1."+e).then(function(e){var t,i,o,a,u,l;if(!e){return null}l=s.getAbsoluteServiceUrl(n.setLanguage(e.Url,s.sLanguage));t=e.CollectionPath+"#"+l;a=I[t];if(a){return a}const f=!s.mSharedModelByUrl;o=s.getOrCreateSharedModel(l);i=o.getMetaModel();u="/"+e.CollectionPath+"/";a=i.requestObject(u).then(function(t){var n=u+"@Org.OData.Core.V1.AlternateKeys",a=i.getObject(n),s,l=$(t.$Key),c=u+l+"@com.sap.vocabularies.Common.v1.",d,p,h=u+l+"@com.sap.vocabularies.CodeList.v1.StandardCode/$Path",g,y;function m(t,n){var i=n.getProperty(l),o={Text:n.getProperty(y),UnitSpecificScale:n.getProperty(p)};if(g){o.StandardCode=n.getProperty(g)}if(o.UnitSpecificScale===null){r.error("Ignoring customizing w/o unit-specific scale for code "+i+" from "+e.CollectionPath,e.Url,N)}else{t[i]=o}return t}function $(e){var t;if(e&&e.length===1){t=e[0]}else{throw new Error("Single key expected: "+u)}return typeof t==="string"?t:t[Object.keys(t)[0]]}if(a){if(a.length!==1){throw new Error("Single alternative expected: "+n)}else if(a[0].Key.length!==1){throw new Error("Single key expected: "+n+"/0/Key")}l=a[0].Key[0].Name.$PropertyPath}p=i.getObject(c+"UnitSpecificScale/$Path");y=i.getObject(c+"Text/$Path");d=[l,p,y];g=i.getObject(h);if(g){d.push(g)}s=o.bindList("/"+e.CollectionPath,null,null,null,{$select:d});return s.requestContexts(0,Infinity).then(function(t){if(!t.length){r.error("Customizing empty for ",o.sServiceUrl+e.CollectionPath,N)}return t.reduce(m,{})}).finally(function(){s.destroy();if(f){o.destroy()}})});I[t]=a;return a})};ne.prototype.requestCurrencyCodes=function(e,t){return this.requestCodeList("CurrencyCodes",e,t)};ne.prototype.requestData=n.createRequestMethod("fetchData");ne.prototype.requestObject=n.createRequestMethod("fetchObject");ne.prototype.requestUI5Type=n.createRequestMethod("fetchUI5Type");ne.prototype.requestUnitsOfMeasure=function(e,t){return this.requestCodeList("UnitsOfMeasure",e,t)};ne.prototype.requestValue4Annotation=function(t,i,r){let o;const a=n.getMetaPath(r.getPath());const s=i.indexOf("/",a.length+1);if(s>0){const e=this.getObject(i.slice(0,s)+"/$Partner");if(e){o={$IsBound:true,$Parameter:[{$Name:e}]}}}const u=new R({any:e.value(t,{context:this.createBindingContext(i),overload:o}),bindingContexts:r,models:r.getModel()});const l=u.getBinding("any");let f;if(l){if(l.getBindings){f=Promise.all(l.getBindings().map(function(e){return e.requestValue()}))}else{f=l.requestValue()}}else{f=Promise.resolve()}return f.then(function(){return u.getAny()})};ne.prototype.requestValueListInfo=function(e,t,i){var r=n.getMetaPath(e),o=r.slice(0,r.lastIndexOf("/")).replace("/$Parameter",""),a=o.slice(o.lastIndexOf("/")+1),s=this;if(!a.includes(".")){a=undefined}return Promise.all([a||this.requestObject(o+"/@sapui.name"),this.requestObject(r),this.requestObject(r+"@"),this.requestObject(r+Z),this.requestObject(o+"/@$ui5.overload")]).then(function(o){var a=o[2],u=o[3],l={},f=o[1],c={};function d(i,r,o,a){if("CollectionRoot"in i){a=s.getOrCreateSharedModel(i.CollectionRoot,true,t);if(c[r]&&c[r].$model===a){l[r]=undefined}}if(l[r]){throw new Error("Annotations '"+Q.slice(1)+"' with identical qualifier '"+r+"' for property "+e+" in "+l[r]+" and "+o)}l[r]=o;i=n.clone(i);i.$model=a;delete i.CollectionRoot;delete i.SearchSupported;c[r]=i}if(!f){throw new Error("No metadata for "+e)}return Promise.all(Object.keys(a).filter(function(e){return oe(e,X)!==undefined}).map(function(e){var n=a[e];return Promise.all(n.map(function(e){var n=s.getOrCreateSharedModel(e,true,t);return s.fetchValueListMappings(n,o[0],f,o[4]).then(function(e){return{valueListMappingByQualifier:e,$model:n}})})).then(function(e){n.forEach(function(t,n){var i=e[n].valueListMappingByQualifier;Object.keys(i).forEach(function(r){d(i[r],r,t,e[n].$model)})})})})).then(function(){var t=a[Y];Object.keys(a).filter(function(e){return ae(e)!==undefined}).forEach(function(e){d(a[e],ae(e),s.sUrl,s.oModel)});if(n.isEmptyObject(c)){throw new Error("No annotation '"+X.slice(1)+"' for "+e)}return t&&i&&i.getBinding?s.filterValueListRelevantQualifiers(c,t,r+Y,i):c}).then(function(t){var n,i;if(u){n=Object.keys(t);if(n.length!==1){throw new Error("Annotation '"+Z.slice(1)+"' but not exactly one '"+Q.slice(1)+"' for property "+e)}i=t[n[0]];i.$qualifier=n[0];return{"":i}}return t})})};ne.prototype.requestValueListType=n.createRequestMethod("fetchValueListType");ne.prototype.resolve=function(e,t){var n,i;if(!e){return t?t.getPath():undefined}i=e[0];if(i==="/"){return e}if(!t){return undefined}if(i==="."){if(e[1]!=="/"){throw new Error("Unsupported relative path: "+e)}e=e.slice(2)}n=t.getPath();return i==="@"||n.endsWith("/")?n+e:n+"/"+e};ne.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#setLegacySyntax")};ne.prototype.toString=function(){return N+": "+this.sUrl};ne.prototype.validate=function(e,t){var n,i,r,o,a,s;if(!this.bSupportReferences){return t}for(a in t.$Reference){o=t.$Reference[a];a=new L(a).absoluteTo(this.sUrl).toString();if("$IncludeAnnotations"in o){this._reportAndThrowError("Unsupported IncludeAnnotations",e)}for(s in o.$Include){r=o.$Include[s];if(r in t){this._reportAndThrowError("A schema cannot span more than one document: "+r+" - is both included and defined",e)}this._addUrlForSchema(r,a,e)}}i=t.$LastModified?new Date(t.$LastModified):null;this.mETags[e]=t.$ETag?t.$ETag:i;n=t.$Date?new Date(t.$Date):new Date;i??=n;if(this.oLastModified<i){this.oLastModified=i}delete t.$Date;delete t.$ETag;delete t.$LastModified;return t};ne.clearCodeListsCache=function(){I={}};return ne});
//# sourceMappingURL=ODataMetaModel.js.map