<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("interventionsTitle") }}</h2>
    <section class="line-1"></section>
    <section class="mt-4">
      <button @click="formNew" class="btn my-button me-3">
        <section v-if="!isShow">
          {{ translate("btnNew") }}
        </section>
        <section
          v-else
          class="spinner-border spinner-border-sm"
          role="status"
        ></section>
      </button>
      <button @click="back" class="btn my-button">
        <section v-if="!isShow">
          {{ translate("btnBack") }}
        </section>
        <section
          v-else
          class="spinner-border spinner-border-sm"
          role="status"
        ></section>
      </button>
    </section>

    <section class="mt-4" v-if="hasInterventions != false">
      <v-calendar
        :locale="lang"
        is-expanded
        :attributes="attributes"
        :rows="1"
        :columns="3"
        @dayclick="dayClicked"
      >
      </v-calendar>
    </section>

    <ModalDetails
      v-show="isModalDetailsVisible"
      @close="closeDetailsModal"
      @edit="edit"
      @done="done"
      @delete="_delete"
      :description="description"
      :observations="observations"
    >
    </ModalDetails>
  </section>
</template>

<style scoped>
</style>

<script>
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import axios from "axios";
  import { notify } from "@kyvg/vue3-notification";
  import ModalDetails from "../components/ModalInterventionDetails.vue";
  export default {
    components: {
      ModalDetails,
    },
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        interventions: [],
        lang: lang,
        isShow: false,
        hasInterventions: false,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        description: "",
        observations: "",
        interventiontoedit: "",
      };
    },
    computed: {
      attributes() {
        return [
          ...this.interventions.map((todo) => ({
            _id: todo._id,
            dates: todo.dates,
            highlight: {
              color: todo.color,
              start: { fillMode: "solid", color: todo.color },
              base: { fillMode: "light", color: todo.color },
              end: { fillMode: "solid", color: todo.color },
              //order: todo.order,
              //class: todo.isComplete ? "opacity-50" : "",
            },
            popover: {
              label: todo.description,
              visibility: "hover",
            },
          })),
        ];
      },
    },
    mounted() {
      this.getInterventions();
    },
    methods: {
      async getInterventions() {
        this.interventions = [];
        this.isShow = true;
        await axios
          .get(
            "https://bhsapi.duartecota.com/intervention/apiary/" +
              localStorage.getItem("idtointerventions"),
            {
              headers: {
                Authorization: this.token,
              },
            }
          )
          .then((response) => {
            this.isShow = false;
            if (response.data.body.length == 0) {
              this.hasInterventions = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("mesNoInterventions"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasInterventions = true;
              this.interventions = [];
              let resArray = response.data.body;
              for (let i = 0; i < resArray.length; i++) {
                if (resArray[i].concluded == false) {
                  let sd = new Date(resArray[i].startDate);
                  let ed = new Date(resArray[i].endDate);
                  let dates = "";
                  dates = {
                    start: sd,
                    end: ed,
                  };
                  let color;
                  if (resArray[i].type == 1) color = "green";
                  else if (resArray[i].type == 2) color = "orange";
                  else color = "red";
                  this.interventions.push({
                    _id: resArray[i]._id,
                    color: color,
                    dates: dates,
                    description: resArray[i].description,
                    startTime: resArray[i].startTime,
                    endTime: resArray[i].endTime,
                    observations: resArray[i].observations,
                  });
                }
              }
              if (this.interventions.length == 0) {
                this.hasInterventions = false;
                notify({
                  title: this.translate("notifWarningTitle"),
                  text: this.translate("mesNoInterventions"),
                  type: "warn",
                  duration: 3000,
                  speed: 500,
                });
              }
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
      translate(prop) {
        return this[this.lang][prop];
      },
      padTo2Digits(num) {
        return String(num).padStart(2, "0");
      },
      dayClicked(day) {
        this.interventiontoedit = "";
        let date = new Date(day.id);
        for (let i = 0; i < this.interventions.length; i++) {
          let sd = new Date(this.interventions[i].dates.start);
          let sdConv = this.padTo2Digits(
            sd.toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          );
          let sdFinal = new Date(sdConv);
          let ed = new Date(this.interventions[i].dates.end);
          let edConv = this.padTo2Digits(
            ed.toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          );
          let edFinal = new Date(edConv);
          if (
            date.getTime() >= sdFinal.getTime() &&
            date.getTime() <= edFinal.getTime()
          ) {
            this.interventiontoedit = this.interventions[i]._id;
            this.description = this.interventions[i].description;
            this.observations = this.interventions[i].observations;
            this.isModalDetailsVisible = true;
            break;
          }
        }
      },
      back() {
        this.$router.push("apiaries");
      },
      formNew() {
        this.$router.push("newintervention");
      },
      closeDetailsModal() {
        this.isModalDetailsVisible = false;
      },
      closeDeleteModal() {
        this.isModalDeleteVisible = false;
      },
      async detailsModal(id) {
        this.toEditID = id;
        await this.detail(id);
        this.isModalDetailsVisible = true;
      },
      edit() {
        this.isModalDetailsVisible = false;
        localStorage.setItem("interventiontoedit", this.interventiontoedit);
        this.$router.push("editintervention");
      },
      done() {
        alert("done");
      },
      _delete() {
        alert("delete");
      },
    },
  };
</script>