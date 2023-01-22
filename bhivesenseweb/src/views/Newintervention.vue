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
    <form class="form-signin" v-on:submit.prevent="send">
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
        <button
          @click="cleanForm"
          type="button"
          class="btn mt-4 me-3 my-button"
        >
          <i class="fa-solid fa-eraser"></i>
          {{ translate("btnClean") }}
        </button>
        <button @click="back" type="button" class="btn mt-4 my-button">
          <i class="fas fa-arrow-left me-1 act-btn" aria-hidden="true"></i>
          {{ translate("btnBack") }}
        </button>
      </section>
      <section class="row mt-4">
        <section class="col-md-6">
          <label for="bdate" class="form-label">{{
            translate("formNewInterventionDate")
          }}</label>
          <v-date-picker
            :attributes="attrs"
            :locale="lang"
            is-expanded
            v-model="range"
            is-range
            is24hr
            mode="datetime"
            @dayclick="dayClicked"
          />
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
    name: "new intervention",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        attrs: [
          {
            key: "today",
            dates: new Date(),
            highlight: {
              color: "indigo",
              fillMode: "outline",
            },
          },
        ],
        range: {
          start: "",
          end: "",
        },
        form: {
          description: "",
          observations: "",
          type: "",
        },
        isShow: false,
        validDates: true,
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
      padTo2Digits(num) {
        return String(num).padStart(2, "0");
      },
      async send() {
        this.isShow = true;
        if (this.checkForm() == true && this.validDates == true) {
          let startTime =
            this.padTo2Digits(this.range.start.getHours()) +
            ":" +
            this.padTo2Digits(this.range.start.getMinutes());
          console.log(startTime);
          //format end time
          let endTime =
            this.padTo2Digits(this.range.end.getHours()) +
            ":" +
            this.padTo2Digits(this.range.end.getMinutes());
          console.log(endTime);
          let postData = {
            apiary: localStorage.getItem("idtointerventions"),
            startDate: this.range.start,
            endDate: this.range.end,
            startTime: startTime,
            endTime: endTime,
            type: this.form.type,
            description: this.form.description,
            observations: this.form.observations,
          };
          await axios
            .post("https://bhsapi.duartecota.com/intervention", postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 201) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesNewInterventionSuccess"),
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
      cleanForm() {
        (this.form.description = ""),
          (this.form.observations = ""),
          (this.form.type = "");
        (this.range.start = new Date()),
          (this.range.end = new Date()),
          (this.isShow = false);
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
      dayClicked() {
        let date = new Date();
        let sd = new Date(this.range.start);
        let ed = new Date(this.range.end);
        let dateConv = this.padTo2Digits(
          date.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
        let sdConv = this.padTo2Digits(
          sd.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
        let edConv = this.padTo2Digits(
          ed.toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
        let dateFinal = new Date(dateConv);
        dateFinal.setHours(0, 0, 0, 0);
        let sdFinal = new Date(sdConv);
        sdFinal.setHours(0, 0, 0, 0);
        let edFinal = new Date(edConv);
        edFinal.setHours(0, 0, 0, 0);
        if (
          sdFinal.getTime() < dateFinal.getTime() ||
          edFinal.getTime() < dateFinal.getTime()
        ) {
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFieldsIntervention"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
          this.range.start = "";
          this.range.end = "";
          this.validDates = false;
        } else this.validDates = true;
      },
    },
  };
</script>