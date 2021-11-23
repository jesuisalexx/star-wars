export default {
  namespaced: true,
  actions: {
    getSomeComments ({ dispatch }, { id }) {
      return dispatch(
        'socialApi/get',
        {
          path: `posts/${id}/comments`
        },
        { root: true }
      )
    }
  }
}
