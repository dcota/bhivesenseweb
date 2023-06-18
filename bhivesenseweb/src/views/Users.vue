<template id="example-modal">
  <section class="container my-body">
    <h1 class="my-text-color">{{ translate("usersTitle") }}</h1>
    <section class="line-1"></section>
    <section class="row mt-3">
      <h4 class="my-text-color">{{ translate("usersLbl") }}</h4>
    </section>
    <section class="card mt-2">
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
              <th>{{ translate("thdUsersName") }}</th>
              <th class="text-center">{{ translate("thdUsersStatus") }}</th>
              <th class="text-center">{{ translate("thdUsersLastAccess") }}</th>
              <th class="text-center">{{ translate("thdUsersActions") }}</th>
            </tr>
            <tr v-for="user of this.users" :key="user._id">
              <td>{{ user.name }}</td>
              <td class="text-center">{{ user.status }}</td>
              <td class="text-center">{{ user.lastlogin }}</td>
              <td class="text-center">
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblDetailsUser')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="detailsModal(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                  :disabled="!user.active"
                  style="width: 50px"
                >
                  <i class="fas fa-search" aria-hidden="true"></i>
                </button>
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblCancelUser')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="deleteModal(user._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                  :disabled="!user.active"
                  style="width: 50px"
                >
                  <i class="far fa-trash-alt" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <ModalDetails
      v-show="isModalDetailsVisible"
      @close="closeModalDetails"
      :name="name"
      :type="type"
      :email="email"
      :mobile="mobile"
      :bdate="bdate"
      :nif="nif"
      :notifications="notifications"
      :img="img"
    />
    <ModalDelete
      v-show="isModalDeleteVisible"
      @close="closeModalDelete"
      @cancel="cancelUser"
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
  import ModalDetails from "../components/ModalUserDetails.vue";
  import ModalDelete from "../components/ModalCancelAccount.vue";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    components: {
      ModalDetails,
      ModalDelete,
    },
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        data: localStorage.token,
        users: [],
        message: {
          type: "",
          msg: "",
        },
        name: "",
        type: "",
        email: "",
        mobile: "",
        bdate: "",
        nif: "",
        notifications: "",
        img: "",
        showsection: false,
        isShow: false,
        lang: lang,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
        usertodelete: "",
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
      this.getUsers();
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      async getUsers() {
        this.users = [];
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/user", {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.isShow = false;
            let users = response.data.body;
            for (let i = 0; i < users.length; i++) {
              if (users[i].level == "beekeeper") {
                this.users.push({
                  _id: users[i]._id,
                  name: users[i].name,
                  active: users[i].active,
                  status:
                    users[i].active == true
                      ? this.translate("usersActive")
                      : this.translate("usersInactive"),
                  lastlogin:
                    users[i].lastlogin == null
                      ? this.translate("lastLoginNever")
                      : users[i].lastlogin,
                });
              }
            }
          })
          .catch((error) => {
            this.showLoader(false);
            alert(error);
          });
      },
      async cancel(id) {
        await axios
          .put("https://bhsapi.duartecota.com/user/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("cancelAccMessage"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.getUsers();
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
      async detail(id) {
        this.isShow = true;
        this.message.type = "";
        this.message.msg = "";
        await axios
          .get("https://bhsapi.duartecota.com/user/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.name = response.data.body.name;
            let type = response.data.body.type;
            switch (type) {
              case "Individual":
                this.type = this.translate("typeOp1");
                break;
              case "Company":
                this.type = this.translate("typeOp2");
                break;
              case "Companhia":
                this.type = this.translate("typeOp2");
                break;
              case "Association":
                this.type = this.translate("typeOp3");
                break;
              case "Associação":
                this.type = this.translate("typeOp3");
                break;
            }
            this.email = response.data.body.email;
            this.bdate = response.data.body.bdate;
            this.mobile = response.data.body.mobile;
            this.nif = response.data.body.nif;
            let notifications = response.data.body.notifications;
            switch (notifications) {
              case true:
                this.notifications = this.translate("modalNotifTrue");
                break;
              case false:
                this.notifications = this.translate("modalNotifFalse");
                break;
            }
            this.img = response.data.body.img;
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
      async detailsModal(id) {
        await this.detail(id);
        this.isModalDetailsVisible = true;
      },
      async deleteModal(id) {
        this.usertodelete = id;
        this.isModalDeleteVisible = true;
      },
      closeModalDetails() {
        this.isModalDetailsVisible = false;
      },
      closeModalDelete() {
        this.isModalDeleteVisible = false;
      },
      async cancelUser() {
        await this.cancel(this.usertodelete);
        this.isModalDeleteVisible = false;
      },
    },
  };
</script>