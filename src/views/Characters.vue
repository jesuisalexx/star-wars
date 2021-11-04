<template>
  <div>
    <div
      v-for="character in characters"
      :key="character.id"
    >
    </div>
    <template>
      <v-data-table
        :headers="headers"
        :items="characters"
        :items-per-page="10"
        class="elevation-1"
        @click:row="onClickRow"
      ></v-data-table>
    </template>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { useStore } from '@/hooks/useStore'
import { useRouter } from '@/hooks/useRouter'

export default {
  name: 'Characters',
  setup () {
    const store = useStore()
    const characters = ref([])
    const { router } = useRouter()

    const getCharacters = async () => {
      const { result, data } = await store.dispatch('characters/getAllCharacters')
      if (result) {
        characters.value = data.results
      }
      console.log(characters)
    }
    getCharacters()

    const onClickRow = (item) => {
      router.push({ name: 'character', params: { characterId: item.url.replace('https://swapi.dev/api/people/', '').replace('/', '') } })
      console.log(item)
    }
    return {
      characters,
      onClickRow,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Gender', value: 'gender' },
        { text: 'Height', value: 'height' },
        { text: 'Mass', value: 'mass' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
