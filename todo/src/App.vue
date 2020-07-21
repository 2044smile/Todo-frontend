<template>
  <div>
    <todo-header></todo-header>
    <todo-navbar></todo-navbar>
    <todo-content></todo-content>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoNavbar from './components/TodoNavbar.vue';
import TodoContent from './components/TodoContent.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      name: 'cslee'
    }    
  },
components: {
  'todo-header': TodoHeader,
  'todo-navbar': TodoNavbar,
  'todo-content': TodoContent,
  'todo-footer': TodoFooter,
}
}
</script>

<style>

</style>