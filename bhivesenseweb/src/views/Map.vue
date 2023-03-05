<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("devicesAllTitle") }}</h2>
    <section class="line-1"></section>
    <section>
      <button @click="back()" type="button" class="btn mt-4 my-button">
        <i class="fas fa-arrow-left me-1 act-btn" aria-hidden="true"></i>
        {{ translate("btnBack") }}
      </button>
    </section>
    <section class="mt-4" v-if="showMap">
      <GoogleMap
        api-key="AIzaSyBS5cccM97lkMCpieTfkCKC4oiyY-r5vOI"
        style="width: 100%; height: calc(100vh - 200px)"
        :center="center"
        :zoom="18"
      >
        <Marker :options="markerOptions">
          <!--<InfoWindow :options="{ position: center, content: 'Hello World!' }" />-->
          <InfoWindow>
            <div id="contet">
              <div id="siteNotice"></div>
              <h2 id="firstHeading" class="firstHeading">Apiary</h2>
              <div id="bodyContent">
                <p>
                  <b>{{ translate("modalApiaryLocation") }}{{ location }}</b>
                </p>
                <p>
                  <b>{{ translate("modalApiaryAddress") }}{{ address }}</b>
                </p>
                <p>
                  <b
                    >{{ translate("modalApiaryObservations")
                    }}{{ observations }}</b
                  >
                </p>
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
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
  import axios from "axios";
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { notify } from "@kyvg/vue3-notification";
  import { defineComponent } from "vue";
  import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
  import { mapGetters, mapActions } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";

  export default defineComponent({
    mixins: [en, pt],
    components: { GoogleMap, Marker, InfoWindow },
    setup() {
      const center = {
        lat: parseFloat(localStorage.getItem("lat")),
        lng: parseFloat(localStorage.getItem("lon")),
      };
      const markerOptions = {
        position: center,
        label: "",
        title: "Hive",
      };
      return { center, markerOptions };
    },
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        apiaries: [],
        lang: lang,
        isShow: true,
        showMap: true,
        address: "",
        location: "",
        observations: "",
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
        el: "#app",
      }),
    },
    mounted() {
      this.detail();
      this.showMap = false;
      this.isShow = false;
      if (
        localStorage.getItem("lat") == "null" ||
        localStorage.getItem("lon") == "null"
      ) {
        notify({
          title: this.translate("notifWarningTitle"),
          text: this.translate("warnMap"),
          type: "warn",
          duration: 3000,
          speed: 500,
        });
      } else {
        this.showMap = true;
      }
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      async detail() {
        this.isShow = true;
        await axios
          .get(
            "https://bhsapi.duartecota.com/apiary/one/" +
              localStorage.getItem("apiaryIDtoget"),
            {
              headers: {
                Authorization: this.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.address = response.data.body.address;
            this.observations = response.data.body.observations;
            this.location = response.data.body.location;
            this.isShow = false;
            return true;
          })
          .catch(() => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
            this.isShow = false;
            return false;
          });
      },
      back() {
        this.$router.push("apiaries");
      },
      teste() {
        alert("teste");
      },
    },
  });
</script>