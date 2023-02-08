/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of constants to be used in the getters, actions and mutations components
*/

export const LOGIN_ACTION = '[actions] login user'
export const LOGOUT_ACTION = '[actions] logout user'
export const AUTH_ACTION = '[actions] do user auth'
export const AUTO_LOGIN_ACTION = '[actions] auth auto-login'
export const AUTO_LOGOUT_ACTION = '[actions] auth log-out'
export const SET_USER_TOKEN_DATA_MUTATION = '[mutations] set user token data'
export const LOADING_SPINNER_SHOW_MUTATION = '[mutations] show loading spinner'
export const SET_AUTO_LOGOUT_MUTATION = '[mutations] set autologout'
export const GET_USER_TOKEN_GETTER = '[getters] auth user token'
export const IS_USER_AUTHENTICATED_GETTER = '[getters] is user autenticated'
export const GET_USER_LEVEL_GETTER = '[getters] user level'
export const GET_USER_ID_GETTER = '[getters] user id'
export const GET_USER_NAME_GETTER = '[getters] user name'
export const GET_USER_FULLNAME_GETTER = '[getters] user full name'
export const GET_USER_EMAIL_GETTER = '[getters] user email'
export const GET_USER_AVATAR_GETTER = '[getters] user avatar'
export const GET_NUMEVENTS_GETTER = '[getters] num events'

export const SET_IMAGE_MUTATION = '[mutations] set user image'
export const AUTO_IMAGE_ACTION = '[actions]  image change'
export const IMAGE_ACTION = '[actions] set new image'

export const SET_NUMEVENTS_MUTATION = '[mutations] set num events'
export const AUTO_NUMEVENTS_ACTION = '[actions]  change num events'
export const NUMEVENTS_ACTION = '[actions] set new numevents'