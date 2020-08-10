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
          <!-- <v-date-picker v-model="data.due_date" locale="ko" no-title></v-date-picker> -->
          <v-btn @click="sendForm" color="#4CAF50">create</v-btn>
          <v-btn @click="clearForm" color="#F44336">clear</v-btn>
        </v-flex>
        <v-flex class="todoList" column>
          <v-card max-width="600" tile>
            <v-list-item v-for="(data, index) in propsdata" v-bind:key="index">
              <v-list-item-content>
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <div data-app>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#FFC107" v-bind="attrs" v-on="on">Update</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Modifying TodoList</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="propsdata[index].id" label="Title*"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="data.author" label="Author*" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="data.description"
                              label="Content*"
                              hint="write down the deatils."
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="data.due_date"
                              label="Due Date*"
                              hint="YYYY-MM-DD"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-autocomplete :items="['Done', 'Not Yet']" label="Completed"></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                        style="color:#F44336"
                      >Close</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                        style="color:#4CAF50"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <v-btn class="ma-2" @click="deleteTodo(data.id)" color="#F44336">Delete</v-btn>
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
      dialog: false,
      showPicker: false,
      data: {
        id: "",
        title: "",
        author: "",
        description: "",
        due_date: new Date().toISOString().substr(0, 10)
      }
    };
  },
  props: ["propsdata"],
  methods: {
    sendForm: function() {
      axios({
        method: "POST",
        url: url,
        data: this.data
      })
        .then(response => {
          console.log("Success", response);
          this.$emit("saved");
        })
        .catch(error => {
          console.log("Failed to create todoList", error.response);
        });
    },
    clearForm: function() {
      (this.data.title = ""),
      (this.data.description = ""),
      (this.data.author = ""),
      (this.data.due_date = "")
    },
    deleteTodo: function(id) {
      axios({
        method: "DELETE",
        url: url + id
      })
        .then(response => {
          this.$emit("deleted");
          console.log("Success", response);
        })
        .catch(error => {
          console.log("Failed to get todoList", error.response);
        });
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