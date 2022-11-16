/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent">
    <section class="container my-body">
      <h1 class="text-center mt-5">FICHA DE INSCRIÇÃO</h1>
      <section v-if=isShow
        class="alert mt-3"
        role="alert"
        v-bind:class="'alert-' + message.type"
      >
        {{ message.msg }}
      </section>
      <form class="form-signin" v-on:submit.prevent="send">
        <section class="row mt-4">
          <section class="col-md-2 g-4">
            <input
              type="text"
              v-model="form.firstname"
              class="form-control"
              id="firstname"
              placeholder="primeiro nome..."
            />
          </section>
          <section class="col-md-2 g-4">
            <input
              type="text"
              v-model="form.lastname"
              class="form-control"
              id="lastname"
              placeholder="último nome..."
            />
          </section>
          <section class="col-md-8 g-4">
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              id="name"
              placeholder="nome completo..."
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-8 g-4">
            <input
              type="text"
              v-model="form.course"
              class="form-control"
              id="course"
              placeholder="curso..."
            />
          </section>
          <section class="col-md-4 g-4">
            <input
              type="text"
              v-model="form.class"
              class="form-control"
              id="class"
              placeholder="turma..."
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-4 g-4">
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="email"
              placeholder="email..."
            />
          </section>
          <section class="col-md-4 g-4">
            <input
              type="text"
              v-model="form.mobile"
              class="form-control"
              id="mobile"
              placeholder="telemóvel..."
            />
          </section>
          <section class="col-md-4 g-4">
            <input
              placeholder="Data de nascimento"
              class="form-control textbox-n"
              type="text"
              v-model="form.bdate"
              onfocus="(this.type = 'date')"
              id="bdate"
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-4 g-4">
            <input
              type="text"
              v-model="form.auth.username"
              class="form-control"
              id="username"
              placeholder="username..."
            />
          </section>
          <section class="col-md-4 g-4">
            <input
              type="password"
              v-model="form.auth.password"
              class="form-control"
              id="password"
              placeholder="password..."
            />
          </section>
        </section>
        <section class="row mt-4">
          <section>
            <section class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="form.notifications"
                value=""
                id="subscribenews"
                checked
              />
              <label class="form-check-label" for="subscribenews">
                Subscrever notificações?</label
              >
            </section>
          </section>
        </section>
        <section class="text-center">
          <button
            type="submit"
            class="btn btn-outline-primary mt-4 me-4 my-button"
          >
            SUBMETER
          </button>
          <button
            @click="cleanForm()"
            type="button"
            class="btn btn-outline-primary mt-4 me-4 my-button"
          >
            LIMPAR
          </button>
          <button
            @click="back()"
            type="button"
            class="btn btn-outline-primary mt-4 my-button"
          >
            VOLTAR
          </button>
        </section>
      </form>

      <section class="spacer"></section>
    </section>
  </section>
</template>

<style scoped>
.my-button {
  width: 120px;
}
select option[disabled]:first-child {
  display: none;
}
.my-body {
  margin-top: 0px;
}
.spacer {
  height: 200px;
}
.top-btn {
  font-weight: bold;
  width: 100px;
}
</style>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
export default {
  name: "submit",
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        name: "",
        course: "",
        class: "",
        email: "",
        mobile: "",
        bdate: "",
        auth: {
          username: "",
          password: "",
        },
        notifications: true,
      },
      message: {
        type: "",
        msg: "",
      },
      isShow:false
    };
  },
  methods: {
    ...mapMutations({
      showLoader: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async send() {
      (this.message.type = ""), (this.message.msg = "");
      let postData = {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        name: this.form.name,
        course: this.form.course,
        class: this.form.class,
        email: this.form.email,
        mobile: parseInt(this.form.mobile),
        accepted: false,
        level: "student",
        bdate: this.form.bdate,
        auth: {
          username: this.form.auth.username,
          password: this.form.auth.password,
        },
        notifications: this.form.notifications,
      };
      if (this.checkForm() == true) {
        this.showLoader(true);
        await axios
          //.post("https://cprob-api.herokuapp.com/user", postData)
          .post("http://localhost:3000/user", postData)
          .then((response) => {
            if (response.data.http == 201) {
              this.showLoader(false);
              this.message.type = "success";
              this.message.msg = "Utilizador criado com sucesso. A sua inscrição fica pendente de aprovação.";
              this.isShow=true
            } else if (response.data.http == 200) {
              this.showLoader(false);
              this.message.type = "warning";
              this.message.msg = "Utilizador existente.";
              this.isShow=true
            } else {
              this.showLoader(false);
              this.message.type = "danger";
              this.message.msg = "Ocorreu um problema, tente de novo...";
              this.isShow=true
            }
          })
          .catch(() => {
            this.error = "Valores inválidos!";
            this.showLoader(false);
          });
      } else {
        this.message.type = "danger";
        this.message.msg = "Todos os campos deve estar preenchidos!";
        this.isShow=true
      }
    },
    cleanForm() {
      (this.form.firstname = ""),
        (this.form.lastname = ""),
        (this.form.name = ""),
        (this.form.course = ""),
        (this.form.class = ""),
        (this.form.email = ""),
        (this.form.mobile = ""),
        (this.form.bdate = ""),
        (this.form.auth = {
          username: "",
          password: "",
        }),
        (this.form.notifications = true)
        this.isShow=false
    },
    back() {
      this.$router.replace("/");
    },
    checkForm() {
      if (
        this.form.firstname != "" &&
        this.form.lastname != "" &&
        this.form.name != "" &&
        this.form.course != "" &&
        this.form.class != "" &&
        this.form.email != "" &&
        this.form.mobile != "" &&
        this.form.bdate != "" &&
        this.form.auth.username != "" &&
        this.form.auth.password != ""
      )
        return true;
      else return false;
    },
  },
};
</script>