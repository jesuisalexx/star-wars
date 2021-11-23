<template>
  <v-card
    class="film-card mx-auto"
  >
    <v-img
      :src="require('@/assets/star-wars.svg')"
      height="200px"
    />
    <v-card-title>
      Star Wars - {{ film.title }}
    </v-card-title>
    <v-card-subtitle> Date of release : {{ film.release_date }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="showMoreInfo"
      >
        Explore
      </v-btn>
      <v-btn
        :to="{
          name: 'film',
          params: {
            filmId: film.episode_id,
          }
        }"
        text
        color="teal accent-4"
      >
        Open
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        v-if="isExpanded"
        class="film-card__reveal transition-fast-in-fast-outl"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            {{ film.title }}
          </p>
          <p> Date of release:
            {{ film.release_date }}
          </p>
          <p>
            Director:
            {{ film.director }}
          </p>
          <p>
            Producer:
            {{ film.producer }}
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="hideMoreInfo"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { ref, watch } from '@vue/composition-api'

export default {
  name: 'FilmCard',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  setup () {
    const isExpanded = ref(false)
    watch(isExpanded, () => {
      console.log('test')
    })

    const showMoreInfo = () => { isExpanded.value = true }
    const hideMoreInfo = () => { isExpanded.value = false }

    return {
      isExpanded,
      showMoreInfo,
      hideMoreInfo
    }
  }
}
</script>

<style lang="scss">
.film-card {
  &__reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute !important;
    width: 100%;
  }
}
</style>
