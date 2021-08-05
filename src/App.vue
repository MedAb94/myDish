<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="App logo"
            class="shrink mr-2"
            contain
            src="@/assets/dish.png"
            transition="scale-transition"
            width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn text :to="{name: 'Home'}" class="white--text">Home</v-btn>
      <!--      <v-btn text :to="{name: 'History'}" class="white&#45;&#45;text">History</v-btn>-->
      <v-btn text :to="{name: 'About'}" class="white--text">About</v-btn>
      <!--      <v-btn text :to="{name: 'Result'}" class="white&#45;&#45;text">Final Order</v-btn>-->
      <v-spacer></v-spacer>

      <v-btn
          text
          :to="{name: 'Login'}"
          v-if="!isLoggedIn"
      >
        <v-icon>mdi-account</v-icon>
        Login
      </v-btn>
      <v-btn text v-else @click="logout">
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => location.reload())
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  created() {
    this.$store.dispatch("getUserChoices")
  }
};
</script>
