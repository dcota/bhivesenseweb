/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Gestão de Alunos (Admin)
*/

<template id="example-modal">
  <section class="container my-body">
    <h1 class="my-text-color">{{ translate("notificationsTitle") }}</h1>
    <section class="line-1"></section>
    <section class="row mt-3" v-if="hasHiveEvents">
      <h4 class="my-text-color">{{ translate("eventsLabel") }}</h4>
    </section>
    <section class="card mt-5 text-center p-4" v-if="!hasHiveEvents && !isShow">
      <h3>{{ translate("cardNoEvents") }}</h3>
    </section>
    <section class="card mt-2" v-if="hasHiveEvents">
      <section
        class="card-body"
        style="
          border-radius: 3px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
            rgba(0, 0, 0, 0.22) 0px 10px 10px;
        "
      >
        <table class="table mt-2 table-striped">
          <tbody>
            <tr>
              <th>{{ translate("thdEvent") }}</th>
              <th class="text-center">{{ translate("thdHive") }}</th>
              <th class="text-center">{{ translate("tdDate") }}</th>
              <th class="text-center">{{ translate("thdUsersActions") }}</th>
            </tr>
            <tr v-for="event in hiveEvents" :key="event._id">
              <td>{{ event.text }}</td>
              <td class="text-center">
                <a
                  @click="loadDetails(event.apiary, event.device)"
                  style="
                    text-decoration: underline;
                    color: brown;
                    cursor: pointer;
                  "
                  >{{ event.device }}</a
                >
              </td>
              <td class="text-center">{{ event.date }}</td>
              <td class="text-center">
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblCardApiary')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="detailsModalHive(event.apiary)"
                  type="button"
                  class="btn btn-info btn-sm me-2 ac-btn"
                  style="width: 50px"
                >
                  <i class="fas fa-search" aria-hidden="true"></i>
                </button>
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblBtnIgnore')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="deleteModalHive(event._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                  style="width: 50px"
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <!--table for intervention notifictions-->

    <ModalDelete
      v-show="isModalDeleteVisible"
      @close="closeDeleteModalHive"
      @solve="solveHive"
    />
    <ModalDetails
      v-show="isModalDetailsVisible"
      @close="closeDetailsModalHive"
      :location="location"
      :address="address"
      :observations="observations"
      :regdate="regdate"
    />
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
</template>

<style scoped>
.ac-btn {
  width: 120px;
  color: white;
  font-weight: bold;
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
  import ModalDelete from "../components/ModalSolveEvent.vue";
  import ModalDetails from "../components/ModalApiaryNotification.vue";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  //import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    components: {
      ModalDelete,
      ModalDetails,
    },
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        searchID: "",
        data: localStorage.token,
        isShow: false,
        lang: lang,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        hasHiveEvents: false,
        hasInterventionEvents: false,
        timer: "",
        text: "",
        location: "",
        address: "",
        observations: "",
        regdate: "",
        hiveEvents: [],
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
      this.getEvents();
      this.timer = setInterval(this.getEvents, 30000);
    },
    beforeUnmount() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      closeDetailsModalHive() {
        this.isModalDetailsVisible = false;
      },
      closeDeleteModalHive() {
        this.isModalDeleteVisible = false;
      },
      async detailsModalHive(id) {
        //this.toEditID = id;
        await this.detail(id);
        this.isModalDetailsVisible = true;
      },
      async deleteModalHive(id) {
        localStorage.setItem("idhivetosolve", id);
        this.isModalDeleteVisible = true;
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      async getEvents() {
        this.hiveEvents = [];
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/event/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.isShow = false;
            let events = response.data.body;
            if (!events.length == 0) {
              for (let i = 0; i < events.length; i++) {
                if (events[i].cat == "hive") {
                  let date = new Date(events[i].registration_date);
                  let year = date.getFullYear();
                  let month =
                    date.getMonth() + 1 < 10
                      ? "0" + (date.getMonth() + 1)
                      : date.getMonth() + 1;
                  let day =
                    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                  this.text = "";
                  if (events[i].type == "LIDOPEN") {
                    this.text = this.translate("hiveText");
                  } else if (events[i].type == "TEMPHIGH") {
                    this.text = this.translate("tempText");
                  } else if (events[i].type == "HUMHIGH") {
                    this.text = this.translate("humText");
                  }
                  if (events[i].type != "HARVEST")
                    this.hiveEvents.push({
                      _id: events[i]._id,
                      apiary: events[i].apiary,
                      device: events[i].device,
                      date: year + "-" + month + "-" + day,
                      text: this.text,
                    });
                  console.log(this.hiveEvents);
                }
              }
            }
            this.hiveEvents.length > 0
              ? (this.hasHiveEvents = true)
              : (this.hasHiveEvents = false);
            this.interventionEvents.length > 0
              ? (this.hasInterventionEvents = true)
              : (this.hasInterventionEvents = false);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async detail(id) {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/apiary/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.location = response.data.body.location;
            this.address = response.data.body.address;
            this.observations = response.data.body.observations;
            this.regdate = response.data.body.registration_date;
            this.isShow = false;
            return true;
          })
          .catch(() => {
            this.message.msg = "Ocorreu um problema";
            this.message.type = "warning";
            this.isShow = false;
            return false;
          });
      },
      async solveHive() {
        this.isModalDeleteVisible = false;
        let id = localStorage.getItem("idhivetosolve");
        await axios
          .put("https://bhsapi.duartecota.com/event/solve/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("notifHiveEventSolved"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
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
        this.getEvents();
      },
      async assign(id) {
        alert(id);
        alert(localStorage.getItem("apiaryIDtoget"));
        await axios
          .patch(
            "https://bhsapi.duartecota.com/device/" +
              id +
              "/" +
              localStorage.getItem("apiaryIDtoget"),
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
                text: this.translate("assignMessage"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.getDevices();
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
      loadDetails(apiary, hive) {
        localStorage.setItem("hiveIDtoget", hive);
        localStorage.setItem("apiaryIDtoget", apiary);
        console.log(apiary, " ", hive);
        this.$router.push("/hivedetails");
      },
    },
  };
</script>