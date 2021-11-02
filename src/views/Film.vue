<template>
  <div>
    <div>
      <v-img
        :src="require('@/assets/star-wars.svg')"
        height="200px"
        width="500px"
      />
      <v-card-title>
        Title:
        {{ film.title }}
      </v-card-title>
      <v-card-title>
        Date of release:
        {{ film.release_date }}
      </v-card-title>
      <v-card-title>
        Director:
        {{ film.director }}
      </v-card-title>
      <v-card-title>
        Producer:222
        {{ film.producer }}
      </v-card-title>
      <v-card-title style="width: 70%;">
        Opening Crawl:
        {{ film.opening_crawl }}
      </v-card-title>
      <v-card-title>
        Characters :
        <v-card-title
            style="padding: 5px"
            v-for="character in characters"
            :key="character.id"
        >
          {{ character.data.name }},
        </v-card-title>
      </v-card-title>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useRouter } from '@/hooks/useRouter'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'Film',
  setup () {
    const store = useStore()
    const { route, router } = useRouter()

    const film = ref({})
    const characters = ref([])
    const getFilm = async () => {
      const { result, data } = await store.dispatch(
        'films/getFilmData',
        route.value.params.filmId
      )
      if (result) {
        film.value = data
        characters.value = await Promise.all(film.value.characters.map((val) => {
          // Bad API realization workaround
          const characterId = val.replace('https://swapi.dev/api/people/', '').replace('/', '')
          return store.dispatch('characters/getCharacter', characterId)
        }))
        console.log(characters.value)
      }
    }
    getFilm()

    return {
      film,
      router,
      characters
    }
  }
}
</script>

<style scoped>

</style>
