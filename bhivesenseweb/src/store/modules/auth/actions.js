/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: component that implements all the actions concerning login and logout
*/

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
    IMAGE_ACTION
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
            expiresIn: null
        })
        localStorage.removeItem('userData')
        if (timer) {
            clearTimeout(timer)
        }
    },

    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem('userData')
        console.log(userDataString)
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
            let expirationTime = +response.data.body.expiresIn * 1000
                //let expirationTime = 5000
            timer = setTimeout(() => {
                context.dispatch(AUTO_LOGOUT_ACTION)
            }, expirationTime)
            let tokenData = {
                _id: response.data.body._id,
                firstname: response.data.body.firstname,
                lastname: response.data.body.lastname,
                level: response.data.body.level,
                img: response.data.body.img,
                expiresIn: expirationTime,
                token: response.headers.authorization
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
        console.log(payload.img)
        context.commit(SET_IMAGE_MUTATION, payload)
    }
}