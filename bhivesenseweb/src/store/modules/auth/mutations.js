/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of project mutations of the autentication state
*/

import { SET_USER_TOKEN_DATA_MUTATION, SET_AUTO_LOGOUT_MUTATION, SET_IMAGE_MUTATION, SET_NUMEVENTS_MUTATION } from "../../storeconstants";

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state._id = payload._id
        state.firstname = payload.firstname
        state.lastname = payload.lastname
        state.level = payload.level
        state.token = payload.token
        state.img = payload.img
        state.autoLogout = false
        state.numEvents = payload.numEvents
    },

    [SET_AUTO_LOGOUT_MUTATION](state) {
        state.autoLogout = true
    },

    [SET_IMAGE_MUTATION](state, payload) {
        state.img = payload.img
    },

    [SET_NUMEVENTS_MUTATION](state, payload) {
        state.numEvents = payload.numEvents
    },


}