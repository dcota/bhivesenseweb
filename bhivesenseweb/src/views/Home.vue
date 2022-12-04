/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the view Home
*/

<template>
  <section class="jumbotron d-flex align-items-center min-vh-100">
    <section class="text-center">
      <img class="my-img" :src="logo" alt="image" />
    </section>
  </section>
</template>

<style scoped>
.my-body {
  display: flex;
  align-items: center;
}

.my-img {
  max-width: 50%;
  height: auto;
}

h3 {
  color: #c55a11 !important;
  position: relative;
  margin-top: 40px;
  font-family: "Times New Roman", Times, serif;
  letter-spacing: 10px;
}
</style>     

<script>
  export default {
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        logo: require("../assets/IMG1224.png"),
        lang: lang,
      };
    },
  };
</script>
