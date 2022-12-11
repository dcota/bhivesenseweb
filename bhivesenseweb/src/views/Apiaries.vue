<template>
  <section class="container justify-content-center" style="width: 80%">
    <h1 class="text-center mt-5">{{ translate("apiaryAllTitle") }}</h1>
    <section
      v-if="showsection"
      class="alert mt-3 alert-dismissible fade show"
      role="alert"
      v-bind:class="'alert-' + message.type"
    >
      {{ message.msg }}
    </section>
    <section class="row mt-5">
      <section
        class="col-12 col-md-6 col-lg-4"
        v-for="apiary of this.apiaries"
        :key="apiary._id"
      >
        <section
          class="card mb-5 mh-100"
          style="
            border-radius: 35px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
              rgba(0, 0, 0, 0.22) 0px 10px 10px;
          "
        >
          <img
            :src="img"
            class="card-img-top"
            alt="..."
            style="
              width: 50%;
              display: block;
              margin-right: auto;
              margin-left: auto;
            "
          />
          <section class="card-body">
            <h5 class="card-title text-center">
              {{ translate("lblCardApiary") }} {{ apiary.num }}
            </h5>
            <p class="card-text text-center">
              <strong>{{ apiary.location }}</strong>
            </p>
            <hr />
            <section class="text-center">
              <section class="row">
                <section class="col-sm-6 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('lblCardApiaryBtn')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="translate('lblCardApiaryBtn')"
                    class="btn text-center bn"
                    @click="detailsModal(apiary._id)"
                  >
                    <i class="fas fa-search me-1" aria-hidden="true"></i>
                  </button>
                </section>
                <section class="col-sm-6 mt-1">
                  <button
                    data-bs-toggle="tooltip"
                    v-bind:title="translate('lblCardInterventionsBtn')"
                    data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    class="btn text-center bn"
                    @click="detailsModal(apiary._id)"
                  >
                    <i class="fas fa-wrench"></i>
                  </button>
                </section>
              </section>
            </section>
          </section>
        </section>
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
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      :address="address"
      :observations="observations"
    />
    <section class="spacer"></section>
  </section>
</template>

<style scoped>
.custom-tooltip {
  --bs-tooltip-bg: var(--bs-primary);
}
</style>

<script>
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import axios from "axios";
  import Modal from "../components/ModalApiaryDetails.vue";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "Apiaries",
    mixins: [en, pt],
    components: {
      Modal,
    },
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        apiaries: [],
        img: require("../assets/IMG1220.png"),
        lang: lang,
        message: {
          type: "",
          msg: "",
        },
        isShow: true,
        isModalVisible: false,
        showsection: false,
      };
    },
    computed: {
      ...mapGetters("auth", {
        token: GET_USER_TOKEN_GETTER,
        level: GET_USER_LEVEL_GETTER,
        _id: GET_USER_ID_GETTER,
        el: "#app",
      }),
    },
    mounted() {
      this.getApiaries();
    },
    methods: {
      async getApiaries() {
        this.message.type = "";
        this.message.msg = "";
        this.isShow = true;
        this.apiaries = [];
        await axios
          .get("https://bhsapi.duartecota.com/apiary/" + this._id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.body.length == 0) {
              this.showsection = true;
              this.message.type = "danger";
              this.message.msg = this.translate("mesNoApiaries");
            } else {
              let apiaries = response.data.body;
              for (let i = 0; i < apiaries.length; i++) {
                this.apiaries.push({
                  _id: apiaries[i]._id,
                  num: i + 1,
                  location: apiaries[i].location,
                });
              }
            }
            this.isShow = false;
          })
          .catch((error) => {
            console.log(error);
            this.isShow = false;
            this.showsection = true;
            this.message.type = "danger";
            this.message.msg = this.translate("mesProblem");
          });
      },
      translate(prop) {
        return this[this.lang][prop];
      },
      closeModal() {
        this.isModalVisible = false;
      },
      async detail(id) {
        this.isShow = true;
        this.message.type = "";
        this.message.msg = "";
        //(this.isShow = true((this.message.type = ""))), (this.message.msg = "");
        await axios
          .get("https://bhsapi.duartecota.com/apiary/one/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            console.log(response);
            this.address = response.data.body.address;
            this.observations = response.data.body.observations;
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
    },
  };
</script>
