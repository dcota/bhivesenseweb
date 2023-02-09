<template>
  <section class="container my-body">
    <h2 class="my-text-color">{{ translate("hivesAllTitle") }}</h2>
    <section class="line-1"></section>
    <section>
      <button
        @click="this.$router.push('assignhive')"
        type="button"
        class="btn mt-4 me-3 my-button"
      >
        <section v-if="!isShow">
          <i class="fa-solid fa-plus"></i>
          {{ translate("btnAssign") }}
        </section>
        <section
          v-else
          class="spinner-border spinner-border-sm"
          role="status"
        ></section>
      </button>
      <button @click="back()" type="button" class="btn mt-4 my-button">
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
    <section class="row mt-4">
      <section
        class="col-12 col-md-4 col-lg-3"
        v-for="device of this.devices"
        :key="device._id"
      >
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 6px 20px 0 rgba(0, 0, 0, 0.1);
          "
        >
          <section class="card-body">
            <h5 class="card-title text-center">
              {{ translate("lblCardHive").toUpperCase() }}
            </h5>
            <hr />
            <p class="text-center" style="font-size: small">{{ device._id }}</p>
            <section v-if="!device.state">
              <p class="text-center">
                {{ translate("lblStatus") }}
                <img :src="red" alt="..." style="width: 10%" />
              </p>
            </section>
            <section v-else>
              <p class="text-center">
                {{ translate("lblStatus") }}
                <img :src="green" alt="..." style="width: 10%" />
              </p>
            </section>

            <section class="text-center">
              <section class="row mt-2">
                <section class="col-sm-3 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('btnModalEdit')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    class="btn text-center bn_card"
                    @click="loadEditPage(device._id)"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </section>
                <section class="col-sm-3 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('lblCardData')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    class="btn text-center bn_card"
                    @click="loadDetails(device._id)"
                  >
                    <i class="fa-solid fa-chart-line"></i>
                  </button>
                </section>
                <section class="col-sm-3 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('lblMap')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    class="btn text-center bn_card"
                    @click="map"
                  >
                    <i class="fa-solid fa-map-location-dot"></i>
                  </button>
                </section>
                <section class="col-sm-3 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('btnUnassignModal')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    class="btn text-center bn_card"
                    @click="unassign(apiary._id)"
                  >
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>

    <ModalDetails
      v-show="isModalDetailsVisible"
      @close="closeDetailsModal"
      @edit="edit"
      :address="address"
      :observations="observations"
      :regdate="regdate"
    />
    <ModalDelete
      v-show="isModalDeleteVisible"
      @_close="closeDeleteModal"
      @deleteAction="_delete"
    />
    <!--<section class="spacer"></section>-->
  </section>
</template>
  
  <style scoped>
.bn_card {
  background-color: #ebc002;
  border-radius: 10px;
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
  import ModalDetails from "../components/ModalApiaryDetails.vue";
  import ModalDelete from "../components/ModalDeleteApiary.vue";
  import { notify } from "@kyvg/vue3-notification";
  import { mapGetters, mapActions } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "Apiaries",
    mixins: [en, pt],
    components: {
      ModalDetails,
      ModalDelete,
    },
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        green: require("../assets/green.png"),
        red: require("../assets/red.png"),
        devices: [],
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
        showsection: false,
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
    mounted() {
      //localStorage.setItem("apiary", "");
      this.getDevices();
    },
    methods: {
      async getDevices() {
        this.isShow = true;
        this.devices = [];
        await axios
          .get(
            "https://bhsapi.duartecota.com/device/forapiary/" +
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
              for (let i = 0; i < devices.length; i++) {
                this.devices.push({
                  _id: devices[i]._id,
                  state: devices[i].state,
                });
              }
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
        this.$router.push("apiaries");
      },
      loadDetails(id) {
        localStorage.setItem("hiveIDtoget", id);
        //alert(id);
        this.$router.push("/hivedetails");
      },
      loadEditPage(id) {
        localStorage.setItem("hiveidtoedit", id);
        this.$router.push("/editdevice");
      },
      unassign(id) {
        alert(id);
      },
    },
  };
</script>
  