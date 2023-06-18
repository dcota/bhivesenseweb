import { createStore } from "vuex"
import auth from './modules/auth/index'
import { LOADING_SPINNER_SHOW_MUTATION } from './storeconstants';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        auth,
    },
    state() {
        return {
            showLoader: false
        }
    },
    mutations: {
        [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
            state.showLoader = payload
        }

    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
})

export default store