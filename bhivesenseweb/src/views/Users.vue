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
                  @click="detail(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fas fa-search me-1" aria-hidden="true"></i>
                  {{ translate("btnDetails") }}
                </button>
                <button
                  @click="deleteStd(user._id)"
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
  import { mapGetters, mapMutations } from "vuex";
  import {
    LOADING_SPINNER_SHOW_MUTATION,
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        data: localStorage.token,
        users: [],
        showModal: true,
        form: {
          firstname: "",
          lastname: "",
          name: "",
          mobile: "",
          type: "",
          email: "",
          mobile: "",
          bdate: "",
          notifications: false,
        },
        message: {
          type: "",
          msg: "",
        },
        state: true,
        showsection: false,
        isShow: false,
        lang: lang,
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
      ...mapMutations({
        showLoader: LOADING_SPINNER_SHOW_MUTATION,
      }),
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
      async acceptStd(_id) {
        this.showLoader(true);
        await axios
          .put("https://cprob-api.herokuapp.com/user/" + _id, {
            //.put("http://localhost:3000/user/" + _id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then(() => {
            this.message.msg = "Utilizador aceite!";
            this.message.type = "success";
            this.isShow = true;
            this.showLoader(false);
            this.getUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async deleteStd(_id) {
        this.showLoader(true);
        await axios
          .delete("https://cprob-api.herokuapp.com/user/" + _id, {
            //.delete("http://localhost:3000/user/" + _id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then(() => {
            this.message.msg = "Utilizador eliminado!";
            this.message.type = "success";
            this.isShow = true;
            this.showLoader(false);
            this.getUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async detail(_id) {
        (this.message.type = ""), (this.message.msg = ""), this.showLoader(true);
        await axios
          .get("https://cprob-api.herokuapp.com/user/" + _id, {
            //.get("http://localhost:3000/user/" + _id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            (this.form.firstname = response.data.body.firstname),
              (this.form.lastname = response.data.body.lastname),
              (this.form.name = response.data.body.name),
              (this.form.course = response.data.body.course),
              (this.form.class = response.data.body.class),
              (this.form.bdate = response.data.body.bdate),
              (this.form.email = response.data.body.email),
              (this.form.mobile = response.data.body.mobile);
            if (response.data.body.notifications == true)
              this.form.notifications = "SIM";
            else this.form.notifications = "NÃO";
            this.state = true;
            this.showLoader(false);
          })
          .catch(() => {
            this.message.msg = "Ocorreu um problema";
            this.message.type = "warning";
            this.isShow = true;
            this.showLoader(false);
          });
      },
    },
  };
</script>