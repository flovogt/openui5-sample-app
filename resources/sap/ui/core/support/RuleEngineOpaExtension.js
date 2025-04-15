/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/base/Log","sap/ui/support/RuleAnalyzer","sap/ui/support/library"],function(jQuery,e,s,t,r){"use strict";var i=e.extend("sap.ui.core.support.RuleEngineOpaExtension",{metadata:{publicMethods:["getAssertions"]},onAfterInit:function(){var e=sap.ui.getCore().getLoadedLibraries()["sap.ui.support"],t=jQuery.Deferred();if(!e){sap.ui.require(["sap/ui/support/Bootstrap"],function(e){e.initSupportRules(["true","silent"],{onReady:function(){t.resolve()}})},function(e){s.error("Could not load module 'sap/ui/support/Bootstrap':",e)})}else{t.resolve()}return t.promise()},getAssertions:function(){var e=function(){return new URLSearchParams(window.location.search).get("sap-skip-rules-issues")=="true"};var s=function(){var e=window.parent;e._$files=e._$files||[];return e};var a={noRuleFailures:function(s){s=s||{};var r=jQuery.Deferred(),i=s["failOnAnyIssues"],a=s["failOnHighIssues"],o=s.rules,n=s.preset,u=s.metadata,p=s.executionScope;t.analyze(p,o||n,u).then(function(){var s=t.getAnalysisHistory(),o={issues:[]};if(s.length){o=s[s.length-1]}var n=o.issues.reduce(function(e,s){e[s.severity.toLowerCase()]+=1;return e},{high:0,medium:0,low:0});var u=o.issues.length===0;if(a){u=n.high===0}else if(i===false||a===false){u=true}if(e()){u=true}r.resolve({result:u,message:"Support Assistant issues found: [High: "+n.high+", Medium: "+n.medium+", Low: "+n.low+"]",expected:"0 high 0 medium 0 low",actual:n.high+" high "+n.medium+" medium "+n.low+" low"})});return r.promise()},getFinalReport:function(){var s=jQuery.Deferred(),r=t.getFormattedAnalysisHistory(),i=t.getAnalysisHistory(),a=i.reduce(function(e,s){return e+s.issues.length},0),o=a===0,n="Support Assistant Analysis History",u=n;if(o){n+=" - no issues found"}else if(e()){o=true;n+=' - issues are found. To see them remove the "sap-skip-rules-issues=true" URI parameter'}s.resolve({result:o,message:n,actual:u,expected:r});return s.promise()},getReportAsFileInFormat:function(e){var a,o,n=e||{},u=jQuery.Deferred(),p=n["historyFormat"],l=n["fileName"];switch(p){case r.HistoryFormats.Abap:if(!l){l="abap-report.support-assistant.json"}o=t.getFormattedAnalysisHistory(p);break;case r.HistoryFormats.String:if(!l){l="string-report.support-assistant.json"}o=t.getFormattedAnalysisHistory(p);break;default:if(!l){l="report.support-assistant.json"}o=t.getAnalysisHistory()}l=i._formatFileName(l);a=s();a._$files[a._$files.length]={name:l,content:JSON.stringify(o)};u.resolve({result:true,message:"Support Assistant Analysis History was stored in window._$files with following name "+l,actual:true,expected:true});return u.promise()}};return a}});i._formatFileName=function(e){var t="";if(/\.support-assistant.json$/i.test(e)){t=e}else if(/\.json$/i.test(e)){t=e.replace(/\.json$/i,".support-assistant.json")}else{t=e+".support-assistant.json"}if(e!==t){s.warning("Attempt to save report in file with name "+e+". Name changed to "+t+".")}return t};return i});
//# sourceMappingURL=RuleEngineOpaExtension.js.map