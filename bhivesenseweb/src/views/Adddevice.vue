/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="container">
    <section class="scrolling-component" ref="scrollcomponent" name="lang">
      <section class="container my-body">
        <h2 class="my-text-color">{{ translate("formNewDeviceTitle") }}</h2>
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
        </section>
        <section class="container" style="max-width: 80%">
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
            <section class="row">
              <section class="col-md-4 g-4 flex">
                <label for="location" class="form-label">{{
                  translate("tempInSp")
                }}</label>
                <input
                  type="text"
                  v-model="form.tempInSetpoint"
                  class="form-control"
                  id="id"
                  style="font-size: medium"
                />
              </section>
              <section class="col-md-4 g-4 flex">
                <label for="location" class="form-label">{{
                  translate("humInSp")
                }}</label>
                <input
                  type="text"
                  v-model="form.humInSetpoint"
                  class="form-control"
                  id="id"
                  style="font-size: medium"
                />
              </section>
              <section class="col-md-4 g-4 flex">
                <label for="location" class="form-label">{{
                  translate("weightSp")
                }}</label>
                <input
                  type="text"
                  v-model="form.weightSetpoint"
                  class="form-control"
                  id="id"
                  style="font-size: medium"
                />
              </section>
            </section>
            <section class="row mt-4">
              <section>
                <section class="form-check">
                  <input
                    @change="handleChange($event)"
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.notifications"
                    value=""
                    id="subscribenews"
                    checked
                    style="text-align: left: important;"
                  />
                  <label class="form-check-label" for="subscribenews">
                    {{ translate("newAccSubs") }}</label
                  >
                </section>
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
          tempInSetpoint: 35,
          humInSetpoint: 80,
          weightSetpoint: 40,
          notifications: true,
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
            tempInSetpoint: this.form.tempInSetpoint,
            humInSetpoint: this.form.humInSetpoint,
            weightSetpoint: this.form.weightSetpoint,
            notifications: this.form.notifications,
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
                  speed: 1000,
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
      handleChange(event) {
        if (!event.target.checked) {
          (this.form.tempInSetpoint = 0),
            (this.form.humInSetpoint = 0),
            (this.form.weightSetpoint = 0),
            (this.form.notifications = false);
        } else {
          (this.form.tempInSetpoint = 35),
            (this.form.humInSetpoint = 80),
            (this.form.weightSetpoint = 40),
            (this.form.notifications = true);
        }
      },
    },
  };
</script>

