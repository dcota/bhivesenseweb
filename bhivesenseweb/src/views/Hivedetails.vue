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
      <select
        class="form-select mt-4 pull-right"
        aria-label="Default select example"
        style="width: 20%"
      >
        <option value="1" selected>Today</option>
        <option value="2">Week</option>
        <option value="3">Month</option>
      </select>
    </section>

    <section class="mt-3" v-bind="latestData" v-if="hasData">
      <h5>
        {{ translate("lblLastData") }} {{ latestData.date }}
        {{ translate("lblAt") }} {{ latestData.hours }}h{{ latestData.minutes }}
      </h5>
    </section>
    <section class="row mt-3" v-bind="latestData">
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
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
                ><i class="fas fa-temperature-high" aria-hidden="true"
                  ><span> T(in)</span></i
                ></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.ti }}</section>
            <div class="form-check d-flex justify-content-center">
              <input
                v-model="plotType"
                @change="handleChange($event)"
                value="ti"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="ti"
                checked
              />
            </div>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
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
                ><i class="fas fa-droplet"><span>% H(in)</span></i></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.hi }}</section>
            <div class="form-check d-flex justify-content-center">
              <input
                @change="handleChange($event)"
                v-model="plotType"
                value="hi"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="hi"
              />
            </div>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
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
                ><i class="fas fa-temperature-high" aria-hidden="true"
                  ><span> T(out)</span></i
                ></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.to }}</section>
            <div class="form-check d-flex justify-content-center">
              <input
                @change="handleChange($event)"
                v-model="plotType"
                value="to"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="to"
              />
            </div>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
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
                ><i class="fas fa-droplet"><span>% H(out)</span></i></strong
              >
            </h6>
            <hr />
            <section class="text-center">{{ latestData.ho }}</section>
            <div class="form-check d-flex justify-content-center">
              <input
                @change="handleChange($event)"
                v-model="plotType"
                value="ho"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="ho"
              />
            </div>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
        <section
          class="card mb-3 mh-100"
          style="
            border-radius: px;
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
            <div class="form-check d-flex justify-content-center">
              <input
                @change="handleChange($event)"
                v-model="plotType"
                value="w"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="w"
              />
            </div>
          </section>
        </section>
      </section>
      <section class="col-12 col-md-4 col-lg-2" v-if="hasData">
        <section
          class="card mb-3 mh-100"
          style="
            border-radius: px;
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
            <div class="form-check d-flex justify-content-center">
              <input
                @change="handleChange($event)"
                v-model="plotType"
                value="s"
                class="form-check-input"
                type="radio"
                name="plotType"
                id="s"
              />
            </div>
          </section>
        </section>
      </section>
    </section>

    <section class="card p-2" v-if="hasData" style="border-radius: 10px">
      <section class="h5 text-center" id="title" v-html="title"></section>
      <!--<Line v-if="loaded" :data="data" :options="options" />-->
      <area-chart
        v-if="loaded"
        :data="type"
        :min="0"
        :max="max"
        :xmin="0"
        :download="true"
        width="100%"
        height="470px"
        :colors="['#a17f05']"
        :dataset="{ borderWidth: 2 }"
        loading="Loading..."
        xtitle="Time"
        :ytitle="ytitle"
      ></area-chart>
    </section>
    <section class="spacer"></section>
  </section>
</template>
    
<style scoped>
.spacer {
  height: 50px;
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
  import { template } from "lodash";
  import { thisTypeAnnotation } from "@babel/types";
  export default {
    name: "Hives",
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        ti: [],
        to: [],
        hi: [],
        ho: [],
        s: [],
        w: [],
        plotType: null,
        type: null,
        devices: [],
        lang: lang,
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
        hasData: false,
        ytitle: "",
        title: "",
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
      }),
    },
    created() {
      this.loaded = false;
      this.getLatest();
      this.getTI();
      this.plotType = "ti";
      this.type = this.ti;
      this.timer = setInterval(this.getLatest, 300000);
    },
    beforeUnmount() {
      this.cancelAutoUpdate();
    },
    methods: {
      cancelAutoUpdate() {
        clearInterval(this.timer);
      },
      async getLatest() {
        console.log;
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
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              this.latestData.ti = devices[0].data.ti;
              this.latestData.hi = devices[0].data.hi;
              this.latestData.to = devices[0].data.to;
              this.latestData.ho = devices[0].data.ho;
              this.latestData.s = devices[0].data.s;
              this.latestData.w = devices[0].data.w;
              let lastDate = new Date(
                this.padTo2Digits(
                  devices[0].data.date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                )
              );
              let sdConv = this.padTo2Digits(
                lastDate.toLocaleDateString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              );
              this.latestData.date = sdConv;
              this.latestData.hours =
                lastDate.getHours() < 10
                  ? "0" + lastDate.getHours()
                  : lastDate.getHours();
              this.latestData.minutes =
                lastDate.getMinutes() < 10
                  ? "0" + lastDate.getMinutes()
                  : lastDate.getMinutes();
            }
            if (this.plotType == "ti") this.getTI();
            if (this.plotType == "to") this.getTO();
            if (this.plotType == "hi") this.getHI();
            if (this.plotType == "ho") this.getHO();
            if (this.plotType == "s") this.getS();
            if (this.plotType == "w") this.getW();
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
            this.showsection = true;
          });
      },
      async getTI() {
        this.ytitle = "TEMP";
        this.title = this.translate("charTempIn") + " (&deg;C)";
        this.max = 40;
        this.loaded = false;
        this.isShow = true;
        this.ti = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].ti;
                tempArray.push(y);
                this.ti.push(tempArray);
              }
              this.type = this.ti;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async getTO() {
        this.ytitle = "TEMP";
        this.title = this.translate("charTempOut") + " (&deg;C)";
        this.max = "40";
        this.loaded = false;
        this.isShow = true;
        this.to = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].to;
                tempArray.push(y);
                this.to.push(tempArray);
              }
              this.type = this.to;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
          });
      },
      async getHI() {
        this.ytitle = "HUM";
        this.title = this.translate("charHumIn");
        this.max = "100";
        this.loaded = false;
        this.isShow = true;
        this.hi = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].hi;
                tempArray.push(y);
                this.hi.push(tempArray);
              }
              this.type = this.hi;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
          });
      },
      async getHO() {
        this.ytitle = "HUM";
        this.title = this.translate("charHumOut");
        this.max = "100";
        this.loaded = false;
        this.isShow = true;
        this.ho = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].ho;
                tempArray.push(y);
                this.ho.push(tempArray);
              }
              this.type = this.ho;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
          });
      },
      async getS() {
        this.ytitle = "SOUND LEVEL";
        this.title = this.translate("charSound");
        this.max = "200";
        this.loaded = false;
        this.isShow = true;
        this.s = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].s;
                tempArray.push(y);
                this.s.push(tempArray);
              }
              this.type = this.s;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
          });
      },
      async getW() {
        this.ytitle = "WEIGHT";
        this.title = this.translate("charWeight");
        this.max = "60";
        this.loaded = false;
        this.isShow = true;
        this.w = [];
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
            if (d.length == 0) {
              this.hasData = false;
              this.isShow = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noDataForHive"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasData = true;
              for (let i = 0; i < d.length; i++) {
                let lastDate = new Date(
                  d[i].date.toLocaleString("sv-SE", {
                    timeZone: "Atlantic/Azores",
                  })
                );
                let tempArray = [];
                let hours =
                  lastDate.getHours() < 10
                    ? "0" + lastDate.getHours()
                    : lastDate.getHours();
                let minutes =
                  lastDate.getMinutes() < 10
                    ? "0" + lastDate.getMinutes()
                    : lastDate.getMinutes();
                let x = hours + "h" + minutes;
                tempArray.push(x);
                let y = d[i].w;
                tempArray.push(y);
                this.w.push(tempArray);
              }
              this.type = this.w;
              this.loaded = true;
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
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
      map() {
        this.$router.push("map");
      },
      back() {
        this.$router.push("hives");
      },
      handleChange(event) {
        if (event.target.value == "ti") this.getTI();
        if (event.target.value == "hi") this.getHI();
        if (event.target.value == "to") this.getTO();
        if (event.target.value == "ho") this.getHO();
        if (event.target.value == "s") this.getS();
        if (event.target.value == "w") this.getW();
      },
    },
  };
</script>
    