<template>
  <div class="container">
    <h1>Latest Posts</h1>

    <form @submit="createPost">
      <!--@submit="createPost"-->
      <div>
        <label for="create-post">Wsup?</label>
        <input type="text" id="create-post" v-model="text" placeholder="Type your message here..." />

       <button v-on:click="forceRerender" type="submit">Send</button>
      </div>
    </form>

     <br>

    <PostComponent :timestamp="timestamp" :posts="posts" :key="componentKey" /> 
    <!-- props, post list update on render, emit function for deleting -->
  </div>
</template>

 

<script>
import db from "./firebaseInit";
import firebase from "firebase/app";
import PostComponent from "./PostComponent";
export default {
  name: "dashboard",
  components: {
    PostComponent
  },
  data() {
    return {
      text: null,
      id: null, //good null
      posts: [],
      time: null,
      componentKey: 0,
      timestamp: null,
    };
  },
  firebase: {
    posts: db.collection("posts")
  },
  methods: {
    forceRerender() {
      this.componentKey += 1; //updates the list of posts by changing they key on the post component
      console.log("ckey  =" + this.componentKey);
    },
    createPost() {
      // when posts are created, they get added to the "posts" collection here
      db.collection("posts")
        .add({
          text: this.text, //NEEDED
          time: new Date(new Date().toJSON().toString()).toLocaleString(), // NEEDED. converts the post time into local time
          timestamp: Date.now(), //NEEDED
        })
        .then(this.$router.push("/"))
        .catch(error => console.log(error));
    }
    
  }}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>