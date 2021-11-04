<template>
  <div>
    <div>
      <v-img
        :src="film.picture"
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
        Producer:
        {{ film.producer }}
      </v-card-title>
      <v-card-title style="width: 70%;">
        Opening Crawl:
        {{ film.opening_crawl }}
      </v-card-title>
      <v-card-title>
        Characters :
        <div
          style="padding: 5px"
          v-for="character in characters"
          :key="character.id"
        >
          {{ character.data.name }}
        </div>
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
      const { result, data } = await store.dispatch('films/getFilmData', route.value.params.filmId)
      if (result) {
        film.value = data
        characters.value = await Promise.all(film.value.characters.map((character) => store.dispatch('characters/getCharacter', {
          id: character.replace('https://swapi.dev/api/people/', '').replace('/', ''),
          withPhoto: false
        })))
      }
      console.log(film.value)
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
