<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-content></todo-content>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import axios from "axios";
import TodoHeader from "./components/TodoHeader.vue";
import TodoContent from "./components/TodoContent.vue";
import TodoFooter from "./components/TodoFooter.vue";
let url = "http://localhost:8000/api/todo/";

export default {
  components: {
    "todo-header": TodoHeader,
    "todo-content": TodoContent,
    "todo-footer": TodoFooter
  },
  created() {
    axios({
      method: "GET",
      url: url
    })
      .then(response => {
        for (var index in response.data) {
          response.data[index].is_hidden = false;
        }
        this.$store.state.todoList = response.data;
        console.log("Success", response);
      })
      .catch(error => {
        console.log("Failed to get todoList", error.response);
      });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
#app {
  font-family: 'Do Hyeon', sans-serif;
}
</style>