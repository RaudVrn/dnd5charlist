import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueTextareaAutosize from 'vue-textarea-autosize'
import Routes from './routes'

Vue.use(VueTextareaAutosize);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
