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
        <v-list-item v-for="item in allDihes" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :disabled="hasCoosed"
                   :class="item.id===choosedDish?'primary':''"
                   @click="chooseDish(item.id)">
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

            <v-toolbar-title>MyDish</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  icon
                  dark
                  @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
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
import {mapGetters} from 'vuex'
import axios from "axios";
import fb from '@/fb.js'


export default {
  name: 'Home',
  data() {
    return {
      timestamp: '',
      dialog: false,
    }
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date = today.getFullYear() + '-' + this.formatNumber((today.getMonth()) + 1) + '-' + this.formatNumber(today.getDate());
      const time = this.formatNumber(today.getHours()) + ":" + this.formatNumber(today.getMinutes()) + ":" + this.formatNumber(today.getSeconds());
      const dateTime = date + ' ' + time;
      this.timestamp = dateTime;
    },
    chooseDish(id) {
      let user_id = Number(localStorage.getItem('id'))
      this.$store.dispatch("chooseDish", {user: user_id, dish: Number(id)}).then(res => {
        this.dialog = true
        this.$store.dispatch("fetchDishes")
      })
    },
    formatNumber(n) {
      return Number(n) < 10 ? '0' + n : n
    },
    saveNotificationToken(token) {
      const registerNotifTokenURL = 'accounts/register-notif-token/'
      const payload = {
        registration_id: token,
        type: 'web'
      }
      axios.post(registerNotifTokenURL, payload)
          .then((response) => {
            console.log('Successfully saved notification token!')
            console.log(response.data)
          })
          .catch((error) => {
            console.log('Error: could not save notification token')
            if (error.response) {
              console.log(error.response.status)
              // Most of the time a "this field must be unique" error will be returned,
              // meaning that the token already exists in db, which is good.
              if (error.response.data.registration_id) {
                for (let err of error.response.data.registration_id) {
                  console.log(err)
                }
              } else {
                console.log('No reason returned by backend')
              }
              // If the request could not be sent because of a network error for example
            } else if (error.request) {
              console.log('A network error occurred.')
              // For any other kind of error
            } else {
              console.log(error.message)
            }
          })
    },
  },
  computed: {
    ...mapGetters(["allDihes", "allUserChoices"]),
    hasCoosed() {
      if (new Date().getHours() > 13)
        return true
      let todayDate = this.formatNumber(Number(new Date().getMonth() + 1)) + "-" + new Date().getDate()
      let lastChoose = this.allUserChoices[this.allUserChoices.length - 1].date[5] + this.allUserChoices[this.allUserChoices.length - 1].date[6] + this.allUserChoices[this.allUserChoices.length - 1].date[7] + this.allUserChoices[this.allUserChoices.length - 1].date[8] + this.allUserChoices[this.allUserChoices.length - 1].date[9]
      return todayDate === lastChoose
    },
    choosedDish() {
      let id = 0;
      let todayDate = this.formatNumber(Number(new Date().getMonth() + 1)) + "-" + new Date().getDate()
      let lastChooseDate = this.allUserChoices[this.allUserChoices.length - 1].date[5] + this.allUserChoices[this.allUserChoices.length - 1].date[6] + this.allUserChoices[this.allUserChoices.length - 1].date[7] + this.allUserChoices[this.allUserChoices.length - 1].date[8] + this.allUserChoices[this.allUserChoices.length - 1].date[9]
      if (lastChooseDate === todayDate)
        id = this.allUserChoices[this.allUserChoices.length - 1].dish
      return id
    }
  },
  mounted() {
    this.$store.dispatch("fetchDishes")
    setInterval(() => {
      this.getNow()
    }, 1000);

    fb.messaging.usePublicVapidKey("BI21meW1zlVxQ4Aeu7LlKJv6sCqXz6BxpjV9m0dmLe0rbRwiP1I-8O0pUSE66Gz_yz7OtXhCTozIggSSyknqe54")

    fb.messaging.requestPermission().then(() => {
      console.log('Notification permission granted.')
      fb.messaging.getToken().then((token) => {
        console.log('New token created: ', token)
        this.saveNotificationToken(token)
      })
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err)
    })

  }
}
</script>
