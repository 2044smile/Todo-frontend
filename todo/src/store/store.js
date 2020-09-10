import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

let url = "http://localhost:8000/api/todo/";

Vue.use(Vuex);

const backend = {
  fetch() {
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        for (var index in response.data) {
          response.data[index].is_hidden = false;
        }
        this.$store.state.todoList = response.data;
        console.log("Success", response);
      })
      .catch((error) => {
        console.log("Failed to get todoList", error.response);
      });
  },
};

export const store = new Vuex.Store({
  state: {
    todoList: backend.fetch(),
  },
  getters: {
    storedTodoList(state) {
      return state.todoList;
    },
  },
  mutations: {
    successActions(state, payload) {
      state.todoList.push = payload;
    },
  },
  actions: {
    createTodoList({ commit }, payload) {
      axios({
        method: "POST",
        url: url,
        data: payload.data,
      })
        .then((response) => {
          console.log("Success", response);
          commit("successActions", response.data);
        })
        .catch((error) => {
          console.log("Failed to create todoList", error.response);
        })
    },
    deleteTodoList({ commit }, payload) {
      console.log('PayLoad : ', payload)
      axios({
        method: "DELETE",
        url: url + payload.id
      })
        .then(response => {
          commit("successActions")
          console.log("Success", response);
        })
        .catch(error => {
          console.log("Failed to delete todoList", error.response);
        });
    },
    updateTodoList({ commit }, payload) {
      axios({
        method: "PATCH",
        url: url + payload.id + "/",
        data: payload
      })
        .then(response => {
          commit("successActions", response.data);
          console.log("Success", response);
        })
        .catch(error => {
          console.log("Failed to patched todoList", error.response);
        });
    }
  },
});