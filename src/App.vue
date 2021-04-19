<template>
  <div id="app">
    <navbar v-bind:name="name" @send-name="addUsername"/>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
import Login from "./components/Login";
import username from "./components/Login";
import Register from "./components/Register";
import navbar from "./components/navbar";
//import axios from "axios";
export default {
  name: "App",
  components: {
    navbar
  },
  data() {
    return {
      //username
    //  username: "testing in vue", SHOWS IN NAVBAR!!!
    name: null
    };
  },
  methods: {
    addUsername() {
       
          //id: uuid.v4(),
        //  username: this.username,
      //   sname = this.name;
        }
         //send up to parent
      //this.$emit('add-name', newName)
  },
  created() {
    /*axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.username = res.data)
        .catch(err => console.log(err));*/
  }
}
</script>

