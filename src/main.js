import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)
Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  provide: {
    router,
    store
  },
  render: h => h(App)
}).$mount('#app')
