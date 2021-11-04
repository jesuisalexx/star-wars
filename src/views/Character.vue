<template>
  <div>
    <v-img :src="character.picture"></v-img>
    <v-card-title>
      Name :
      {{ character.name }}
    </v-card-title>
    <v-card-title>
      Birth year :
      {{ character.birth_year }}
    </v-card-title>
    <v-card-title>
      Eye color :
      {{ character.eye_color }}
    </v-card-title>
    <v-card-title>
      Gender :
      {{ character.gender }}
    </v-card-title>
    <v-card-title>
      Mass :
      {{ character.mass }}
    </v-card-title>
    <v-card-title>
      Height :
      {{ character.height }}
    </v-card-title>
    <v-card-title>
      Skin color :
      {{ character.skin_color }}
    </v-card-title>
    <v-card-title>
      Hair color :
      {{ character.hair_color }}
    </v-card-title>
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
    const showCharacter = async () => {
      const { result, data } = await store.dispatch('characters/getCharacter', route.value.params.characterId)
      if (result) {
        character.value = data
      }
      console.log(character.value)
    }
    showCharacter()
    return {
      router,
      character
    }
  }
}
</script>

<style scoped>

</style>
