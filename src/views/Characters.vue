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
      router.push({ name: 'character', params: { characterId: getIdFromLink(item.url, 'people') } })
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
