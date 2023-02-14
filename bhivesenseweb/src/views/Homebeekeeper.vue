/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Home
*/

<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("myDashTitle") }}</h2>
    <section class="line-1"></section>
    <!--<section class="text-center">
      <img class="my-img" :src="logo" alt="image" />
    </section>-->
  </section>
</template>

<style scoped>
.my-img {
  max-width: 30%;
  height: auto;
}

h3 {
  color: #c55a11 !important;
  position: relative;
  margin-top: 40px;
  font-family: "Times New Roman", Times, serif;
  letter-spacing: 10px;
}
</style>     

<script>
  import axios from "axios";
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { mapActions, mapGetters } from "vuex";
  import {
    IS_USER_AUTHENTICATED_GETTER,
    GET_USER_ID_GETTER,
    GET_USER_TOKEN_GETTER,
    AUTO_NUMEVENTS_ACTION,
    GET_NUMEVENTS_GETTER,
  } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        logo: require("../assets/IMG1224.png"),
        lang: lang,
      };
    },
    computed: {
      ...mapGetters("auth", {
        isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        token: GET_USER_TOKEN_GETTER,
        _id: GET_USER_ID_GETTER,
        numEvents: GET_NUMEVENTS_GETTER,
        auth: localStorage.getItem("auth"),
      }),
    },
    methods: {
      ...mapActions("auth", {
        _numEventsChng: AUTO_NUMEVENTS_ACTION,
      }),
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>
