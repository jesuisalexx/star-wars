<template>
  <!-- App.vue -->
  <v-app>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/">
        <v-img
          :src="require('@/assets/star-wars.svg')"
          class="logo"
        />
      </router-link>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: null,
    links: [
      {
        label: 'Films',
        url: {
          name: 'home'
        }
      },
      {
        label: 'Characters',
        url: {
          name: 'characters'
        }
      }
    ]
  })
}
</script>

<style lang="scss">
.logo {
  width: 50px;
  height: 25px;
  position: absolute;
  cursor: pointer;
}
.character-link {
  position: absolute;
  left: 55px;
  top: 100px;
  text-decoration: none;
}
</style>
