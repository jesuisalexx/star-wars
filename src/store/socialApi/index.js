import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000
})

export default {
  namespaced: true,
  actions: {
    async request (context, { method, path, payload }) {
      try {
        const res = await axiosIns[method](path, payload)
        return {
          result: true,
          data: res.data || null,
          status: res.status
        }
      } catch (err) {
        return {
          result: false,
          data: err.response?.data || null,
          status: err.response?.status
        }
      }
    },
    get: ({ dispatch }, { path, payload }) =>
      dispatch('request', {
        method: 'get',
        path,
        payload: { params: payload }
      }),
    post: ({ dispatch }, { path, payload }) =>
      dispatch('request', {
        method: 'post',
        path,
        payload
      }),
    put: ({ dispatch }, { path, payload }) =>
      dispatch('request', {
        method: 'put',
        path,
        payload
      }),
    patch: ({ dispatch }, { path, payload }) =>
      dispatch('request', {
        method: 'patch',
        path,
        payload
      }),
    delete: ({ dispatch }, { path, payload }) =>
      dispatch('request', {
        method: 'delete',
        path,
        payload: {
          data: payload
        }
      })
  }
}
