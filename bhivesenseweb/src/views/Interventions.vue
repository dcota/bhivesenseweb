/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Gestão de Alunos (Admin)
*/

<template>
  <section class="container my-body">
    <section class="row mt-5 text-center">
      <h1 class="text-center mt-5">{{ translate("interventionsTitle") }}</h1>
    </section>
    <section>
      <button @click="create" type="submit" class="btn mt-4 me-4 my-button">
        {{ translate("btnNew") }}
      </button>
    </section>
    <section class="row mt-3">
      <h4>{{ translate("interventionsLbl") }}</h4>
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
              <th>{{ translate("thdInterventionsDesc") }}</th>
              <th class="text-center">
                {{ translate("thdInterventionsDate") }}
              </th>
              <th class="text-center">
                {{ translate("thdInterventionsAction") }}
              </th>
            </tr>
            <tr
              v-for="intervention of this.interventions"
              :key="intervention._id"
            >
              <td>{{ intervention.description }}</td>
              <td class="text-center">{{ intervention.date }}</td>
              <td class="text-center">
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblDetailsUser')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="detailsModal(intervention._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                  style="width: 50px"
                >
                  <i class="fas fa-search" aria-hidden="true"></i>
                </button>
                <button
                  data-bs-toggle="tooltip"
                  v-bind:title="translate('lblDelete')"
                  data-bs-placement="bottom"
                  data-bs-custom-class="custom-tooltip"
                  @click="deleteModal(intervention._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
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
    <section class="text-center">
      <button @click="back()" type="button" class="btn mt-4 my-button">
        {{ translate("btnBack") }}
      </button>
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
.my-button {
  width: 120px;
  background-color: black;
  color: white;
}

.my-button:hover {
  background-color: white;
  color: black;
}
select option[disabled]:first-child {
  display: none;
}
.ac-btn {
  width: 120px;
  color: white;
  font-weight: bold;
}

.my-body {
  margin-top: 0px;
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
  //import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
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
        interventions: [],
        message: {
          type: "",
          msg: "",
        },
        showsection: false,
        isShow: false,
        lang: lang,
        isModalDetailsVisible: false,
        isModalDeleteVisible: false,
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
      this.getInterventions();
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      async getInterventions() {
        this.interventions = [];
        this.isShow = true;
        await axios
          .get(
            "https://bhsapi.duartecota.com/intervention/apiary/" +
              localStorage.getItem("idtointerventions"),
            {
              headers: {
                Authorization: this.token,
              },
            }
          )
          .then((response) => {
            this.isShow = false;
            if (response.data.body.length == 0) {
              notify({
                title: this.translate("notifWarningTitle"),
                text: this.translate("mesNoInterventions"),
                type: "warn",
                duration: 3000,
                speed: 500,
              });
            } else {
              let interventions = response.data.body;
              for (let i = 0; i < interventions.length; i++) {
                this.interventions.push({
                  _id: interventions[i]._id,
                  description: interventions[i].description,
                  date: interventions[i].date,
                });
              }
            }
          })
          .catch((error) => {
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
      async cancelUser(id) {
        await this.cancel(this.usertodelete);
        this.isModalDeleteVisible = false;
      },
      back() {
        this.$router.replace("apiaries");
      },
    },
  };
</script>