import { createApi } from 'unsplash-js'

const unsplash = createApi({ accessKey: 'NkmDhP4ufNjXvzykTYalWapX1S2pZC2v2g-JKxErqQ4' })
export default {
  namespaced: true,
  actions: {
    getPhoto: async (context, query) => {
      console.log(query)
      const result = await unsplash.photos.getRandom({ query })

      return result.errors
        ? { result: false, data: result.errors[0] }
        : { result: true, data: result.response.urls.regular }
    }
  }
}
