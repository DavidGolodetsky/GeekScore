(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"0160":function(e,t,i){},"5f8c":function(e,t,i){"use strict";i("784b")},"784b":function(e,t,i){},bc13:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"home-page",attrs:{"aria-labelledby":"greeting"}},[i("h1",{staticClass:"app-headline text-center mb-6",attrs:{id:"greeting"}},[e._v(" Welcome to Geek Score! ")]),i("v-timeline",{staticClass:"mb-10",attrs:{dark:"","align-top":"",dense:e.$vuetify.breakpoint.smAndDown}},e._l(e.demoSteps,(function(t){var s=t.title,n=t.icon,o=t.text;return i("v-timeline-item",{key:s,attrs:{color:"secondary",icon:"mdi-"+n,"fill-dot":""}},[i("v-card",{attrs:{color:"silver",light:""}},[i("v-card-title",{staticClass:"title"},[e._v(" "+e._s(s)+" ")]),i("v-card-text",{staticClass:"white text--primary"},[i("p",[e._v(e._s(o))])])],1)],1)})),1),i("div",{staticClass:"row_center"},[i("v-btn",{staticClass:"submit-btn mb-10",attrs:{ripple:"",type:"submit",to:{name:e.loggedInUser?"games":"signIn"}}},[e._v(" "+e._s(e.loggedInUser?"Games":"Sign In")+" ")])],1),e._m(0)],1)},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"row_center"},[i("p",{staticClass:"version-message"},[e._v(" This version is under construction now. You can play around with new features, but for a more reliable experience please visit "),i("a",{staticClass:"link",attrs:{href:"https://geekscore.netlify.app/"}},[e._v(" GeekScore 0.1")])])])}],o=i("a6f4"),a=Object(o["h"])({name:"HomePage",setup:function(e,t){var i=t.root.$store,s=Object(o["b"])((function(){return i.state.user.user})),n=[{title:"Games",text:"Add your favorite board games. Add more info about this awesome game!",color:"warning",icon:"dice-multiple-outline"},{title:"Teams",text:"Create team of buddies to dive in the world of board games! You can add as many teams per game as you want.",color:"accent",icon:"account-group-outline"},{title:"Rounds",text:"When team is ready to play - roll the dice! Add result of your game to rounds table which is there per team in this game.",color:"info",icon:"sword-cross"},{title:"Statistics",text:"Check out statistics - see who is the best!",color:"success",icon:"chart-bar"}];return{loggedInUser:s,demoSteps:n}}}),r=a,l=(i("5f8c"),i("2877")),c=i("6544"),m=i.n(c),d=i("8336"),h=i("b0af"),u=i("99d9"),v=i("5530"),p=(i("0160"),i("58df")),g=i("7560"),f=Object(p["a"])(g["a"]).extend({name:"v-timeline",provide:function(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes:function(){return Object(v["a"])({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse},this.themeClasses)}},render:function(e){return e("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}}),b=(i("c96a"),i("9d26")),_=i("a9ad"),C=Object(p["a"])(_["a"],g["a"]),w=C.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(b["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var e=this.setBackgroundColor(this.color);return this.$createElement("div",Object(v["a"])({staticClass:"v-timeline-item__inner-dot"},e),[this.hasIcon&&this.genIcon()])},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider:function(){var e=[];return this.hideDot||e.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},e)},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render:function(e){var t=[this.genBody(),this.genDivider()];return this.$slots.opposite&&t.push(this.genOpposite()),e("div",{staticClass:"v-timeline-item",class:Object(v["a"])({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right},this.themeClasses)},t)}}),y=Object(l["a"])(r,s,n,!1,null,"74e4d617",null);t["default"]=y.exports;m()(y,{VBtn:d["a"],VCard:h["a"],VCardText:u["b"],VCardTitle:u["c"],VTimeline:f,VTimelineItem:w})}}]);
//# sourceMappingURL=home.427aca7e.js.map