<template>
  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 300px"> 
      <a href="index.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img width="auto" height="100" :src="logo"/> 
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="mb-1">
          <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse" data-bs-target="#apiaries-collapse" aria-expanded="false">
            Apiaries
          </button>
          <div class="collapse" id="apiaries-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <!--<li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">All apiaries</a></li>-->
              <li ><router-link to="/messages" class="link-dark d-inline-flex text-decoration-none rounded" style="text-decoration: none;">Inscrições</router-link></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Create apiary</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Register hive in apiary</a>
              </li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Remove hive from apiary</a>
              </li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Report problem</a></li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse" data-bs-target="#hives-collapse" aria-expanded="false">
            Hives
          </button>
          <div class="collapse" id="hives-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Register new hive</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">All hives</a></li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            Dashboard
          </button>
          <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Weekly</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Monthly</a></li>
            </ul>
          </div>
        </li>

        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
            Account
          </button>
          <div class="collapse" id="account-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
              <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="dropdown mb-3">
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

    </div>

    <div class="b-example-vr" style="width:0px!important"></div>

    <div class="container-fluid d-flex justify-content-center overflow-auto"
      style="background-color:#ebc002;height:100vh;">
    </div>
  </main>
</template>

<style scoped>
.dropdown-toggle {
    outline: 0;
}

.btn-toggle {
    padding: .25rem .5rem;
    font-weight: 600;
    color: rgba(0, 0, 0, .65);
    background-color: transparent;
}

.btn-toggle:hover,
.btn-toggle:focus {
    color: rgba(0, 0, 0, .85);
    background-color: #ebc002;
}

.btn-toggle::before {
    width: 1.25em;
    line-height: 0;
    content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    transition: transform .35s ease;
    transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
    color: rgba(0, 0, 0, .85);
}

.btn-toggle[aria-expanded="true"]::before {
    transform: rotate(90deg);
}

.btn-toggle-nav a {
    padding: .1875rem .5rem;
    margin-top: .125rem;
    margin-left: 1.25rem;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
    background-color: #d2f4ea;
}

.scrollarea {
    overflow-y: auto;
}

.bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }

    .b-example-divider {
      height: 3rem;
      background-color: rgba(0, 0, 0, .1);
      border: solid rgba(0, 0, 0, .15);
      border-width: 1px 0;
      box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
      flex-shrink: 0;
      width: 1.5rem;
      height: 100vh;
    }

    .bi {
      vertical-align: -.125em;
      fill: currentColor;
    }

    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;
    }

    .nav-scroller .nav {
      display: flex;
      flex-wrap: nowrap;
      padding-bottom: 1rem;
      margin-top: -1px;
      overflow-x: auto;
      text-align: center;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
    }

    .bn {
      background-color: #ebc002;
    }

    .bn:hover {
      background-color: #947902;
    }
</style >

<script>

export default {
name: 'Header',
data: function() {
return {
logo: require('../assets/IMG1223.png')
}
}

}
</script>


