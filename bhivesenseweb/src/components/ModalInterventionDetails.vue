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
            {{ translate("modalIntervention") }}
          </slot>
        </header>

        <section class="modal-body ms-4" id="modalDescription">
          <slot name="body">
            <p>
              {{ translate("modalInterventionDescription") }}
              {{ description }}
            </p>
            <p>
              {{ translate("modalInterventionObservations") }}
              {{ observations }}
            </p>
          </slot>
        </section>

        <footer class="modal-footer">
          <div class="row">
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-primary"
                @click="edit"
                aria-label="Edit"
              >
                <i class="fas fa-edit me-1 act-btn" aria-hidden="true"></i>
                {{ translate("btnModalEdit") }}
              </button>
            </div>
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-success"
                @click="done"
                aria-label="Interventions"
              >
                <i class="fa-solid fa-check"></i>
                {{ translate("btnModalDone") }}
              </button>
            </div>
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-danger"
                @click="cancel"
                aria-label="Interventions"
              >
                <i
                  class="fas fa-arrow-left me-1 act-btn"
                  aria-hidden="true"
                ></i>
                {{ translate("btnModalConfirm") }}
              </button>
            </div>
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="close"
                aria-label="Interventions"
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
  width: 60%;
  height: 30%;
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
  width: 150px;
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
    props: ["description", "observations"],
    data() {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        lang: lang,
        altImg: require("../assets/avatar.png"),
      };
    },
    computed: {
      ...mapGetters("auth", {
        isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        auth: localStorage.getItem("auth"),
      }),
    },
    mounted() {},
    methods: {
      close() {
        this.$emit("close");
      },
      edit() {
        this.$emit("edit");
      },
      done() {
        this.$emit("done");
      },
      cancel() {
        this.$emit("delete");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>