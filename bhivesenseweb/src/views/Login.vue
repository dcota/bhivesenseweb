/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Login
*/

<template>
  <section class="container">
    <section class="jumbotron d-flex align-items-center min-vh-100">
      <form
        class="form-signin"
        v-on:submit.prevent="login"
        style="border-radius: 30px"
      >
        <section v-if="isShow">
          <section class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </section>
          <section class="mb-2">{{ translate("spinnerTxt") }}</section>
        </section>
        <section class="alert alert-danger" v-if="error">{{ error }}</section>
        <h2 class="form-signin-heading">Login</h2>
        <input
          type="text"
          v-model="form.username"
          class="form-control mt-4"
          id="username"
          placeholder="username"
          required=""
          autofocus=""
        />
        <input
          type="password"
          v-model="form.password"
          class="form-control mt-4"
          id="password"
          placeholder="password"
          required=""
        />
        <button class="btn btn-lg btn-primary btn-block mt-4 bn" type="submit">
          {{ translate("btnSubmit") }}
        </button>
      </form>
    </section>
  </section>
</template>

<style scoped>
.bn {
  background-color: #ebc002;
  border-color: #ebc002;
  width: 150px;
}
.bn:hover {
  background-color: #947902;
  border-color: #947902;
}
.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>

<script>
  import axios from "axios";
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import {
    LOADING_SPINNER_SHOW_MUTATION,
    LOGIN_ACTION,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
    AUTO_NUMEVENTS_ACTION,
  } from "../store/storeconstants";
  export default {
    name: "login",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          username: "",
          password: "",
        },
        error: "",
        isShow: false,
        lang: lang,
      };
    },
    computed: {
      ...mapGetters("auth", {
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
      }),
    },
    methods: {
      ...mapActions("auth", {
        _login: LOGIN_ACTION,
        _numEventsChng: AUTO_NUMEVENTS_ACTION,
      }),
      ...mapMutations({
        showLoader: LOADING_SPINNER_SHOW_MUTATION,
      }),
      translate(prop) {
        return this[this.lang][prop];
      },
      async login() {
        this.error = "";
        this.isShow = true;
        let response = await this._login({
          username: this.form.username,
          password: this.form.password,
          device: "",
        }).catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 404) {
            this.error = this.translate("userMessageNotFound");
            this.isShow = false;
          } else if (error.response.status === 403) {
            this.error = this.translate("userMessagePassword");
            this.isShow = false;
          }
        });
        if (response) {
          this.isShow = false;
          this.getNumEvents();
          if (this.level == "admin") this.$router.replace("/admin");
          else if (this.level == "beekeeper") this.$router.replace("/beekeeper");
        }
      },
      async getNumEvents() {
        await axios
          .get("https://bhsapi.duartecota.com/event/num/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            console.log(response.data.body);
            if (response.data.body > 0) {
              this.numEventsChng({
                numEvents: response.data.body,
              });
            } else {
              this.numEventsChng({
                numEvents: null,
              });
            }
          })
          .catch((error) => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
          });
      },
      async numEventsChng(num) {
        await this._numEventsChng(num);
      },
    },
  };
</script>