<template>
  <section class="container my-body">
    <hr />
    <h1 class="text-center">{{ translate("devicesAllTitle") }}</h1>
    <hr />

    <GoogleMap
      api-key="AIzaSyBS5cccM97lkMCpieTfkCKC4oiyY-r5vOI"
      :options="mapStyle"
      style="width: 100%; height: 600px"
      :center="center"
      :zoom="19">
      <Marker :options="markerOptions">
      <!--<InfoWindow :options="{ position: center, content: 'Hello World!' }" />-->
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
          <div id="bodyContent">
            <p>
              <b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large sandstone rock formation in the southern
              part of the Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) south west of the
              nearest large town, Alice Springs; 450&#160;km (280&#160;mi) by road. Kata Tjuta and Uluru are the two
              major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and
              Yankunytjatjara, the Aboriginal people of the area. It has many springs, waterholes, rock caves and
              ancient paintings. Uluru is listed as a World Heritage Site.
            </p>
            <p>
              Attribution: Uluru,
              <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
                https://en.wikipedia.org/w/index.php?title=Uluru</a
              >
              (last visited June 22, 2009).
            </p>
          </div>
        </div>
      </InfoWindow>
  </Marker>
    </GoogleMap>

    <section class="text-center">
      <button @click="back()" type="button" class="btn mt-4 my-button">
        {{ translate("btnBack") }}
      </button>
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
.my-button {
  width: 120px;
  background-color: black;
  color: white;
}

.my-button:hover {
  background-color: white;
  color: black;
}
.my-body {
  margin-top: 100px;
}
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
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import axios from "axios";
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
      const center = { lat: 37.7458399, lng: -25.6651378 };
      const markerOptions = { position: center, label: "H", title: "LADY LIBERTY" };
      return { center, markerOptions };
    },
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        apiaries: [],
        img: require("../assets/IMG1220.png"),
        lang: lang,
        message: {
          type: "",
          msg: "",
        },
        address: "",
        observations: "",
        regdate: "",
        isShow: true,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        toDeleteID: "",
        toEditID: "",
        toInterventionsID: "",
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
    created() {
      this.isShow = false;
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      back() {
        this.$router.push("devices");
      },
      teste() {
        alert('teste')
      }
    },
  });
</script>