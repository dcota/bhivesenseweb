<template>
  <section class="container my-body">
    <hr />
    <h1 class="text-center">{{ translate("interventionsTitle") }}</h1>
    <hr />

    <v-calendar
      :locale="lang"
      is-expanded
      :attributes="attributes"
      :rows="2"
      :columns="3"
      @dayclick="dayClicked"
    >
    </v-calendar>
  </section>
</template>

<style scoped>
.my-body {
  margin-top: 100px;
}
</style>

<script>
  import en from "../assets/en.js";
  import pt from "../assets/pt.js";
  export default {
    mixins: [en, pt],
    data() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const lang = localStorage.getItem("lang") || "pt";
      const todos = [
        {
          description: "Take Noah to basketball practice.",
          isComplete: true,
          dates: { days: 6 }, // Every Friday
          color: "red",
        },
        {
          description:
            "Take Laura to basketball practice dadas asdasd asdas dasd asd asda sdas dsad .",
          isComplete: false,
          dates: new Date(year, month, 12),
          color: "green",
        },
      ];
      return {
        lang: lang,
        incId: todos.length,
        todos,
        attrs: [
          {
            key: 1,
            highlight: {
              color: "red",
              fillMode: "solid",
              contentClass: "italic",
            },
            dates: new Date(year, month, 12),
            customData: {
              description: "teste 1",
            },
          },
          {
            key: 2,
            highlight: {
              color: "green",
              fillMode: "solid",
            },
            dates: new Date(year, month, 13),
            customData: {
              description: "teste 2",
            },
          },
          {
            key: 3,
            highlight: {
              color: "yellow",
              fillMode: "solid",
            },
            dates: new Date(year, month, 14),
            customData: {
              description: "teste 3",
            },
          },
        ],
      };
    },
    computed: {
      attributes() {
        return [
          ...this.todos.map((todo) => ({
            dates: todo.dates,
            highlight: {
              color: todo.color,
              fillMode: "solid",
              class: todo.isComplete ? "opacity-50" : "",
            },
            popover: {
              label: todo.description,
              visibility: "hover",
            },
            customData: todo,
          })),
        ];
      },
    },
    methods: {
      translate(prop) {
        return this[this.lang][prop];
      },
      dayClicked(day) {
        alert(day.id);
      },
    },
  };
</script>