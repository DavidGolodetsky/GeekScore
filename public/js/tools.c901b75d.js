(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tools","chunk-2d0dee65"],{"0c54":function(e,t,a){},"0fd9":function(e,t,a){"use strict";var n=a("ade3"),l=a("5530"),r=(a("caad"),a("2532"),a("99af"),a("b64b"),a("ac1f"),a("5319"),a("4ec9"),a("d3b7"),a("3ca3"),a("ddb0"),a("159b"),a("4b85"),a("2b0e")),o=a("d9f7"),c=a("80d2"),u=["sm","md","lg","xl"],i=["start","end","center"];function s(e,t){return u.reduce((function(a,n){return a[e+Object(c["F"])(n)]=t(),a}),{})}var d=function(e){return[].concat(i,["baseline","stretch"]).includes(e)},f=s("align",(function(){return{type:String,default:null,validator:d}})),v=function(e){return[].concat(i,["space-between","space-around"]).includes(e)},b=s("justify",(function(){return{type:String,default:null,validator:v}})),p=function(e){return[].concat(i,["space-between","space-around","stretch"]).includes(e)},m=s("alignContent",(function(){return{type:String,default:null,validator:p}})),g={align:Object.keys(f),justify:Object.keys(b),alignContent:Object.keys(m)},h={align:"align",justify:"justify",alignContent:"align-content"};function y(e,t,a){var n=h[e];if(null!=a){if(t){var l=t.replace(e,"");n+="-".concat(l)}return n+="-".concat(a),n.toLowerCase()}}var j=new Map;t["a"]=r["default"].extend({name:"v-row",functional:!0,props:Object(l["a"])(Object(l["a"])(Object(l["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},f),{},{justify:{type:String,default:null,validator:v}},b),{},{alignContent:{type:String,default:null,validator:p}},m),render:function(e,t){var a=t.props,l=t.data,r=t.children,c="";for(var u in a)c+=String(a[u]);var i=j.get(c);return i||function(){var e,t;for(t in i=[],g)g[t].forEach((function(e){var n=a[e],l=y(t,e,n);l&&i.push(l)}));i.push((e={"no-gutters":a.noGutters,"row--dense":a.dense},Object(n["a"])(e,"align-".concat(a.align),a.align),Object(n["a"])(e,"justify-".concat(a.justify),a.justify),Object(n["a"])(e,"align-content-".concat(a.alignContent),a.alignContent),e)),j.set(c,i)}(),e(a.tag,Object(o["a"])(l,{staticClass:"row",class:i}),r)}})},"4ec9":function(e,t,a){"use strict";var n=a("6d61"),l=a("6566");e.exports=n("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),l)},"62ad":function(e,t,a){"use strict";var n=a("ade3"),l=a("5530"),r=(a("a9e3"),a("b64b"),a("ac1f"),a("5319"),a("4ec9"),a("d3b7"),a("3ca3"),a("ddb0"),a("caad"),a("159b"),a("2ca0"),a("4b85"),a("2b0e")),o=a("d9f7"),c=a("80d2"),u=["sm","md","lg","xl"],i=function(){return u.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{})}(),s=function(){return u.reduce((function(e,t){return e["offset"+Object(c["F"])(t)]={type:[String,Number],default:null},e}),{})}(),d=function(){return u.reduce((function(e,t){return e["order"+Object(c["F"])(t)]={type:[String,Number],default:null},e}),{})}(),f={col:Object.keys(i),offset:Object.keys(s),order:Object.keys(d)};function v(e,t,a){var n=e;if(null!=a&&!1!==a){if(t){var l=t.replace(e,"");n+="-".concat(l)}return"col"!==e||""!==a&&!0!==a?(n+="-".concat(a),n.toLowerCase()):n.toLowerCase()}}var b=new Map;t["a"]=r["default"].extend({name:"v-col",functional:!0,props:Object(l["a"])(Object(l["a"])(Object(l["a"])(Object(l["a"])({cols:{type:[Boolean,String,Number],default:!1}},i),{},{offset:{type:[String,Number],default:null}},s),{},{order:{type:[String,Number],default:null}},d),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var a=t.props,l=t.data,r=t.children,c=(t.parent,"");for(var u in a)c+=String(a[u]);var i=b.get(c);return i||function(){var e,t;for(t in i=[],f)f[t].forEach((function(e){var n=a[e],l=v(t,e,n);l&&i.push(l)}));var l=i.some((function(e){return e.startsWith("col-")}));i.push((e={col:!l||!a.cols},Object(n["a"])(e,"col-".concat(a.cols),a.cols),Object(n["a"])(e,"offset-".concat(a.offset),a.offset),Object(n["a"])(e,"order-".concat(a.order),a.order),Object(n["a"])(e,"align-self-".concat(a.alignSelf),a.alignSelf),e)),b.set(c,i)}(),e(a.tag,Object(o["a"])(l,{class:i}),r)}})},"882a":function(e,t,a){"use strict";a.r(t);var n,l,r=a("5530"),o=(a("d3b7"),a("3ca3"),a("ddb0"),a("a6f4")),c=a("132d"),u=Object(o["h"])({name:"TheTitle",components:{GamesAddDialog:function(){return Promise.all([a.e("chunk-07709945"),a.e("chunk-3323ee2b")]).then(a.bind(null,"d737"))},TeamsAddDialog:function(){return Promise.all([a.e("chunk-07709945"),a.e("chunk-485c46e5"),a.e("chunk-f20b789e"),a.e("chunk-7b3231b7")]).then(a.bind(null,"56c4"))},RoundsAddDialog:function(){return Promise.all([a.e("chunk-07709945"),a.e("chunk-4e61baef")]).then(a.bind(null,"ce43"))}},props:{title:{type:String,required:!0},component:{type:String,default:""},icon:{type:String,default:""},props:{type:Object,default:function(){return{}}}},render:function(e){var t;return""===this.component&&(t=e("div",{class:"row_between mb-6 pt-5"},[e("div",{class:"d-flex"},[e(c["a"],{class:"mx-2",props:{color:"secondary"}},"mdi-".concat(this.icon)),e("h1",{class:"app-headline"},this.title)])])),t=e("div",{class:"row_between mb-6"},[e("div",{class:"d-flex"},[e(c["a"],{class:"mx-2",props:{color:"secondary"}},"mdi-".concat(this.icon)),e("h1",{class:"app-headline"},this.title)]),e(this.component,{class:"d-flex justify-end my-2",props:Object(r["a"])({},this.props)})]),t}}),i=u,s=a("2877"),d=Object(s["a"])(i,n,l,!1,null,null,null);t["default"]=d.exports},"897d":function(e,t,a){"use strict";a("0c54")},fb63:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("the-title",{attrs:{title:"Tools",icon:"hammer-screwdriver"}}),a("v-row",e._l(e.tools,(function(e,t){return a("v-col",{key:t,attrs:{sm:"6",md:"4",cols:"12"}},[a(e,{tag:"component"})],1)})),1)],1)},l=[],r=a("a6f4"),o=a("882a"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("BaseDialog",{attrs:{header:"Dice Roller",simple:""},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-card",{staticClass:"mx-auto card-pointer",attrs:{dark:"",raised:""}},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"d-flex"},[a("v-icon",{staticClass:"mr-2",attrs:{dark:""}},[e._v("mdi-dice-d20-outline")]),a("span",{staticClass:"label_text"},[e._v("Dice Roller")])],1)],1)])]},proxy:!0},{key:"footer",fn:function(){return[a("v-btn",{attrs:{color:"secondary darken-1",outlined:""},on:{click:e.rollDice}},[a("v-icon",{staticClass:"mr-1",attrs:{dark:""}},[e._v(" mdi-dice-6-outline ")]),e._v("Roll ")],1)]},proxy:!0}])},[e._l(e.fields,(function(t,n){return a("v-card-text",{key:n,staticClass:"d-flex justify-center"},[a("v-icon",{attrs:{large:"",color:"grey darken-1"},on:{click:function(e){return t.func("minus")}}},[e._v(" mdi-minus ")]),a("v-text-field",{staticClass:"mx-2",attrs:{value:t.model,label:t.label,readonly:""}}),a("v-icon",{attrs:{large:"",color:"grey darken-1"},on:{click:function(e){return t.func("plus")}}},[e._v(" mdi-plus ")])],1)})),a("div",{staticClass:"dice",class:e.show?"boxRotate box-transition":"box-transition"},[a("span",[e._v(" "+e._s(e.totalValue?e.totalValue:0)+" ")])])],2)},u=[],i=Object(r["h"])({name:"ToolsDiceDialog",setup:function(){var e=Object(r["J"])(!0),t=Object(r["J"])(0),a=Object(r["J"])({diceSide:{label:"Dice Sides",model:3,func:function(e){"plus"===e&&a.value.diceSide.model<20?a.value.diceSide.model++:"minus"===e&&a.value.diceSide.model>3&&a.value.diceSide.model--}},rollNumber:{label:"Number of dices",model:1,func:function(e){"plus"===e&&a.value.rollNumber.model<10?a.value.rollNumber.model++:"minus"===e&&a.value.rollNumber.model>1&&a.value.rollNumber.model--}}}),n=function(){e.value=!e.value,t.value=a.value.rollNumber.model+Math.floor(Math.random()*(a.value.diceSide.model*a.value.rollNumber.model-a.value.rollNumber.model+1))};return{show:e,totalValue:t,fields:a,rollDice:n}}}),s=i,d=(a("897d"),a("2877")),f=a("6544"),v=a.n(f),b=a("8336"),p=a("b0af"),m=a("99d9"),g=a("132d"),h=a("8654"),y=Object(d["a"])(s,c,u,!1,null,"58225fd1",null),j=y.exports;v()(y,{VBtn:b["a"],VCard:p["a"],VCardText:m["b"],VCardTitle:m["c"],VIcon:g["a"],VTextField:h["a"]});var k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("BaseDialog",{attrs:{header:"Clock Tools",simple:""},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-card",{staticClass:"mx-auto card-pointer",attrs:{dark:"",raised:""}},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"d-flex"},[a("v-icon",{staticClass:"mr-2",attrs:{dark:""}},[e._v("mdi-timer-outline")]),a("span",{staticClass:"label_text"},[e._v("Clock Tools")])],1)],1)])]},proxy:!0},{key:"footer",fn:function(){return[a("v-btn",{staticClass:"mr-2",attrs:{color:"secondary darken-1",outlined:""},on:{click:e.playPauseTimer}},[a("v-icon",{attrs:{dark:""}},[e._v(" "+e._s(e.pause?"mdi-play-outline":"mdi-pause")+" ")]),e._v(" "+e._s(e.pause?"Play":"Pause")+" ")],1),a("v-btn",{attrs:{color:"secondary darken-1",outlined:""},on:{click:e.stopTimer}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-stop ")]),e._v(" Stop ")],1)]},proxy:!0}])},[a("v-tabs",{model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[a("v-tabs-slider",{attrs:{color:"secondary"}}),e._l(e.tabs,(function(t,n){return a("v-tab",{key:n,attrs:{href:"#tab-"+n}},[a("span",{staticClass:"mt-2"},[e._v(e._s(t))])])}))],2),a("v-tabs-items",{staticClass:"pt-4 px-4",model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},e._l(e.tabs,(function(t,n){return a("v-tab-item",{key:n,attrs:{value:"tab-"+n}},[a("tools-clock-fields",{attrs:{hours:e.hours,minutes:e.minutes,seconds:e.seconds,disabled:0===n},on:{"update:hours":function(t){e.hours=t},"update:minutes":function(t){e.minutes=t},"update:seconds":function(t){e.seconds=t}}})],1)})),1)],1)},O=[],C=(a("d3b7"),a("3ca3"),a("ddb0"),a("d770")),T=Object(r["h"])({name:"ToolsTimerDialog",components:{ToolsClockFields:function(){return a.e("chunk-2d0c82f1").then(a.bind(null,"5495"))}},setup:function(){var e=Object(r["J"])(["Timer","Countdown"]),t=Object(r["J"])("tab-0"),a=Object(r["J"])(0),n=Object(r["J"])(0),l=Object(r["J"])(0),o=Object(r["J"])(!0),c=null,u=function(){l.value++,l.value>59&&(l.value=0,n.value++,n.value>59&&(n.value=0,a.value++))},i=function(){l.value--,0===a.value&&0===n.value&&l.value<=0?(d(),Object(C["c"])()):l.value<0&&(l.value=59,n.value>=1?n.value--:n.value=0,n.value<=0&&a.value>0&&(n.value=59,a.value>=1?a.value--:a.value=0))},s=function(){o.value=!o.value,o.value?clearInterval(c):c=setInterval((function(){"tab-0"===t.value?u():i()}),1e3)},d=function(){o.value=!0,a.value=0,n.value=0,l.value=0,clearInterval(c)};return Object(r["Y"])(t,(function(e,t){e!==t&&d()})),Object(r["D"])((function(){d()})),{hours:a,minutes:n,seconds:l,pause:o,stopTimer:d,tabs:e,currentTab:t,playPauseTimer:s}}}),x=T,S=a("71a3"),_=a("c671"),w=a("fe57"),V=a("aac8"),D=a("9a96"),N=Object(d["a"])(x,k,O,!1,null,null,null),J=N.exports;v()(N,{VBtn:b["a"],VCard:p["a"],VCardTitle:m["c"],VIcon:g["a"],VTab:S["a"],VTabItem:_["a"],VTabs:w["a"],VTabsItems:V["a"],VTabsSlider:D["a"]});var B=Object(r["h"])({name:"ToolsPage",components:{TheTitle:o["default"],ToolsDiceDialog:j,ToolsTimerDialog:J},setup:function(){var e=["tools-dice-dialog","tools-timer-dialog"];return{tools:e}}}),P=B,I=a("62ad"),R=a("0fd9"),E=Object(d["a"])(P,n,l,!1,null,null,null);t["default"]=E.exports;v()(E,{VCol:I["a"],VRow:R["a"]})}}]);
//# sourceMappingURL=tools.c901b75d.js.map