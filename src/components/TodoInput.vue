<template>
  <div>
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" placeholder="Enter">
<!--    <button v-on:keyup.enter="addTodo">추가</button>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTodoItem: ''
    }
  },
  methods: {
    addTodo () {
      if (this.newTodoItem !== '') {
        let value = this.newTodoItem && this.newTodoItem.trim()
        this.$emit('addTodo', value)
        this.clearBox()
      }
    },
    clearBox () {
      this.newTodoItem = ''
    }
  }
}
</script>

<style>
</style>
