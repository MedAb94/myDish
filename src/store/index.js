import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import dishes from "@/store/modules/dishes";
import users from "@/store/modules/users";
export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dishes,
    users
  }
})
