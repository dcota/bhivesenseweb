/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Ficha de Inscrição
*/

<template>
  <section class="container">
    <section class="scrolling-component" ref="scrollcomponent" name="lang">
      <section class="container my-body">
        <h1 class="my-text-color">{{ translate("formNewDeviceTitle") }}</h1>
        <section class="line-1"></section>
        <section class="container" style="max-width: 70%">
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
                  <section v-if="!isShow">
                    {{ translate("newDeviceCopyBtn") }}
                  </section>
                  <section
                    v-else
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></section>
                </button>
              </section>
            </section>

            <section class="text-center">
              <button
                @click="showModal()"
                type="submit"
                class="btn mt-5 me-4 my-button"
              >
                <section v-if="!isShow">
                  {{ translate("formNewDeviceBtnGenerate") }}
                </section>
                <section
                  v-else
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></section>
              </button>
              <button @click="back" type="button" class="btn mt-5 my-button">
                <section v-if="!isShow">
                  {{ translate("btnBack") }}
                </section>
                <section
                  v-else
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></section>
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
  </section>
</template>

<style scoped>
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
  import { notify } from "@kyvg/vue3-notification";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
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
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("mesNewDeviceSuccess"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
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
      back() {
        this.$router.replace("/");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      async copyText(id) {
        if (this.form.id == "") {
          //alert("vazio");
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("newDeviceNoID"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        } else {
          await navigator.clipboard.writeText(id);
          notify({
            title: this.translate("notifSuccessTitle"),
            text: this.translate("newDeviceCopyAlert"),
            type: "success",
            duration: 3000,
            speed: 500,
          });
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

