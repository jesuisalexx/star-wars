export default {
  namespaced: true,
  actions: {
    async getCharacter ({ dispatch }, { id, withPhoto = true }) {
      const { result, data } = await dispatch(
        'api/get',
        {
          path: `people/${id}`
        },
        { root: true }
      )
      if (result && withPhoto) {
        const { result: photoResult, data: characterPhoto } = await dispatch(
          'photoApi/getPhoto',
          `Star Wars ${data.name}`,
          { root: true }
        )
        if (photoResult) {
          data.picture = characterPhoto
        }
      }
      return { result, data }
    },
    getAllCharacters ({ dispatch }) {
      return dispatch(
        'api/get',
        {
          path: 'people'
        },
        { root: true }
      )
    }
  }
}
