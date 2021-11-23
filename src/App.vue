<template>
  <!-- App.vue -->
  <v-app>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.url"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
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
        <BreadCrumbs class="pb-4" />
        <template>
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >
              <v-card>
                <v-card-title class="text-h5">
                  Welcome!
                </v-card-title>
                <v-card-text>Алейкум ассалам брат,это фан сайт звездных войн, жи ес!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    Похуй
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs'
export default {
  name: 'App',
  components: {
    BreadCrumbs
  },
  data: () => ({
    dialog: true,
    drawer: null,
    links: [
      {
        label: 'Films',
        url: {
          name: 'home'
        },
        icon: 'mdi-image'
      },
      {
        label: 'Characters',
        url: {
          name: 'characters'
        },
        icon: 'mdi-account-group-outline'
      },
      {
        label: 'Planets',
        url: {
          name: 'planets'
        },
        icon: 'mdi-planet'
      },
      {
        label: 'Starships',
        url: {
          name: 'starships'
        },
        icon: 'mdi-star'
      }
    ]
  })
}
</script>

<style lang="scss">
@import "media.scss";
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
