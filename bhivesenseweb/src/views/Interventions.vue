<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("interventionsTitle") }}</h2>
    <section class="line-1"></section>
    <section class="mt-4">
      <button @click="formNew" class="btn my-button me-3">
        <section v-if="!isShow">
          <i class="fa-solid fa-calendar"></i>
          {{ translate("btnSchedule") }}
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
      @done="clickConclude"
      @delete="clickcancel"
      :details="details"
    />

    <ModalDelete
      v-show="isModalDeleteVisible"
      @close="closeDeleteModal"
      @deleteAction="_delete"
    />

    <ModalConclude
      v-show="isModalConcludeVisible"
      @close="closeConcludeModal"
      @conclude="conclude"
    />
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
  import ModalDelete from "@/components/ModalDeleteIntervention.vue";
  import ModalConclude from "@/components/ModalInterventionConcluded.vue";
  export default {
    components: {
      ModalDetails,
      ModalDelete,
      ModalConclude,
    },
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        interventions: [],
        details: [],
        lang: lang,
        isShow: false,
        hasInterventions: false,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        isModalConcludeVisible: false,
        interventiontoedit: "",
        warnForIntervention: false,
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
              start: {
                fillMode: "solid",
                color: todo.isComplete ? "gray" : todo.color,
              },
              base: {
                fillMode: "light",
                color: todo.isComplete ? "gray" : todo.color,
              },
              end: {
                fillMode: "solid",
                color: todo.isComplete ? "gray" : todo.color,
              },
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
                let sd = new Date(resArray[i].startDate);
                let ed = new Date(resArray[i].endDate);
                let dates = "";
                dates = {
                  start: sd,
                  end: ed,
                };
                let color = "";
                if (resArray[i].type == 1) color = "green";
                else if (resArray[i].type == 2) color = "orange";
                else color = "red";
                let today = new Date();
                let timeDiff = new Date(sd) - today;
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                console.log(diffDays);
                if (diffDays < 0) {
                  color = "gray";
                }
                if (diffDays < 0 && resArray[i].concluded == false) {
                  color = "blue";
                  this.warnForIntervention = true;
                }

                this.interventions.push({
                  _id: resArray[i]._id,
                  color: color,
                  dates: dates,
                  description: resArray[i].description,
                  startTime: resArray[i].startTime,
                  endTime: resArray[i].endTime,
                  observations: resArray[i].observations,
                  type: resArray[i].type,
                  isComplete: resArray[i].concluded,
                  concluded: resArray[i].concluded,
                });
              }
              if (this.warnForIntervention) {
                notify({
                  title: this.translate("notifWarningTitle"),
                  text: this.translate("notInterventionPassed"),
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
      async _delete() {
        this.isModalDeleteVisible = false;
        this.isShow = true;
        let id = localStorage.getItem("interventiontoedit");
        await axios
          .delete("https://bhsapi.duartecota.com/intervention/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("deleteInterventionMessage"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.getInterventions();
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
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      padTo2Digits(num) {
        return String(num).padStart(2, "0");
      },
      dayClicked(day) {
        this.interventiontoedit = "";
        this.details = [];
        let date = new Date(day.id);
        if (this.interventions.length > 0) {
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
              let type = this.interventions[i].type;
              switch (type) {
                case 1:
                  this.type = this.translate("formNewInterventionType1");
                  break;
                case 2:
                  this.type = this.translate("formNewInterventionType2");
                  break;
                case 3:
                  this.type = this.translate("formNewInterventionType3");
                  break;
              }
              let instance = {
                _id: this.interventions[i]._id,
                color: this.interventions[i].color,
                startDate: sdConv,
                endDate: edConv,
                startTime: this.interventions[i].startTime,
                endTime: this.interventions[i].endTime,
                description: this.interventions[i].description,
                observations: this.interventions[i].observations,
                type: this.type,
                concluded: this.interventions[i].concluded,
              };
              console.log(instance.concluded);
              this.details.push(instance);
            }
            if (this.details.length > 0) this.isModalDetailsVisible = true;
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
      closeConcludeModal() {
        this.isModalConcludeVisible = false;
      },
      edit() {
        this.isModalDetailsVisible = false;
        this.$router.push("editintervention");
      },
      async conclude() {
        this.isModalConcludeVisible = false;
        this.isShow = true;
        let id = localStorage.getItem("interventiontoedit");
        await axios
          .put("https://bhsapi.duartecota.com/intervention/conclude/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("concludeInterventionMessage"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.warnForIntervention = false;
              this.getInterventions();
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
      },
      clickcancel() {
        this.isModalDetailsVisible = false;
        this.isModalDeleteVisible = true;
      },
      clickConclude() {
        this.isModalDetailsVisible = false;
        this.isModalConcludeVisible = true;
      },
    },
  };
</script>