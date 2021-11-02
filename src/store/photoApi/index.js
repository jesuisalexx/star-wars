import { createApi } from 'unsplash-js'

const unsplash = createApi({ accessKey: '7Qeuyb9bIz7RXryiz6tM0Q6C1GtlHLGUhPNqPpizY1o' })
export default {
  namespaced: true,
  actions: {
    getPhoto: async (query) => {
      const result = await unsplash.photos.getRandom({ query })

      return result.errors
        ? { result: false, data: result.errors[0] }
        : { result: true, data: result.response }
    }
  }
}
