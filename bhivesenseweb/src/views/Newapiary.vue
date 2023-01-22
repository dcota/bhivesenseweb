/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <h2 class="my-text-color">{{ translate("formNewApiaryTitle") }}</h2>
      <section class="line-1"></section>
      <form class="form-signin" @submit.prevent="submit">
        <section>
          <button @click="send" type="submit" class="btn mt-4 me-4 my-button">
            <section v-if="!isShow">
              <i class="fa-solid fa-share-from-square"></i>
              {{ translate("btnSubmit") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
          <button
            @click="cleanForm()"
            type="button"
            class="btn mt-4 me-4 my-button"
          >
            <section v-if="!isShow">
              <i class="fa-solid fa-eraser"></i>
              {{ translate("btnClean") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
          <button @click="back()" type="button" class="btn mt-4 my-button">
            <section v-if="!isShow">
              <i class="fas fa-arrow-left me-1 act-btn" aria-hidden="true"></i>
              {{ translate("btnBack") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
        </section>
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
      </form>
      <section class="spacer"></section>
    </section>
  </section>
</template>

<style scoped>
select option[disabled]:first-child {
  display: none;
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
    name: "new Apiary",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          location: "",
          address: "",
          observations: "",
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
    methods: {
      async send() {
        let postData = {
          user: this._id,
          address: this.form.address,
          location: this.form.location,
          observations: this.form.observations,
        };
        //postData.append("lang", this.lang); //enviar se necessário para e-mail
        if (this.checkForm() == true) {
          this.isShow = true;
          await axios
            .post("https://bhsapi.duartecota.com/apiary", postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 201) {
                this.isShow = false;

                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesNewApiarySuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
                this.$router.replace("apiaries");
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
            text: this.translate("mesFieldsApiary"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      cleanForm() {
        (this.form.location = ""),
          (this.form.address = ""),
          (this.form.observations = "");
        this.isShow = false;
        this.showsection = false;
      },
      back() {
        this.$router.replace("/");
      },
      checkForm() {
        if (this.form.location == "" || this.form.address == "") return false;
        else return true;
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>