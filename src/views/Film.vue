<template>
  <div>
    <div class="wrap">
      <v-card
        class="mr-4"
        width="400px"
      >
        <template v-if="isFilmLoading">
          <v-skeleton-loader
            class="mx-auto"
            type="card, list-item-three-line"
          />
        </template>
        <template v-else>
          <v-img
            height="250"
            :src="film.picture"
          />

          <v-card-title>Star Wars - {{ film.title }}</v-card-title>

          <v-card-text>
            <div class="d-flex align-center my-4 text-subtitle-1">
              <v-icon
                small
                color="blue-grey darken-2"
                class="mr-2"
              >
                mdi-calendar
              </v-icon>
              Date of release • {{ film.release_date }}
            </div>
            <div> Directors • {{ film.director }} <br> Producers • {{ film.producer }}</div>
          </v-card-text>
        </template>

        <v-divider class="mx-4"/>
        <template v-if="isPlanetsLoading">
          <div class="pa-3">
            <v-skeleton-loader
              type="heading"
              class="mb-4"
            />
            <v-chip-group>
              <v-skeleton-loader
                v-for="c in 3"
                :key="c"
                type="chip"
                class="mr-2"
              />
            </v-chip-group>
          </div>
        </template>
        <template v-else>
          <div class="d-flex px-4 pt-3 align-center text-subtitle-1">
            Planets
          </div>
          <div class="pa-3">
            <v-chip-group>
              <v-chip
                v-for="planet in planets"
                :key="planet.url"
                :to="{
                name: 'planet',
                params: {
                  planetId: getIdFromLink(planet.url, 'planets')
                }
              }"
              >
                {{ planet.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </template>
      </v-card>
      <v-card class="flex-grow-1">
        <template v-if="isFilmLoading">
          <v-skeleton-loader
            type="article"
          />
        </template>
        <template v-else>
          <v-card-text>
            <p class="text-h4 text--primary">
              Opening crawl
            </p>
            <div class="text--primary">
              {{ film.opening_crawl }}
            </div>
          </v-card-text>
        </template>
        <template v-if="isCharactersLoading">
          <div class="pa-3">
            <v-skeleton-loader
              type="heading"
              class="mb-4"
            />
            <v-chip-group
              column
            >
              <v-skeleton-loader
                v-for="c in 15"
                :key="c"
                type="chip"
                class="mr-4 mb-4"
              />
            </v-chip-group>
          </div>
        </template>
        <template v-else>
          <p class="text-h5 mt-5 pl-4 text--primary">
            Characters
          </p>
          <v-chip-group
            column
            class="pl-4"
          >
            <v-chip
              v-for="character in characters"
              :key="character.name"
              :to="{
                name: 'character',
                params: {
                  characterId: getIdFromLink(character.url, 'people')
                }
              }"
            >
              {{ character.name }}
            </v-chip>
          </v-chip-group>
        </template>
      </v-card>
    </div>
    <CommentForm
      ref="test"
      action="films/sendComment"
      :userId="userId"
      class="mt-2"
    />
    <v-card
      class="mt-3"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div>
        <div class="pt-4" style="display: flex; align-items: center;">
          <v-avatar
            class="ml-4"
            size="40"
          >
            <img src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
          </v-avatar>
          <div class="ml-3">
            <v-chip
              small
              class="mail"
            >
              <v-icon
                x-small
                color="blue-grey darken-2"
                class="mr-2"
              >
                mdi-email
              </v-icon>
              {{ comment.email }}
            </v-chip>
            <v-card-title class="grey--text pa-1 text-sm-subtitle-2" style="text-transform: capitalize">{{ comment.name }}</v-card-title>
          </div>
        </div>
        <div>
          <v-card-text style="max-width: 70%; text-transform: capitalize;">{{ comment.body }}</v-card-text>
        </div>
      </div>
    </v-card>
    <template v-if="isCommentsLoading">
      <v-card
        class="mt-3"
        v-for="c in 3"
        :key="c"
      >
        <div style="width: 77%">
          <div style="display: flex; align-items: center;">
            <v-skeleton-loader
              type="avatar"
              class="ml-4"
            />
            <div style="width: 40%;">
              <v-skeleton-loader
                type="card-heading"
                style="width: 60%; height: 40px;"
              />
              <v-skeleton-loader
                type="card-heading"
                style="height: 50px;"
              />
            </div>
          </div>
          <v-skeleton-loader
            type="list-item-two-line"
          />
        </div>
      </v-card>
    </template>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useRouter } from '@/hooks/useRouter'
import { useStore } from '@/hooks/useStore'
import { getIdFromLink } from '@/utils/workaround'
import CommentForm from '@/components/CommentForm'

export default {
  name: 'Film',
  components: {
    CommentForm
  },
  setup () {
    const store = useStore()
    const { route, router } = useRouter()

    const film = ref({})
    const characters = ref([])
    const planets = ref([])
    const comments = ref([])

    const isFilmLoading = ref(true)
    const getFilm = async () => {
      isFilmLoading.value = true
      const { result, data } = await store.dispatch('films/getFilmData', route.value.params.filmId)
      if (result) {
        film.value = data
      }
      isFilmLoading.value = false
      return { result }
    }

    const isCharactersLoading = ref(true)
    const getCharacters = async (characters) => {
      isCharactersLoading.value = true
      const response = await Promise.all(characters.map((characterLink) => store.dispatch('characters/getCharacter', {
        id: getIdFromLink(characterLink, 'people'),
        withPhoto: false
      })))
      isCharactersLoading.value = false
      return response
    }

    const isPlanetsLoading = ref(true)
    const getPlanets = async (planets) => {
      isPlanetsLoading.value = true
      const response = await Promise.all(planets.map((planetLink) => store.dispatch('planets/getPlanet', {
        id: getIdFromLink(planetLink, 'planets'),
        withPhoto: false
      })))
      isPlanetsLoading.value = false
      return response
    }

    const getData = async () => {
      const { result } = await getFilm()
      if (result) {
        const charactersResult = await getCharacters(film.value.characters)
        characters.value = charactersResult.map((character) => character.data)

        const planetsResult = await getPlanets(film.value.planets)
        planets.value = planetsResult.map((planet) => planet.data)
      }
    }
    getData()

    const isCommentsLoading = ref(true)
    const showComments = async () => {
      isCommentsLoading.value = true
      const { result, data } = await store.dispatch('comments/getSomeComments', { id: route.value.params.filmId })
      if (result) {
        comments.value = data
      }
      isCommentsLoading.value = false
    }
    showComments()

    const userId = route.value.params.filmId

    return {
      film,
      router,
      characters,
      isCharactersLoading,
      isFilmLoading,
      isPlanetsLoading,
      planets,
      getIdFromLink,
      comments,
      isCommentsLoading,
      userId
    }
  }
}
</script>

<style>
.wrap {
  display: flex;
  width: 100%;
}
.mail {
  text-transform: lowercase;
}
</style>
