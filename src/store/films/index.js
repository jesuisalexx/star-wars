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
    async getFilmData ({ dispatch }, filmId) {
      const { result, data } = await dispatch(
        'api/get',
        {
          path: `films/${filmId}`
        },
        { root: true }
      )
      if (result) {
        const { result: photoResult, data: filmPhoto } = await dispatch(
          'photoApi/getPhoto',
          `Star Wars ${data.name}`,
          { root: true }
        )
        if (photoResult) {
          data.picture = filmPhoto
        }
      }
      return { result, data }
    },
    sendComment ({ dispatch }, { userId, title, body }) {
      return dispatch(
        'socialApi/post',
        {
          path: 'posts',
          payload: {
            title,
            body,
            userId
          }
        },
        { root: true }
      )
    }
  }
}
