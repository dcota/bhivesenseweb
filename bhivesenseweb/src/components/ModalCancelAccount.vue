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
          <slot name="header"> {{ translate("cancelTitleModal") }} </slot>
          <!--<button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>-->
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> {{ translate("cancelAccModal") }} </slot>
        </section>

        <footer class="modal-footer">
          <!--<slot name="footer"> This is the default footer! </slot>-->
          <div class="row">
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-danger"
                @click="cancel"
                aria-label="Close modal"
              >
                <i class="fas fa-check me-1 act-btn" aria-hidden="true"></i>
                {{ translate("btnModalConfirm") }}
              </button>
            </div>
            <div class="col-md-6">
              <button
                type="button"
                class="btn btn-success"
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

<style>
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
  width: 40%;
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
  export default {
    name: "Modal",
    mixins: [en, pt],
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        lang: lang,
      };
    },
    methods: {
      close() {
        this.$emit("close");
      },
      cancel() {
        this.$emit("cancel");
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>