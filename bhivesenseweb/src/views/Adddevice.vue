/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="container">
    <section class="scrolling-component" ref="scrollcomponent" name="lang">
      <section class="container my-body">
        <h1 class="my-text-color">{{ translate("formNewDeviceTitle") }}</h1>
        <section class="line-1"></section>
        <section class="mt-4">
          <button type="submit" class="btn me-4 my-button" @click="register">
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
          <button @click="back" type="button" class="btn my-button">
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
        <section class="container" style="max-width: 70%">
          <form class="form-signin" @submit.prevent="submit">
            <section class="row">
              <section class="col-md-12 g-4 flex">
                <label for="location" class="form-label">{{
                  translate("formAddDeviceID")
                }}</label>
                <input
                  type="text"
                  v-model="form.id"
                  class="form-control"
                  id="id"
                  style="font-size: medium"
                />
              </section>
            </section>
          </form>
          <section class="spacer"></section>
        </section>
      </section>
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
          id: "",
        },
        isShow: false,
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
      async register() {
        if (this.checkForm()) {
          this.isShow = true;
          let postData = {
            user: this._id,
          };
          await axios
            .post(
              "https://bhsapi.duartecota.com/device/register/" + this.form.id,
              postData,
              {
                headers: {
                  Authorization: this.token,
                },
              }
            )
            .then((response) => {
              if (response.data.http == 200) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesRegisterDeviceSuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
              } else if (response.data.http == 206) {
                this.isShow = false;
                notify({
                  title: this.translate("notifErrorTitle"),
                  text: this.translate("mesRegisterDeviceError"),
                  type: "error",
                  duration: 3000,
                  speed: 500,
                });
              }
            })
            .catch(() => {
              this.isShow = false;
              notify({
                title: this.translate("notifErrorTitle"),
                text: this.translate("mesRegisterDeviceNotFound"),
                type: "error",
                duration: 3000,
                speed: 500,
              });
            });
        } else {
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesEmptyID"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      back() {
        this.$router.replace("/");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      checkForm() {
        this.isShow = false;
        if (this.form.id == "") {
          return false;
        } else {
          return true;
        }
      },
    },
  };
</script>

