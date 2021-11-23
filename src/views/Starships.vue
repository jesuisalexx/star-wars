<template>
  <div>
    <div
      v-for="starship in starships"
      :key="starship.id"
    >
    </div>
    <template>
      <v-data-table
        :headers="headers"
        :items="starships"
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
  name: 'Starships',
  setup () {
    const store = useStore()
    const starships = ref([])
    const { router } = useRouter()

    const getStarships = async () => {
      const { result, data } = await store.dispatch('starships/getAllStarships')
      if (result) {
        starships.value = data.results
      }
      console.log(starships)
    }
    getStarships()

    const onClickRow = (item) => {
      router.push({ name: 'starship', params: { starshipId: getIdFromLink(item.url, 'starships') } })
      console.log(item)
    }
    return {
      starships,
      onClickRow,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Length', value: 'length' },
        { text: 'Crew', value: 'crew' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
