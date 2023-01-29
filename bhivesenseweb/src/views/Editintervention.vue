/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <!--<section class="scrolling-component" ref="scrollcomponent" name="lang">-->
  <section class="container my-body">
    <h2 class="my-text-color">
      {{ translate("formNewInterventionTitle") }}
    </h2>
    <section class="line-1"></section>
    <form class="form-signin" v-on:submit.prevent="update">
      <section>
        <button type="submit" class="btn mt-4 me-3 my-button">
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
        <button @click="back" type="button" class="btn mt-4 my-button">
          <i class="fa-solid fa-arrow-left"></i>
          {{ translate("btnBack") }}
        </button>
      </section>
      <section class="row mt-4">
        <section class="col-md-6">
          <section v-if="newDate">
            <label for="bdate" class="form-label">{{
              translate("formNewInterventionDate")
            }}</label>
            <v-date-picker
              :locale="lang"
              :attributes="attributes"
              is-expanded
              v-model="range"
              is-range
              is24hr
              mode="datetime"
            />
          </section>
          <section v-else>
            <label for="bdate" class="form-label">{{
              translate("formNewInterventionDate")
            }}</label>
            <section style="font-size: large; font-weight: bold">
              {{ translate("lblStart") }}
              {{ startDate }}
              {{ translate("lblDiv") }}
              {{ startTime }}
            </section>
            <section style="font-size: large; font-weight: bold">
              {{ translate("lblEnd") }}
              {{ endDate }}
              {{ translate("lblDiv") }}
              {{ endTime }}
            </section>
            <section class="form-check mt-4">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="alterDateTime"
                value=""
                id="subscribenews"
                @click="change"
                style="text-align: left: important;"
              />
              <label class="form-check-label" for="subscribenews">
                {{ translate("lblAlterDateTime") }}</label
              >
            </section>
          </section>
        </section>
        <section class="col-md-6">
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
          <label for="type" class="form-label">{{
            translate("selectLbl")
          }}</label>

          <section class="my_radios">
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="form.type"
                type="radio"
                value="1"
              />
              <label
                class="form-check-label"
                for="flexRadioDefault1"
                style="color: green"
              >
                <strong>{{ translate("formNewInterventionType1") }}</strong>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="form.type"
                type="radio"
                value="2"
              />
              <label
                class="form-check-label"
                for="flexRadioDefault2"
                style="color: orange"
              >
                <strong>{{ translate("formNewInterventionType2") }}</strong>
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="form.type"
                type="radio"
                value="3"
              />
              <label
                class="form-check-label"
                for="flexRadioDefault3"
                style="color: red"
              >
                <strong>{{ translate("formNewInterventionType3") }}</strong>
              </label>
            </div>
          </section>
        </section>
      </section>
    </form>

    <section class="spacer"></section>
  </section>
  <!--</section>>-->
</template>

<style scoped>
.my_radios {
  background-color: white;
  border-radius: 4px;
  padding: 5px;
}

select option[disabled]:first-child {
  display: none;
}

.spacer {
  height: 200px;
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
    name: "edit intervention",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        dates: {
          start: "",
          end: "",
        },
        range: {
          start: "",
          end: "",
        },
        form: {
          description: "",
          observations: "",
          type: "",
        },
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        newDate: false,
        alterDateTime: false,
        color: "",
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
      this.getIntervention();
    },
    methods: {
      change() {
        this.newDate = true;
      },
      padTo2Digits(num) {
        return String(num).padStart(2, "0");
      },
      async getIntervention() {
        let id = localStorage.getItem("interventiontoedit");
        await axios
          .get("https://bhsapi.duartecota.com/intervention/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.form.description = response.data.body.description;
            this.form.observations = response.data.body.observations;
            let sd = response.data.body.startDate;
            let ed = response.data.body.endDate;
            this.range.start = sd;
            this.range.end = ed;
            this.dates = {
              start: sd,
              end: ed,
            };
            if (response.data.body.type == "1") this.color = "green";
            else if (response.data.body.type == "2") this.color = "orange";
            else this.color = "red";
            this.form.type = response.data.body.type;
            let temp = new Date(sd);
            let s = temp.toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            this.startDate = s;
            temp = new Date(ed);
            s = temp.toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            this.endDate = s;
            this.startTime = response.data.body.startTime;
            this.endTime = response.data.body.endTime;
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
        this.isShow = true;
        if (this.checkForm() == true) {
          let sd = new Date(this.range.start);
          let startTime =
            this.padTo2Digits(sd.getHours()) +
            ":" +
            this.padTo2Digits(sd.getMinutes());
          let ed = new Date(this.range.end);
          let endTime =
            this.padTo2Digits(ed.getHours()) +
            ":" +
            this.padTo2Digits(ed.getMinutes());
          let postData = {
            startDate: this.range.start,
            endDate: this.range.end,
            startTime: startTime,
            endTime: endTime,
            type: this.form.type,
            description: this.form.description,
            observations: this.form.observations,
          };
          console.log(postData);
          //verificar API
          let id = localStorage.getItem("interventiontoedit");
          await axios
            .patch(
              "https://bhsapi.duartecota.com/intervention/one/" + id,
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
                  text: this.translate("interventionChangeSuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
                this.$router.replace("interventions");
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
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFieldsIntervention"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
        //postData.append("lang", this.lang); //enviar se necessário para e-mail
      },
      back() {
        this.$router.replace("interventions");
      },
      checkForm() {
        this.isShow = false;
        if (this.form.description == "" || this.form.type == "") {
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