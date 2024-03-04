import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store";
import "./assets/tailwind.css";

import i18n from "./tools/i18n.js";
import id from "vee-validate/dist/locale/id";
import en from "vee-validate/dist/locale/en";
import VueJamIcons from "vue-jam-icons";
import Notifications from "vue-notification";
import VeeValidate, { Validator } from "vee-validate";

import "jam-icons/css/jam.min.css";

Validator.localize("id", id);
Validator.localize("en", en);
Vue.use(VueJamIcons);
Vue.use(Notifications);
Vue.use(VeeValidate, {
  // fieldsBagName: 'vvFields',
  inject: true,
  fieldsBagName: "veeFields",
  // errorBagName: 'veeErrors'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
