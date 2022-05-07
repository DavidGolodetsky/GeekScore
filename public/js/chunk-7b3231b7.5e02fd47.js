(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b3231b7"],{5311:function(e,t,a){"use strict";var i=a("5607"),n=a("2b0e");t["a"]=n["default"].extend({name:"rippleable",directives:{ripple:i["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}})},"56c4":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("BaseDialog",{attrs:{"activator-icon":"plus",header:"Add team","button-text":"Add team"},on:{submit:e.submitTeam}},[a("v-tabs",{on:{change:e.resetForm},model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[a("v-tabs-slider",{attrs:{color:"secondary"}}),e._l(e.tabs,(function(t,i){return a("v-tab",{key:i,attrs:{href:"#tab-"+i}},[a("span",{staticClass:"mt-2"},[e._v(e._s(t))])])}))],2),a("v-tabs-items",{staticClass:"pt-4 px-4",model:{value:e.currentTab,callback:function(t){e.currentTab=t},expression:"currentTab"}},[a("v-tab-item",{attrs:{value:"tab-0"}},[a("v-select",{attrs:{"prepend-icon":"mdi-account-multiple-plus-outline",autofocus:"",items:e.filteredTeams,rules:e.isSelectTeamTab?e.selectRules:[],"item-text":"name","item-value":"_id",label:"Team"},model:{value:e.selectedTeamId,callback:function(t){e.selectedTeamId=t},expression:"selectedTeamId"}})],1),a("v-tab-item",{attrs:{value:"tab-1"}},[a("v-text-field",{attrs:{clearable:"",autofocus:"",rules:e.isSelectTeamTab?[]:e.nameRules,"prepend-icon":"mdi-account-group-outline",label:"Name"},model:{value:e.name,callback:function(t){e.name="string"===typeof t?t.trim():t},expression:"name"}}),a("v-select",{attrs:{"prepend-icon":"mdi-account-multiple-plus-outline",items:e.numberOfPlayers,rules:e.isSelectTeamTab?[]:e.selectRules,label:"Number of players"},on:{change:e.setPlayers}}),a("span",e._l(e.players,(function(t,i){return a("v-text-field",{key:i,attrs:{readonly:t.isMe,clearable:!t.isMe,"prepend-icon":"mdi-account-outline",rules:e.isSelectTeamTab&&t.isMe?[]:e.playerRules,label:"Player #"+(i+1)},on:{input:e.updatePlayers},model:{value:t.name,callback:function(a){e.$set(t,"name","string"===typeof a?a.trim():a)},expression:"player.name"}})})),1),a("v-switch",{attrs:{label:"Cooperative",color:"secondary","hide-details":""},model:{value:e.coop,callback:function(t){e.coop=t},expression:"coop"}})],1)],1)],1)},n=[],s=a("2909"),l=(a("99af"),a("d81d"),a("b0c0"),a("4de4"),a("caad"),a("2532"),a("a6f4")),r=a("d770"),u=a("9dd9"),o=Object(l["h"])({name:"TeamsAddDialog",props:{gameId:{type:String,required:!0}},setup:function(e,t){var a=t.root.$store,i=Object(l["Q"])(e),n=i.gameId,o=Object(l["J"])(""),c=Object(l["J"])(!1),d=Object(l["J"])([]),h=Object(l["J"])([].concat(Object(s["a"])(u["e"]),[u["c"]])),v=Object(l["J"])([].concat(Object(s["a"])(u["e"]),[u["c"]])),p=Object(l["J"])([u["c"]]),m=Object(l["J"])(null),f=Object(l["J"])(null),b=Object(l["J"])(["Select team","Create New"]),g=Object(l["J"])(Object(r["a"])(8)),y=function(e,t){return[function(a){return Object(u["g"])(a,Object(r["b"])(e),t)}]},O=function(){return a.getters["teams/getGameTeams"](n.value)},T=function(e){return a.getters["games/getGame"](e)},j=function(e){return a.getters["teams/getTeam"](e)},w=Object(l["b"])((function(){return n.value?O():null})),C=Object(l["b"])((function(){return a.state.games.games})),S=Object(l["b"])((function(){return a.state.user.user})),V=Object(l["b"])((function(){return a.state.teams.teams})),k=Object(l["b"])((function(){var e;return null!==(e=C.value)&&void 0!==e?e:T(n.value)})),x=Object(l["b"])((function(){return"tab-0"===f.value})),A=Object(l["b"])((function(){return k.value?k.value.coop||c.value:null})),_=Object(l["b"])((function(){var e,t=null===(e=w.value)||void 0===e?void 0:e.map((function(e){return e.name}));return V.value?V.value.filter((function(e){return!t.includes(e.name)})):[]})),D=function(e){var t;1===e&&(c.value=!0);var a=null!==(t=S.value)&&void 0!==t&&t.username?S.value.username:"Me";d.value=[{name:a,isMe:!0}];for(var i=1;i<e;i++){var n={name:""};d.value.push(n)}},I=function(){v.value=[].concat(Object(s["a"])(v.value),Object(s["a"])(y(d.value)))},$=function(){o.value="",g.value=Object(r["a"])(8),m.value=null},J=function(){var e={games:[n.value],gameName:k.value.name,name:o.value,coop:A.value,players:d.value};a.dispatch("teams/createTeam",e)},P=function(){var e=j(m.value),t={_id:m.value,games:[].concat(Object(s["a"])(e.games),[n.value])};a.dispatch("teams/updateTeam",t)},R=function(){(o.value||m.value)&&(m.value?P():J()),$()};return{gameTeams:w,uniqueRule:y,isSelectTeamTab:x,submitTeam:R,updatePlayers:I,setPlayers:D,filteredTeams:_,nameRules:h,playerRules:v,selectRules:p,tabs:b,name:o,coop:c,players:d,selectedTeamId:m,currentTab:f,resetForm:$,numberOfPlayers:g}}}),c=o,d=a("2877"),h=a("6544"),v=a.n(h),p=a("b974"),m=a("b73d"),f=a("71a3"),b=a("c671"),g=a("fe57"),y=a("aac8"),O=a("9a96"),T=a("8654"),j=Object(d["a"])(c,i,n,!1,null,null,null);t["default"]=j.exports;v()(j,{VSelect:p["a"],VSwitch:m["a"],VTab:f["a"],VTabItem:b["a"],VTabs:g["a"],VTabsItems:y["a"],VTabsSlider:O["a"],VTextField:T["a"]})},"9d01":function(e,t,a){},"9dd9":function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"f",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"d",(function(){return u})),a.d(t,"b",(function(){return o})),a.d(t,"g",(function(){return c})),a.d(t,"e",(function(){return d}));a("ac1f"),a("5319"),a("fb6a"),a("466d"),a("4de4");var i=function(e){return!!e||"Field is required"},n=function(e){var t=!!((null===e||void 0===e?void 0:e.length)<=100),a="Field is too long";return!e||(t||a)},s=function(e){var t=!!((null===e||void 0===e?void 0:e.length)>=2),a="Field is too short";return!e||(t||a)},l=function(e){var t=!(null===e||void 0===e||!e.replace(/\s/g,"").length),a="Field contains only whitespaces";return!e||(t||a)},r=function(e){var t=null===e||void 0===e?void 0:e.slice(0,100),a=/.+@.+\..+/.test(t),i="E-mail must be valid";return!e||(a||i)},u=function(e){var t=!!((null===e||void 0===e?void 0:e.length)>=6),a="Password is too short";return!e||(t||a)},o=function(e){var t=!(null===e||void 0===e||!e.match(/(https?:\/\/[^\s]+)/g)),a="Please provide a correct link";return!e||(t||a)},c=function(e,t,a){var i=null===t||void 0===t?void 0:t.filter((function(t){return t===e})),n=a?(null===i||void 0===i?void 0:i.length)>=1:(null===i||void 0===i?void 0:i.length)>1,s="This field should be unique";return!e||(!n||s)},d=[n,s,l]},b73d:function(e,t,a){"use strict";var i=a("15fd"),n=a("5530"),s=(a("0481"),a("ec29"),a("9d01"),a("fe09")),l=a("c37a"),r=a("c3f0"),u=a("0789"),o=a("490a"),c=a("80d2"),d=["title"];t["a"]=s["a"].extend({name:"v-switch",directives:{Touch:r["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},l["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){var e=this.attrs$,t=(e.title,Object(i["a"])(e,d));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs),t)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(n["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(n["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(u["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(o["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(e){(e.keyCode===c["x"].left&&this.isActive||e.keyCode===c["x"].right&&!this.isActive)&&this.onChange()}}})},ec29:function(e,t,a){},fe09:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));a("d3b7"),a("25f0"),a("4de4");var i=a("c37a"),n=a("5311"),s=a("8547"),l=a("58df");function r(e){e.preventDefault()}t["a"]=Object(l["a"])(i["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return e.valueComparator(a,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=i["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:r},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var i=a.length;a=a.filter((function(a){return!e.valueComparator(a,t)})),a.length===i&&a.push(t)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(a,t)?null:t:!a;this.validate(!0,a),this.internalValue=a,this.hasColor=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})}}]);
//# sourceMappingURL=chunk-7b3231b7.5e02fd47.js.map