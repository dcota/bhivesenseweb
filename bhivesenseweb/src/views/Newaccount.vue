<template>
  <section class="scrolling-component" ref="scrollcomponent" name="lang">
    <section class="container my-body">
      <h1 class="my-text-color">{{ translate("newAccFormTitle") }}</h1>
      <section class="line-1"></section>
      <section
        v-if="showsection"
        class="alert mt-3 alert-dismissible fade show"
        role="alert"
        v-bind:class="'alert-' + message.type"
      >
        {{ message.msg }}
      </section>
      <form class="form-signin" v-on:submit.prevent="send">
        <section class="row align-items-center" style="min-height: 15vh">
          <section class="col-md-8 g-4">
            <label for="" class="me-5">{{ translate("profilePhoto") }}</label>
            <label for="img" class="btn my-button">
              <section v-if="!isShow">
                <i class="fa-regular fa-file-image"></i>
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
                :src="avatar"
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
              @keypress="validateNumber"
            />
          </section>
          <section class="col-md-4 g-4">
            <label for="email" class="form-label">{{
              translate("newAccEmailPh")
            }}</label>
            <input
              type="email"
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
              @keypress="validateMobile"
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
        <section class="row">
          <section class="col-md-6 g-4">
            <label for="username" class="form-label">{{
              translate("newAccUserPh")
            }}</label>
            <input
              type="text"
              v-model="form.auth.username"
              class="form-control"
              id="username"
              style="font-size: small"
            />
          </section>
          <section class="col-md-6 g-4">
            <label for="password" class="form-label">{{
              translate("newAccPassPh")
            }}</label>
            <input
              type="password"
              v-model="form.auth.password"
              class="form-control"
              id="password"
              style="font-size: small"
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
                style="text-align: left: important;"
              />
              <label class="form-check-label" for="subscribenews">
                {{ translate("newAccSubs") }}</label
              >
            </section>
          </section>
        </section>
        <section class="text-center">
          <button type="submit" class="btn mt-4 me-4 my-button">
            <section v-if="!isShow">
              <i class="fa-solid fa-share-from-square"></i>
              {{ translate("btnSubmit") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
          <button
            @click="cleanForm()"
            type="button"
            class="btn mt-4 me-4 my-button"
          >
            <section v-if="!isShow">
              <i class="fa-solid fa-eraser"></i>
              {{ translate("btnClean") }}
            </section>
            <section
              v-else
              class="spinner-border spinner-border-sm"
              role="status"
            ></section>
          </button>
          <button @click="back()" type="button" class="btn mt-4 my-button">
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
      </form>
      <section class="spacer"></section>
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
  import { notify } from "@kyvg/vue3-notification";
  import { mapMutations } from "vuex";
  import { LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
  export default {
    name: "submit",
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
        isShow: false,
        showsection: false,
        lang: lang,
        item: {
          image: null,
          imageUrl: null,
        },
        avatar: require("../assets/avatar.png"),
      };
    },
    methods: {
      ...mapMutations({
        showLoader: LOADING_SPINNER_SHOW_MUTATION,
      }),
      validateNumber: (event) => {
        let keyCode = event.keyCode;
        if (keyCode < 48 || keyCode > 57) {
          event.preventDefault();
        }
      },
      validateMobile: (event) => {
        let keyCode = event.keyCode;
        if (keyCode < 48 || keyCode > 57) {
          if (keyCode != 43) event.preventDefault();
        }
      },
      async send() {
        (this.message.type = ""), (this.message.msg = "");
        let postData = new FormData();
        postData.append("firstname", this.form.firstname);
        postData.append("lastname", this.form.lastname);
        postData.append("name", this.form.name);
        postData.append("email", this.form.email);
        postData.append("nif", this.form.nif);
        postData.append("mobile", parseInt(this.form.mobile));
        postData.append("level", "beekeeper");
        postData.append("type", this.form.type);
        postData.append("bdate", this.form.bdate);
        postData.append("username", this.form.auth.username);
        postData.append("password", this.form.auth.password);
        postData.append("notifications", this.form.notifications);
        postData.append("img", this.item.image);
        postData.append("lang", this.lang);
        if (this.checkForm() == true) {
          this.isShow = true;
          await axios
            .post("https://bhsapi.duartecota.com/user", postData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              if (response.data.http == 201) {
                this.isShow = false;
                notify({
                  title: this.translate("notifSuccessTitle"),
                  text: this.translate("mesNewAccount"),
                  type: "success",
                  duration: 3000,
                  speed: 500,
                });
              } else if (response.data.http == 200) {
                this.isShow = false;
                notify({
                  title: this.translate("notifWarningTitle"),
                  text: this.translate("mesUserExists"),
                  type: "warn",
                  duration: 3000,
                  speed: 500,
                });
                return;
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
        } else {
          this.isShow = false;
          notify({
            title: this.translate("notifErrorTitle"),
            text: this.translate("mesFields"),
            type: "error",
            duration: 3000,
            speed: 500,
          });
          return;
        }
      },
      cleanForm() {
        this.message.type = "";
        this.message.msg = "";
        (this.form.firstname = ""),
          (this.form.lastname = ""),
          (this.form.name = ""),
          (this.form.type = ""),
          (this.form.nif = ""),
          (this.form.email = ""),
          (this.form.mobile = ""),
          (this.form.bdate = ""),
          (this.form.auth = {
            username: "",
            password: "",
          }),
          (this.form.notifications = true);
        this.item.imageUrl = null;
        this.item.image = null;
        this.isShow = false;
        this.showsection = false;
      },
      back() {
        this.$router.replace("/");
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
          this.form.bdate == "" ||
          this.form.auth.username == "" ||
          this.form.auth.password == "" ||
          this.form.image == ""
        )
          return false;
        else return true;
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      onChange(e) {
        const file = e.target.files[0];
        this.item.image = file; //o que deve ser enviado
        this.item.imageUrl = URL.createObjectURL(file);
      },
    },
  };
</script>