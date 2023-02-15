/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Alterar Conta
*/

<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <h1 class="my-text-color">{{ translate("accFormTitle") }}</h1>
      <section class="line-1"></section>
      <form class="form-signin" v-on:submit.prevent="send">
        <section class="row align-items-center" style="min-height: 15vh">
          <section class="col-md-8 g-4">
            <label for="" class="me-5">{{ translate("profilePhoto") }}</label>
            <label for="img" class="btn my-button">
              <section v-if="!isShow">
                {{ translate("photoButton") }}
              </section>
              <section
                v-else
                class="spinner-border spinner-border-sm"
                role="status"
              ></section>
            </label>
            <input
              type="file"
              id="img"
              style="display: none"
              accept="image/*"
              @change="onChange"
            />
          </section>
          <section class="col-md-4 d-flex justify-content-center">
            <section id="preview">
              <img
                v-if="item.imageUrl"
                :src="item.imageUrl"
                width="100"
                height="100"
                class="rounded-circle me-2"
                style="
                  background-color: white;
                  border-radius: 2px;
                  border-color: gray;
                  border-style: solid;
                "
              />
              <img
                v-else
                :src="img"
                width="100"
                height="100"
                class="rounded-circle me-2"
                style="
                  background-color: white;
                  border-radius: 2px;
                  border-color: gray;
                  border-style: solid;
                "
              />
            </section>
          </section>
        </section>
        <section class="row mt-4">
          <section class="col-md-2 g-4">
            <label for="firstname" class="form-label">{{
              translate("newAccFnamePh")
            }}</label>
            <input
              type="text"
              v-model="form.firstname"
              class="form-control"
              id="firstname"
              style="font-size: small"
            />
          </section>
          <section class="col-md-2 g-4">
            <label for="lastname" class="form-label">{{
              translate("newAccLnamePh")
            }}</label>
            <input
              type="text"
              v-model="form.lastname"
              class="form-control"
              id="lastname"
              style="font-size: small"
            />
          </section>
          <section class="col-md-8 g-4">
            <label for="name" class="form-label">{{
              translate("newAccNamePh")
            }}</label>
            <input
              type="text"
              v-model="form.name"
              class="form-control"
              id="name"
              style="font-size: small"
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-4 g-4">
            <label for="type" class="form-label">{{
              translate("selectLbl")
            }}</label>
            <select
              class="form-select"
              v-model="form.type"
              style="font-size: small"
            >
              <option v-bind:value="translate('typeOp1')">
                {{ translate("typeOp1") }}
              </option>
              <option v-bind:value="translate('typeOp2')">
                {{ translate("typeOp2") }}
              </option>
              <option v-bind:value="translate('typeOp3')">
                {{ translate("typeOp3") }}
              </option>
            </select>
          </section>
          <section class="col-md-4 g-4">
            <label for="nif" class="form-label">{{
              translate("newAccNifPh")
            }}</label>
            <input
              type="text"
              v-model="form.nif"
              class="form-control"
              id="course"
              style="font-size: small"
            />
          </section>
          <section class="col-md-4 g-4">
            <label for="email" class="form-label">{{
              translate("newAccEmailPh")
            }}</label>
            <input
              type="text"
              v-model="form.email"
              class="form-control"
              id="email"
              style="font-size: small"
            />
          </section>
        </section>
        <section class="row">
          <section class="col-md-6 g-4">
            <label for="mobile" class="form-label">{{
              translate("newAccMobilePh")
            }}</label>
            <input
              type="text"
              v-model="form.mobile"
              class="form-control"
              id="mobile"
              style="font-size: small"
            />
          </section>
          <section class="col-md-6 g-4">
            <label for="bdate" class="form-label">{{
              translate("newAccBdatePh")
            }}</label>
            <input
              class="form-control textbox-n"
              type="text"
              v-model="form.bdate"
              onfocus="(this.type = 'date')"
              id="bdate"
              style="font-size: small"
            />
          </section>
        </section>

        <section class="text-center">
          <button
            @click="update()"
            type="submit"
            class="btn mt-4 me-4 my-button"
          >
            <section v-if="!isShow">
              {{ translate("btnSubmit") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
          <button @click="showModal()" class="btn mt-4 me-4 my-button">
            <section v-if="!isShow">
              {{ translate("btnCancel") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>

          <Modal v-show="isModalVisible" @close="closeModal" @cancel="cancel" />

          <button @click="back()" type="button" class="btn mt-4 my-button">
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
    </section>
  </section>
</template>

<style scoped>
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
  import Modal from "../components/ModalCancelAccount.vue";
  import { notify } from "@kyvg/vue3-notification";
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
    AUTO_IMAGE_ACTION,
    LOGOUT_ACTION,
    GET_USER_AVATAR_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "submit",
    components: {
      Modal,
    },
    mixins: [en, pt],
    data() {
      const lang = localStorage.getItem("lang") || "en";
      return {
        form: {
          firstname: "",
          lastname: "",
          name: "",
          nif: "",
          type: "",
          email: "",
          mobile: "",
          bdate: "",
        },
        message: {
          type: "",
          msg: "",
        },
        isShow: true,
        isModalVisible: false,
        showsection: false,
        lang: lang,
        item: {
          image: null,
          imageUrl: null,
        },
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
        img: GET_USER_AVATAR_GETTER,
      }),
    },
    mounted() {
      this.getAccountInfo();
    },
    methods: {
      ...mapActions("auth", {
        _imgChng: AUTO_IMAGE_ACTION,
        _logout: LOGOUT_ACTION,
      }),
      logout() {
        this._logout();
        this.$router.replace("/");
      },
      async getAccountInfo() {
        (this.message.type = ""),
          (this.message.msg = ""),
          await axios
            .get("https://bhsapi.duartecota.com/user/" + this._id, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              (this.form.firstname = response.data.body.firstname),
                (this.form.lastname = response.data.body.lastname),
                (this.form.name = response.data.body.name),
                (this.form.type = response.data.body.type),
                (this.form.nif = response.data.body.nif),
                (this.form.bdate = response.data.body.bdate),
                (this.form.email = response.data.body.email),
                (this.form.mobile = response.data.body.mobile),
                (this.item.imageUrl = response.data.body.img);
              this.isShow = false;
            })
            .catch(() => {
              this.isShow = false;
              this.showsection = true;
              this.message.type = "danger";
              this.message.msg = this.translate("mesProblem");
              this.isShow = true;
            });
      },
      async update() {
        (this.message.type = ""), (this.message.msg = ""), (this.isShow = true);
        let postData = new FormData();
        postData.append("firstname", this.form.firstname);
        postData.append("lastname", this.form.lastname);
        postData.append("name", this.form.name);
        postData.append("nif", this.form.nif);
        postData.append("email", this.form.email);
        postData.append("type", this.form.type);
        postData.append("mobile", parseInt(this.form.mobile));
        postData.append("bdate", this.form.bdate);
        if (this.item.image != "") {
          postData.append("img", this.item.image);
        }
        if (this.checkForm() == true) {
          await axios
            .patch("https://bhsapi.duartecota.com/user/" + this._id, postData, {
              headers: {
                Authorization: this.token,
              },
            })
            .then((response) => {
              if (response.data.http == 200) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesChangeSuccess"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
                this.imgChng({
                  img: response.data.body.img,
                });
                setTimeout(() => (this.showsection = false), 3000);
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
                text: this.translate("mesFields"),
                type: "error",
                duration: 3000,
                speed: 500,
              });
            });
        } else {
          this.isShow = false;
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFields"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
        }
      },
      async imgChng(image) {
        await this._imgChng(image);
      },
      checkForm() {
        if (
          this.form.firstname == "" ||
          this.form.lastname == "" ||
          this.form.name == "" ||
          this.form.type == "" ||
          this.form.nif == "" ||
          this.form.email == "" ||
          this.form.mobile == "" ||
          this.form.bdate == ""
        )
          return false;
        else return true;
      },
      leave() {
        this.$router.replace("/");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      onChange(e) {
        const file = e.target.files[0];
        this.item.image = file; //o que deve ser enviado
        this.item.imageUrl = URL.createObjectURL(file);
      },
      back() {
        this.$router.replace("/");
      },
      async cancel() {
        this.isModalVisible = false;
        await axios
          .put("https://bhsapi.duartecota.com/user/" + this._id, {
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
              setTimeout(() => this.logout(), 3000);
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
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
  };
</script>