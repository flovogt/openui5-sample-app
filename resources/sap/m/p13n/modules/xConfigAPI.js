/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/core/util/reflection/JsControlTreeModifier"],(e,t)=>{"use strict";const n={};n.enhanceConfig=(o,r)=>{const a=r.propertyBag;const i=a?a.modifier:t;let s;let g;return i.getControlMetadata(o).then(e=>{s=e;r.controlMetadata=s;return i.getAggregation(o,"customData")}).then(e=>Promise.all(e.map(e=>i.getProperty(e,"key"))).then(t=>e.reduce((e,n,o)=>t[o]==="xConfig"?n:e,undefined))).then(t=>{g=t;if(g){return i.getProperty(g,"value").then(t=>e({},JSON.parse(t.replace(/\\/g,""))))}return{}}).then(async t=>{let s;if(r.controlMeta&&r.controlMeta.aggregation){await n.prepareAggregationConfig(o,r,t);s=n.createAggregationConfig(o,r,t)}else{s=n.createPropertyConfig(o,r,t)}if(r.markAsModified){s.modified=true}const c=a?a.appComponent:undefined;let f=Promise.resolve();if(g&&o.isA){f=i.removeAggregation(o,"customData",g).then(()=>i.destroy(g))}return f.then(()=>i.createAndAddCustomData(o,"xConfig",JSON.stringify(s),c).then(()=>e({},s)))})};n.getCurrentItemState=async function(e,t,n,o){const r=t?.changeType;if(!t.propertyBag||!r||r.indexOf("Item")===-1){return}const{modifier:a,appComponent:i}=t.propertyBag;const s=await a.getAggregation(e,o);const g=s||[];const c=[];if(n&&Object.keys(n.aggregations[o]).length>0){Object.entries(n.aggregations[o]).forEach(([e,t])=>{if(t.visible!==false){c.push({key:e,position:t.position})}});c.sort((e,t)=>e.position-t.position);c.map(e=>delete e.position)}else{await g.reduce(async(t,n,o)=>{const r=await t;const s=i?i.getRootControl():e;const g=s?.getLocalId instanceof Function?s.getLocalId(a.getId(n)):a.getId(n);const f=await a.getProperty(n,"visible");if(f&&g){c.push({key:g})}return r},Promise.resolve())}return c};n.readConfig=(n,o)=>{if(o){const r=o.propertyBag?o.propertyBag.modifier:t;return r.getAggregation(n,"customData").then(e=>Promise.all(e.map(e=>r.getProperty(e,"key"))).then(t=>e.reduce((e,n,o)=>t[o]==="xConfig"?n:e,undefined))).then(t=>{if(t){return r.getProperty(t,"value").then(t=>e({},JSON.parse(t.replace(/\\/g,""))))}return null})}const r=(e,t)=>{const n=(e,t)=>{if(e){if(e.getMetadata){const n=e.getMetadata();const o=n.getAllAggregations();if(o){return o[t]}}}return undefined};const o=n(e,t);if(o){return e[o._sGetter]()}return undefined};const a=(e,t)=>{const n=e.getMetadata().getPropertyLikeSetting(t);if(n){const t=n._sGetter;return e[t]()}return undefined};const i=r(n,"customData").find(e=>a(e,"key")=="xConfig");const s=i?e({},JSON.parse(a(i,"value").replace(/\\/g,""))):null;return s};const o=function(t,n,o){const r=o.key||o.name;const a=o.controlMeta;const i=o.value;const s=o.controlMetadata||t.getMetadata();const g=a.aggregation;const c=g?g:s.getDefaultAggregation().name;const{currentState:f}=o;const p=i.index;const{operation:d}=o;const l=e([],f);const u={add:(e,t)=>{l.splice(t,0,{key:e})},remove:(e,t)=>{const n=l?.find(t=>t.key==e);const o=l?.indexOf(n);if(o>-1){l.splice(o,1)}},move:(e,t)=>{const n=l?.find(t=>t.key==e);const o=l?.indexOf(n);if(o>-1){const[e]=l.splice(o,1);l.splice(t,0,e)}}};if(f instanceof Array&&d&&u[d]instanceof Function){u[d](r,p)}l.forEach((e,t)=>{const o=n.aggregations[c]?.[e.key];if(o&&o.hasOwnProperty("position")){o.position=t}else if(!o){const o=f?.findIndex(t=>t.key===e.key);if(t!==undefined&&o!==t&&t!==-1){n.aggregations[c][e.key]={position:t}}}})};n.prepareAggregationConfig=async(e,t,o)=>{const r=t.controlMeta;const a=t.controlMetadata||e.getMetadata();const i=r.aggregation;const s=i?i:a.getDefaultAggregation().name;const g=o||{};if(!g.hasOwnProperty("aggregations")){g.aggregations={}}if(!g.aggregations.hasOwnProperty(s)){if(a.hasAggregation(s)){g.aggregations[s]={};const o=await n.getCurrentItemState(e,t,g,s);o?.forEach(e=>{g.aggregations[s][e.key]={position:e.position}})}else{throw new Error("The aggregation "+s+" does not exist for"+e)}}const c=await n.getCurrentItemState(e,t,g,s);t.currentState=t.currentState||c};n.createAggregationConfig=(e,t,n)=>{const r=t.key||t.name;const a=t.controlMeta;const i=t.property;const s=t.value;const g=t.controlMetadata||e.getMetadata();const c=a.aggregation;const f=c?c:g.getDefaultAggregation().name;const p=n||{};if(!p.hasOwnProperty("aggregations")){p.aggregations={}}if(!p.aggregations.hasOwnProperty(f)){if(g.hasAggregation(f)){p.aggregations[f]={}}else{throw new Error("The aggregation "+f+" does not exist for"+e)}}if(!p.aggregations[f].hasOwnProperty(r)){p.aggregations[f][r]={}}if(s!==null||s&&s.hasOwnProperty("value")&&s.value!==null){switch(t.operation){case"move":p.aggregations[f][r][i]=s.index;if(s.persistenceIdentifier){p.aggregations[f][r]["persistenceIdentifier"]=s.persistenceIdentifier}o(e,p,t);break;case"remove":case"add":default:if(s.hasOwnProperty("value")){p.aggregations[f][r][i]=s.value;if(s.index!==undefined){p.aggregations[f][r]["position"]=s.index}if(s.persistenceIdentifier){p.aggregations[f][r]["persistenceIdentifier"]=s.persistenceIdentifier}}else{p.aggregations[f][r][i]=s}o(e,p,t);break}}else{delete p.aggregations[f][r][i];if(Object.keys(p.aggregations[f][r]).length===0){delete p.aggregations[f][r];if(Object.keys(p.aggregations[f]).length===0){delete p.aggregations[f]}}}return p};n.createPropertyConfig=(e,t,n)=>{const o=t.value;const r=t.property;const a=n||{};if(!a.properties){a.properties={}}if(!a.properties.hasOwnProperty(r)){a.properties[r]=[]}const i=t.operation;const s=a.properties[r].find(e=>e.key===t.key);if(s&&i!=="add"){a.properties[r].splice(a.properties[r].indexOf(s),1)}if(i!=="remove"){a.properties[r].splice(t.value.index,0,o)}return a};return n});
//# sourceMappingURL=xConfigAPI.js.map