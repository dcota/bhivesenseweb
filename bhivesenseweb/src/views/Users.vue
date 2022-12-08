/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Gestão de Alunos (Admin)
*/

<template id="example-modal">
  <section class="container">
    <section class="row mt-3 text-center">
      <h1 class="text-center">{{ translate("usersTitle") }}</h1>
    </section>
    <section
      v-if="showsection"
      class="alert mt-3"
      role="alert"
      v-bind:class="'alert-' + message.type"
    >
      {{ message.msg }}
    </section>
    <section class="row mt-3">
      <h4>{{ translate("usersLbl") }}</h4>
    </section>
    <section class="card mt-2">
      <section class="card-body">
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>{{ translate("thdName") }}</th>
              <th>{{ translate("thdStatus") }}</th>
              <th>{{ translate("thdLastAccess") }}</th>
              <th class="text-center">{{ translate("thdActions") }}</th>
            </tr>
            <tr v-for="user of this.users" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.status }}</td>
              <td>{{ user.lastlogin }}</td>
              <td class="text-center">
                <button
                  @click="detailsModal(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                >
                  <i class="fas fa-search me-1" aria-hidden="true"></i>
                  {{ translate("btnDetails") }}
                </button>
                <button
                  @click="cancel(user._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                >
                  <i class="far fa-trash-alt me-1" aria-hidden="true"></i
                  >Remover
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      :name="name"
      :type="type"
      :email="email"
      :mobile="mobile"
      :bdate="bdate"
      :nif="nif"
      :notifications="notifications"
      :img="img"
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
  import Modal from "../components/ModalUserDetails.vue";
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
      Modal,
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
        showsection: false,
        isShow: false,
        lang: lang,
        isModalVisible: false,
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
              this.showsection = true;
              this.message.type = "success";
              this.message.msg = this.translate("cancelAccMessage");
              setTimeout(() => (this.showsection = false), 3000);
              this.getUsers();
            } else {
              this.isShow = false;
              this.showsection = true;
              this.message.type = "danger";
              this.message.msg = this.translate("mesProblem");
            }
          })
          .catch(() => {
            this.isShow = false;
            this.showsection = true;
            this.error = this.translate("mesProblem");
          });
      },
      async detail(id) {
        this.isShow = true;
        this.message.type = "";
        this.message.msg = "";
        //(this.isShow = true((this.message.type = ""))), (this.message.msg = "");
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
            let img = response.data.body.img;
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
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
  };
</script>