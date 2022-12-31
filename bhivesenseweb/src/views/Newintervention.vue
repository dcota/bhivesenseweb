/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <hr />
      <h1 class="text-center">
        {{ translate("formNewInterventionTitle") }}
      </h1>
      <hr />
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
            <label for="observations" class="form-label">{{
              translate("formNewInterventionDescription")
            }}</label>
            <textarea
              rows="5"
              v-model="form.description"
              class="form-control"
              id="username"
              style="font-size: small"
            />
          </section>
          <section class="col-md-6 g-4">
            <label for="bdate" class="form-label">{{
              translate("formNewInterventionDate")
            }}</label>
            <input
              class="form-control textbox-n"
              type="text"
              v-model="form.date"
              onfocus="(this.type = 'date')"
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
        <section class="row mt-4">
          <section>
            <section class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.notifications"
                value=""
                id="subscribenews"
                checked
                style="text-align: left: important;"
              />
              <label class="form-check-label" for="subscribenews">
                {{ translate("formNewInterventionNotifications") }}</label
              >
            </section>
          </section>
        </section>
        <section class="text-center">
          <button @click="send" type="submit" class="btn mt-4 me-4 my-button">
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
  margin-top: 100px;
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
    name: "new intervention",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        activeClass: "noerror",
        errorClass: "error",
        form: {
          description: "",
          date: "",
          observations: "",
          notifications: true,
        },
        message: {
          type: "",
          msg: "",
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
      async send() {
        let postData = {
          apiary: localStorage.getItem("idtointerventions"),
          description: this.form.description,
          date: this.form.date,
          observations: this.form.observations,
          notifications: this.form.notifications,
        };
        //postData.append("lang", this.lang); //enviar se necessário para e-mail
        if (this.checkForm() == true) {
          this.isShow = true;
          await axios
            .post("https://bhsapi.duartecota.com/intervention", postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 201) {
                this.isShow = false;
                this.showsection = true;
                this.message.type = "success";
                this.message.msg = this.translate("mesNewApiarySuccess");
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesNewInterventionSuccess"),
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
                  type: "success",
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
            text: this.translate("mesFieldsIntervention"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      cleanForm() {
        (this.form.description = ""),
          (this.form.date = ""),
          (this.form.observations = "")((this.form.notifications = true));
        this.isShow = false;
      },
      back() {
        this.$router.replace("interventions");
      },
      checkForm() {
        if (this.form.description == "" || this.form.date == "") {
          return false;
        } else {
          return true;
        }
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>