<template id="example-modal">
  <section class="container my-body">
    <h1 class="my-text-color">{{ translate("assignHiveTitle") }}</h1>
    <section class="line-1"></section>
    <section>
      <button
        @click="$router.push('/hives')"
        type="button"
        class="btn mt-4 my-button"
      >
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
    <section class="row mt-3" v-if="hasHives">
      <h4 class="my-text-color">{{ translate("manageHivesLabel") }}</h4>
    </section>
    <input
      v-if="hasHives"
      type="search"
      v-model="searchID"
      class="form-control mt-4"
      v-bind:placeholder="translate('searchPholderID')"
    />

    <section class="card mt-4" v-if="hasHives">
      <section
        class="card-body"
        style="
          border-radius: 3px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
            rgba(0, 0, 0, 0.22) 0px 10px 10px;
        "
      >
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>{{ translate("thdDevicesID") }}</th>
              <th class="text-center">{{ translate("thdDevicesApiary") }}</th>
              <!--<th class="text-center">{{ translate("thdUsersStatus") }}</th>-->
              <th class="text-center">{{ translate("thdUsersActions") }}</th>
            </tr>
            <tr v-for="device in filteredPersons" :key="device.id">
              <td>{{ device.id }}</td>
              <td>{{ device.assigned }}</td>
              <!--<td class="text-center">{{ user.lastlogin }}</td>-->
              <td class="text-center">
                <!--<button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblUnregister')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="deleteModal(device.id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                  :disabled="device.hasapiary"
                  style="width: 50px"
                >
                  <i class="fa-solid fa-right-from-bracket"></i>
                </button>-->
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblAssign')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="assign(device.id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                  :disabled="device.hasapiary"
                  style="width: 50px"
                >
                  <i class="fa-solid fa-right-to-bracket"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <ModalDelete
      v-show="isModalDeleteVisible"
      @close="closeModalDelete"
      @unregister="toUnregister"
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
  import ModalDelete from "../components/ModalUnregisterDevice.vue";
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
    },
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        searchID: "",
        data: localStorage.token,
        devices: [],
        message: {
          type: "",
          msg: "",
        },
        id: "",
        state: "",
        name: "",
        showsection: false,
        isShow: false,
        lang: lang,
        isModalDeleteVisible: false,
        hivetounregister: "",
        hasHives: false,
        hasUnassigned: false,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
      }),
      filteredPersons: function () {
        return this.devices.filter(this.filterByID).sort(this.orderBy);
      },
    },
    mounted() {
      this.getDevices();
    },
    methods: {
      filterByID: function (device) {
        // no search, don't filter :
        if (this.searchID.length === 0) {
          return true;
        }

        return device.id.toLowerCase().indexOf(this.searchID.toLowerCase()) > -1;
      },
      orderBy: function (userA, userB) {
        let condition = userA[this.sortKey] > userB[this.sortKey];
        if (this.reverse) {
          return !condition;
        } else {
          return condition;
        }
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      async getDevices() {
        this.devices = [];
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/device/all/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.isShow = false;
            let devices = response.data.body;
            if (devices.length == 0) {
              this.hasHives = false;
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noHives"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              this.hasHives = true;
              for (let i = 0; i < devices.length; i++) {
                if (devices[i].apiary == null) {
                  this.hasUnassigned = true;
                  this.devices.push({
                    id: devices[i]._id,
                    assigned: this.translate("notAssignedText"),
                    hasapiary: false,
                  });
                } else {
                  this.devices.push({
                    id: devices[i]._id,
                    assigned: this.translate("assignedText"),
                    hasapiary: true,
                  });
                }
              }
            }
            if (this.hasUnassigned == false) {
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("noHivesToAssign"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async unregister(id) {
        await axios
          .put("https://bhsapi.duartecota.com/device/unregister/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("unregisterMessage"),
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
      async deleteModal(id) {
        this.hivetounregister = id;
        this.isModalDeleteVisible = true;
      },
      closeModalDelete() {
        this.isModalDeleteVisible = false;
      },
      async toUnregister() {
        await this.unregister(this.hivetounregister);
        alert(this.hivetounregister);
        this.isModalDeleteVisible = false;
      },
    },
  };
</script>