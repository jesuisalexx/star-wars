<template>
  <div>
    <v-row>
      <template v-if="isLoading">
        <v-col cols="12">
          <v-card>
            <v-skeleton-loader
              class="mx-auto"
              type="image"
            />
          </v-card>
        </v-col>
      </template>
      <template v-else class="parallax">
        <v-card
          class="ma-3"
          elevation="4"
        >
          <v-parallax
            :src="require('@/assets/darth.jpg')"
          >
            <v-carousel
              cycle
              height="430"
              show-arrows-on-hover
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="film in films"
                :key="film.url"
              >
                <v-sheet
                  height="100%"
                  style="display:flex; background: none; color: white;"
                  class="pa-3"
                >
                  <template>
                    <div
                      style="max-height: 420px; max-width: 750px"
                    >
                      <v-img
                        :src="require('@/assets/star-wars-white.svg')"
                        height="370px"
                        style="fill: white"
                      />
                    </div>
                  </template>
                  <template>
                    <div
                      style="max-height: 420px; max-width: 50%; margin-left: 20px;"
                    >
                      <template>
                        <v-card-text
                          color="white"
                        >
                          <p class="text-h3">Star Wars - {{ film.title }}</p>
                          <div class="d-flex align-center my-4 text-subtitle-1">
                            <v-icon
                              small
                              color="white"
                              class="mr-2"
                            >
                              mdi-calendar
                            </v-icon>
                            Date of release • {{ film.release_date }}
                          </div>
                          <div> Directors • {{ film.director }} <br> Producers • {{ film.producer }}</div>
                        </v-card-text>
                        <v-card-text
                          color="white"
                        >
                          <v-card-title class="pa-0">
                            Opening crawl
                          </v-card-title>
                          <div>
                            {{ film.opening_crawl }}
                          </div>
                        </v-card-text>
                      </template>
                    </div>
                  </template>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-parallax>
        </v-card>
      </template>
    </v-row>
    <div  class="pa-3 cards-row">
      <template v-if="isLoading">
        <div
          v-for="id in Array(6).fill('#').map((val, idx) => idx)"
          :key="id"
        >
          <v-card>
            <v-skeleton-loader
              class="mx-auto"
              type="image"
            />
            <v-skeleton-loader
              type="card-heading"
            />
            <v-skeleton-loader
              type="list-item-three-line"
              max-height="38"
            />
            <v-skeleton-loader
              type="actions"
            />
          </v-card>
        </div>
      </template>
      <template v-else>
        <v-col
          class="card-wrap"
          v-for="film in films"
          :key="film.id"
        >
          <FilmCard
            :film="film"
          />
        </v-col>
      </template>
    </div>
  </div>
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
      isLoading,
      dialog: true
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
@media all and (max-width: 375px){
.cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.card-wrap {
  width: 100%;
}
}
</style>
