(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46b20e66"],{"1efd":function(t,e,a){t.exports=a.p+"img/team.76152c6e.jpg"},"4f0c":function(t,e,a){t.exports=a.p+"img/game.10a04d7d.webp"},"544f":function(t,e,a){var r={"./team.jpg":"1efd","./team.webp":"c368"};function n(t){var e=o(t);return a(e)}function o(t){if(!a.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}n.keys=function(){return Object.keys(r)},n.resolve=o,t.exports=n,n.id="544f"},"7f19":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{key:t.cardInfo._id,staticClass:"mx-auto app-card",attrs:{dark:"",raised:"","aria-describedby":t.cardInfo.name}},[a("router-link",{attrs:{to:t.formattedRoute}},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"row_between"},[a("span",{staticClass:"card-list-name"},[t._v(t._s(t.cardInfo.name))]),t._t("action",null,{item:t.cardInfo})],2)],1),t.cardInfo.players?a("v-list",{staticClass:"players",attrs:{dense:"",disabled:""}},[a("v-list-item-group",t._l(t.cardInfo.players,(function(e){var r=e.name;return a("v-list-item",{key:r},[a("v-list-item-icon",[a("v-icon",{domProps:{textContent:t._s("mdi-account-outline")}})],1),a("v-list-item-content",{domProps:{textContent:t._s(r)}})],1)})),1)],1):t._e(),a("v-img",{staticClass:"white--text align-end",attrs:{height:"350",src:t.getImagePath(),srcset:t.getImagePath("webp"),alt:t.cardInfo.name},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"secondary"}})],1)]},proxy:!0}])},[a("div",{staticClass:"title-wrap"},[a("v-card-title",{staticClass:"card-list-actions"},[t.additionalLinks.length?t._l(t.additionalLinks,(function(e,r){return a("v-btn",{key:r,staticClass:"px-0 mx-1",attrs:{href:e.href,target:"_blank",download:e.download,rel:"noopener noreferrer",small:"","aria-label":t.cardInfo.name,text:"",fab:"",color:"#fff"},on:{click:function(t){t.stopPropagation()}}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-"+t._s(e.icon))])],1)})):t._e(),t.isFavorite?a("v-btn",{staticClass:"px-0 mx-1",attrs:{small:"",text:"","aria-label":"Favorite",fab:"",color:t.cardInfo.favorite?"error":"#fff"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.toggleFavorite.apply(null,arguments)}}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-heart")])],1):t._e()],2)],1)])],1)],1)},n=[],o=a("ade3"),i=a("5530"),c=(a("b64b"),a("a6f4")),s=Object(c["h"])({name:"TheCard",props:{cardRoute:{type:Object,required:!0},cardInfo:{type:Object,required:!0},isFavorite:{type:Boolean}},setup:function(t,e){var r=Object(c["Q"])(t),n=r.cardInfo,s=r.cardRoute,d=Object(c["b"])((function(){var t=[],e=n.value,a=e.bggURL,r=e.rulesURL,o=e.melodiceURL;if(a){var i={href:a,name:"Board game geek",icon:"cards"};t.push(i)}if(r){var c={href:r,name:"Rules",icon:"book-open-variant",download:!0};t.push(c)}if(o){var s={href:o,name:"Melodice",icon:"music"};t.push(s)}return t})),l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"jpg",e=n.value,r=e.imageUrl,o=e.teams;return r?o?a("e679")("./game.".concat(t)):r:a("544f")("./team.".concat(t))},f=Object(c["b"])((function(){var t=Object(i["a"])({},s.value);return t.params=Object(o["a"])({},Object.keys(s.value.params)[0],n.value._id),t})),u=function(){var t=!n.value.favorite,a={favorite:t,_id:n.value._id};e.emit("favorite",a)};return{additionalLinks:d,formattedRoute:f,getImagePath:l,toggleFavorite:u}}}),d=s,l=(a("dfa8"),a("2877")),f=a("6544"),u=a.n(f),p=a("8336"),m=a("b0af"),v=a("99d9"),g=a("132d"),b=a("adda"),h=a("8860"),_=a("da13"),w=a("5d23"),k=a("1baa"),I=a("34c3"),y=a("490a"),C=a("0fd9"),j=Object(l["a"])(d,r,n,!1,null,"4ed5da68",null);e["default"]=j.exports;u()(j,{VBtn:p["a"],VCard:m["a"],VCardTitle:v["c"],VIcon:g["a"],VImg:b["a"],VList:h["a"],VListItem:_["a"],VListItemContent:w["a"],VListItemGroup:k["a"],VListItemIcon:I["a"],VProgressCircular:y["a"],VRow:C["a"]})},c368:function(t,e,a){t.exports=a.p+"img/team.bf4c6f13.webp"},cdc8:function(t,e,a){t.exports=a.p+"img/game.711fd041.jpg"},de2b:function(t,e,a){},dfa8:function(t,e,a){"use strict";a("de2b")},e679:function(t,e,a){var r={"./game.jpg":"cdc8","./game.webp":"4f0c"};function n(t){var e=o(t);return a(e)}function o(t){if(!a.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}n.keys=function(){return Object.keys(r)},n.resolve=o,t.exports=n,n.id="e679"}}]);
//# sourceMappingURL=chunk-46b20e66.3999486e.js.map