<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-content v-bind:propsdata="todoList" v-on:saved="getTodoList" v-on:deleted="getTodoList"></todo-content>
    <!-- v-bind:하위컴포넌트 속성명="상위 컴포넌트 전달할 데이터명"  -->
    <!-- v-on:하위컴포넌트 이벤트 전달 속성명="상위 컴포넌트 메소드명"  -->
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import axios from "axios";
import TodoHeader from "./components/TodoHeader.vue";
import TodoContent from "./components/TodoContent.vue";
import TodoFooter from "./components/TodoFooter.vue";
let url = "http://localhost:8000/api/todo/"; // drf server addr
export default {
  data: () => {
    return {
      todoList: []
    };
  },
  components: {
    "todo-header": TodoHeader,
    "todo-content": TodoContent,
    "todo-footer": TodoFooter
  },
  mounted() {
    // DOM 객체 생성 후 drf server 에서 데이터를 가져와 todoList 저장
    axios({
      method: "GET",
      url: url
    })
      .then(response => {
        for (var index in response.data) {
          response.data[index].is_hidden = false;
        }
        this.todoList = response.data;
        console.log("Success", response);
      })
      .catch(error => {
        console.log("Failed to get todoList", error.response);
      });
  },
  methods: {
    getTodoList: function() {
      axios({
        method: "GET",
        url: url
      })
        .then(response => {
          for (var index in response.data) {
            response.data[index].is_hidden = false;
          }
          this.todoList = response.data;
          console.log("Success", response);
        })
        .catch(error => {
          console.log("Failed to get todoList", error.response);
        });
    },
    updateTodoList: function() {}
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
#app {
  font-family: 'Do Hyeon', sans-serif;
}
</style>