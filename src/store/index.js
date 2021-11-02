import Vue from 'vue'
import Vuex from 'vuex'
import films from '@/store/films'
import api from '@/store/api'
import characters from '@/store/characters'
import photoApi from '@/store/photoApi'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    films,
    api,
    characters,
    photoApi
  }
})
