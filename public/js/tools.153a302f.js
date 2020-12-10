(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tools"],{4149:function(t,e,a){},"54cc":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("the-title",{attrs:{title:"Tools",icon:"hammer-screwdriver"}}),a("v-row",[a("v-col",{attrs:{sm:"6",md:"4",cols:"12"}},[a("dice-roller-dialog")],1),a("v-col",{attrs:{sm:"6",md:"4",cols:"12"}},[a("timer-dialog")],1)],1)],1)},l=[],s=a("882a"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("the-dialog",{attrs:{color:"#fff",header:"Dice Roller",simple:""},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-card",{staticClass:"mx-auto card-pointer",attrs:{dark:"",raised:""}},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"d-flex"},[a("v-icon",{staticClass:"mr-2",attrs:{dark:""}},[t._v("mdi-dice-d20")]),a("span",{staticClass:"label_text"},[t._v("Dice Roller")])],1)],1)])]},proxy:!0},{key:"footer",fn:function(){return[a("v-btn",{attrs:{color:"secondary darken-1",outlined:""},on:{click:t.rollDice}},[t._v("Roll")])]},proxy:!0}])},[t._l(t.fields,(function(e,i){return a("v-card-text",{key:i,staticClass:"d-flex justify-center"},[a("v-icon",{attrs:{large:"",color:"grey darken-1"},on:{click:function(t){return e.func("minus")}}},[t._v(" mdi-minus ")]),a("v-text-field",{staticClass:"mx-2",attrs:{value:e.model,label:e.label,readonly:""}}),a("v-icon",{attrs:{large:"",color:"grey darken-1"},on:{click:function(t){return e.func("plus")}}},[t._v(" mdi-plus ")])],1)})),a("div",{staticClass:"pt-5"},[a("h4",[t._v("Result: "+t._s(t.totalValue)+" ")]),a("v-divider")],1)],2)},o=[],n={name:"DiceRollerDialog",data:function(){return{totalValue:"",fields:{diceSide:{func:this.changeSide,label:"Dice Sides",model:3},rollNumber:{func:this.changeRoll,label:"Roll Numbers",model:1}}}},methods:{changeSide:function(t){"plus"===t?this.fields.diceSide.model<20&&this.fields.diceSide.model++:this.fields.diceSide.model>3&&this.fields.diceSide.model--},changeRoll:function(t){"plus"===t?this.fields.rollNumber.model<10&&this.fields.rollNumber.model++:this.fields.rollNumber.model>1&&this.fields.rollNumber.model--},rollDice:function(){this.totalValue=this.fields.rollNumber.model+Math.floor(Math.random()*(this.fields.diceSide.model*this.fields.rollNumber.model-this.fields.rollNumber.model+1))}}},c=n,d=(a("c7ca"),a("2877")),u=a("6544"),m=a.n(u),f=a("8336"),v=a("b0af"),b=a("99d9"),h=a("ce7e"),p=a("132d"),g=a("8654"),k=Object(d["a"])(c,r,o,!1,null,"1cc6f41a",null),_=k.exports;m()(k,{VBtn:f["a"],VCard:v["a"],VCardText:b["b"],VCardTitle:b["c"],VDivider:h["a"],VIcon:p["a"],VTextField:g["a"]});var y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("the-dialog",{attrs:{color:"#fff",header:"tab-timer"===t.tab?"Timer":"Countdown",simple:""},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-card",{staticClass:"mx-auto card-pointer",attrs:{dark:"",raised:""}},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"d-flex"},[a("v-icon",{staticClass:"mr-2",attrs:{dark:""}},[t._v("mdi-timer")]),a("span",{staticClass:"label_text"},[t._v("Clock Tools")])],1)],1)])]},proxy:!0},{key:"footer",fn:function(){return[a("v-btn",{staticClass:"mr-2",attrs:{color:"secondary darken-1",outlined:""},on:{click:t.playPauseTimer}},[t._v(t._s(t.pause?"Play":"Pause"))]),a("v-btn",{attrs:{color:"secondary darken-1",outlined:""},on:{click:t.stopTimer}},[t._v("Stop")])]},proxy:!0}])},[a("v-tabs",{attrs:{"background-color":"#d9d9d8"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tabs-slider",{attrs:{color:"secondary"}}),t._l(t.tabs,(function(e){return a("v-tab",{key:e.name,attrs:{href:"#"+e.href}},[a("span",{staticClass:"mt-2"},[t._v(t._s(e.name))])])}))],2),a("v-tabs-items",{staticClass:"pt-4 px-4",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab-item",{attrs:{value:"tab-timer"}},[a("v-text-field",{attrs:{label:"Time",outlined:"",disabled:""},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),a("v-tab-item",{attrs:{value:"tab-countdown"}},[a("v-text-field",{attrs:{label:"Time",outlined:""},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1)],1)},x=[],C={name:"TimerDialog",data:function(){return{time:0,tab:null,pause:!0,playInterval:!1,tabs:[{name:"Timer",href:"tab-timer"},{name:"Countdown",href:"tab-countdown"}]}},watch:{tab:function(){this.stopTimer()}},destroyed:function(){this.stopTimer()},methods:{playPauseTimer:function(){var t=this;this.pause=!this.pause,this.pause?clearInterval(this.playInterval):this.playInterval=setInterval((function(){"tab-timer"===t.tab?t.time++:t.time>0?t.time--:t.stopTimer()}),1e3)},stopTimer:function(){this.time=0,this.pause=!0,clearInterval(this.playInterval),window.navigator.vibrate(1e3)}}},T=C,V=(a("e4f8"),a("71a3")),w=a("c671"),S=a("fe57"),D=a("aac8"),j=a("9a96"),R=Object(d["a"])(T,y,x,!1,null,"7626b353",null),I=R.exports;m()(R,{VBtn:f["a"],VCard:v["a"],VCardTitle:b["c"],VIcon:p["a"],VTab:V["a"],VTabItem:w["a"],VTabs:S["a"],VTabsItems:D["a"],VTabsSlider:j["a"],VTextField:g["a"]});var O={name:"ToolsPage",components:{TheTitle:s["a"],DiceRollerDialog:_,TimerDialog:I},data:function(){return{tools:[{id:"dice",name:"Dice Roller"},{id:"clock",name:"Clock Tools"}]}}},N=O,P=a("62ad"),B=a("0fd9"),$=Object(d["a"])(N,i,l,!1,null,null,null);e["default"]=$.exports;m()($,{VCol:P["a"],VRow:B["a"]})},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n}));var i=a("b0af"),l=a("80d2"),s=Object(l["i"])("v-card__actions"),r=Object(l["i"])("v-card__subtitle"),o=Object(l["i"])("v-card__text"),n=Object(l["i"])("v-card__title");i["a"]},b0af:function(t,e,a){"use strict";a("0481"),a("4069"),a("a9e3");var i=a("f3f3"),l=(a("615b"),a("10d2")),s=a("297c"),r=a("1c87"),o=a("58df");e["a"]=Object(o["a"])(s["a"],r["a"],l["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({"v-card":!0},r["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},l["a"].options.computed.classes.call(this))},styles:function(){var t=Object(i["a"])({},l["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=s["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),a=e.tag,i=e.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),t(a,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})},c7ca:function(t,e,a){"use strict";var i=a("4149"),l=a.n(i);l.a},caff:function(t,e,a){},e4f8:function(t,e,a){"use strict";var i=a("caff"),l=a.n(i);l.a}}]);
//# sourceMappingURL=tools.153a302f.js.map