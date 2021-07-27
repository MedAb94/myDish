<template>
  <v-container>
    <v-img
        :src="require('../assets/logo.jpeg')"
        contain
        height="80"
    />
    <h1 class="text-center my-3">Welcome to MyDish app</h1>
    <h3 class="text-center">{{ timestamp }}</h3>
    <v-card
        class="mx-auto"
        max-width="600"
        tile>
      <v-card-title class="primary white--text">Choose your dish for today()</v-card-title>
      <v-card-text>

        <v-list-item v-for="item in 6" two-line>
          <v-list-item-content>
            <v-list-item-title>Riz au poisson</v-list-item-title>
            <v-list-item-subtitle>Lorem ipsum dolor sit amet, consectetur.</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :disabled="disabled" @click="chooseDish">
              <v-icon color="primary">mdi-check</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

      </v-card-text>
    </v-card>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >

          <v-card>
            <v-toolbar
                dark
                color="primary"
            >
              <v-btn
                  icon
                  dark
                  @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>MyDish</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                    dark
                    text
                    @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
          <div class="text-center pt-5">
            <h1 class="my-8">Merci, à demain InchaAllh</h1>
            <v-img
                :src="require('../assets/glasses_emoji.png')"
                contain
                height="100"
            />

          </div>
          </v-card>
        </v-dialog>
      </v-row>
  </v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',
  data() {
    return {
      timestamp: '',
      disabled: false,
      dialog: false,
    }
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      this.timestamp = dateTime;
    },
    chooseDish() {
      this.dialog = true
      this.disabled = true
    }
  },
  mounted() {
    setInterval(() => {
      this.getNow()
    }, 1000)
  }
}
</script>
