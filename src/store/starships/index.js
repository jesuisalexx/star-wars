export default {
  namespaced: true,
  actions: {
    async getStarship ({ dispatch }, { id, withPhoto = true }) {
      const { result, data } = await dispatch(
        'api/get',
        {
          path: `starships/${id}`
        },
        { root: true }
      )
      if (result && withPhoto) {
        const { result: photoResult, data: starshipPhoto } = await dispatch(
          'photoApi/getPhoto',
          `Star Wars ${data.name}`,
          { root: true }
        )
        if (photoResult) {
          data.picture = starshipPhoto
        }
      }
      return { result, data }
    },
    getAllStarships ({ dispatch }) {
      return dispatch(
        'api/get',
        {
          path: 'starships'
        },
        { root: true }
      )
    }
  }
}
