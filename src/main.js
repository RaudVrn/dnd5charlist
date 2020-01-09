import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueTextareaAutosize from 'vue-textarea-autosize'
import Routes from './routes'
import Vuex from 'vuex';
import state from './store/state';
import getters from './store/getters';
import mutations from './store/mutations';
import actions from './store/actions';

Vue.use(Vuex);
Vue.use(VueTextareaAutosize);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
});

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
	router,
	store,
}).$mount('#app');
