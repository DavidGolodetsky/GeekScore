import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3D3D3C',
                secondary: '#ff9900',
                accent: '#ffb84d',
                error: '#f44336',
                warning: '#ffc107',
                info: '#03a9f4',
                success: '#8bc34a',
                silver: '#d9d9d8'
            },
        },
    },
});

