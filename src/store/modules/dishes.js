import axios from 'axios'

const state = {
    dishes: []
};

const getters = {
    allDihes: state => state.dishes,
};

const actions = {
    async fetchDishes({commit}) {
        axios.get('/')
            .then(resp => {
                commit('setDishes', resp.data);
            })
    },
};

const mutations = {
    setDishes(state, payload) {
        state.dishes = payload
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}