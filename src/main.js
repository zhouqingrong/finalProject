// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import JsonExcel from 'vue-json-excel'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icons/iconfont/iconfont.js'
// import "./styles/base.scss";

Vue.use(ElementUI);
Vue.component('downloadExcel', JsonExcel);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
