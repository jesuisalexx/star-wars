<template>
  <div>
    <div
      v-for="planet in planets"
      :key="planet.id"
    >
    </div>
    <template>
      <v-data-table
        :headers="headers"
        :items="planets"
        class="elevation-1"
        hide-default-footer
        @click:row="onClickRow"
      ></v-data-table>
    </template>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useStore } from '@/hooks/useStore'
import { useRouter } from '@/hooks/useRouter'
import { getIdFromLink } from '@/utils/workaround'

export default {
  name: 'Planets',
  setup () {
    const store = useStore()
    const planets = ref([])
    const { router } = useRouter()

    const getPlanets = async () => {
      const { result, data } = await store.dispatch('planets/getAllPlanets')
      if (result) {
        planets.value = data.results
      }
      console.log(planets)
    }
    getPlanets()

    const onClickRow = (item) => {
      router.push({ name: 'planet', params: { planetId: getIdFromLink(item.url, 'planets') } })
      console.log(item)
    }
    return {
      planets,
      onClickRow,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Diameter', value: 'diameter' },
        { text: 'Population', value: 'population' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
