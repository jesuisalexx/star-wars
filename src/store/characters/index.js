export default {
  namespaced: true,
  actions: {
    getCharacter ({ dispatch }, id) {
      return dispatch(
        'api/get',
        {
          path: `people/${id}`
        },
        { root: true }
      )
    },
    getAllCharacters ({ dispatch }) {
      return dispatch(
        'api/get',
        {
          path: 'people'
        },
        { root: true }
      )
    },
    openCharacter ({ dispatch }, id) {
      return dispatch(
        'api/get',
        {
          path: `people/${id}`
        },
        { root: true }
      )
    }
  }
}
