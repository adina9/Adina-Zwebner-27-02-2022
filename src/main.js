import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import '@/style/global.scss'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

library.add(fas)
Vue.component('fa', FontAwesomeIcon)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
