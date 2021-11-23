<template>
  <div>
    <v-card
      elevation="2"
    >
      <v-img max-height="300" :src="character.picture"></v-img>
      <v-card-title>
        Name :
        {{ character.name }}
      </v-card-title>
      <v-card-subtitle class="pa-1 pl-4">
        Birth year :
        {{ character.birth_year }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4">
        Eye color :
        {{ character.eye_color }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4">
        Gender :
        {{ character.gender }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4">
        Mass :
        {{ character.mass }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4">
        Height :
        {{ character.height }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4">
        Skin color :
        {{ character.skin_color }}
      </v-card-subtitle>
      <v-card-subtitle class="pa-1 pl-4 pb-4">
        Hair color :
        {{ character.hair_color }}
      </v-card-subtitle>
    </v-card>
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
              style="text-transform: lowercase;"
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

export default {
  name: 'Character',
  setup () {
    const { route, router } = useRouter()
    const character = ref({})
    const store = useStore()
    const comments = ref([])
    const showCharacter = async () => {
      const { result, data } = await store.dispatch('characters/getCharacter', {
        id: route.value.params.characterId
      })
      if (result) {
        character.value = data
      }
      console.log(route.value.params.characterId)
    }
    showCharacter()
    const isCommentsLoading = ref(true)
    const showComments = async () => {
      isCommentsLoading.value = true
      const { result, data } = await store.dispatch('comments/getSomeComments', { id: route.value.params.characterId })
      if (result) {
        comments.value = data
      }
      isCommentsLoading.value = false
    }
    showComments()
    return {
      router,
      character,
      comments,
      isCommentsLoading
    }
  }
}
</script>

<style scoped>

</style>
