import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.scss'


// Vue.directive('load-scroll', {
//   componentUpdated: (el, binding)=> {
//     console.log(el, binding, 'sssssss');
//   }
// })


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
