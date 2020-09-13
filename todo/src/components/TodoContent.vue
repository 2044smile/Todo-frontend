<template>
  <div>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <h3 class="subject">what is your plan?</h3>
        </v-flex>
        <v-flex column>
          <v-row>
            <v-col cols="4" md="3">
              <v-text-field v-model="data.title" :counter="32" label="Title" required></v-text-field>
            </v-col>
            <v-col cols="4" md="3">
              <v-text-field v-model="data.author" :counter="64" label="Author" required></v-text-field>
            </v-col>
            <v-col cols="4" md="6">
              <v-text-field v-model="data.description" :counter="255" label="Content" required></v-text-field>
            </v-col>
          </v-row>
          <div data-app>
            <v-menu
              v-model="showPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="500px"
              min-width="500px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="data.due_date"
                  label="Due Date"
                  hint="YYYY-MM-DD"
                  persistent-hint
                  readonly
                  v-on="on"
                ></v-text-field>
                <v-date-picker
                  style="background-color: gray"
                  v-model="data.due_date"
                  @input="showPicker = false"
                ></v-date-picker>
              </template>
            </v-menu>
          </div>
          <v-btn @click="sendForm({data})" color="#4CAF50">create</v-btn>
          <v-btn @click="clearForm" color="#F44336">clear</v-btn>
        </v-flex>
        <v-flex class="todoList" column>
          <v-card fluid>
            <v-list-item v-for="(data, index) in storedTodoList" v-bind:key="index">
              <v-list-item-content v-show="!data.is_hidden">
                <v-list-item-title>Title: {{ data.title }}</v-list-item-title>
                <v-list-item-title>Author: {{ data.author }}</v-list-item-title>
                <v-list-item-title>Due Date: {{ data.due_date }}</v-list-item-title>
                <v-list-item-title>Content: {{ data.description }}</v-list-item-title>
                <v-list-item-title v-show="data.completed">
                  <font-awesome-icon class="fa-2x" icon="calendar-check" />
                </v-list-item-title>
                <v-list-item-title v-show="!data.completed">
                  <font-awesome-icon class="fa-2x" icon="calendar" />
                </v-list-item-title>
              </v-list-item-content>
              <v-form v-show="data.is_hidden">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="data.title" :counter="64" label="Title" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="data.author" :counter="32" label="Author" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="data.due_date" label="Due Date" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-text-field
                        v-model="data.description"
                        :counter="500"
                        label="Description"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                      <v-checkbox
                        v-model="data.completed"
                        color="#2962FF"
                        label="Completed"
                        required
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-btn
                        class="ma-2"
                        @click="data.is_hidden = !data.is_hidden ; updateTodo(data)"
                        v-show="data.is_hidden"
                        color="#4CAF50"
                      >Save</v-btn>
                      <v-btn class="ma-2" @click="deleteTodo(data)" color="#F44336">Delete</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn
                class="ma-2"
                @click="data.is_hidden = !data.is_hidden ; onlyTodoListCard(data)"
                v-show="!data.is_hidden"
                color="#F9A825"
              >Update</v-btn>
              <v-btn
                class="ma-2"
                @click="deleteTodo(data)"
                v-show="!data.is_hidden"
                color="#F44336"
              >Delete</v-btn>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        !Create!
        <font-awesome-icon class="fa closeModalBtn" icon="times" @click="showModal=false" />
      </h3>
      <div slot="body">투두리스트에 등록되었습니다.</div>
    </Modal>
  </div>
</template>

<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
<script>
import axios from "axios";
import Modal from "../common/Modal.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      showPicker: false,
      showModal: false,
      data: {
        id: "",
        title: "",
        author: "",
        description: "",
        due_date: new Date().toISOString().substr(0, 10)
      }
    };
  },
  methods: {
    ...mapActions({
      sendForm: 'createTodoList',
      deleteTodo: 'deleteTodoList',
      updateTodo: 'updateTodoList',
    }),
    clearForm: function() {
        (this.data.title = ""),
        (this.data.description = ""),
        (this.data.author = ""),
        (this.data.due_date = "");
    },
    onlyTodoListCard: function(data) {
      for (let index in this.$store.state.todoList) {
        data.id != this.$store.state.todoList[index].id
          ? (this.$store.state.todoList[index].is_hidden = false)
          : "";
      }
    }
  },
  created() {
    this.$store.dispatch('initTodoList')
  },
  computed: {
    ...mapGetters(["storedTodoList"])
  },
  components: {
    Modal
  }
};
</script>

<style>
.subject {
  color: blue;
  font-style: oblique;
  padding: 30px;
  text-align: center;
}
.todoList {
  margin: 30px 0px 30px 0px;
}
</style>
