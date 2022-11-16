/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of the header
*/

<template>
  <section>

<section class="container-fluid p-3 bg-light ">
  <nav class="navbar bg-light" >
  <div class="container-fluid" style="heigth:30px;!important">
    <router-link to="/"><img src="../assets/IMG1223.png" alt="" /></router-link>
    <form class="d-flex" role="search">
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../assets/cota.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>Duarte Cota</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </form>
  </div>
</nav>
</section>
  <!--<section class="container-fluid p-3 bg-light ">
    <router-link to="/"><img src="../assets/IMG1223.png" alt="" /></router-link>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../assets/cota.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>Duarte Cota</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
  </section>-->
</section>
</template>

<style scoped>
.nav-link {
  color: white !important;
}
.navbar {
  /*background-color: white;*/
  height: 120px;
}
img {
  max-width: 300px;
  height: auto;
}
</style>    