export const IS_USER_AUTHENTICATED_GETTER = '[getters] is user autenticated'

import {
    LOGIN_ACTION,
    AUTH_ACTION,
    LOGOUT_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    AUTO_LOGIN_ACTION,
    AUTO_LOGOUT_ACTION,
    SET_AUTO_LOGOUT_MUTATION,
    SET_IMAGE_MUTATION,
    AUTO_IMAGE_ACTION,
    IMAGE_ACTION,
    AUTO_NUMEVENTS_ACTION,
    NUMEVENTS_ACTION,
    SET_NUMEVENTS_MUTATION
} from '../../storeconstants'

import axios from 'axios'

let timer = '';

export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            _id: null,
            firstname: null,
            lastname: null,
            level: null,
            token: null,
            img: null,
            expiresIn: null,
        })
        localStorage.removeItem('userData')
        if (timer) {
            clearTimeout(timer)
        }
    },

    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem('userData')
        if (userDataString) {
            let userData = JSON.parse(userDataString)
            let expirationTime = userData.expiresIn - new Date().getTime()
            if (expirationTime < 10000) {
                context.dispatch(AUTO_LOGOUT_ACTION)
            } else {
                timer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION)
                }, expirationTime)
            }
            context.commit(SET_USER_TOKEN_DATA_MUTATION, userData)
        }
    },

    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION)
        context.commit(SET_AUTO_LOGOUT_MUTATION)
    },

    async [AUTH_ACTION](context, payload) {
        let postData = {
            username: payload.username,
            password: payload.password,
            device: payload.device
        }
        let response = await axios.post(payload.url, postData)
        if (response.data.http === 200) {
            let expirationTime = response.data.body.expiresIn * 1000
            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }, expirationTime)
            let img
            response.data.body.img == '' ? img = 'https://bhsapi.duartecota.com/img/avatar.png' : img = response.data.body.img
            let tokenData = {
                _id: response.data.body._id,
                firstname: response.data.body.firstname,
                lastname: response.data.body.lastname,
                name: response.data.body.name,
                email: response.data.body.email,
                level: response.data.body.level,
                img: img,
                expiresIn: expirationTime,
                token: response.headers.authorization,
                numEvents: null
            }
            localStorage.setItem('userData', JSON.stringify(tokenData))
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
            return true
        } else return false
    },

    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: 'https://bhsapi.duartecota.com/auth'

        })
    },

    async [AUTO_IMAGE_ACTION](context, payload) {
        return context.dispatch(IMAGE_ACTION, {
            ...payload
        })
    },

    [IMAGE_ACTION](context, payload) {
        context.commit(SET_IMAGE_MUTATION, payload)
    },

    async [AUTO_NUMEVENTS_ACTION](context, payload) {
        return context.dispatch(NUMEVENTS_ACTION, {
            ...payload
        })
    },

    [NUMEVENTS_ACTION](context, payload) {
        context.commit(SET_NUMEVENTS_MUTATION, payload)
    }

}