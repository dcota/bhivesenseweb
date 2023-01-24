<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("hiveDetailsTitle") }}</h2>
    <section class="line-1"></section>
    <section>
      <button @click="map" type="button" class="btn mt-4 me-3 my-button">
        <section v-if="!isShow">
          <i class="fa-solid fa-map-location-dot"></i>
          {{ translate("lblBtnMap") }}
        </section>
        <section
          v-else
          class="spinner-border spinner-border-sm"
          role="status"
        ></section>
      </button>
      <button @click="back" type="button" class="btn mt-4 my-button">
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
    <section class="mt-3" v-bind="latestData">
      <h5>
        {{ translate("lblLastData") }} {{ latestData.date }}
        {{ translate("lblAt") }} {{ latestData.hours }}h{{ latestData.minutes }}
      </h5>
    </section>
    <section class="row mt-4" v-bind="latestData">
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-temperature-high" aria-hidden="true"
                  ><span> T(in)</span></i
                ></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.ti }}</section>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-droplet"><span>% H(in)</span></i></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.hi }}</section>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-temperature-high" aria-hidden="true"
                  ><span> T(out)</span></i
                ></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.to }}</section>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-droplet"><span>% H(out)</span></i></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.ho }}</section>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-weight-scale"></i><span> Kg</span></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.w }}</section>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2">
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h6 class="card-title text-center">
              <strong
                ><i class="fas fa-music"><span> dB</span></i></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.s }}</section>
          </section>
        </section>
      </section>
    </section>
    <section class="card p-2">
      <!--<Line v-if="loaded" :data="data" :options="options" />-->
      <area-chart
        v-if="loaded"
        :data="chartData"
        :min="0"
        :max="30"
        :download="true"
        width="100%"
        height="500px"
        :colors="['#a17f05', '#666']"
        :dataset="{ borderWidth: 2 }"
        loading="Loading..."
        xtitle="Time"
        ytitle="Temperature (Deg. Celsius)"
      ></area-chart>
    </section>
    <!--<section class="spacer"></section>-->
  </section>
</template>
    
    <style scoped>
.bn_card {
  background-color: #ebc002;
  border-radius: 25px;
  width: 50px;
}

.bn_card:hover {
  background-color: #947902;
}
.spacer {
  height: 200px;
}
</style>
    
    <script>
  /*import {
                                        Chart as ChartJS,
                                        CategoryScale,
                                        LinearScale,
                                        PointElement,
                                        LineElement,
                                        Title,
                                        Tooltip,
                                        Legend,
                                      } from "chart.js";
                                      ChartJS.register(
                                        CategoryScale,
                                        LinearScale,
                                        PointElement,
                                        LineElement,
                                        Title,
                                        Tooltip,
                                        Legend
                                      );*/
  //import { Line } from "vue-chartjs";
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
    name: "Hives",
    mixins: [en, pt],
    /*components: {
                                          Line,
                                        },*/
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        chartData: [],
        /*data: {
                                              labels: [],
                                              datasets: [
                                                {
                                                  label: "Temperature(deg. Celsius)",
                                                  backgroundColor: "#f87979",
                                                  data: [],
                                                },
                                              ],
                                            },
                                            options: {
                                              responsive: true,
                                              maintainAspectRatio: false,
                                              legend: {
                                                position: "bottom",
                                              },
                                              plugins: {
                                                datalabels: {},
                                              },
                                              scales: {
                                                yAxes: [
                                                  {
                                                    ticks: {
                                                      min: 0,
                                                      max: 300,
                                                      stepSize: 100,
                                                      reverse: false,
                                                      beginAtZero: true,
                                                    },
                                                  },
                                                ],
                                              },
                                            },*/
        devices: [],
        img: require("../assets/IMG1220.png"),
        lang: lang,
        message: {
          type: "",
          msg: "",
        },
        latestData: {
          to: "",
          ti: "",
          hi: "",
          ho: "",
          s: "",
          w: "",
          date: "",
          hours: "",
          minutes: "",
        },
        isShow: true,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        showsection: false,
        toDeleteID: "",
        toEditID: "",
        toInterventionsID: "",
        loaded: false,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
        //el: "#app",
      }),
    },
    async mounted() {
      this.loaded = false;
      this.getLatest();
      this.getDay();
    },
    methods: {
      async getLatest() {
        this.isShow = true;
        this.devices = [];
        await axios
          .get(
            "https://bhsapi.duartecota.com/device/latest/" +
              localStorage.getItem("hiveIDtoget") +
              "/" +
              localStorage.getItem("apiaryIDtoget"),
            {
              headers: {
                Authorization: this.token,
              },
            }
          )
          .then((response) => {
            let devices = response.data.body;
            if (devices.length == 0) {
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noHivesInApiary"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.latestData.ti = devices[0].data.ti;
              this.latestData.hi = devices[0].data.hi;
              this.latestData.to = devices[0].data.to;
              this.latestData.ho = devices[0].data.ho;
              this.latestData.s = devices[0].data.s;
              this.latestData.w = devices[0].data.w;
              let lastDate = new Date(
                devices[0].data.date.toLocaleString("sv-SE", {
                  timeZone: "Atlantic/Azores",
                })
              );
              let sdConv = this.padTo2Digits(
                lastDate.toLocaleDateString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              );
              this.latestData.date = sdConv;
              this.latestData.hours = lastDate.getHours();
              this.latestData.minutes = lastDate.getMinutes();
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
            this.showsection = true;
            this.message.type = "danger";
            this.message.msg = this.translate("mesProblem");
          });
      },
      async getDay() {
        this.loaded = false;
        this.isShow = true;
        this.chartData = [];
        await axios
          .get(
            "https://bhsapi.duartecota.com/device/" +
              localStorage.getItem("hiveIDtoget"),
            {
              headers: {
                Authorization: this.token,
              },
            }
          )
          .then((response) => {
            let d = response.data.body.data;
            console.log(d);
            if (d.length == 0) {
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noHivesInApiary"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              for (let i = 0; i < d.length; i++) {
                let today = new Date();
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                if (today.getMonth() == lastDate.getMonth()) {
                  let tempArray = [];
                  /*let x =
                      lastDate.getFullYear() +
                      "-" +
                      (lastDate.getMonth() + 1) +
                      "-" +
                      lastDate.getDate();*/
                  let x = i;
                  tempArray.push(x);
                  let y = d[i].ti;
                  tempArray.push(y);
                  this.chartData.push(tempArray);
                  console.log(tempArray);
                  /*let time =
                                                                                                                                                                                                                                this.padTo2Digits(lastDate.getHours()) +
                                                                                                                                                                                                                                ":" +
                                                                                                                                                                                                                                this.padTo2Digits(lastDate.getMinutes());*/
                  //this.data.labels.push(i.toString());
                  //temp.push(parseInt(d[i].ti));
                }
              }
              //this.data.datasets[0].data = temp;
              //console.table(this.data.labels);
              //console.table(this.data.datasets[0].data);
              this.loaded = true;
              //console.log(this.chartData);

              /*let lastDate = new Date(
                                                                                                                                                                                                                                                                                                                                                  devices[0].data.date.toLocaleString("sv-SE", {
                                                                                                                                                                                                                                                                                                                                                    timeZone: "Atlantic/Azores",
                                                                                                                                                                                                                                                                                                                                                  })
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                let sdConv = this.padTo2Digits(
                                                                                                                                                                                                                                                                                                                                                  lastDate.toLocaleDateString("sv-SE", {
                                                                                                                                                                                                                                                                                                                                                    year: "numeric",
                                                                                                                                                                                                                                                                                                                                                    month: "2-digit",
                                                                                                                                                                                                                                                                                                                                                    day: "2-digit",
                                                                                                                                                                                                                                                                                                                                                  })
                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                this.latestData.date = sdConv;
                                                                                                                                                                                                                                                                                                                                                this.latestData.hours = lastDate.getHours();
                                                                                                                                                                                                                                                                                                                                                this.latestData.minutes = lastDate.getMinutes();*/
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
            this.showsection = true;
            this.message.type = "danger";
            this.message.msg = this.translate("mesProblem");
          });
      },
      padTo2Digits(num) {
        return String(num).padStart(2, "0");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      closeDetailsModal() {
        this.isModalDetailsVisible = false;
      },
      closeDeleteModal() {
        this.isModalDeleteVisible = false;
      },
      edit() {
        this.isModalDetailsVisible = false;
        localStorage.setItem("idtoedit", this.toEditID);
        this.$router.push("editapiary");
      },
      async detail(id) {
        this.isShow = true;
        this.message.type = "";
        this.message.msg = "";
        //(this.isShow = true((this.message.type = ""))), (this.message.msg = "");
        await axios
          .get("https://bhsapi.duartecota.com/apiary/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
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
      async _delete() {
        this.isModalDeleteVisible = false;
        this.isShow = true;
        await axios
          .delete("https://bhsapi.duartecota.com/apiary/" + this.toDeleteID, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("deleteApiarySuccess"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.getApiaries();
            } else if (response.data.http == 202) {
              this.isShow = false;
              notify({
                title: this.translate("notifErrorTitle"),
                text: this.translate("deleteApiaryFail"),
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
              text: this.translate("mesProblems"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
          });
      },
      async detailsModal(id) {
        this.toEditID = id;
        await this.detail(id);
        this.isModalDetailsVisible = true;
      },
      async deleteModal(id) {
        this.toDeleteID = id;
        this.isModalDeleteVisible = true;
      },
      interventions(id) {
        localStorage.setItem("idtointerventions", id);
        this.$router.push("interventions");
      },
      getApiaryDevices(id) {
        alert(id);
      },
      map() {
        this.$router.push("map");
      },
      back() {
        this.$router.push("hives");
      },
    },
  };
</script>
    