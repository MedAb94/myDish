<template>
  <div>
    <section class="inscription primary--text light">
      <v-container>
        <v-row class="justify-center" align="center">
          <v-col cols="12" md="5">
            <v-card class="px-8 py-2">
              <div class="text-center ">
                <img
                    src="../../assets/logo.jpeg"
                    width="120px"
                    class="mx-auto"
                    alt=""
                />
              </div>

              <p class="red--text text-center font-weight-bold"
                 v-if="error"
              >
                {{ error }}
              </p>
              <v-form @submit.prevent()>
                <div class="form-group">
                  <label>Nom d'utilisateur</label>
                  <v-text-field
                      v-model="user.username"
                      filled
                      :rules="[rules.required]"
                  />
                </div>
                <div class="form-group">
                  <v-row class="primary--text">
                    <v-col cols="12" class="black--text"
                    >Mot de passe
                    </v-col>

                  </v-row>

                  <div class="form-group">
                    <v-text-field
                        :append-icon="
                                            show1 ? 'mdi-eye' : 'mdi-eye-off'
                                        "
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        filled
                        required
                        v-model="user.password"
                        @click:append="show1 = !show1"
                    />
                  </div>
                </div>
                <div class=" d-flex justify-center">
                  <v-btn
                      text
                      large
                      block
                      class="primary mt-5"
                      color="white"
                      :loading="loading"
                      @click="login"
                  >
                    Se connecter
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </section>
  </div>
</template>

<script>
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
  // components: {VueReCaptcha},
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