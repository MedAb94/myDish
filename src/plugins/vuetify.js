import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: false,
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#0d3384",

            },
            dark: {

            },
        },
    },
});
