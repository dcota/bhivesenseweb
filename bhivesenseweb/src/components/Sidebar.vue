<template>
  <main class="d-flex flex-nowrap">
    <section class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px">
      <a
        class="
          d-flex
          align-items-center
          mb-3 mb-md-0
          me-md-auto
          link-dark
          text-decoration-none
        "
      >
        <router-link to="/"
          ><img :src="logo" style="width: 90%" alt=""
        /></router-link>
      </a>
      <section class="d-flex justify-content-center" style="width: 90%">
        <select
          class="form-select mt-2"
          name="lang"
          v-model="lang"
          @change="handleChange($event)"
          aria-label="Default select example"
          style="width: 70px"
        >
          <option value="en">en</option>
          <option value="pt">pt</option>
        </select>
      </section>

      <hr style="width: 90%" />

      <ul class="nav nav-pills flex-column mb-auto">
        <li class="mb-1" v-if="isAuthenticated && level == 'beekeeper'">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#apiaries-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarApiaries") }}
          </button>
          <section class="collapse" id="apiaries-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  to="/apiaries"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarApiariesAll") }}</router-link
                >
              </li>
              <li>
                <router-link
                  to="/newapiary"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarApiariesNew") }}</router-link
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarApiariesAddHive") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarApiariesRemoveHive") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarApiariesProblem") }}</a
                >
              </li>
            </ul>
          </section>
        </li>
        <li class="mb-1" v-if="isAuthenticated && level == 'beekeeper'">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#hives-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarHives") }}
          </button>
          <section class="collapse" id="hives-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarHivesAll") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarHivesNew") }}</a
                >
              </li>
            </ul>
          </section>
        </li>
        <li class="mb-1" v-if="isAuthenticated && level == 'beekeeper'">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarAnalytics") }}
          </button>
          <section class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarAnalyticsLast") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarAnalyticsWeek") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  >{{ translate("sbarAnalyticsMonth") }}</a
                >
              </li>
            </ul>
          </section>
        </li>

        <li class="mb-1" v-if="isAuthenticated && level == 'admin'">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#users-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarUsers") }}
          </button>
          <section class="collapse" id="users-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  to="/users"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarUsersManage") }}</router-link
                >
              </li>
            </ul>
          </section>
        </li>

        <li class="mb-1" v-if="isAuthenticated && level == 'admin'">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#devices-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarDevices") }}
          </button>
          <section class="collapse" id="devices-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  to="/newdevice"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarDevicesNew") }}</router-link
                >
              </li>
              <li>
                <router-link
                  to=""
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarDevicesManage") }}</router-link
                >
              </li>
            </ul>
          </section>
        </li>

        <hr v-if="isAuthenticated" style="width: 90%" />

        <section
          class="mt-3"
          style="margin-left: 50px"
          v-if="isAuthenticated && level == 'beekeeper'"
        >
          <button type="button" class="btn bn_card position-relative">
            <strong> <i class="fas fa-bell" aria-hidden="true"></i> </strong>
            <span
              class="
                position-absolute
                top-0
                start-100
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
            >
              10+
              <span class="visually-hidden">unread messages</span>
            </span>
          </button>
        </section>

        <li class="mb-1" v-if="!isAuthenticated">
          <button
            class="
              btn btn-toggle
              d-inline-flex
              align-items-center
              rounded
              border-0
              collapsed
            "
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            {{ translate("sbarAccLabel") }}
          </button>
          <section class="collapse" id="account-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <router-link
                  to="/login"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarAccLogin") }}</router-link
                >
              </li>
              <li>
                <router-link
                  to="/newaccount"
                  class="link-dark d-inline-flex text-decoration-none rounded"
                  style="text-decoration: none"
                  >{{ translate("sbarAccNew") }}</router-link
                >
              </li>
            </ul>
          </section>
        </li>
      </ul>

      <section class="dropdown-toogle mb-3" v-if="isAuthenticated">
        <a
          href="#"
          class="
            d-flex
            align-items-center
            link-dark
            text-decoration-none
            dropdown-toggle
          "
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="img"
            alt=""
            width="55"
            height="55"
            class="rounded-circle me-2"
          />
          <strong>{{ name }}</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li>
            <router-link
              to=""
              class="dropdown-item"
              style="text-decoration: none"
              @click.prevent="account()"
              >{{ translate("userMenuProfile") }}
            </router-link>
          </li>
          <li>
            <hr class="dropdown-sectionider" style="width: 90%" />
          </li>

          <li>
            <router-link
              to=""
              class="dropdown-item"
              style="text-decoration: none"
              @click.prevent="logout()"
              >{{ translate("userMenuLogout") }}
            </router-link>
          </li>
        </ul>
      </section>
    </section>

    <section
      class="container-fluid d-flex justify-content-center"
      style="background-color: #ebc002; height: 100vh"
    ></section>
  </main>
</template>

<style scoped>
.bn_card {
  background-color: #ebc002;
  border-radius: 20px;
  width: 100px;
  font-size: 18px;
}

.bn_card:hover {
  background-color: #947902;
}

.dropdown-toggle {
  outline: 0;
}

.btn-toggle {
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #ebc002;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, 0.85);
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #e9d78a;
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

.b-example-sectionider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
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
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  import { mapActions, mapGetters } from "vuex";
  import {
    IS_USER_AUTHENTICATED_GETTER,
    LOGOUT_ACTION,
    GET_USER_LEVEL_GETTER,
    GET_USER_NAME_GETTER,
    GET_USER_AVATAR_GETTER,
  } from "../store/storeconstants";
  export default {
    name: "Sidebar",
    mixins: [en, pt],
    data: function () {
      const lang = localStorage.getItem("lang") || "pt";
      return {
        logo: require("../assets/logo.png"),
        lang: lang,
      };
    },
    computed: {
      ...mapGetters("auth", {
        isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
        level: GET_USER_LEVEL_GETTER,
        name: GET_USER_NAME_GETTER,
        img: GET_USER_AVATAR_GETTER,
        auth: localStorage.getItem("auth"),
      }),
    },
    methods: {
      ...mapActions("auth", {
        _logout: LOGOUT_ACTION,
      }),
      logout() {
        this._logout();
        this.$router.replace("/");
      },
      account() {
        this.$router.replace("account");
      },
      handleChange(event) {
        localStorage.setItem("lang", event.target.value);
        window.location.reload();
      },
      translate(prop) {
        return this[this.lang][prop];
      },
    },
  };
</script>


