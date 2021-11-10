export default {
  namespaced: true,
  actions: {
    async getPlanet ({ dispatch }, { id, withPhoto = true }) {
      const { result, data } = await dispatch(
        'api/get',
        {
          path: `planets/${id}`
        },
        { root: true }
      )
      if (result && withPhoto) {
        const { result: photoResult, data: planetPhoto } = await dispatch(
          'photoApi/getPhoto',
          `Star Wars ${data.name}`,
          { root: true }
        )
        if (photoResult) {
          data.picture = planetPhoto
        }
      }
      return { result, data }
    }
  }
}
