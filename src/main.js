import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material';
import Vuex from 'vuex';
import './assets/scss/main.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
