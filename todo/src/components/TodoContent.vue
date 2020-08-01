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
          <v-row justify="center">
            <v-date-picker v-model="picker"></v-date-picker>
          </v-row>
          <v-btn @click="sendForm" style="background: green">create</v-btn>
          <v-btn @click="clearForm" style="background: red">clear</v-btn>
        </v-flex>
        <v-flex class="todoList" column>
          <v-card max-width="600" tile>
            <v-list-item v-for="(data, index) in propsdata" v-bind:key="index">
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
let url = "http://localhost:8000/api/todo/";

export default {
  data: () => {
    return {
      data: {
        title: "",
        author: "",
        description: "",
        due_date: ""
      },
      picker: new Date().toISOString().substr(0, 10)
    };
  },
  props: ["propsdata"],
  methods: {
    sendForm: function() {
      axios({
        method: "POST",
        url: url,
        data: this.data // TODO: DatePicker 를 고치고 수정이 필요함
      })
        .then(response => {
          console.log("Success", response)
        })
        .catch(response => {
          console.log("Failed to create todoList", response);
        });
    },
    clearForm: function() {
        this.data.title = '',
        this.data.description = '',
        this.data.author = ''
    }
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