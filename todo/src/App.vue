<template>
  <div>
    <router-view></router-view>
    <!-- <todo-header v-bind:프롭스 속성 이름="상위 컴포넌트의 데이터 이름"></todo-header> -->
    <todo-header v-bind:propsdata="str"></todo-header>
    <todo-content></todo-content>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoContent from './components/TodoContent.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      str: 'Header'
    }
  },
components: {
  'todo-header': TodoHeader,
  'todo-content': TodoContent,
  'todo-footer': TodoFooter,
}
}
</script>

<style>

</style>