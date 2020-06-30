<template>
  <div>
    <button type="button" @click="clearTodo">전체 삭제</button>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo () {
      this.$emit('removeAll')
    }
  }
}
</script>

<style>
</style>
