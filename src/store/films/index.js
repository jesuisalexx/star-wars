export default {
  namespaced: true,
  actions: {
    getFilms ({ dispatch }) {
      return dispatch(
        'api/get',
        {
          path: 'films'
        },
        { root: true }
      )
    },
    getFilmData ({ dispatch }, filmId) {
      return dispatch(
        'api/get',
        {
          path: `films/${filmId}`
        },
        { root: true }
      )
    }
  }
}
