/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <h1 class="text-center mt-5">{{ translate("formEditApiaryTitle") }}</h1>
      <section
        v-if="showsection"
        class="alert mt-3 alert-dismissible fade show"
        role="alert"
        v-bind:class="'alert-' + message.type"
      >
        {{ message.msg }}
      </section>
      <form class="form-signin" @submit.prevent="submit">
        <section class="row">
          <section class="col-md-6 g-4">
            <label for="location" class="form-label">{{
              translate("formNewApiaryLocation")
            }}</label>
            <input
              type="text"
              v-model="form.location"
              class="form-control"
              id="mobile"
              style="font-size: small"
            />
          </section>
          <section class="col-md-6 g-4">
            <label for="address" class="form-label">{{
              translate("formNewApiaryAddress")
            }}</label>
            <input
              class="form-control textbox-n"
              type="text"
              v-model="form.address"
              id="bdate"
              style="font-size: small"
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-12 g-4">
            <label for="observations" class="form-label">{{
              translate("formNewApiaryObservations")
            }}</label>
            <textarea
              rows="5"
              v-model="form.observations"
              class="form-control"
              id="username"
              style="font-size: small"
            />
          </section>
        </section>
        <section class="text-center">
          <button @click="update" type="submit" class="btn mt-4 me-4 my-button">
            {{ translate("btnSubmit") }}
          </button>
          <button
            @click="cleanForm()"
            type="button"
            class="btn mt-4 me-4 my-button"
          >
            {{ translate("btnClean") }}
          </button>
          <button @click="back()" type="button" class="btn mt-4 my-button">
            {{ translate("btnBack") }}
          </button>
        </section>
      </form>
      <section class="text-center">
        <section v-if="isShow" class="text-center">
          <section class="spinner-border mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
          </section>
          <section class="mb-2">{{ translate("spinnerTxt") }}</section>
        </section>
      </section>
      <section class="spacer"></section>
    </section>
  </section>
</template>

<style scoped>
.my-button {
  width: 120px;
  background-color: black;
  color: white;
}

.my-button:hover {
  background-color: white;
  color: black;
}
select option[disabled]:first-child {
  display: none;
}
.my-body {
  margin-top: 0px;
}
.spacer {
  height: 200px;
}
.top-btn {
  font-weight: bold;
  width: 100px;
}
</style>

<script>
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import axios from "axios";
  import { notify } from "@kyvg/vue3-notification";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "edit Apiary",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          location: "",
          address: "",
          observations: "",
        },
        message: {
          type: "",
          msg: "",
        },
        isShow: false,
        showsection: false,
        lang: lang,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
      }),
    },

    mounted() {
      this.detail();
    },
    methods: {
      async detail() {
        let id = localStorage.getItem("idtoedit");
        await axios
          .get("https://bhsapi.duartecota.com/apiary/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.form.location = response.data.body.location;
            this.form.address = response.data.body.address;
            this.form.observations = response.data.body.observations;
            this.isShow = false;
            return true;
          })
          .catch(() => {
            this.isShow = false;
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
            return false;
          });
      },
      async update() {
        let id = localStorage.getItem("idtoedit");
        let postData = {
          address: this.form.address,
          location: this.form.location,
          observations: this.form.observations,
        };
        //postData.append("lang", this.lang); //enviar se necessário para e-mail
        if (this.checkForm() == true) {
          this.isShow = true;
          await axios
            .patch("https://bhsapi.duartecota.com/apiary/one/" + id, postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 200) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("updateApiarySuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
              } else {
                this.isShow = false;
                notify({
                  title: this.translate("notifErrorTitle"),
                  text: this.translate("mesProblem"),
                  type: "error",
                  duration: 3000,
                  speed: 500,
                });
              }
            })
            .catch((error) => {
              this.isShow = false;
              notify({
                title: this.translate("notifErrorTitle"),
                text: this.translate("mesProblem"),
                type: "error",
                duration: 3000,
                speed: 500,
              });
            });
        } else {
          this.isShow = false;
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFields"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      cleanForm() {
        this.message.type = "";
        this.message.msg = "";
        (this.form.location = ""),
          (this.form.address = ""),
          (this.form.observations = "");
        this.isShow = false;
        this.showsection = false;
      },
      back() {
        this.$router.replace("apiaries");
      },
      checkForm() {
        if (
          this.form.location == "" ||
          this.form.address == "" ||
          this.form.observations == ""
        )
          return false;
        else return true;
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>