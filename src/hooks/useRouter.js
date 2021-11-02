import { inject, ref } from '@vue/composition-api'

export const useRouter = () => {
  const router = inject('router')
  const route = ref(router.currentRoute)

  return {
    router,
    route
  }
}
