<template>
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <router-link to="/" class="brand-logo">It's Lit! 🔥</router-link>
        
        <div v-bind:value="username">
          <!--<h4>{{username}}</h4> //testing props in vue -->
        </div>
        
        <ul class="right">
          <li v-if="isLoggedIn" >
            <span class="email black-text" >
             {{currentEmail}} {{currentDisplay}}  {{name}} {{username}}
             <!--{{username}}  {{employee.name}} {{employees}} {{name}} {{username}} -->
              <!--{{currentHandle}}-->
              
            </span>

            <div>
           <!-- <input type="text" class="username"  v-model="profile.name" placeholder="Enter name">-->
            </div>
             
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button class="btn black" v-on:click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from "./Login";
import db from "./firebaseInit";
import 'firebase/firestore'
import axios from "axios";
import firebase from "firebase/app";
import username from "./Login";
//import { sname } from "../App";
import employees from "./employeeList"
import "firebase/auth";
export default {
  name: "navbar",
  props: {
   // username: String,
   // sname: String
  },
  components: {},

  data() {
    return {
      isLoggedIn: false,
      currentEmail: false,
      currentDisplay: false,
      currentHandle: "",
      name: false
      //profile: {
     //   name: null
    //  }
    };
  },
  firestore() {
    const user = firebase.auth().currentUser;
    return{
      profile: db.collection('profiles').doc(user.uid)
  }
  },
  created() {
    /*
    axios.get('https://api.twitter.com/1.1/users/show.json?user_id={dGcpjzT9XTZWdYw9EiciGwH0CiB3}')
        .then(res => this.currentId = res.data)
        .catch(err => console.log(err));
        console.log(this.currentHandle + 'YES'); */

        

    if (firebase.auth().currentUser) {
    //const user = firebase.auth().currentUser;
      this.isLoggedIn = true;
      this.currentEmail = firebase.auth().currentUser.email;
      this.currentDisplay = firebase.auth().currentUser.displayName;
      this.username = firebase.auth().currentUser.uid;
     // profile = db.collection('profiles').doc(user.uid);
       db.collection('profiles').doc(firebase.auth().currentUser.uid).get().then(doc => {
        this.name = doc.data().name
    })
      //console.log(doc.data().name)
      //.doc(user.uid).get().then(doc.data().name)
      //.get().then(doc => {
     // return doc.data().name
   // })

      

     // db.collection("profiles").doc(currentUser.uid.name);
      //this.currentHandle = username;
      //console.log(username);}
    }
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 0px;
}
</style>