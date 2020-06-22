// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import vuetify from 'vuetify'
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

Vue.config.productionTip = false

Vue.component('todo-header', TodoHeader)
Vue.component('todo-input', TodoInput)
Vue.component('todo-list', TodoList)
Vue.component('todo-footer', TodoFooter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
    // TodoHeader,
    // TodoInput,
    // TodoList,
    // TodoFooter
  },
  vuetify
})
