<template>
 <v-row>
   <template v-if="isLoading">
     <v-col
       cols="4"
       v-for="id in Array(6).fill('#').map((val, idx) => idx)"
      :key="id"
     >
       <v-skeleton-loader
         class="mx-auto"
         max-width="300"
         type="card"
       />
     </v-col>
   </template>
   <template v-else>
     <v-col
      cols="4"
      v-for="film in films"
      :key="film.id"
     >
       <FilmCard
         :film="film"
       />
     </v-col>
   </template>
 </v-row>
</template>

<script>
import FilmCard from '@/components/FilmCard'
import { ref } from '@vue/composition-api'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'Home',
  components: {
    FilmCard
  },
  setup () {
    const store = useStore()
    const films = ref([])
    const isLoading = ref()
    const getFilm = async () => {
      isLoading.value = true
      const { result, data } = await store.dispatch('films/getFilms')
      isLoading.value = false
      if (result) {
        films.value = data.results
      }
      console.log(films)
    }
    getFilm()
    return {
      films,
      isLoading
    }
  }
}
</script>
<style>
.card-reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
