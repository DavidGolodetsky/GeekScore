import Vue from "vue";

Vue.component("TheDialog", () =>
  import(/* webpackChunkName: "theDialog" */ "@/components/TheDialog")
);

Vue.component("TheGoBack", () =>
  import(/* webpackChunkName: "theGoBack" */ "@/components/TheGoBack")
);
