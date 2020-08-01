<template>
  <div>
    <todo-header></todo-header>
    <todo-content v-bind:propsdata="todoList"></todo-content> <!-- v-bind:하위컴포넌트 속성명="상위 컴포넌트 전달할 데이터명"  -->
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import axios from "axios";
import TodoHeader from "./components/TodoHeader.vue";
import TodoContent from "./components/TodoContent.vue";
import TodoFooter from "./components/TodoFooter.vue";

let url = "http://localhost:8000/api/todo/";  // drf server addr

export default {
  data: () => {
    return {
      todoList: [],
    };
  },
  components: {
    "todo-header": TodoHeader,
    "todo-content": TodoContent,
    "todo-footer": TodoFooter
  },
  mounted() { // DOM 객체 생성 후 drf server 에서 데이터를 가져와 todoList 저장
    axios({
      method: "GET",
      url: url 
    })
      .then(response => {
        this.todoList = response.data;
      })
      .catch(response => {
        console.log("Failed to get todoList", response);
      });
  },
  methods: {  // CRUD 로직이 들어갈 부분
    getTodoList: function() {},
    updateTodoList: function() {},
    deleteTodoList: function() {}
  }
};
</script>

<style>
</style>