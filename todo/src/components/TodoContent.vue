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
          <!-- <v-date-picker v-model="data.due_date" locale="ko" no-title></v-date-picker> -->
          <v-btn @click="sendForm" color="#4CAF50">create</v-btn>
          <v-btn @click="clearForm" color="#F44336">clear</v-btn>
        </v-flex>
        <v-flex class="todoList" column>
          <v-card fluid>
            <v-list-item v-for="(data, index) in propsdata" v-bind:key="index">
              <v-list-item-content v-show="!data.is_hidden">  <!-- Not 연산을 수행하기 때문에 !data.is_hidden = true 로 화면에 보이게 됩니다 -->
                <v-list-item-title>{{ data.title }}</v-list-item-title>
                <v-list-item-title>{{ data.author }}</v-list-item-title>
                <v-list-item-title>{{ data.due_date }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-form v-show="data.is_hidden"> <!-- is_hidden=true 가 되면 입력할 수 있는 form 이 보여집니다. -->
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="data.title" :counter="64" label="Title" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field v-model="data.author" :counter="32" label="Author" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="data.due_date"
                        label="Due Date"
                        required
                      ></v-text-field>
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
                      <!-- Save 버튼은 Update 버튼을 클릭하면 볼 수 있고, Save 버튼 클릭 시 is_hidden=false 를 전달합니다. -->
                      <v-btn class="ma-2" @click="data.is_hidden = !data.is_hidden ; updateTodo(data)" v-show="data.is_hidden" color="#4CAF50">Save</v-btn>
                      <!-- Delete 버튼은 Update 버튼을 클릭하면 볼 수 있고, Delete 버튼 클릭 시 선택 된 객체를 삭제합니다. -->
                      <v-btn class="ma-2" @click="deleteTodo(data.id)" color="#F44336">Delete</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <!-- Update 버튼 클릭 시 onlyTodoListCard 예제에 보이는 하나의 객체만 띄울 수 있는 메소드에 데이터를 전달합니다. -->
              <v-btn class="ma-2" @click="data.is_hidden = !data.is_hidden ; onlyTodoListCard(data, propsdata)" v-show="!data.is_hidden" color="#F9A825">Update</v-btn>
              <!-- Delete 버튼 클릭 시 선택한 객체가 삭제 됩니다. -->
              <v-btn class="ma-2" @click="deleteTodo(data.id)" v-show="!data.is_hidden" color="#F44336">Delete</v-btn>
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
        (this.data.due_date = "");
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
          console.log("Failed to delete todoList", error.response);
        });
    },
    updateTodo: function(data) {
      axios({
        method: "PATCH",
        url: url + data.id + "/",
        data: data
      })
        .then(response => {
          this.$emit("patched");
          console.log("Success", response);
        })
        .catch(error => {
          console.log("Failed to patched todoList", error.response);
        });
    },
    onlyTodoListCard: function(data, propsdata) { // 한 개의 투두리스트만 입력 form이 보이게끔
      for (var index in propsdata) {
        (data.id != propsdata[index].id) ? propsdata[index].is_hidden = false : ''
      }
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