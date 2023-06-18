<template id="example-modal">
  <section class="container my-body">
    <h1 class="my-text-color">{{ translate("newMessagesTitle") }}</h1>
    <section class="line-1"></section>
    <section class="row mt-3">
      <h4 class="my-text-color">{{ translate("messagesLbl") }}</h4>
    </section>
    <section class="card mt-2" v-if="hasNewMessages">
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
              <th>{{ translate("tdFrom") }}</th>
              <th>{{ translate("tdDate") }}</th>
              <th class="text-center">{{ translate("thdUsersActions") }}</th>
            </tr>
            <tr v-for="msg of this.messages" :key="msg._id">
              <td>{{ msg.name }}</td>
              <td>{{ msg.date }}</td>
              <td class="text-center">
                <button
                  @click="answerModal(msg._id)"
                  type="button"
                  class="btn btn-success btn-sm me-2 ac-btn"
                >
                  {{ translate("btnAnswer") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
    <section v-else>
      <section class="card mt-2">
        <section
          class="card-body"
          style="
            border-radius: 3px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
              rgba(0, 0, 0, 0.22) 0px 10px 10px;
          "
        >
          <h3 class="text-center">No new messages</h3>
        </section>
      </section>
    </section>
    <ModalAnswer
      v-show="isModalAnswerVisible"
      @close="closeModalAnswer"
      @answer="answer"
      :name="name"
      :email="email"
      :subject="subject"
      :message="message"
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
  import { notify } from "@kyvg/vue3-notification";
  import ModalAnswer from "../components/ModalAnswer";
  import { mapGetters } from "vuex";
  import {
    GET_USER_TOKEN_GETTER,
    GET_USER_LEVEL_GETTER,
    GET_USER_ID_GETTER,
  } from "../store/storeconstants";
  export default {
    mixins: [en, pt],
    components: {
      ModalAnswer,
    },
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        data: localStorage.token,
        messages: [],
        name: "",
        email: "",
        subject: "",
        message: "",
        isShow: false,
        lang: lang,
        isModalAnswerVisible: false,
        isModalDeleteVisible: false,
        usertodelete: "",
        hasNewMessages: false,
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
      this.getMessages();
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      async getMessages() {
        this.messages = [];
        this.isShow = true;
        await axios
          .get("https://bhsapi.duartecota.com/report", {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.messages = [];
            this.isShow = false;
            let messages = response.data.body;
            for (let i = 0; i < messages.length; i++) {
              if (messages[i].answered == false) {
                this.hasNewMessages = true;
                let date = new Date(messages[i].registration_date);
                let year = date.getFullYear();
                let month =
                  date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1;
                let day =
                  date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                this.messages.push({
                  _id: messages[i]._id,
                  name: messages[i].name,
                  email: messages[i].email,
                  date: year + "-" + month + "-" + day,
                  answered: messages[i].answered,
                });
              }
              if (this.messages.length == 0) this.hasNewMessages = false;
            }
          })
          .catch((error) => {
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
        await axios
          .get("https://bhsapi.duartecota.com/report/" + id, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            this.name = response.data.body.name;
            this.email = response.data.body.email;
            this.subject = response.data.body.subject;
            this.message = response.data.body.message;
            this.isShow = false;
            return true;
          })
          .catch(() => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
            this.isShow = false;
            return false;
          });
      },
      async answerModal(id) {
        localStorage.setItem("idtoanswer", id);
        await this.detail(id);
        this.isModalAnswerVisible = true;
      },
      async answer() {
        this.isModalAnswerVisible = false;
        this.isShow = true;
        let postData = {
          text: localStorage.getItem("messagetosend"),
          lang: this.lang,
        };
        let id = localStorage.getItem("idtoanswer");
        await axios
          .put("https://bhsapi.duartecota.com/report/" + id, postData, {
            headers: {
              Authorization: this.token,
            },
          })
          .then((response) => {
            if (response.data.http == 200) {
              this.isShow = false;
              notify({
                title: this.translate("notifSuccessTitle"),
                text: this.translate("msgAnswer"),
                type: "success",
                duration: 3000,
                speed: 500,
              });
              this.getMessages();
              return true;
            }
          })
          .catch(() => {
            notify({
              title: this.translate("notifErrorTitle"),
              text: this.translate("mesProblem"),
              type: "error",
              duration: 3000,
              speed: 500,
            });
            this.isShow = false;
            return false;
          });
      },
      async deleteModal(id) {
        this.usertodelete = id;
        this.isModalDeleteVisible = true;
      },
      closeModalAnswer() {
        this.isModalAnswerVisible = false;
      },
      closeModalDelete() {
        this.isModalDeleteVisible = false;
      },
      async cancelUser() {
        await this.cancel(this.usertodelete);
        this.isModalDeleteVisible = false;
      },
    },
  };
</script>