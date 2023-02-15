/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="container">
    <section class="scrolling-component" ref="scrollcomponent" name="lang">
      <section class="container my-body">
        <h1 class="my-text-color">{{ translate("editHiveTitle") }}</h1>
        <section class="line-1"></section>
        <section class="mt-4">
          <button type="submit" class="btn me-4 my-button" @click="update">
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
        <section class="container" style="max-width: 80%">
          <form class="form-signin" @submit.prevent="submit">
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
                    v-if="form.notifications == true"
                    @change="handleChange($event)"
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.notifications"
                    checked
                    id="subscribenews"
                    style="text-align: left: important;"
                  />
                  <input
                    v-else-if="form.notifications == false"
                    @change="handleChange($event)"
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.notifications"
                    id="subscribenews"
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
          tempInSetpoint: "",
          humInSetpoint: "",
          weightSetpoint: "",
          notifications: "",
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
    mounted() {
      this.getDeviceData();
    },
    methods: {
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
      async update() {
        if (this.checkForm()) {
          this.isShow = true;
          let id = localStorage.getItem("hiveidtoedit");
          let putData = {
            tempInSetpoint: parseInt(this.form.tempInSetpoint),
            humInSetpoint: parseInt(this.form.humInSetpoint),
            weightSetpoint: parseInt(this.form.weightSetpoint),
            notifications: this.form.notifications,
          };
          await axios
            .put("https://bhsapi.duartecota.com/device/update/" + id, putData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 200) {
                this.isShow = false;
                this.form.tempInSetpoint = response.data.body.tempInSetpoint;
                this.form.humInSetpoint = response.data.body.humInSetpoint;
                this.form.weightSetpoint = response.data.body.weightSetpoint;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesEditSubmited"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
              } else if (response.data.http == 206) {
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
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFields"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      async getDeviceData() {
        this.isShow = true;
        let id = localStorage.getItem("hiveidtoedit");
        await axios
          .get("https://bhsapi.duartecota.com/device/edit/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              let data = response.data.body;
              this.isShow = false;
              this.form.tempInSetpoint = data.tempInSetpoint;
              this.form.humInSetpoint = data.humInSetpoint;
              this.form.weightSetpoint = data.weightSetpoint;
              this.form.notifications = data.notifications;
              if (data.notifications) this.notifSubscribed = true;
              else this.notifSubscribed = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("mesEditSuccess"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
            } else if (response.data.http == 206) {
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
      },
      back() {
        this.$router.replace("hives");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      checkForm() {
        this.isShow = false;
        if (
          this.form.tempInSetpoint == "" ||
          this.form.humInSetpoint == "" ||
          this.form.weightSetpoint == ""
        ) {
          return false;
        } else {
          return true;
        }
      },
    },
  };
</script>

