import axios from 'axios'

const state = {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem("role") || "user",
    choices: [],
    userChoices: [],
    dayOrder: []
};

const getters = {
    isLoggedIn: state => state.token,
    role: state => state.role,
    allChoices: state => state.choices,
    allUserChoices: state => state.userChoices,
    dayOrder: state => state.dayOrder,
};

const actions = {
    async login({commit}, user) {
        return new Promise((resolve, reject) => {
            axios({url: '/accounts/login', data: user, method: 'POST'})
                .then(resp => {
                    const token = resp.data.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('id', resp.data.user.id);

                    commit('login', token)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    async logout({commit}) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            commit('logout')
            delete axios.defaults.headers.common['Authorization'];
            resolve()
        })
    },
    async chooseDish({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios({url: '/accounts/create-choice/' + payload.user + '/' + payload.dish, data: {}, method: 'POST'})
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    async getChoices({commit}) {
        axios.get('/accounts/get_choices/')
            .then(resp => {
                commit("setChoices", resp.data)
            })
            .catch(err => {

            })
    },
    async getUserChoices({commit}) {
        let user_id = Number(localStorage.getItem("id"))
        axios.get('/accounts/user-choices/' + user_id)
            .then(resp => commit("setUserChoices", resp.data))
    },
    async getDayOrder({commit}) {
        let user_id = Number(localStorage.getItem("id"))
        axios.get('/accounts/get-order')
            .then(resp => commit("setDayOrder", resp.data))
    },

};

const mutations = {

        logout: (state) => (state.token = ''),
        login: (state, token) => (state.token = token),
        setRole: (state, payload) => (state.role = payload),
        setChoices: (state, payload) => (state.choices = payload),
        setUserChoices: (state, payload) => (state.userChoices = payload),
        setDayOrder: (state, payload) => (state.dayOrder = payload)
    }
;

export default {
    state,
    getters,
    actions,
    mutations
}