<template>
  <section class="dashboard">
    <section class="sidebar">
      <Sidebar />
    </section>
    <section class="content">
      <Content />
      <router-view />
    </section>
  </section>
</template>

<script>
  import Sidebar from "../components/Sidebar";
  import Content from "../components/Content.vue";
  export default {
    name: "home",
    components: {
      Sidebar,
      Content,
    },
  };
</script>

<style>
.sidebar {
  position: static;
}
.dashboard {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 250px auto;
}
.content {
  background-color: #ebc002;
  overflow-y: auto;
}
</style>