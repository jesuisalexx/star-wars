<template>
  <!-- App.vue -->
  <v-app>
    <v-navigation-drawer app>
      <v-btn
      to="/characters"
      class="character-link"
      >
        Characters
      </v-btn>
    </v-navigation-drawer>

    <v-app-bar app>
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
  components: {}
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
