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
      <v-btn text :to="{name: 'History'}" class="white--text">History</v-btn>
      <v-btn text :to="{name: 'About'}" class="white--text">About</v-btn>
      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
