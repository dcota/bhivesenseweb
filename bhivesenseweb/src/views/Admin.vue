/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Gestão de Alunos (Admin)
*/

<template id="example-modal">
  <section class="container">
    <section class="row mt-3 text-center">
      <h1 class="text-center">GESTÃO DE ALUNOS</h1>
    </section>
    <section
      v-if="isShow"
      class="alert mt-3"
      role="alert"
      v-bind:class="'alert-' + message.type"
    >
      {{ message.msg }}
    </section>
    <section class="row mt-3">
      <h4>Alunos inscritos:</h4>
    </section>
    <!--<section class="card mt-2">
      <section class="card-body">
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th class="text-center">Ações</th>
            </tr>
            <tr v-for="user of this.usersAccepted" :key="user._id">
              <td>{{ user.firstname + " " + user.lastname }}</td>
              <td>{{ user.course }}</td>
              <td>{{ user.class }}</td>
              <td class="text-center">
                <button
                  @click="detail(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fas fa-search me-1" aria-hidden="true"></i>
                  Detalhes
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
    <section class="row mt-3">
      <h4>Pedidos pendentes:</h4>
    </section>
    <section class="card mt-2">
      <section class="card-body">
        <table class="table mt-2">
          <tbody>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Curso</th>
              <th class="text-center">Ações</th>
            </tr>
            <tr v-for="user of this.usersToAccept" :key="user._id">
              <td>{{ user.firstname + " " + user.lastname }}</td>
              <td>{{ user.course }}</td>
              <td>{{ user.class }}</td>
              <td>
                <button
                  @click="acceptStd(user._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                >
                  <i class="fas fa-check me-1 act-btn" aria-hidden="true"></i
                  >Aceitar
                </button>
                <button
                  @click="deleteStd(user._id)"
                  type="button"
                  class="btn btn-danger btn-sm me-2 ac-btn"
                >
                  <i class="far fa-trash-alt me-1" aria-hidden="true"></i
                  >Rejeitar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>-->
    <!-- Modal -->
    <!--<section
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      v-if="state == true"
      aria-hidden="true"
    >
      <section class="modal-lg modal-dialog">
        <section class="modal-content">
          <section class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalhes do aluno:
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </section>
          <section class="modal-body">
            <section class="row">
              <section class="col-md-3">Nome:</section>
              <section class="col-md-4">{{ form.name }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-3">Curso:</section>
              <section class="col-md-4">{{ form.course }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-3">Turma:</section>
              <section class="col-md-4">{{ form.class }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-3">Email:</section>
              <section class="col-md-4">{{ form.email }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-3">Contacto móvel:</section>
              <section class="col-md-4">{{ form.mobile }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-3">Data de nascimento:</section>
              <section class="col-md-4">{{ form.bdate }}</section>
            </section>
            <section class="row mt-3">
              <section class="col-md-4">Subscrição de notificações:</section>
              <section class="col-md-4">{{ form.notifications }}</section>
            </section>
          </section>
          <section class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </section>
        </section>
      </section>
    </section>
    <section class="spacer"></section>-->
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
  import axios from "axios";
  import { mapGetters, mapMutations } from "vuex";
  import {
    LOADING_SPINNER_SHOW_MUTATION,
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    data() {
      return {
        data: localStorage.token,
        usersAccepted: [],
        usersToAccept: [],
        showModal: true,
        form: {
          firstname: "",
          lastname: "",
          name: "",
          course: "",
          class: "",
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
        isShow: false,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
      }),
    },
    /*mounted() {
      this.getUsers();
    },*/
    methods: {
      ...mapMutations({
        showLoader: LOADING_SPINNER_SHOW_MUTATION,
      }),

      async getUsers() {
        this.usersAccepted = [];
        this.usersToAccept = [];
        this.showLoader(true);
        await axios
          .get("https://cprob-api.herokuapp.com/user", {
            //.get("http://localhost:3000/user", {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.showLoader(false);
            let users = response.data.body;
            for (let i = 0; i < users.length; i++) {
              if (users[i].accepted == true && users[i].level == "student") {
                this.usersAccepted.push({
                  _id: users[i]._id,
                  firstname: users[i].firstname,
                  lastname: users[i].lastname,
                  course: users[i].course,
                  class: users[i].class,
                });
              } else if (
                users[i].accepted == false &&
                users[i].level == "student"
              ) {
                this.usersToAccept.push({
                  _id: users[i]._id,
                  firstname: users[i].firstname,
                  lastname: users[i].lastname,
                  course: users[i].course,
                  class: users[i].class,
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