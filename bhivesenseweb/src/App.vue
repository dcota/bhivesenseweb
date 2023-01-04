<template>
  <section>
    <!--<Sidebar />-->
    <!--<Loader v-if="showLoader"></Loader>-->
    <Notifications
      position="top right"
      closeOnClick="true"
      classes="my-notification mt-2"
      width="500px"
    />
    <section id="content"><router-view></router-view></section>
  </section>
</template>

<script>
  // import Modal from "@/components/Modal.vue";

  import { mapState } from "vuex";
  import { AUTO_LOGIN_ACTION } from "./store/storeconstants";
  export default {
    name: "App",
    computed: {
      ...mapState({
        showLoader: (state) => state.showLoader,
        autoLogout: (state) => state.auth.autoLogout,
      }),
    },
    watch: {
      autoLogout(curValue, oldValue) {
        if (curValue && curValue != oldValue) {
          this.$router.replace("/Login");
        }
      },
    },
    components: {
      //Modal,
    },
    created() {
      this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
    },
  };
</script>
