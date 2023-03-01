/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Home
*/

<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("myDashTitle") }}</h2>
    <section class="line-1"></section>
    <!--1st row-->
    <section class="row mt-3">
      <!--events-->
      <section class="col-12 col-md-6 col-lg-6">
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
            <hr />
            <section class="text-center my-text-green" v-if="nEvents == 0">
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
      <section class="col-12 col-md-6 col-lg-6">
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
            <hr />
            <section
              class="text-center my-text-green"
              v-if="nInterventions == 0"
            >
              <section v-if="!isShow">{{ interventionsText }}</section>
              <section
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
              ></section>
              <hr />
              <section class="text-center" v-if="!isShow">
                <button
                  @click="this.$router.push('sooninterventions')"
                  type="button"
                  class="btn btn-success"
                  style="font-size: small; width: 160px"
                >
                  {{ translate("dashIntervBtn") }}
                </button>
              </section>
              <section
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
              ></section>
            </section>
            <section class="text-center my-text-red" v-if="nInterventions > 0">
              {{ interventionsText }}
              <hr />
              <section class="text-center">
                <button
                  @click="interventionsEvent"
                  type="button"
                  class="btn btn-danger"
                  style="font-size: small; width: 160px"
                >
                  {{ translate("dashIntervBtn") }}
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
    <!--2nd row-->
    <section class="row mt-3">
      <!--messages-->
      <!--<section class="col-12 col-md-3 col-lg-3">
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
                ><span> {{ translate("dashMess") }}</span></strong
              >
            </h6>
            <hr />
            <section
              class="text-center my-indicator-green"
              v-if="nMessages == 0"
            >
              {{ nMessages }}
              <hr />
              <section class="text-center">
                <button
                  @click="this.$router.push('notifications')"
                  type="button"
                  class="btn btn-success"
                  style="font-size: small; width: 160px"
                >
                  {{ translate("dashMessBtn") }}
                </button>
              </section>
            </section>
            <section class="text-center my-indicator-red" v-if="nMessages > 0">
              {{ nEvents }}
              <hr />
              <section class="text-center">
                <button
                  @click="this.$router.push('notifications')"
                  type="button"
                  class="btn btn-danger"
                  style="font-size: small; width: 160px"
                >
                  {{ translate("dashMessBtn") }}
                </button>
              </section>
            </section>
          </section>
        </section>
      </section>-->
      <!--apiaries-->
      <section class="col-12 col-md-3 col-lg-3">
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
                ><span> {{ translate("dashTotalApiaries") }}</span></strong
              >
            </h6>
            <hr />
            <section class="text-center my-indicator-green">
              <section v-if="!isShow">{{ totalApiaries }}</section>
              <section
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
              ></section>
              <hr />
              <section class="text-center">
                <button
                  @click="this.$router.push('newapiary')"
                  type="button"
                  class="btn btn-success"
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
      <section class="col-12 col-md-3 col-lg-3">
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
            <hr />
            <section class="text-center my-indicator-green">
              <section v-if="!isShow">{{ totalHives }}</section>
              <section
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
              ></section>
              <hr />
              <section class="text-center">
                <button
                  @click="this.$router.push('newdevice')"
                  type="button"
                  class="btn btn-success"
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
.my-indicator-green {
  font-size: 30px;
  color: #198754;
}
.my-indicator-red {
  font-size: 30px;
  color: #dc3545;
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
        nInterventions: "",
        interventionsText: "",
        nMessages: 0,
        totalApiaries: "",
        totalHives: "",
        timer: "",
        isShow: true,
        interventions: [],
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
        //this.emitter.emit("interventionsEvent", this.interventions);
        console.log(this.interventions);
        localStorage.setItem("teste", JSON.stringify(this.interventions));
        this.$router.push("sooninterventions");
      },
      refreshDashboard() {
        this.updateEvents();
        this.updateInterventions();
        this.updateTotalApiaries();
        this.updateTotalHives();
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
        //this.nInterventions = 0;
        //this.interventionsText = this.translate("dashIntervTextNo");
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
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>
