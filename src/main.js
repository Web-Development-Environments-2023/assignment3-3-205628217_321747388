import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  ModalPlugin,
  IconsPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  ModalPlugin,
  IconsPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  server_domain: "http://localhost:3000",
  lastSearch: sessionStorage.lastSearch,
  favorite_list: localStorage.favorite_list,
  viewed_list: localStorage.viewed_list,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    sessionStorage.removeItem("lastSearch");
    this.last_search = undefined;
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    sessionStorage.removeItem("lastSearch");
    this.username = undefined;
    this.favorite_list = [];
    this.viewed_list = [];
    this.last_search = undefined;
  },
  updateFavoriteList(favorite_list) {
    console.log("update Favorite List");
    localStorage.setItem("favorite_list", favorite_list);
    this.favorite_list = favorite_list;
  },
  updateViewedList(viewed_list) {
    console.log("update Viewed List")
    localStorage.setItem("viewed_list", viewed_list);
    this.viewed_list = viewed_list;
  },
  setLastSearch(searchDetails){
    this.lastSearch = searchDetails;
    sessionStorage.setItem("lastSearch", this.lastSearch);
  }

};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
