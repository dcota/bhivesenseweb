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
        <section class="modal-body p-4" id="modalDescription">
          <slot
            name="body"
            v-for="intervention in details"
            :key="intervention._id"
          >
            <section class="card p-3 mb-4">
              <p>
                <strong>{{ translate("modalDetaisNextInterv") }}</strong>
              </p>
              <p>
                {{ translate("modalDetaisNextSD") }}
                {{ intervention.startDate }}
                {{ translate("lblAt") }}
                {{ intervention.startTime }}
              </p>
              <p>
                {{ translate("modalDetaisNextED") }}
                {{ intervention.endDate }}
                {{ translate("lblAt") }}
                {{ intervention.endTime }}
              </p>
              <p>
                {{ translate("modalInterventionDescription") }}
                {{ intervention.description }}
              </p>
              <p>
                {{ translate("modalInterventionObservations") }}
                {{ intervention.observations }}
              </p>
              <p>
                <section v-if="intervention.color=='green'" style="color: green">
                  {{ translate("modalInterventionType") }}
                  <strong>{{ intervention.type }}</strong>
                </section>
                <section v-else-if="intervention.color=='orange'" style="color: orange">
                  {{ translate("modalInterventionType") }}
                  <strong>{{ intervention.type }}</strong>
                </section>
                <section v-else-if="intervention.color=='red'" style="color: red">
                  {{ translate("modalInterventionType") }}
                  <strong>{{ intervention.type }}</strong>
                </section>
              </p>
              <section class="modal-footer">
                <section v-if="!intervention.concluded">
                <div class="row">
                  <div class="col-md-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="edit(intervention._id)"
                      aria-label="Edit"
                    >
                      <i
                        class="fas fa-edit me-1 act-btn"
                        aria-hidden="true"
                      ></i>
                      {{ translate("btnModalEdit") }}
                    </button>
                  </div>
                  <div class="col-md-4">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="done(intervention._id)"
                      aria-label="Interventions"
                    >
                      <i class="fa-solid fa-check"></i>
                      {{ translate("btnModalDone") }}
                    </button>
                  </div>
                  <div class="col-md-4">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="cancel(intervention._id)"
                      aria-label="Interventions"
                    >
                      <i
                        class="fas fa-trash me-1 act-btn"
                        aria-hidden="true"
                      ></i>
                      {{ translate("btnModalDelete") }}
                    </button>
                  </div>
                </div>
              </section>
              <section v-else>
                <div class="row">
                  <div class="col-md-6">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="edit(intervention._id)"
                      aria-label="Edit"
                    >
                      <i
                        class="fas fa-edit me-1 act-btn"
                        aria-hidden="true"
                      ></i>
                      {{ translate("btnModalEdit") }}
                    </button>
                  </div>

                  <div class="col-md-6">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="cancel(intervention._id)"
                      aria-label="Interventions"
                    >
                      <i
                        class="fas fa-trash me-1 act-btn"
                        aria-hidden="true"
                      ></i>
                      {{ translate("btnModalDelete") }}
                    </button>
                  </div>
                </div>
              </section>
              </section>
            </section>
          </slot>
        </section>

        <footer class="modal-footer">
          <div class="row">
            <div class="col-md-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="close"
                aria-label="Interventions"
              >
                <i class="fa-solid fa-xmark me-1"></i>
                {{ translate("btnModalClose") }}
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
  height: 70%;
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
    props: ["details"],
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
      edit(id) {
        localStorage.setItem("interventiontoedit", id);
        this.$emit("edit");
      },
      done(id) {
        localStorage.setItem("interventiontoedit", id);
        this.$emit("done");
      },
      cancel(id) {
        localStorage.setItem("interventiontoedit", id);
        this.$emit("delete");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>