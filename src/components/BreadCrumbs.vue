<template>
  <div>
    <v-breadcrumbs :items="this.$route.meta.crumbs" />
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  setup () {
  }
}
</script>

<style scoped>

</style>
