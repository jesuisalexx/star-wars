export default {
  namespaced: true,
  actions: {
    getFilmComments ({ dispatch }, filmId) {
      return dispatch(
        'socialApi/get',
        {
          path: `posts/${filmId}/comments`
        },
        { root: true }
      )
    }
  }
}
