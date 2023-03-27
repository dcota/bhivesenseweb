/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Home
*/

<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("myDashTitle") }}</h2>
    <section class="line-1"></section>
    <section v-if="!isShow">
      <!--1st row-->
      <section class="row mt-3">
        <!--events-->
        <section class="col-12 col-md-4 col-lg-4">
          <section
            class="card mb-3 mh-100 text-center"
            style="
              border-radius: 10px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 6px 20px 0 rgba(0, 0, 0, 0.1);
            "
          >
            <section class="card-body">
              <h6 class="card-title text-center">
                <strong
                  ><span> {{ translate("dashNotif") }}</span></strong
                >
              </h6>
              <section class="text-center my-text-green" v-if="nEvents == 0">
                <hr />
                <i class="fa-regular fa-face-smile" style="font-size: 30px"></i>
                {{ eventsText }}
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('notifications')"
                    type="button"
                    class="btn btn-success"
                    style="font-size: small; width: 160px"
                  >
                    {{ translate("dashNotifBtn") }}
                  </button>
                </section>
              </section>
              <section class="text-center my-text-red" v-if="nEvents > 0">
                <hr />
                <p>
                  <i
                    class="fa-regular fa-face-frown"
                    style="font-size: 30px"
                  ></i>
                </p>
                {{ eventsText }}
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('notifications')"
                    type="button"
                    class="btn btn-danger"
                    style="font-size: small; width: 160px"
                  >
                    {{ translate("dashNotifBtn") }}
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
        <!--interventions-->
        <section class="col-12 col-md-4 col-lg-4">
          <section
            class="card mb-3 mh-100 text-center"
            style="
              border-radius: 10px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 6px 20px 0 rgba(0, 0, 0, 0.1);
            "
          >
            <section class="card-body">
              <h6 class="card-title text-center">
                <strong
                  ><span> {{ translate("dashInterventions") }}</span></strong
                >
              </h6>
              <section
                class="text-center my-text-green"
                v-if="nInterventions == 0"
              >
                <hr />
                <p>
                  <i
                    class="fa-solid fa-circle-check"
                    style="font-size: 30px"
                  ></i>
                </p>
                <section>{{ interventionsText }}</section>
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('sooninterventions')"
                    type="button"
                    class="btn btn-success"
                    style="font-size: small; width: 160px"
                  >
                    {{ translate("dashIntervBtn") }}
                  </button>
                </section>
              </section>

              <section
                class="text-center my-text-yellow"
                v-if="nInterventions > 0"
              >
                <hr />
                <p>
                  <i
                    class="fa-solid fa-circle-exclamation"
                    style="font-size: 30px"
                  ></i>
                </p>
                {{ interventionsText }}
                <hr />
                <section class="text-center">
                  <button
                    @click="interventionsEvent"
                    type="button"
                    class="btn btn-warning"
                    style="font-size: small; width: 160px; color: white"
                  >
                    {{ translate("dashIntervBtn") }}
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
        <!--harvest-->
        <section class="col-12 col-md-4 col-lg-4">
          <section
            class="card mb-3 mh-100 text-center"
            style="
              border-radius: 10px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 6px 20px 0 rgba(0, 0, 0, 0.1);
            "
          >
            <section class="card-body">
              <h6 class="card-title text-center">
                <strong
                  ><span> {{ translate("dashHarvest") }}</span></strong
                >
              </h6>
              <section class="text-center my-text-green" v-if="nHarvest == 0">
                <hr />
                <section>
                  <p>
                    <span
                      class="material-symbols-outlined"
                      style="font-size: 30px"
                    >
                      emoji_nature
                    </span>
                  </p>
                  {{ harvestText }}
                </section>
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('harvest')"
                    type="button"
                    class="btn btn-success"
                    style="font-size: small; width: 160px"
                  >
                    {{ translate("dashBtnHarvest") }}
                  </button>
                </section>
              </section>
              <section class="text-center my-text-yellow" v-if="nHarvest > 0">
                <hr />
                <p>
                  <i
                    class="fa-solid fa-circle-exclamation"
                    style="font-size: 30px"
                  ></i>
                </p>
                {{ harvestText }}
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('harvest')"
                    type="button"
                    class="btn btn-warning"
                    style="font-size: small; width: 160px; color: white"
                  >
                    {{ translate("dashBtnHarvest") }}
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>

      <!--2nd row-->
      <section class="row mt-3">
        <!--logs-->
        <section class="col-12 col-md-6 col-lg-6">
          <section
            class="card mb-3 mh-100"
            style="
              border-radius: 10px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                0 6px 20px 0 rgba(0, 0, 0, 0.1);
            "
          >
            <section class="card-body">
              <h6 class="card-title text-center">
                <strong
                  ><span> {{ translate("dashLogsTitle") }}</span></strong
                >
              </h6>
              <section>
                <hr />
                <section>
                  <table class="table mt-2">
                    <tbody>
                      <tr>
                        <th>
                          {{ translate("dashLogsTHEvent") }}
                        </th>
                        <th>
                          {{ translate("dashLogsTHDate") }}
                        </th>
                      </tr>
                      <tr v-for="event in hiveEvents" :key="event._id">
                        <td>{{ event.text }}</td>
                        <td>
                          {{ event.date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <hr />
                <section class="text-center">
                  <button
                    @click="this.$router.push('log')"
                    type="button"
                    class="btn btn-success"
                    style="font-size: small; width: 160px"
                  >
                    {{ translate("dashLogsBtn") }}
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section class="col-12 col-md-6 col-lg-6">
          <section class="row">
            <!--swarming-->
            <section class="col">
              <section
                class="card mb-3 mh-100 text-center"
                style="
                  height: 210px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                    0 6px 20px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <section class="card-body">
                  <h6 class="card-title text-center">
                    <strong
                      ><span>
                        {{ translate("dashSwarmingTitle") }}</span
                      ></strong
                    >
                  </h6>
                  <section class="text-center my-indicator-green">
                    <hr />
                    <section>{{ totalApiaries }}</section>
                    <hr />
                    <section class="text-center">
                      <button
                        @click="this.$router.push('newapiary')"
                        type="button"
                        class="btn btn-success"
                        style="font-size: small; width: 160px"
                      >
                        {{ translate("dashSwarmingBtn") }}
                      </button>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <!--production-->
            <section class="col">
              <section
                class="card mb-3 mh-100 text-center"
                style="
                  height: 210px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                    0 6px 20px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <section class="card-body">
                  <h6 class="card-title text-center">
                    <strong
                      ><span> {{ translate("prodTotalTitle") }}</span></strong
                    >
                  </h6>
                  <section class="text-center my-indicator-blue">
                    <hr />
                    <section>{{ totalProduction }} Kg</section>
                    <hr />
                    <section class="text-center">
                      <button
                        @click="this.$router.push('newdevice')"
                        type="button"
                        class="btn btn-primary"
                        style="font-size: small; width: 160px"
                      >
                        {{ translate("prodTotalBtn") }}
                      </button>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
          <section class="row">
            <!--apiaries-->
            <section class="col">
              <section
                class="card mb-3 mh-100 text-center"
                style="
                  height: 210px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                    0 6px 20px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <section class="card-body">
                  <h6 class="card-title text-center">
                    <strong
                      ><span>
                        {{ translate("dashTotalApiaries") }}</span
                      ></strong
                    >
                  </h6>
                  <section class="text-center my-indicator-blue">
                    <hr />
                    <section>{{ totalApiaries }}</section>
                    <hr />
                    <section class="text-center">
                      <button
                        @click="this.$router.push('newapiary')"
                        type="button"
                        class="btn btn-primary"
                        style="font-size: small; width: 160px"
                      >
                        {{ translate("dashApiariesBtn") }}
                      </button>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <!--hives-->
            <section class="col">
              <section
                class="card mb-3 mh-100 text-center"
                style="
                  height: 210px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
                    0 6px 20px 0 rgba(0, 0, 0, 0.1);
                "
              >
                <section class="card-body">
                  <h6 class="card-title text-center">
                    <strong
                      ><span> {{ translate("dashTotalHives") }}</span></strong
                    >
                  </h6>
                  <section class="text-center my-indicator-blue">
                    <hr />
                    <section>{{ totalHives }}</section>
                    <hr />
                    <section class="text-center">
                      <button
                        @click="this.$router.push('newdevice')"
                        type="button"
                        class="btn btn-primary"
                        style="font-size: small; width: 160px"
                      >
                        {{ translate("dashHivesBtn") }}
                      </button>
                    </section>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
    <section class="text-center">
      <section v-if="isShow" class="text-center">
        <section class="spinner-border mt-4" role="status">
          <span class="visually-hidden">Loading...</span>
        </section>
        <section class="mb-2">{{ translate("spinnerTxt") }}</section>
      </section>
    </section>
  </section>
</template>

<style scoped>
.my-text-green {
  font-size: 17px;
  color: #198754;
}
.my-text-red {
  font-size: 17px;
  color: #dc3545;
}
.my-text-yellow {
  font-size: 17px;
  color: #ffc107;
}
.my-indicator-green {
  font-size: 30px;
  color: #198754;
}
.my-indicator-red {
  font-size: 30px;
  color: #dc3545;
}
.my-indicator-blue {
  font-size: 30px;
  color: #007bff;
}
.my-indicator-yello {
  font-size: 30px;
  color: #ffc107;
}
.my-img {
  max-width: 30%;
  height: auto;
}

h3 {
  color: #c55a11 !important;
  position: relative;
  margin-top: 40px;
  font-family: "Times New Roman", Times, serif;
  letter-spacing: 10px;
}
</style>     

<script>
  import axios from "axios";
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { mapActions, mapGetters } from "vuex";
  import {
    IS_USER_AUTHENTICATED_GETTER,
    GET_USER_ID_GETTER,
    GET_USER_TOKEN_GETTER,
    AUTO_NUMEVENTS_ACTION,
    GET_NUMEVENTS_GETTER,
  } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        logo: require("../assets/IMG1224.png"),
        lang: lang,
        nEvents: "",
        eventsText: "",
        nInterventions: 0,
        interventionsText: "",
        nMessages: 0,
        totalApiaries: "",
        totalHives: "",
        totalProduction: "",
        timer: "",
        isShow: true,
        interventions: [],
        harvestEvents: [],
        nHarvest: 0,
        harvestText: "",
        hiveEvents: [],
      };
    },
    computed: {
      ...mapGetters("auth", {
        isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        token: GET_USER_TOKEN_GETTER,
        _id: GET_USER_ID_GETTER,
        numEvents: GET_NUMEVENTS_GETTER,
        auth: localStorage.getItem("auth"),
      }),
    },
    mounted() {
      this.updateEvents();
      this.updateHarvest();
      this.refreshDashboard();
      this.timer = setInterval(this.updateEvents, 1000);
    },
    beforeUnmount() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      ...mapActions("auth", {
        _numEventsChng: AUTO_NUMEVENTS_ACTION,
      }),

      interventionsEvent() {
        console.log(this.interventions);
        localStorage.setItem("teste", JSON.stringify(this.interventions));
        this.$router.push("sooninterventions");
      },
      refreshDashboard() {
        this.updateEvents();
        this.updateInterventions();
        this.updateTotalApiaries();
        this.updateTotalHives();
        this.updateTotalProduction();
        this.getLog();
      },
      updateEvents() {
        if (this.numEvents == null) {
          this.nEvents = 0;
          this.eventsText = this.translate("dashEventsTextNo");
        } else {
          this.nEvents = this.numEvents;
          this.eventsText = this.translate("dashEventsTextYes");
        }
      },
      async updateInterventions() {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/intervention/notify/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.body.length == 0) {
              this.nInterventions = 0;
              this.interventionsText = this.translate("dashIntervTextNo");
            } else {
              this.interventions = response.data.body;
              this.nInterventions = response.data.body.length;
              this.interventionsText = this.translate("dashIntervTextYes");
            }
          });
      },
      async updateHarvest() {
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
            if (events.length == 0) {
              this.nHarvest = 0;
              this.harvestText = this.translate("dashHarvestNo");
            } else {
              for (let i = 0; i < events.length; i++) {
                if (events[i].type == "HARVEST") {
                  this.nHarvest = events.length;
                  this.harvestText = this.translate("dashHarvestYes");
                  break;
                } else {
                  this.nHarvest = 0;
                  this.harvestText = this.translate("dashHarvestNo");
                }
              }
            }
            console.log(this.harvestText);
            console.log(this.nHarvest);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async updateTotalApiaries() {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/apiary/total/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.totalApiaries = response.data.body.totalApiaries;
          })
          .catch((error) => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
          });
      },
      async updateTotalHives() {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/device/total/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.totalHives = response.data.body.totalHives;
          })
          .catch((error) => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
          });
        this.isShow = false;
      },
      async updateTotalProduction() {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/harvest/total/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.totalProduction = response.data.body.totalProduction;
          })
          .catch((error) => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
          });
        this.isShow = false;
      },
      async getLog() {
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/event/log/" + this._id, {
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
                }
              }
            }
          });
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>
