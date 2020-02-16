import Vue from 'vue'
import App from './App.vue'

Vue.use(require('vue-shortkey'), {prevent: ['input', 'textarea']})

new Vue({
  el: '#app',
  render: h => h(App),
});
