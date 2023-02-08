<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            {{ translate("modalMessageTitle") }}
          </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <section class="ms-4">
              <p>{{ translate("modalMessageFrom") }} {{ name }}</p>
              <p>{{ translate("modalMessageEmail") }} {{ email }}</p>
              <p>{{ translate("modalMessageSubject") }} {{ subject }}</p>
              <p>{{ translate("modalMessageText") }} {{ message }}</p>
            </section>
            <section class="ms-4 me-4">
              <label for="exampleFormControlTextarea1" class="form-label"
                >{{ translate("modalBtnAnswer") }}:
              </label>
              <textarea
                v-model="text"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="8"
              ></textarea>
            </section>
          </slot>
        </section>

        <footer class="modal-footer">
          <div class="row">
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-success"
                @click="answer"
                aria-label="Close modal"
              >
                <i class="fa-solid fa-file-lines"></i>
                {{ translate("modalBtnAnswer") }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-primary"
                @click="close"
                aria-label="Close modal"
              >
                <i
                  class="fas fa-arrow-left me-1 act-btn"
                  aria-hidden="true"
                ></i>
                {{ translate("btnModalBack") }}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
    
    <style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn {
  width: 130px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
    
    <script>
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { mapGetters } from "vuex";
  import { IS_USER_AUTHENTICATED_GETTER } from "../store/storeconstants";
  export default {
    name: "Modal",
    mixins: [en, pt],
    props: ["name", "email", "subject", "message"],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        lang: lang,
        text: "",
      };
    },
    computed: {
      ...mapGetters("auth", {
        isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        auth: localStorage.getItem("auth"),
      }),
    },
    methods: {
      close() {
        this.$emit("close");
      },
      answer() {
        localStorage.setItem("messagetosend", this.text);
        this.$emit("answer");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>