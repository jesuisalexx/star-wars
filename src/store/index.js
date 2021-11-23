import Vue from 'vue'
import Vuex from 'vuex'
import films from '@/store/films'
import api from '@/store/api'
import characters from '@/store/characters'
import photoApi from '@/store/photoApi'
import planets from '@/store/planets'
import socialApi from '@/store/socialApi'
import comments from '@/store/comments'
import starships from '@/store/starships'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    films,
    api,
    characters,
    photoApi,
    planets,
    socialApi,
    comments,
    starships
  }
})
