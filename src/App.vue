
<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:addTodo="addTodo"></todo-input>
    <todo-list v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo"></todo-list>
    <todo-footer v-on:removeAll="clearAll"></todo-footer>
  </div>
</template>

<script>

import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

const whitelist = ['http://localhost:8000']
const corsOptions = {
  origin: (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
router.get('/todo', cors(corsOptions), (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

export default {
  data () {
    return {
      todoItems: []
    }
  },
  created () {
    const baseURI = 'http://localhost:8000/api/todo'
    // eslint-disable-next-line no-undef
    axios.get(`${baseURI}/`).then((result) => {
      console.log(result)
    })
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        this.todoItems.push(localStorage.key(i))
      }
    }
  },
  methods: {
    addTodo (todoItem) {
      localStorage.setItem(todoItem, todoItem)
      this.todoItems.push(todoItem)
    },
    removeTodo (todoItem, index) {
      localStorage.removeItem(todoItem)
      this.todoItems.splice(index, 1)
    },
    clearAll () {
      localStorage.clear()
      this.todoItems = []
    }
  },
  component: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
</style>
