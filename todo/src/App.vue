<template>
  <div>
    <todo-header></todo-header>
    <todo-content></todo-content>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import axios from 'axios';
import TodoHeader from "./components/TodoHeader.vue";
import TodoContent from "./components/TodoContent.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data: () => {
    return {
      title: '',
      content: '',
    };
  },
  components: {
    "todo-header": TodoHeader,
    "todo-content": TodoContent,
    "todo-footer": TodoFooter
  }
};
</script>

<style>
</style>