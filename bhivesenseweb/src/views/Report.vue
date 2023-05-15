/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <h1 class="my-text-color">{{ translate("reportTitle") }}</h1>
      <section class="line-1"></section>

      <form class="form-signin" v-on:submit.prevent="send">
        <section class="mt-4">
          <button type="submit" class="btn me-4 my-button">
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
          <button @click="cleanForm" type="button" class="btn me-4 my-button">
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
        </section>
        <section class="row">
          <section class="col-md-6 g-4">
            <label for="name" class="form-label">{{
              translate("newAccNamePh")
            }}</label>
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              id="name"
              style="font-size: small"
            />
          </section>
          <section class="col-md-6 g-4">
            <label for="name" class="form-label">{{
              translate("newAccEmailPh")
            }}</label>
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="name"
              style="font-size: small"
            />
          </section>
        </section>

        <section class="row">
          <section class="col-md-12 g-4">
            <label for="mobile" class="form-label">{{
              translate("reportSubject")
            }}</label>
            <input
              type="text"
              v-model="form.subject"
              class="form-control"
              id="mobile"
              style="font-size: small"
            />
          </section>
        </section>

        <section class="row">
          <section class="col-md-12 g-4">
            <label for="mobile" class="form-label">{{
              translate("reportText")
            }}</label>
            <textarea
              type="text"
              rows="10"
              v-model="form.message"
              class="form-control"
              id="mobile"
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
    GET_USER_ID_GETTER,
    GET_USER_FULLNAME_GETTER,
    GET_USER_EMAIL_GETTER,
    GET_USER_TOKEN_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "submit",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        },
        isShow: false,
        lang: lang,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        _id: GET_USER_ID_GETTER,
        _name: GET_USER_FULLNAME_GETTER,
        _email: GET_USER_EMAIL_GETTER,
      }),
    },
    mounted() {
      (this.form.name = this._name), (this.form.email = this._email);
    },
    methods: {
      async send() {
        console.log("carrega");
        let postData = {
          user: this._id,
          name: this.form.name,
          email: this.form.email,
          subject: this.form.subject,
          message: this.form.message,
          lang: this.lang,
        };
        if (this.checkForm() == true) {
          this.isShow = true;
          await axios
            .post("https://bhsapi.duartecota.com/report", postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 201) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("reportSuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
                this.form.message = "";
                this.form.subject = "";
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
            .catch(() => {
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
          return;
        }
      },
      cleanForm() {
        (this.form.name = ""),
          (this.form.email = ""),
          (this.form.mobile = ""),
          (this.form.subject = ""),
          (this.form.message = "");
      },
      back() {
        this.$router.replace("/");
      },
      checkForm() {
        if (
          this.form.name == "" ||
          this.form.email == "" ||
          this.form.subject == "" ||
          this.form.message == ""
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