<template>
    <v-sheet
      class="pa-5"
      color="white"
      elevation="1"
    >
      <h1> Name - {{ planet.name }}</h1>
    </v-sheet>
</template>

<script>
import { useRouter } from '@/hooks/useRouter'
import { ref } from '@vue/composition-api'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'Planet',
  setup () {
    const { route, router } = useRouter()
    const planet = ref({})
    const store = useStore()
    const showPlanet = async () => {
      const { result, data } = await store.dispatch('planets/getPlanet', { id: route.value.params.planetId })
      if (result) {
        planet.value = data
      }
      console.log(planet.value)
    }
    showPlanet()
    return {
      router,
      planet
    }
  }
}
</script>

<style scoped>

</style>
