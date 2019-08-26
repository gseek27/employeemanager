<template>
  <div class="container" :key="componentKey">
    <h1>Latest Posts</h1>

    <form>
      <!--@submit="createPost"-->
      <div class="create-post">
        <label for="create-post">Wsup?</label>

        <input type="text" id="create-post" v-model="text" placeholder="Type your message here..." />
        <button v-on:click="createPost" @submit="forceRerender" type="submit">Send</button>
      </div>
    </form>

    <!--
     v-on:click="createPost"

     create post here
    v-on:click="deletePost(Post.id)" :key="componentKey"-->
    <hr />
    <div class="postlist" v-bind:key="componentKey">
      <div
        class="collection-item"
        v-for="Post in posts.slice().reverse()"
        v-bind:key="Post.id"
      >{{Post.text}} {{Post.time}}</div>
    </div>
    <!--


<div class="post"
  v-for="(post, index) in posts"
  v-bind:item="post"
  v-bind:key="post._id"
  >

   v-on:dblclick="deletePost(post._id)"
     v-bind:index="index"
    -->
  </div>
</template>

 

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
//import moment from 'moment'
/*
import PostService from '../PostService';*/
export default {
  name: "dashboard",
  data() {
    return {
      text: null,
      id: null,
      posts: [],
      time: null,
      componentKey: 0
    };
  },
  computed: {
    timestamp() {
      "1566716400";
    }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    createPost() {
      db.collection("posts")
        .add({
          text: this.text,
          id: this.id,
          time: Date.now() //moment(Date.now()).format('MM/DD/YYYY hh:mm a')
        })
        .then(this.$router.push("")) //docRef => this.$router.push("/")  this.$router.go()
        .catch(error => console.log(error));
    }
  },
  created() {
    db.collection("posts")
      .orderBy("time", "asc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            text: doc.data().text,
            time: doc.data(Date.now()).time //keep to show timestamp doc.data().time
          };
          this.posts.push(data);
          console.log(doc.data());
          console.log(doc.data(Date.now()).time)
        });
      });
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>