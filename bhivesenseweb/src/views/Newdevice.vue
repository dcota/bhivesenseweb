/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="container">
    <section class="scrolling-component" ref="scrollcomponent" name="lang">
      <section class="container my-body" style="width: 70%">
        <h1 class="text-center mt-5">{{ translate("formNewDeviceTitle") }}</h1>
        <section
          v-if="showsection"
          class="alert mt-3 alert-dismissible fade show"
          role="alert"
          v-bind:class="'alert-' + message.type"
        >
          {{ message.msg }}
        </section>
        <form class="form-signin" @submit.prevent="submit">
          <section class="row">
            <section class="col-md-12 g-4 flex">
              <label for="location" class="form-label">{{
                translate("formNewDeviceID")
              }}</label>
              <input
                type="text"
                v-model="form.id"
                class="form-control"
                id="id"
                style="font-size: medium"
              />
              <button
                class="btn me-4 btn_copy mt-1"
                @click="copyText(this.form.id)"
              >
                {{ translate("newDeviceCopyBtn") }}
              </button>
            </section>
          </section>

          <section class="text-center">
            <button
              @click="showModal()"
              type="submit"
              class="btn mt-5 me-4 my-button"
            >
              {{ translate("formNewDeviceBtnGenerate") }}
            </button>
            <button @click="back" type="button" class="btn mt-5 my-button">
              {{ translate("btnBack") }}
            </button>
          </section>
        </form>
        <section class="text-center">
          <section v-if="isShow" class="text-center">
            <section class="spinner-border mt-4" role="status">
              <span class="visually-hidden">Loading...</span>
            </section>
            <section class="mb-2">{{ translate("spinnerTxt") }}</section>
          </section>
        </section>
        <Modal
          v-show="isModalVisible"
          @close="closeModal"
          @generate="generate"
        />
        <section class="spacer"></section>
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
.btn_copy {
  width: 75px;
  background-color: black;
  color: white;
}
.btn_copy:hover {
  background-color: white;
  color: black;
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
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import axios from "axios";
  import Modal from "../components/ModalNewDevice";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  import { cloneWithoutLoc } from "@babel/types";
  export default {
    name: "new Apiary",
    mixins: [en, pt],
    components: {
      Modal,
    },
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          id: "",
        },
        message: {
          type: "",
          msg: "",
        },
        isShow: false,
        isModalVisible: false,
        showsection: false,
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
    methods: {
      async getID() {
        //postData.append("lang", this.lang); //enviar se necessário para e-mail
        this.isShow = true;
        await axios
          .post("https://bhsapi.duartecota.com/device", {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 201) {
              this.form.id = response.data.body;
              this.isShow = false;
              this.showsection = true;
              this.message.type = "success";
              this.message.msg = this.translate("mesNewDeviceSuccess");
              setTimeout(() => (this.showsection = false), 3000);
            } else {
              this.isShow = false;
              this.showsection = true;
              this.message.type = "danger";
              this.message.msg = this.translate("mesProblem");
            }
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
            this.showsection = true;
            this.message.type = "danger";
            this.message.msg = this.translate("mesProblem");
          });
      },
      back() {
        this.$router.replace("/");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      async copyText(id) {
        if (this.form.id == "") {
          this.showsection = true;
          this.message.type = "danger";
          this.message.msg = this.translate("newDeviceNoID");
          setTimeout(() => (this.showsection = false), 3000);
        } else {
          await navigator.clipboard.writeText(id);
          this.showsection = true;
          this.message.type = "success";
          this.message.msg = this.translate("newDeviceCopyAlert");
          setTimeout(() => (this.showsection = false), 3000);
        }
      },
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      generate() {
        this.isModalVisible = false;
        this.getID();
      },
    },
  };
</script>