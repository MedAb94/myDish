<template>
  <div>
    <section class="inscription primary--text light">

      <v-container>
        <v-row class="justify-center" align="center">
          <v-col cols="12" md="5">
            <v-card class="px-8 py-2" width="450" height="500">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th>
                      Dish
                    </th>
                    <th class="text-center">
                      Count
                    </th>
                    <th class="text-center">
                      Price
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="doc in allDihes.filter(d =>dayOrder.includes(d.id))" :key="doc.id">
                    <td>{{ doc.name }}</td>
                    <td class="text-center">
                      {{ dayOrder.filter(e => e == doc.id).length }}
                    </td>
                    <td class="text-center">
                      {{ Number(dayOrder.filter(e => e == doc.id).length) * doc.price }}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td class="text-center">

                    </td>
                    <td class="text-center font-weight-bold">
                      Total : {{ 210 }}
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Connexion",
  data() {
    return {
      loading: false,
      error: "",
      user: {
        username: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Obligatoire",
        min: v => v.length >= 6 || "Min 6 characters",
        passMatch: v =>
            v === this.user.password ||
            `Password and password confirmation don't match`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Votre email est invalide.";
        }
      },
      show1: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      let user = this.user;
      this.$store
          .dispatch("login", user)
          .then(res => {
            this.loading = false;
            this.$router.push({name: 'Home'})
          })
          .catch(err => {
            this.loading = false;
            console.log(err.response);
            if (err.response.status == 400) {
              this.error = err.response.data.incorrectLogin[0];
            } else {
              this.error = err.response.data.incorrectLogin;
              this.$router.push({
                name: "MailVerification",
                params: {email: this.user.email}
              });
            }
          });
    }
  },
  computed: {
    ...mapGetters(["dayOrder", "allDihes"])
  },
  created() {
    this.$store.dispatch("getDayOrder")
    this.$store.dispatch("fetchDishes")
  }
}
;
</script>

<style scoped>
.input-form {
  background: rgba(142, 144, 166, 0.1);
  width: 100%;
  border-radius: 2px;
}

.input-form:focus {
  background: rgba(142, 144, 166, 0.3);
}
</style>